/**
 * Log Parser Utility
 *
 * Provides functions for parsing different log formats and extracting metadata
 */

/**
 * Parse log file content into structured entries
 * @param {string} fileContent - Content of the log file
 * @param {string} logType - Type of log (e.g., 'error', 'audit', 'access')
 * @returns {Array} Array of parsed log entries
 */
function parseLogFile(fileContent, logType) {
  return fileContent
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      try {
        // Try to parse as JSON first
        const jsonEntry = JSON.parse(line);
        jsonEntry.logType = logType;

        // For exceptions log, extract additional fields
        if (logType === 'exceptions') {
          // Extract error type from the message or stack
          if (jsonEntry.message && typeof jsonEntry.message === 'string') {
            const errorTypeMatch = jsonEntry.message.match(/uncaughtException: ([^:]+):/);
            if (errorTypeMatch) {
              jsonEntry.errorType = errorTypeMatch[1].trim();
            } else {
              // Try to extract from the first line of the stack
              const firstLineMatch = jsonEntry.message.match(/\n([^:]+):/);
              if (firstLineMatch) {
                jsonEntry.errorType = firstLineMatch[1].trim();
              }
            }
          }

          // Extract file and line information
          if (jsonEntry.stack && typeof jsonEntry.stack === 'string') {
            const fileLineMatch = jsonEntry.stack.match(/\(([^:]+):(\d+):(\d+)\)/);
            if (fileLineMatch) {
              jsonEntry.file = fileLineMatch[1];
              jsonEntry.line = parseInt(fileLineMatch[2]);
              jsonEntry.column = parseInt(fileLineMatch[3]);
            } else {
              // Try alternative format: file:line:column
              const altFileLineMatch = jsonEntry.stack.match(/([^()\s]+):(\d+):(\d+)/);
              if (altFileLineMatch) {
                jsonEntry.file = altFileLineMatch[1];
                jsonEntry.line = parseInt(altFileLineMatch[2]);
                jsonEntry.column = parseInt(altFileLineMatch[3]);
              }
            }
          }
        }

        return jsonEntry;
      } catch (error) {
        // If not JSON, parse the line format
        const entry = { raw: line, parseError: false, logType };

        // Extract timestamp
        const timestampMatch = line.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
        if (timestampMatch) {
          entry.timestamp = timestampMatch[1];
        }

        // Extract log level
        const levelMatch = line.match(/\[(ERROR|INFO|WARN|DEBUG|error|info|warn|debug|EVENT|event|AUDIT|audit)\]/i);
        if (levelMatch) {
          entry.level = levelMatch[1].toLowerCase();
        }

        // Extract user info if present
        const userMatch = line.match(/User: ([^\s\-]+)/);
        const userIdMatch = line.match(/UserId: ([a-f0-9]{24})/i);
        const userRoleMatch = line.match(/UserRole: ([^\s,\]]+)/i);

        // Also try to extract email from the metadata
        const emailMatch = line.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);

        if (userMatch || userIdMatch || userRoleMatch || emailMatch) {
          entry.user = {};

          if (userMatch) {
            entry.user.email = userMatch[1];
          } else if (emailMatch) {
            entry.user.email = emailMatch[0];
          }

          if (userIdMatch) {
            entry.user.id = userIdMatch[1];
          }

          if (userRoleMatch) {
            entry.user.role = userRoleMatch[1];
          }
        }

        // Extract IP address if present
        // For events.log format: "2025-05-11 16:47:47 [INFO] ::1 - -"
        if (logType === 'events') {
          const eventsIpMatch = line.match(/\[INFO\]\s+([^\s]+)/i);
          if (eventsIpMatch) {
            entry.ipAddress = eventsIpMatch[1];
          }
        } else {
          // For other log formats
          const ipMatch = line.match(/ip":"([^"]+)"/i) || line.match(/IP: ([^\s,\]]+)/i) || line.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
          if (ipMatch) {
            entry.ipAddress = ipMatch[1] || ipMatch[0];
          }
        }

        // Extract user agent/device info if present
        if (logType === 'events') {
          // For events.log format: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
          const eventsUaMatch = line.match(/"([^"]+)"\r$/);
          if (eventsUaMatch) {
            entry.userAgent = eventsUaMatch[1];
            // Parse user agent to get device info
            entry.device = parseUserAgent(entry.userAgent);
          }
        } else {
          // For other log formats
          const uaMatch = line.match(/userAgent":"([^"]+)"/i) || line.match(/User-Agent: ([^\]]+)/i) || line.match(/Mozilla\/[\d\.]+.+?(?=\s\-|\s\[|$)/);
          if (uaMatch) {
            entry.userAgent = uaMatch[1] || uaMatch[0];
            // Parse user agent to get device info
            entry.device = parseUserAgent(entry.userAgent);
          }
        }

        // Extract action and entity info (for audit logs)
        if (logType === 'audit') {
          // First try to match "Auth login" pattern
          const authActionMatch = line.match(/\] Auth (\w+[\-\w]*)/);
          if (authActionMatch) {
            entry.action = authActionMatch[1];
            entry.entity = 'auth';
          } else {
            // Try to match "user updated" pattern
            const entityActionMatch = line.match(/\] (\w+) (\w+[\-\w]*)/);
            if (entityActionMatch) {
              entry.entity = entityActionMatch[1];
              entry.action = entityActionMatch[2];
            }
          }
        }

        // Extract request method and path if present
        // For events.log format: "GET /api/v1/logs?limit=50&page=1&logType=errors HTTP/1.1"
        const eventsLogMatch = line.match(/"(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)\s+HTTP/i);
        if (eventsLogMatch) {
          entry.request = {
            method: eventsLogMatch[1],
            path: eventsLogMatch[2]
          };
        } else {
          // For other log formats
          const requestMatch = line.match(/\[(Method: ([^\]]+))\]/i) || line.match(/(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)/i);
          if (requestMatch) {
            entry.request = {
              method: requestMatch[2] || requestMatch[1],
              path: requestMatch[3] || requestMatch[2]
            };
          }
        }

        // Extract status code if present
        // For events.log format: "HTTP/1.1" 304 - or "HTTP/1.1" 200 17757
        const eventsStatusMatch = line.match(/HTTP\/[\d\.]+"\s+(\d{3})\s/i);
        if (eventsStatusMatch) {
          entry.statusCode = parseInt(eventsStatusMatch[1]);
        } else {
          // For other log formats
          const statusMatch = line.match(/\[(Status: (\d{3}))\]/i) || line.match(/\b(\d{3})\b(?=\s\-|\s\[|$)/);
          if (statusMatch) {
            entry.statusCode = parseInt(statusMatch[2] || statusMatch[1]);
          }
        }

        // Extract message - everything between level and first dash or end of line
        if (logType === 'events') {
          // For events logs, use the request method and path as the message
          if (entry.request) {
            entry.message = `${entry.request.method} ${entry.request.path}`;
          } else {
            // If no request info, use the IP as the message (already extracted)
            // No need to do anything as message is already set to IP
          }
        } else {
          const messageMatch = line.match(/\][^\[]*?([^-]+)(?:-|$)/);
          if (messageMatch) {
            entry.message = messageMatch[1].trim();
          } else {
            // Fallback: just use everything after the timestamp and level
            const fallbackMatch = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[[^\]]+\](.*)/);
            if (fallbackMatch) {
              entry.message = fallbackMatch[1].trim();
            }
          }
        }

        // Extract metadata if present (anything after the first dash)
        const metaMatch = line.match(/-\s+(.+)$/);
        if (metaMatch) {
          try {
            // Try to parse metadata as JSON
            const metaData = JSON.parse(metaMatch[1].trim());

            // Extract details into separate fields
            if (metaData) {
              // Store the original metadata
              entry.metadata = metaData;

              // Extract request details if present
              if (metaData.request) {
                if (!entry.ipAddress && metaData.request.ip) {
                  entry.ipAddress = metaData.request.ip;
                }

                if (!entry.userAgent && metaData.request.userAgent) {
                  entry.userAgent = metaData.request.userAgent;

                  // Parse user agent if not already done
                  if (!entry.device) {
                    entry.device = parseUserAgent(metaData.request.userAgent);
                  }
                }
              }

              // Extract changes if present
              if (metaData.changes) {
                entry.changes = metaData.changes;
              }

              // Extract details if present
              if (metaData.details) {
                entry.details = metaData.details;
              }

              // Extract user info if not already present
              if (metaData.user) {
                if (!entry.user) {
                  entry.user = {};
                }

                if (metaData.user.email && !entry.user.email) {
                  entry.user.email = metaData.user.email;
                }

                if (metaData.user.id && !entry.user.id) {
                  entry.user.id = metaData.user.id;
                }

                if (metaData.user.role && !entry.user.role) {
                  entry.user.role = metaData.user.role;
                }
              }
            }
          } catch (e) {
            // If not valid JSON, store as string
            entry.metadata = metaMatch[1].trim();
          }
        }

        return entry;
      }
    });
}

/**
 * Parse user agent string to extract device, browser, and OS information
 * @param {string} ua - User agent string
 * @returns {Object} Device information object
 */
function parseUserAgent(ua) {
  if (!ua) return null;

  const deviceInfo = {
    browser: 'Unknown',
    os: 'Unknown',
    device: 'Unknown'
  };

  // Detect browser
  if (ua.includes('Chrome')) {
    deviceInfo.browser = 'Chrome';
  } else if (ua.includes('Firefox')) {
    deviceInfo.browser = 'Firefox';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    deviceInfo.browser = 'Safari';
  } else if (ua.includes('Edge') || ua.includes('Edg')) {
    deviceInfo.browser = 'Edge';
  } else if (ua.includes('MSIE') || ua.includes('Trident')) {
    deviceInfo.browser = 'Internet Explorer';
  }

  // Detect OS
  if (ua.includes('Windows')) {
    deviceInfo.os = 'Windows';
  } else if (ua.includes('Mac OS')) {
    deviceInfo.os = 'macOS';
  } else if (ua.includes('Linux')) {
    deviceInfo.os = 'Linux';
  } else if (ua.includes('Android')) {
    deviceInfo.os = 'Android';
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    deviceInfo.os = 'iOS';
  }

  // Detect device type
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    deviceInfo.device = 'Mobile';
  } else if (ua.includes('iPad') || ua.includes('Tablet')) {
    deviceInfo.device = 'Tablet';
  } else {
    deviceInfo.device = 'Desktop';
  }

  return deviceInfo;
}

module.exports = {
  parseLogFile,
  parseUserAgent
};

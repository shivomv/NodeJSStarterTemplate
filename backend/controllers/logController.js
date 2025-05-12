/**
 * Log Controller
 *
 * Handles all log-related operations including:
 * - Retrieving consolidated logs with filtering and pagination
 * - Parsing different log formats
 * - Extracting metadata from logs
 */

const fs = require('fs');
const path = require('path');
const { parseLogFile } = require('../utils/logParser');

/**
 * Get consolidated logs from all log files with filtering and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      level,
      search,
      startDate,
      endDate,
      user,
      ip,
      device,
      browser,
      os,
      logType,
      action,
      entity
    } = req.query;

    const logsDir = path.join(__dirname, '../logs');

    // Get all log files
    const files = await fs.promises.readdir(logsDir);
    const logFiles = files.filter(file => file.endsWith('.log'));

    // If logType is specified, filter to only that log file
    const targetFiles = logType ?
      logFiles.filter(file => file === `${logType}.log`) :
      logFiles;

    if (targetFiles.length === 0) {
      return res.status(200).json({
        success: true,
        totalEntries: 0,
        filteredEntries: 0,
        page: parseInt(page),
        totalPages: 0,
        entries: [],
        filters: {
          logTypes: logFiles.map(file => file.replace('.log', '')),
          levels: [],
          users: [],
          ipAddresses: [],
          devices: [],
          browsers: [],
          operatingSystems: [],
          actions: [],
          entities: []
        }
      });
    }

    // Read and parse all log files
    let allLogEntries = [];

    for (const file of targetFiles) {
      const filePath = path.join(logsDir, file);
      try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const logType = file.replace('.log', '');

        // Parse log entries
        const entries = parseLogFile(fileContent, logType);
        allLogEntries = [...allLogEntries, ...entries];
      } catch (error) {
        console.error(`Error reading log file ${file}:`, error);
        // Continue with other files
      }
    }

    // Sort all entries by timestamp (newest first)
    allLogEntries.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });

    // Apply filters
    let filteredEntries = [...allLogEntries];

    // Filter by log level
    if (level && level !== 'all') {
      filteredEntries = filteredEntries.filter(entry =>
        entry.level && entry.level.toLowerCase() === level.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredEntries = filteredEntries.filter(entry =>
        (entry.message && entry.message.toLowerCase().includes(searchTerm)) ||
        (entry.raw && entry.raw.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by date range
    if (startDate) {
      const start = new Date(startDate);
      filteredEntries = filteredEntries.filter(entry => {
        if (!entry.timestamp) return false;
        const entryDate = new Date(entry.timestamp);
        return !isNaN(entryDate.getTime()) && entryDate >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      // Set to end of day
      end.setHours(23, 59, 59, 999);
      filteredEntries = filteredEntries.filter(entry => {
        if (!entry.timestamp) return false;
        const entryDate = new Date(entry.timestamp);
        return !isNaN(entryDate.getTime()) && entryDate <= end;
      });
    }

    // Filter by user
    if (user) {
      filteredEntries = filteredEntries.filter(entry =>
        (entry.user &&
          ((entry.user.email && entry.user.email.includes(user)) ||
           (entry.user.id && entry.user.id.includes(user))))
      );
    }

    // Filter by IP address
    if (ip) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.ipAddress && entry.ipAddress.includes(ip)
      );
    }

    // Filter by device type
    if (device) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.device && entry.device.device === device
      );
    }

    // Filter by browser
    if (browser) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.device && entry.device.browser === browser
      );
    }

    // Filter by OS
    if (os) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.device && entry.device.os === os
      );
    }

    // Filter by action (for audit logs)
    if (action) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.action && entry.action.toLowerCase() === action.toLowerCase()
      );
    }

    // Filter by entity (for audit logs)
    if (entity) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.entity && entry.entity.toLowerCase() === entity.toLowerCase()
      );
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const totalEntries = filteredEntries.length;
    const totalPages = Math.ceil(totalEntries / limitNum);

    const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

    // Get unique values for filters
    const uniqueLogTypes = [...new Set(allLogEntries.map(entry => entry.logType))];
    const uniqueLevels = [...new Set(allLogEntries.map(entry => entry.level).filter(Boolean))];
    const uniqueUsers = [...new Set(allLogEntries
      .filter(entry => entry.user && (entry.user.email || entry.user.id))
      .map(entry => entry.user.email || entry.user.id)
    )];
    const uniqueIPs = [...new Set(allLogEntries
      .filter(entry => entry.ipAddress)
      .map(entry => entry.ipAddress)
    )];
    const uniqueDevices = [...new Set(allLogEntries
      .filter(entry => entry.device && entry.device.device)
      .map(entry => entry.device.device)
    )];
    const uniqueBrowsers = [...new Set(allLogEntries
      .filter(entry => entry.device && entry.device.browser)
      .map(entry => entry.device.browser)
    )];
    const uniqueOS = [...new Set(allLogEntries
      .filter(entry => entry.device && entry.device.os)
      .map(entry => entry.device.os)
    )];
    const uniqueActions = [...new Set(allLogEntries
      .filter(entry => entry.action)
      .map(entry => entry.action)
    )];
    const uniqueEntities = [...new Set(allLogEntries
      .filter(entry => entry.entity)
      .map(entry => entry.entity)
    )];

    res.status(200).json({
      success: true,
      totalEntries,
      filteredEntries: filteredEntries.length,
      page: pageNum,
      totalPages,
      entries: paginatedEntries,
      filters: {
        logTypes: uniqueLogTypes,
        levels: uniqueLevels,
        users: uniqueUsers,
        ipAddresses: uniqueIPs,
        devices: uniqueDevices,
        browsers: uniqueBrowsers,
        operatingSystems: uniqueOS,
        actions: uniqueActions,
        entities: uniqueEntities
      }
    });
  } catch (error) {
    console.error('Error fetching consolidated logs:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching consolidated logs',
      error: error.message
    });
  }
};

module.exports = exports;

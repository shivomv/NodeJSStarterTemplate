import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Admin = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('logs');
  const [logFiles, setLogFiles] = useState([]);
  const [selectedLogFile, setSelectedLogFile] = useState(null);
  const [logEntries, setLogEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalEntries: 0,
    linesPerPage: 50
  });

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [logLevel, setLogLevel] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin area.',
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  }, [isAdmin, isAuthenticated, navigate, toast]);

  // Fetch log types
  useEffect(() => {
    const fetchLogTypes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/logs', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch log types');
        }

        const data = await response.json();

        // Get unique log types from the filters
        const logTypes = data.filters?.logTypes || [];
        setLogFiles(logTypes.map(type => `${type}.log`));

        // Select the first log type by default
        if (logTypes.length > 0 && !selectedLogFile) {
          setSelectedLogFile(`${logTypes[0]}.log`);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin && activeTab === 'logs') {
      fetchLogTypes();
    }
  }, [isAdmin, activeTab, toast]);

  // Fetch log entries when a log file is selected or filters change
  useEffect(() => {
    const fetchLogEntries = async () => {
      if (!selectedLogFile) return;

      try {
        setLoading(true);

        // Extract log type from the selected file name
        const logType = selectedLogFile.replace('.log', '');

        // Build query parameters
        const params = new URLSearchParams({
          limit: pagination.linesPerPage,
          page: pagination.page,
          logType: logType
        });

        // Add filters if they're set
        if (logLevel && logLevel !== 'all') {
          params.append('level', logLevel);
        }

        if (searchTerm) {
          params.append('search', searchTerm);
        }

        if (dateRange.from) {
          params.append('startDate', dateRange.from.toISOString().split('T')[0]);
        }

        if (dateRange.to) {
          params.append('endDate', dateRange.to.toISOString().split('T')[0]);
        }

        if (selectedUser) {
          params.append('user', selectedUser);
        }

        if (selectedAction) {
          params.append('action', selectedAction);
        }

        if (selectedEntity) {
          params.append('entity', selectedEntity);
        }

        const response = await fetch(`/api/v1/logs?${params.toString()}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch log entries');
        }

        const data = await response.json();
        setLogEntries(data.entries || []);
        setPagination({
          ...pagination,
          totalPages: data.totalPages || 1,
          totalEntries: data.totalEntries || 0,
          filteredEntries: data.filteredEntries || 0
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin && selectedLogFile) {
      fetchLogEntries();
    }
  }, [
    isAdmin,
    selectedLogFile,
    pagination.page,
    pagination.linesPerPage,
    logLevel,
    searchTerm,
    dateRange.from,
    dateRange.to,
    selectedUser,
    selectedAction,
    selectedEntity,
    toast
  ]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination({ ...pagination, page: newPage });
  };

  // Get severity class for log level
  const getSeverityClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'error':
        return 'text-red-500 dark:text-red-400';
      case 'warn':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'info':
        return 'text-blue-500 dark:text-blue-400';
      case 'debug':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return timestamp;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your application</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-2 font-medium text-sm transition-colors relative ${
              activeTab === 'logs'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Application Logs
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 font-medium text-sm transition-colors relative ${
              activeTab === 'users'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            User Management
          </button>
        </div>
      </div>

      {/* Log Viewer */}
      {activeTab === 'logs' && (
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            {/* Top row with log file selector and pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="logFile" className="text-sm font-medium">
                  Log File:
                </label>
                <select
                  id="logFile"
                  value={selectedLogFile || ''}
                  onChange={(e) => {
                    setSelectedLogFile(e.target.value);
                    setPagination({ ...pagination, page: 1 });
                  }}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  disabled={loading || logFiles.length === 0}
                >
                  {logFiles.length === 0 ? (
                    <option value="">No log files available</option>
                  ) : (
                    logFiles.map((file) => (
                      <option key={file} value={file}>
                        {file}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1 || loading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                  {pagination.filteredEntries !== pagination.totalEntries && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      (Showing {pagination.filteredEntries} of {pagination.totalEntries} entries)
                    </span>
                  )}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages || loading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Filters row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Log level filter */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="logLevel" className="text-xs font-medium text-muted-foreground">
                  Log Level
                </label>
                <select
                  id="logLevel"
                  value={logLevel}
                  onChange={(e) => setLogLevel(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="all">All Levels</option>
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                  <option value="event">Event</option>
                  <option value="audit">Audit</option>
                </select>
              </div>

              {/* Date range filter */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 justify-start text-left font-normal w-full"
                      >
                        {dateRange.from ? (
                          formatTimestamp(dateRange.from)
                        ) : (
                          <span className="text-muted-foreground">Start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 justify-start text-left font-normal w-full"
                      >
                        {dateRange.to ? (
                          formatTimestamp(dateRange.to)
                        ) : (
                          <span className="text-muted-foreground">End date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Search filter */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="searchTerm" className="text-xs font-medium text-muted-foreground">
                  Search
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search in logs..."
                    className="h-9"
                  />
                  <Button
                    variant="secondary"
                    className="h-9 px-3"
                    onClick={() => {
                      // Reset filters
                      setSearchTerm('');
                      setLogLevel('all');
                      setDateRange({ from: null, to: null });
                      setSelectedUser('');
                      setSelectedAction('');
                      setSelectedEntity('');
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional filters for audit logs */}
            {selectedLogFile && selectedLogFile.includes('audit') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* User filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="selectedUser" className="text-xs font-medium text-muted-foreground">
                    User
                  </label>
                  <Input
                    id="selectedUser"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    placeholder="Filter by user email or ID..."
                    className="h-9"
                  />
                </div>

                {/* Action filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="selectedAction" className="text-xs font-medium text-muted-foreground">
                    Action
                  </label>
                  <select
                    id="selectedAction"
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">All Actions</option>
                    <option value="login">Login</option>
                    <option value="logout">Logout</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="forgot-password">Forgot Password</option>
                    <option value="reset-password">Reset Password</option>
                  </select>
                </div>

                {/* Entity filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="selectedEntity" className="text-xs font-medium text-muted-foreground">
                    Entity
                  </label>
                  <select
                    id="selectedEntity"
                    value={selectedEntity}
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">All Entities</option>
                    <option value="user">User</option>
                    <option value="auth">Auth</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Message
                    </th>
                    {/* Dynamic columns based on log type */}
                    {logEntries.length > 0 && (
                      <>
                        {/* Determine columns based on the first entry's log type */}
                        {logEntries[0].logType === 'audit' && (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
                              Action
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-20">
                              Entity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Device
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                              Details
                            </th>
                          </>
                        )}
                        {logEntries[0].logType === 'error' && (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Service
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                              Stack Trace
                            </th>
                          </>
                        )}
                        {logEntries[0].logType === 'events' && (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Method
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Path
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Device
                            </th>
                          </>
                        )}
                        {logEntries[0].logType === 'exceptions' && (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Error Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              File
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">
                              Line
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                              Stack Trace
                            </th>
                          </>
                        )}
                        {!['audit', 'error', 'events', 'exceptions'].includes(logEntries[0].logType) && (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              IP Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">
                              Device
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                              Details
                            </th>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {logEntries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={
                          selectedLogFile && selectedLogFile.includes('audit') ? 10 :
                          selectedLogFile && selectedLogFile.includes('error') ? 7 :
                          selectedLogFile && selectedLogFile.includes('events') ? 9 :
                          selectedLogFile && selectedLogFile.includes('exceptions') ? 8 : 8
                        }
                        className="px-4 py-8 text-center text-muted-foreground"
                      >
                        No log entries found
                      </td>
                    </tr>
                  ) : (
                    logEntries.map((entry, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {formatTimestamp(entry.timestamp)}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {entry.logType || '-'}
                        </td>
                        <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${getSeverityClass(entry.level)}`}>
                          {entry.level || 'unknown'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {entry.message || (entry.raw ? entry.raw.substring(0, 100) : JSON.stringify(entry))}
                        </td>
                        {/* Render different columns based on log type */}
                        {entry.logType === 'audit' && (
                          <>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.user ? (
                                <div className="flex flex-col">
                                  <span className="font-medium">{entry.user.email || '-'}</span>
                                  {entry.user.id && (
                                    <span className="text-xs text-muted-foreground truncate max-w-[150px]" title={entry.user.id}>
                                      ID: {entry.user.id.substring(0, 8)}...
                                    </span>
                                  )}
                                  {entry.user.role && (
                                    <span className="text-xs text-muted-foreground">
                                      Role: {entry.user.role}
                                    </span>
                                  )}
                                </div>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.action || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.entity || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.ipAddress || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.device ? (
                                <div className="flex flex-col">
                                  <span className="font-medium">{entry.device.device}</span>
                                  <span className="text-xs text-muted-foreground">{entry.device.browser} / {entry.device.os}</span>
                                </div>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {entry.metadata ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {typeof entry.metadata === 'object'
                                    ? JSON.stringify(entry.metadata, null, 2)
                                    : entry.metadata}
                                </pre>
                              ) : entry.changes ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {typeof entry.changes === 'object'
                                    ? JSON.stringify(entry.changes, null, 2)
                                    : entry.changes}
                                </pre>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          </>
                        )}
                        {entry.logType === 'error' && (
                          <>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.service || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.ipAddress || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {entry.stack ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {entry.stack}
                                </pre>
                              ) : entry.metadata ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {typeof entry.metadata === 'object'
                                    ? JSON.stringify(entry.metadata, null, 2)
                                    : entry.metadata}
                                </pre>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          </>
                        )}
                        {entry.logType === 'events' && (
                          <>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.ipAddress || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.request?.method || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.request?.path || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.statusCode ? (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  entry.statusCode >= 400 ? 'bg-destructive/20 text-destructive' :
                                  entry.statusCode >= 300 ? 'bg-amber-100 text-amber-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {entry.statusCode}
                                </span>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.device ? (
                                <div className="flex flex-col">
                                  <span className="font-medium">{entry.device.device}</span>
                                  <span className="text-xs text-muted-foreground">{entry.device.browser} / {entry.device.os}</span>
                                </div>
                              ) : '-'}
                            </td>
                          </>
                        )}
                        {entry.logType === 'exceptions' && (
                          <>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.errorType || entry.name || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.file || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.line || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {entry.stack ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {entry.stack}
                                </pre>
                              ) : entry.metadata ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {typeof entry.metadata === 'object'
                                    ? JSON.stringify(entry.metadata, null, 2)
                                    : entry.metadata}
                                </pre>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          </>
                        )}
                        {!['audit', 'error', 'events', 'exceptions'].includes(entry.logType) && (
                          <>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.user ? (
                                <div className="flex flex-col">
                                  <span className="font-medium">{entry.user.email || '-'}</span>
                                  {entry.user.id && (
                                    <span className="text-xs text-muted-foreground truncate max-w-[150px]" title={entry.user.id}>
                                      ID: {entry.user.id.substring(0, 8)}...
                                    </span>
                                  )}
                                </div>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.ipAddress || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                              {entry.device ? (
                                <div className="flex flex-col">
                                  <span className="font-medium">{entry.device.device}</span>
                                  <span className="text-xs text-muted-foreground">{entry.device.browser} / {entry.device.os}</span>
                                </div>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {entry.metadata ? (
                                <pre className="text-xs overflow-x-auto max-h-20">
                                  {typeof entry.metadata === 'object'
                                    ? JSON.stringify(entry.metadata, null, 2)
                                    : entry.metadata}
                                </pre>
                              ) : entry.service ? (
                                <span className="text-xs">{entry.service}</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}



      {/* User Management */}
      {activeTab === 'users' && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <p className="text-muted-foreground">
            This feature will be implemented in a future update.
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;

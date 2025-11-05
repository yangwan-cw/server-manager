import { useState, useEffect } from 'react';
import { Server } from '../types/server';
import { serverApi } from '../api/serverApi';

const ServerList = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await serverApi.getServers();
      setServers(data);
    } catch (err) {
      setError('Failed to fetch servers. Using mock data for demonstration.');
      // Mock data for demonstration
      setServers([
        {
          id: '1',
          customer: 'Acme Corp',
          imageName: 'nginx',
          version: '1.21.0',
          serverAddress: '192.168.1.100',
          responsible: 'John Doe',
          status: 'running',
        },
        {
          id: '2',
          customer: 'TechStart Inc',
          imageName: 'postgres',
          version: '14.2',
          serverAddress: '192.168.1.101',
          responsible: 'Jane Smith',
          status: 'running',
        },
        {
          id: '3',
          customer: 'Global Solutions',
          imageName: 'redis',
          version: '6.2.6',
          serverAddress: '192.168.1.102',
          responsible: 'Bob Johnson',
          status: 'stopped',
        },
        {
          id: '4',
          customer: 'DataFlow Systems',
          imageName: 'mongodb',
          version: '5.0.9',
          serverAddress: '192.168.1.103',
          responsible: 'Alice Williams',
          status: 'running',
        },
        {
          id: '5',
          customer: 'CloudNet Services',
          imageName: 'mysql',
          version: '8.0.29',
          serverAddress: '192.168.1.104',
          responsible: 'Charlie Brown',
          status: 'error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'stopped':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'running':
        return '●';
      case 'stopped':
        return '■';
      case 'error':
        return '✕';
      default:
        return '?';
    }
  };

  const handleJump = (serverAddress: string) => {
    window.open(`http://${serverAddress}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading servers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Server Manager</h1>
          <p className="text-gray-600">Manage and monitor your server infrastructure</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => (
            <div
              key={server.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white truncate">{server.customer}</h3>
                <p className="text-indigo-100 text-sm mt-1">{server.imageName}</p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Version:</span>
                  <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                    {server.version}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Address:</span>
                  <span className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                    {server.serverAddress}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Responsible:</span>
                  <span className="text-sm text-gray-900 font-medium">{server.responsible}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                      server.status
                    )}`}
                  >
                    <span className="mr-1">{getStatusIcon(server.status)}</span>
                    {server.status || 'unknown'}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => handleJump(server.serverAddress)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Jump to Server</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {servers.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No servers</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new server.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerList;

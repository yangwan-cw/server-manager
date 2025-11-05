import { useState, useEffect } from 'react';
import type { Server } from '../types/server';
import { serverApi } from '../api/serverApi';

const ServerList = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');

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
      setError('获取服务器列表失败，使用演示数据。');
      // Mock data for demonstration
      setServers([
        {
          id: '1',
          customer: '阿里巴巴',
          imageName: 'nginx',
          version: '1.21.0',
          serverAddress: '192.168.1.100',
          responsible: '张三',
          category: 'production',
          status: 'running',
        },
        {
          id: '2',
          customer: '腾讯科技',
          imageName: 'postgres',
          version: '14.2',
          serverAddress: '192.168.1.101',
          responsible: '李四',
          category: 'development',
          status: 'running',
        },
        {
          id: '3',
          customer: '百度在线',
          imageName: 'redis',
          version: '6.2.6',
          serverAddress: '192.168.1.102',
          responsible: '王五',
          category: 'testing',
          status: 'stopped',
        },
        {
          id: '4',
          customer: '字节跳动',
          imageName: 'mongodb',
          version: '5.0.9',
          serverAddress: '192.168.1.103',
          responsible: '赵六',
          category: 'staging',
          status: 'running',
        },
        {
          id: '5',
          customer: '美团点评',
          imageName: 'mysql',
          version: '8.0.29',
          serverAddress: '192.168.1.104',
          responsible: '孙七',
          category: 'production',
          status: 'error',
        },
        {
          id: '6',
          customer: '京东集团',
          imageName: 'elasticsearch',
          version: '7.17.3',
          serverAddress: '192.168.1.105',
          responsible: '周八',
          category: 'production',
          status: 'running',
        },
        {
          id: '7',
          customer: '网易游戏',
          imageName: 'rabbitmq',
          version: '3.9.15',
          serverAddress: '192.168.1.106',
          responsible: '吴九',
          category: 'development',
          status: 'running',
        },
        {
          id: '8',
          customer: '小米科技',
          imageName: 'kafka',
          version: '3.1.0',
          serverAddress: '192.168.1.107',
          responsible: '郑十',
          category: 'testing',
          status: 'running',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'stopped':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const getCategoryColor = (category: Server['category']) => {
    switch (category) {
      case 'development':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'testing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'production':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'staging':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryText = (category: Server['category']) => {
    switch (category) {
      case 'development':
        return '开发环境';
      case 'testing':
        return '测试环境';
      case 'production':
        return '生产环境';
      case 'staging':
        return '预发布环境';
      default:
        return '未知';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'stopped':
        return '已停止';
      case 'error':
        return '错误';
      case 'unknown':
        return '未知';
      default:
        return '未知';
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

  // Filter servers based on search term, status, and category
  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      server.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.imageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.serverAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.responsible.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || server.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-medium">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">服务器列表</h1>
          <p className="text-gray-600">管理和监控您的服务器基础设施</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索客户、镜像、地址或负责人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
              />
            </div>
          </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="block w-full pl-10 pr-9 py-2 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 sm:text-sm rounded-lg bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%23374151%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E')] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                >
                  <option value="all">全部类别</option>
                  <option value="development">开发服务器</option>
                  <option value="testing">测试服务器</option>
                  <option value="staging">预发布服务器</option>
                  <option value="production">生产服务器</option>
                </select>
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-10 pr-9 py-2 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 sm:text-sm rounded-lg bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%23374151%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E')] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                >
                  <option value="all">全部状态</option>
                  <option value="running">运行中</option>
                  <option value="stopped">已停止</option>
                  <option value="error">错误</option>
                  <option value="unknown">未知</option>
                </select>
              </div>
            </div>
          </div>

          {/* View Toggle and Results Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">{filteredServers.length}</span>
              <span className="ml-1">/ {servers.length} 台服务器</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'card'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
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

        {/* Server Cards Grid or List */}
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServers.map((server) => (
            <div
              key={server.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                <h3 className="text-xl font-semibold text-white truncate">{server.customer}</h3>
                <p className="text-gray-300 text-sm mt-1">{server.imageName}</p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">版本:</span>
                  <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                    {server.version}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">地址:</span>
                  <span className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                    {server.serverAddress}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">负责人:</span>
                  <span className="text-sm text-gray-900 font-medium">{server.responsible}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-gray-500">类别:</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(
                      server.category
                    )}`}
                  >
                    {getCategoryText(server.category)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">状态:</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                      server.status
                    )}`}
                  >
                    <span className="mr-1">{getStatusIcon(server.status)}</span>
                    {getStatusText(server.status)}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => handleJump(server.serverAddress)}
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>访问服务器</span>
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
        ) : (
          /* List View */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    客户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    镜像
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    版本
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    地址
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    负责人
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    类别
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServers.map((server) => (
                  <tr key={server.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{server.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{server.imageName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{server.version}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">{server.serverAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{server.responsible}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getCategoryColor(
                          server.category
                        )}`}
                      >
                        {getCategoryText(server.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                          server.status
                        )}`}
                      >
                        <span className="mr-1">{getStatusIcon(server.status)}</span>
                        {getStatusText(server.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleJump(server.serverAddress)}
                        className="text-[#68C53E] hover:text-[#5AB534] hover:underline cursor-pointer transition-colors duration-150"
                      >
                        访问
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredServers.length === 0 && !loading && (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">未找到服务器</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all'
                ? '尝试调整搜索或筛选条件以找到您要查找的内容。'
                : '开始添加新的服务器。'}
            </p>
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                清除筛选
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerList;

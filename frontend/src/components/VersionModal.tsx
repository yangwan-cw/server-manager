import { useEffect } from 'react';
import type { VersionInfo } from '../types/version';

interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VersionModal = ({ isOpen, onClose }: VersionModalProps) => {
  const versionInfo: VersionInfo = {
    gitHash: import.meta.env.VITE_GIT_HASH || 'N/A',
    commitDate: import.meta.env.VITE_COMMIT_DATE || 'N/A',
    commitAuthor: import.meta.env.VITE_COMMIT_AUTHOR || 'N/A',
    version: import.meta.env.VITE_VERSION || 'N/A',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      {/* Modal panel */}
      <div 
        className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-lg leading-6 font-semibold text-white flex items-center"
              id="modal-title"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              版本信息
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

          {/* Body */}
          <div className="bg-white px-6 py-5">
            <div className="space-y-4">
              {/* Git Hash */}
              <div className="border-b border-gray-200 pb-3">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Git 提交哈希
                </label>
                <div className="flex items-center">
                  <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-md text-gray-900 flex-1">
                    {versionInfo.gitHash}
                  </code>
                  {versionInfo.gitHash !== 'N/A' && (
                    <button
                      onClick={() => navigator.clipboard.writeText(versionInfo.gitHash)}
                      className="ml-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                      title="Copy to clipboard"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Commit Date */}
              <div className="border-b border-gray-200 pb-3">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  提交时间
                </label>
                <div className="flex items-center text-gray-900">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">{versionInfo.commitDate}</span>
                </div>
              </div>

              {/* Commit Author */}
              <div className="border-b border-gray-200 pb-3">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  提交人
                </label>
                <div className="flex items-center text-gray-900">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm">{versionInfo.commitAuthor}</span>
                </div>
              </div>

              {/* Version */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">版本号</label>
                <div className="flex items-center text-gray-900">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-indigo-600">
                    {versionInfo.version}
                  </span>
                </div>
              </div>
            </div>
          </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionModal;

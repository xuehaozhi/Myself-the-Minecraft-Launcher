import { JavaVersion } from '../types';
import { Download, CheckCircle, Coffee } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface JavaVersionCardProps {
  java: JavaVersion;
  isSelected: boolean;
  onSelect: () => void;
  onDownload: () => void;
  downloadProgress?: { percent: number; status: string };
}

export const JavaVersionCard = ({
  java,
  isSelected,
  onSelect,
  onDownload,
  downloadProgress,
}: JavaVersionCardProps) => {
  const isDownloading = downloadProgress?.status === 'downloading' || downloadProgress?.status === 'installing';

  return (
    <div
      onClick={onSelect}
      className={`
        p-4 rounded-lg border transition-all cursor-pointer
        ${isSelected ? 'border-primary-500 bg-primary-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Coffee className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{java.displayName}</h3>
            <p className="text-sm text-gray-400">Java {java.version}</p>
          </div>
        </div>
        <div>
          {java.installed ? (
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">已安装</span>
            </div>
          ) : (
            !isDownloading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload();
                }}
                className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
            )
          )}
        </div>
      </div>

      {isDownloading && downloadProgress && (
        <div className="mt-3">
          <div className="text-sm text-gray-300 mb-1">
            {downloadProgress.status === 'downloading' ? '下载中...' : '安装中...'}
          </div>
          <ProgressBar
            percent={downloadProgress.percent}
            status={downloadProgress.status as any}
          />
        </div>
      )}

      {java.path && (
        <div className="mt-2 text-xs text-gray-500 font-mono truncate">
          {java.path}
        </div>
      )}
    </div>
  );
};

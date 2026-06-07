import { GameVersion } from '../types';
import { Download, Play, Trash2, Gamepad2 } from 'lucide-react';

interface GameVersionCardProps {
  version: GameVersion;
  isSelected: boolean;
  onSelect: () => void;
  onDownload: () => void;
  onLaunch: () => void;
  onDelete: () => void;
}

export const GameVersionCard = ({
  version,
  isSelected,
  onSelect,
  onDownload,
  onLaunch,
  onDelete,
}: GameVersionCardProps) => {
  const getTypeBadge = () => {
    switch (version.type) {
      case 'release':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">正式版</span>;
      case 'snapshot':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">快照</span>;
      case 'old_alpha':
      case 'old_beta':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">远古版</span>;
      default:
        return null;
    }
  };

  const getModLoaderText = () => {
    if (version.neoForgeVersion) {
      return `NeoForge ${version.neoForgeVersion}`;
    }
    if (version.forgeVersion) {
      return `Forge ${version.forgeVersion}`;
    }
    return null;
  };

  return (
    <div
      onClick={onSelect}
      className={`
        p-4 rounded-lg border-2 transition-all cursor-pointer
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-gray-800">{version.id}</span>
              {getTypeBadge()}
              {version.installed && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  已安装
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              发布时间: {new Date(version.releaseTime).toLocaleDateString('zh-CN')}
            </div>
            {getModLoaderText() && (
              <div className="text-sm text-blue-600 mt-1 font-medium">
                {getModLoaderText()}
              </div>
            )}
            {version.launchCount > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>已启动 {version.launchCount} 次</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {version.installed ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunch();
                }}
                className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                title="启动游戏"
              >
                <Play className="w-4 h-4 text-white" fill="currentColor" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                title="删除版本"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg"
              title="下载版本"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

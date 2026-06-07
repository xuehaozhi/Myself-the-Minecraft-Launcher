import { GameVersion } from '../types';
import { Download, Play, Trash2, Cpu } from 'lucide-react';

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
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">正式版</span>;
      case 'snapshot':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">快照</span>;
      case 'old_alpha':
      case 'old_beta':
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">远古版</span>;
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
        p-4 rounded-lg border transition-all cursor-pointer
        ${isSelected ? 'border-primary-500 bg-primary-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">{version.id}</span>
          {getTypeBadge()}
        </div>
        <div className="flex items-center gap-2">
          {version.installed ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunch();
                }}
                className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                title="启动游戏"
              >
                <Play className="w-4 h-4 text-white" fill="currentColor" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                title="删除版本"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              title="下载版本"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-2">
        发布时间: {new Date(version.releaseTime).toLocaleDateString('zh-CN')}
      </div>

      {getModLoaderText() && (
        <div className="text-sm text-primary-400 mb-2">
          {getModLoaderText()}
        </div>
      )}

      {version.launchCount > 0 && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Cpu className="w-3 h-3" />
          <span>已启动 {version.launchCount} 次</span>
        </div>
      )}

      <div className="mt-2 flex items-center gap-2">
        {version.installed && (
          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">已安装</span>
        )}
      </div>
    </div>
  );
};

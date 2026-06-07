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
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">正式版</span>;
      case 'snapshot':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">快照</span>;
      case 'old_alpha':
      case 'old_beta':
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">远古版</span>;
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
        p-5 rounded-xl border-2 transition-all cursor-pointer
        ${isSelected 
          ? 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20' 
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
            <Cpu className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">{version.id}</span>
            <div className="flex items-center gap-2 mt-1">
              {getTypeBadge()}
              {version.installed && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  已安装
                </span>
              )}
            </div>
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
                className="p-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                title="启动游戏"
              >
                <Play className="w-4 h-4 text-white" fill="currentColor" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
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
              className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
              title="下载版本"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-300 mb-2">
        发布时间: {new Date(version.releaseTime).toLocaleDateString('zh-CN')}
      </div>

      {getModLoaderText() && (
        <div className="text-sm text-blue-400 mb-2 font-medium">
          {getModLoaderText()}
        </div>
      )}

      {version.launchCount > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>已启动 {version.launchCount} 次</span>
        </div>
      )}
    </div>
  );
};

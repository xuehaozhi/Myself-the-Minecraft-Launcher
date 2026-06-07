import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MemoryStick, Shield, Terminal, Cpu } from 'lucide-react';

export const Settings = () => {
  const { gameSettings, setGameSettings, gameVersions, selectedVersion } = useAppStore();
  const [tempMaxMemory, setTempMaxMemory] = useState(gameSettings.memory.max);

  const selectedVersionData = gameVersions.find(v => v.id === selectedVersion);

  const handleMemoryChange = (value: number) => {
    setTempMaxMemory(value);
  };

  const handleMemorySave = () => {
    setGameSettings({
      memory: {
        ...gameSettings.memory,
        max: tempMaxMemory,
      },
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">游戏设置</h1>
        <p className="text-gray-400">配置 Minecraft 的启动参数和选项</p>
      </div>

      <div className="space-y-6">
        {/* 内存设置 */}
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <MemoryStick className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">内存分配</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-300">最大内存 (MB)</label>
                <span className="text-sm text-white font-mono">{tempMaxMemory} MB</span>
              </div>
              <input
                type="range"
                min="1024"
                max="16384"
                step="512"
                value={tempMaxMemory}
                onChange={(e) => handleMemoryChange(parseInt(e.target.value))}
                onMouseUp={handleMemorySave}
                onTouchEnd={handleMemorySave}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 GB</span>
                <span>4 GB</span>
                <span>8 GB</span>
                <span>16 GB</span>
              </div>
            </div>
            
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-400">
                💡 建议分配系统内存的 50-75% 给 Minecraft。如果系统内存为 8GB，推荐分配 4-5GB。
              </p>
            </div>
          </div>
        </div>

        {/* 版本隔离 */}
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">版本隔离</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">启用版本隔离</p>
              <p className="text-sm text-gray-400">每个版本使用独立的 .minecraft 目录</p>
            </div>
            <button
              onClick={() => setGameSettings({ versionIsolation: !gameSettings.versionIsolation })}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${gameSettings.versionIsolation ? 'bg-primary-600' : 'bg-gray-600'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${gameSettings.versionIsolation ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Java 参数 */}
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">Java 虚拟机参数</h2>
          </div>
          
          <textarea
            value={gameSettings.javaArgs}
            onChange={(e) => setGameSettings({ javaArgs: e.target.value })}
            placeholder="-XX:+UseG1GC -XX:+ParallelRefProcEnabled..."
            className="w-full h-24 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-sm font-mono resize-none focus:outline-none focus:border-primary-500"
          />
          
          <p className="text-xs text-gray-500 mt-2">
            高级用户可以在此添加自定义 JVM 参数，参数之间用空格分隔
          </p>
        </div>

        {/* 启动统计 */}
        {selectedVersionData && (
          <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-primary-400" />
              <h2 className="text-lg font-semibold text-white">版本信息</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">游戏版本</p>
                <p className="text-white font-semibold">{selectedVersionData.id}</p>
              </div>
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">启动次数</p>
                <p className="text-white font-semibold">{selectedVersionData.launchCount} 次</p>
              </div>
              {selectedVersionData.forgeVersion && (
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Forge 版本</p>
                  <p className="text-white font-semibold">{selectedVersionData.forgeVersion}</p>
                </div>
              )}
              {selectedVersionData.neoForgeVersion && (
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">NeoForge 版本</p>
                  <p className="text-white font-semibold">{selectedVersionData.neoForgeVersion}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

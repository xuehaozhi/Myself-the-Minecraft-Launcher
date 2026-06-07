import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MemoryStick, Shield, Terminal, Coffee, Settings, Globe } from 'lucide-react';

export const SettingsPage = () => {
  const { gameSettings, setGameSettings, javaVersions, setJavaVersions } = useAppStore();
  const [tempMaxMemory, setTempMaxMemory] = useState(gameSettings.memory.max);

  const handleMemorySave = () => {
    setGameSettings({
      memory: {
        ...gameSettings.memory,
        max: tempMaxMemory,
      },
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100/10 to-blue-50/5 min-h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Settings className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">设置</h1>
            <p className="text-gray-400 text-sm">配置 M2TL 启动器</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 内存设置 */}
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MemoryStick className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">内存分配</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-300">最大内存</label>
                  <span className="text-sm text-white font-mono">{tempMaxMemory} MB</span>
                </div>
                <input
                  type="range"
                  min="1024"
                  max="16384"
                  step="512"
                  value={tempMaxMemory}
                  onChange={(e) => setTempMaxMemory(parseInt(e.target.value))}
                  onMouseUp={handleMemorySave}
                  onTouchEnd={handleMemorySave}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 GB</span>
                  <span>4 GB</span>
                  <span>8 GB</span>
                  <span>16 GB</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-700/30 rounded-lg">
                <p className="text-sm text-gray-400">
                  💡 建议分配系统内存的 50-75% 给 Minecraft。例如 8GB 内存的系统推荐 4-5GB。
                </p>
              </div>
            </div>
          </div>

          {/* 版本隔离 */}
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">版本隔离</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">为每个版本使用独立的 .minecraft 目录</p>
                <p className="text-sm text-gray-400">可以防止版本间的配置和模组冲突</p>
              </div>
              <button
                onClick={() => setGameSettings({ versionIsolation: !gameSettings.versionIsolation })}
                className={`
                  relative inline-flex h-8 w-16 items-center rounded-full transition-colors
                  ${gameSettings.versionIsolation ? 'bg-blue-500' : 'bg-gray-600'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform
                    ${gameSettings.versionIsolation ? 'translate-x-9' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Java 设置 */}
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Java 虚拟机设置</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-2">Java 版本</label>
                <select
                  value={gameSettings.selectedJava}
                  onChange={(e) => setGameSettings({ selectedJava: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">自动选择</option>
                  <option value="java-21">Java 21</option>
                  <option value="java-17">Java 17</option>
                  <option value="java-11">Java 11</option>
                  <option value="java-8">Java 8</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-300 block mb-2">自定义 JVM 参数</label>
                <textarea
                  value={gameSettings.javaArgs}
                  onChange={(e) => setGameSettings({ javaArgs: e.target.value })}
                  placeholder="-XX:+UseG1GC -XX:+ParallelRefProcEnabled..."
                  className="w-full h-24 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-sm font-mono resize-none focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 下载源设置 */}
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">下载源设置</h2>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700/70 transition-colors">
                <input
                  type="radio"
                  name="downloadSourceSettings"
                  value="mojang"
                  checked={true}
                  className="w-4 h-4 text-blue-500"
                  onChange={() => {}}
                />
                <div>
                  <span className="text-white">Mojang 官方源</span>
                  <p className="text-xs text-gray-400">稳定可靠，但在国内可能较慢</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-not-allowed opacity-60">
                <input
                  type="radio"
                  name="downloadSourceSettings"
                  value="coming"
                  disabled
                  className="w-4 h-4 text-gray-500"
                />
                <div>
                  <span className="text-gray-400">敬请期待</span>
                  <p className="text-xs text-gray-500">更多下载源即将到来...</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

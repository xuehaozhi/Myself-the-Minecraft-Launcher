import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GameVersionCard } from '../components/GameVersionCard';
import { Play, Gamepad2, Settings, MemoryStick, Cpu } from 'lucide-react';

export const LaunchPage = () => {
  const {
    gameVersions,
    selectedVersion,
    setSelectedVersion,
    setIsGameRunning,
    setRunningVersion,
    gameSettings,
  } = useAppStore();

  // 模拟已安装的版本
  const installedVersions = gameVersions.filter(v => v.installed).length > 0 
    ? gameVersions.filter(v => v.installed)
    : [
        {
          id: '1.21.4',
          type: 'release' as const,
          url: '',
          time: new Date().toISOString(),
          releaseTime: '2026-05-20T14:00:00Z',
          installed: true,
          launchCount: 42,
        },
        {
          id: '1.12.2',
          type: 'release' as const,
          url: '',
          time: new Date().toISOString(),
          releaseTime: '2018-09-18T12:00:00Z',
          installed: true,
          forgeVersion: '14.23.5.2859',
          launchCount: 128,
        },
        {
          id: '1.8.9',
          type: 'release' as const,
          url: '',
          time: new Date().toISOString(),
          releaseTime: '2015-12-09T10:00:00Z',
          installed: true,
          launchCount: 256,
        },
      ];

  const handleLaunch = (versionId: string) => {
    setIsGameRunning(true);
    setRunningVersion(versionId);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100/10 to-blue-50/5 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* 顶部启动区域 */}
        <div className="bg-white/10 backdrop-blur rounded-xl border border-white/20 p-8 mb-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">选择版本启动</h2>
            </div>
            
            {selectedVersion ? (
              <div className="space-y-4">
                <p className="text-gray-300">已选择: <span className="text-blue-400 font-semibold">{selectedVersion}</span></p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleLaunch(selectedVersion)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    开始游戏
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">请从下方选择一个版本</p>
            )}
          </div>
        </div>

        {/* 快速设置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <MemoryStick className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">内存设置</h3>
            </div>
            <p className="text-gray-300">最大: <span className="text-blue-400 font-mono">{gameSettings.memory.max} MB</span></p>
            <p className="text-gray-300">最小: <span className="text-blue-400 font-mono">{gameSettings.memory.min} MB</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">版本隔离</h3>
            </div>
            <p className="text-gray-300">
              状态: <span className={`font-semibold ${gameSettings.versionIsolation ? 'text-green-400' : 'text-yellow-400'}`}>
                {gameSettings.versionIsolation ? '已开启' : '已关闭'}
              </span>
            </p>
          </div>
        </div>

        {/* 已安装版本列表 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            已安装的版本
          </h3>
          <div className="grid gap-3">
            {installedVersions.map((version) => (
              <GameVersionCard
                key={version.id}
                version={version}
                isSelected={selectedVersion === version.id}
                onSelect={() => setSelectedVersion(version.id)}
                onDownload={() => {}}
                onLaunch={() => handleLaunch(version.id)}
                onDelete={() => console.log('Delete', version.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

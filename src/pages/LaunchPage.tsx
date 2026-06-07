import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GameVersionCard } from '../components/GameVersionCard';
import { Play, Gamepad2, Settings, Folder, Plus, Package, User, LogOut, RotateCcw, UserPlus } from 'lucide-react';

export const LaunchPage = () => {
  const {
    gameVersions,
    selectedVersion,
    setSelectedVersion,
    setIsGameRunning,
    setRunningVersion,
    gameSettings,
    user,
    logout,
    refreshSkin,
  } = useAppStore();

  // 模拟已安装的版本
  const installedVersions = [
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
      id: '1.20.6',
      type: 'release' as const,
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2024-04-25T10:00:00Z',
      installed: true,
      forgeVersion: '48.1.0',
      launchCount: 156,
    },
    {
      id: '1.12.2',
      type: 'release' as const,
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2018-09-18T12:00:00Z',
      installed: true,
      forgeVersion: '14.23.5.2859',
      launchCount: 298,
    },
  ];

  const handleLaunch = (versionId: string) => {
    setIsGameRunning(true);
    setRunningVersion(versionId);
  };

  return (
    <div className="flex h-full">
      {/* 左侧边栏 - 实例选择 */}
      <aside className="w-64 bg-gradient-to-b from-[#e3f2fd]/95 to-[#bbdefb]/95 backdrop-blur border-r border-blue-200/30 p-4">
        <div className="space-y-4">
          {/* 用户信息区域 */}
          {user.isLoggedIn && user.currentProfile ? (
            <div className="bg-white/70 rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                {/* 头像 */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden border-2 border-blue-300 shadow-md">
                  <img
                    src={`https://mc-heads.net/avatar/${user.currentProfile.uuid}/56`}
                    alt={user.currentProfile.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      const placeholder = document.createElement('div');
                      placeholder.innerHTML = `<span class="text-white text-2xl font-bold">${user.currentProfile?.username.charAt(0).toUpperCase()}</span>`;
                      (e.target as HTMLImageElement).parentElement?.appendChild(placeholder);
                    }}
                  />
                </div>
                
                {/* 用户名和类型 */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-bold truncate">{user.currentProfile.username}</p>
                  <p className="text-blue-600 text-xs font-medium">
                    {user.loginType === 'microsoft' ? '微软账号' : 
                     user.loginType === 'littleskin' ? 'LittleSkin' :
                     user.loginType === 'mslskin' ? 'MSLSkin' : '第三方'}
                  </p>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert('切换角色功能开发中...');
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  切换
                </button>
                <button
                  onClick={refreshSkin}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  刷新
                </button>
                <button
                  onClick={logout}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  退出
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/70 rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-2">未登录</p>
                <p className="text-gray-400 text-xs">登录以获取完整功能</p>
              </div>
            </div>
          )}

          {/* 分隔线 */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

          <div className="text-sm font-semibold text-gray-700">文件夹列表</div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg text-blue-700 font-medium">
              <Folder className="w-4 h-4" />
              <span>.minecraft</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/50 rounded-lg text-gray-600 cursor-pointer transition-colors">
              <Folder className="w-4 h-4" />
              <span>E:\.minecraft\</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200/30">
            <div className="text-sm font-semibold text-gray-700 mb-2">添加或导入</div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/50 rounded-lg text-gray-600 cursor-pointer transition-colors">
                <Plus className="w-4 h-4" />
                <span>添加已有文件夹</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/50 rounded-lg text-gray-600 cursor-pointer transition-colors">
                <Package className="w-4 h-4" />
                <span>导入整合包</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 右侧主内容 */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* 顶部启动区域 */}
          <div className="mb-6">
            <div className="text-center mb-6">
              <button
                onClick={() => selectedVersion && handleLaunch(selectedVersion)}
                disabled={!selectedVersion}
                className={`w-64 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  selectedVersion
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-xl hover:scale-105'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Play className="w-6 h-6" fill="currentColor" />
                  启动游戏
                </span>
              </button>
            </div>

            {/* 快捷按钮 */}
            <div className="flex justify-center gap-4">
              <button className="px-8 py-2 bg-white/80 hover:bg-white border border-gray-300 rounded-lg text-gray-700 font-medium transition-all hover:shadow-md">
                实例选择
              </button>
              <button className="px-8 py-2 bg-white/80 hover:bg-white border border-gray-300 rounded-lg text-gray-700 font-medium transition-all hover:shadow-md">
                实例设置
              </button>
            </div>
          </div>

          {/* 版本列表 */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-1 shadow-lg">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-100">
                <Gamepad2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">已安装的版本</h3>
              </div>
              <div className="p-4 space-y-3">
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
      </main>
    </div>
  );
};

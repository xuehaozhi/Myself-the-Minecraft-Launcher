import { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import {
  Play,
  Download,
  Settings,
  Wrench,
  Coffee,
  Box,
  Users,
  Palette,
  Grid,
  Info,
  RefreshCw,
  MessageSquare,
  FileText,
  Gamepad2,
  User,
  LogOut,
  RotateCcw,
  UserPlus
} from 'lucide-react';
import './index.css';

// 页面组件
import { LaunchPage } from './pages/LaunchPage';
import { DownloadPage } from './pages/DownloadPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

type MainTab = 'launch' | 'download' | 'settings' | 'tools' | 'login';
type SettingsSubTab = 'launch' | 'java' | 'management' | 'tools' | 'online' | 'customize' | 'misc' | 'about' | 'update' | 'feedback' | 'logs';

function App() {
  const { isGameRunning, runningVersion, performanceData, user, logout, refreshSkin } = useAppStore();
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('launch');
  const [activeSettingsSubTab, setActiveSettingsSubTab] = useState<SettingsSubTab>('launch');

  // 模拟性能数据
  const mockPerformanceData = performanceData || {
    cpu: 35 + Math.random() * 20,
    ram: 60 + Math.random() * 15,
    gpu: 45 + Math.random() * 25,
    diskRead: Math.random() * 5000,
    diskWrite: Math.random() * 3000,
  };

  // 侧边栏设置项
  const settingsMenuItems = [
    { id: 'launch', icon: Play, label: '启动' },
    { id: 'java', icon: Coffee, label: 'Java' },
    { id: 'management', icon: Box, label: '管理' },
    { id: 'tools', icon: Wrench, label: '工具' },
    { id: 'online', icon: Users, label: '联机' },
    { id: 'customize', icon: Palette, label: '个性化' },
    { id: 'misc', icon: Grid, label: '杂项' },
    { id: 'about', icon: Info, label: '软件信息' },
    { id: 'update', icon: RefreshCw, label: '软件更新' },
    { id: 'feedback', icon: MessageSquare, label: '反馈' },
    { id: 'logs', icon: FileText, label: '查看日志' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] via-[#0d47a1] to-[#0a1929]">
      {/* 顶部标签栏 */}
      <header className="bg-gradient-to-r from-[#1565c0] to-[#0d47a1] px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">M2TL</h1>
              <p className="text-xs text-blue-200">Myself the Minecraft Launcher</p>
            </div>
          </div>
          
          {/* 主标签页 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveMainTab('launch')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                activeMainTab === 'launch'
                  ? 'bg-white text-blue-700 shadow-lg scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Play className="w-5 h-5" />
              启动
            </button>
            <button
              onClick={() => setActiveMainTab('download')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                activeMainTab === 'download'
                  ? 'bg-white text-blue-700 shadow-lg scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Download className="w-5 h-5" />
              下载
            </button>
            <button
              onClick={() => setActiveMainTab('settings')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                activeMainTab === 'settings'
                  ? 'bg-white text-blue-700 shadow-lg scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-5 h-5" />
              设置
            </button>
            <button
              onClick={() => setActiveMainTab('tools')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                activeMainTab === 'tools'
                  ? 'bg-white text-blue-700 shadow-lg scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Wrench className="w-5 h-5" />
              工具
            </button>
          </div>

          {/* 用户信息区域 */}
          <div className="flex items-center gap-3">
            {isGameRunning && (
              <div className="flex items-center gap-2 px-4 py-1 bg-green-500/30 border border-green-500/50 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-200">游戏运行中</span>
              </div>
            )}
            
            {user.isLoggedIn && user.currentProfile ? (
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                {/* 头像 */}
                <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden border-2 border-white/30">
                  <img
                    src={`https://mc-heads.net/avatar/${user.currentProfile.uuid}/40`}
                    alt={user.currentProfile.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      const placeholder = document.createElement('div');
                      placeholder.innerHTML = `<span class="text-white text-lg font-bold">${user.currentProfile?.username.charAt(0).toUpperCase()}</span>`;
                      (e.target as HTMLImageElement).parentElement?.appendChild(placeholder);
                    }}
                  />
                </div>
                
                {/* 用户名 */}
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{user.currentProfile.username}</p>
                  <p className="text-blue-200 text-xs">
                    {user.loginType === 'microsoft' ? '微软账号' : 
                     user.loginType === 'littleskin' ? 'LittleSkin' :
                     user.loginType === 'mslskin' ? 'MSLSkin' : '第三方'}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => {
                      // 切换角色功能
                      alert('切换角色功能开发中...');
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="切换角色"
                  >
                    <UserPlus className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={refreshSkin}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="刷新皮肤"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="退出登录"
                  >
                    <LogOut className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveMainTab('login')}
                className="flex items-center gap-2 px-5 py-2 bg-white/15 hover:bg-white/25 rounded-full border border-white/30 text-white font-medium transition-all"
              >
                <User className="w-4 h-4" />
                登录
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex h-[calc(100vh-76px)]">
        {/* 左侧边栏 - 设置页面专用 */}
        {activeMainTab === 'settings' && (
          <aside className="w-48 bg-gradient-to-b from-[#e3f2fd]/95 to-[#bbdefb]/95 backdrop-blur border-r border-blue-200/30 p-3">
            <div className="space-y-1">
              {settingsMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSettingsSubTab(item.id as SettingsSubTab)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                      activeSettingsSubTab === item.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* 主要内容区域 */}
        <main className="flex-1 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 左侧云装饰 */}
            <div className="absolute top-20 left-10 opacity-30">
              <svg width="200" height="100" viewBox="0 0 200 100">
                <ellipse cx="60" cy="60" rx="45" ry="30" fill="white" />
                <ellipse cx="100" cy="50" rx="55" ry="35" fill="white" />
                <ellipse cx="140" cy="60" rx="40" ry="28" fill="white" />
                <ellipse cx="85" cy="40" rx="35" ry="25" fill="white" />
              </svg>
            </div>
            {/* 右侧云装饰 */}
            <div className="absolute top-32 right-20 opacity-20">
              <svg width="150" height="80" viewBox="0 0 150 80">
                <ellipse cx="50" cy="45" rx="35" ry="25" fill="white" />
                <ellipse cx="80" cy="40" rx="40" ry="28" fill="white" />
                <ellipse cx="110" cy="45" rx="30" ry="22" fill="white" />
              </svg>
            </div>
            {/* 右下角色彩渐变 */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-400/20 to-transparent" />
          </div>

          {/* 页面内容 */}
          <div className="relative z-10 h-full">
            {activeMainTab === 'login' && (
              <LoginPage onBack={() => setActiveMainTab('launch')} />
            )}
            {activeMainTab === 'launch' && <LaunchPage />}
            {activeMainTab === 'download' && <DownloadPage />}
            {activeMainTab === 'settings' && <SettingsPage activeSubTab={activeSettingsSubTab} />}
            {activeMainTab === 'tools' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Wrench className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">工具</h2>
                  <p className="text-white/70">即将到来...</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 性能监控 */}
      {isGameRunning && runningVersion && (
        <PerformanceMonitor
          data={mockPerformanceData}
          version={runningVersion}
        />
      )}
    </div>
  );
}

export default App;

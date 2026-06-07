import { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { Home, Coffee, Settings, Download, Play, Gamepad2 } from 'lucide-react';
import './index.css';

// 页面组件
import { LaunchPage } from './pages/LaunchPage';
import { DownloadPage } from './pages/DownloadPage';
import { SettingsPage } from './pages/SettingsPage';

type Tab = 'launch' | 'download' | 'settings';

function App() {
  const { isGameRunning, runningVersion, performanceData } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('download');

  // 模拟性能数据
  const mockPerformanceData = performanceData || {
    cpu: 35 + Math.random() * 20,
    ram: 60 + Math.random() * 15,
    gpu: 45 + Math.random() * 25,
    diskRead: Math.random() * 5000,
    diskWrite: Math.random() * 3000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900">
      {/* 顶部标签栏 */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">M2TL</h1>
              <p className="text-xs text-blue-200">Myself the Minecraft Launcher</p>
            </div>
          </div>
          
          {/* 标签页 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('launch')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'launch'
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Play className="w-5 h-5" />
              启动
            </button>
            <button
              onClick={() => setActiveTab('download')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'download'
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Download className="w-5 h-5" />
              下载
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-5 h-5" />
              设置
            </button>
          </div>

          {isGameRunning && (
            <div className="flex items-center gap-2 px-4 py-1 bg-green-500/30 border border-green-500/50 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-200">游戏运行中</span>
            </div>
          )}
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex">
        {activeTab === 'download' && (
          <>
            {/* 左侧 API 设置面板 */}
            <aside className="w-64 bg-gray-800/90 backdrop-blur border-r border-gray-700 p-4 min-h-[calc(100vh-76px)]">
              <div className="space-y-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Minecraft API 设置
                </h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">下载源</label>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700/70 transition-colors">
                      <input
                        type="radio"
                        name="downloadSource"
                        value="mojang"
                        checked={true}
                        className="w-4 h-4 text-blue-500"
                        onChange={() => {}}
                      />
                      <span className="text-white text-sm">Mojang API</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-not-allowed opacity-60">
                      <input
                        type="radio"
                        name="downloadSource"
                        value="coming"
                        disabled
                        className="w-4 h-4 text-gray-500"
                      />
                      <span className="text-gray-400 text-sm">敬请期待</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* 下载页面主内容 */}
            <div className="flex-1 min-h-[calc(100vh-76px)]">
              <DownloadPage />
            </div>
          </>
        )}
        
        {activeTab === 'launch' && (
          <div className="flex-1 min-h-[calc(100vh-76px)]">
            <LaunchPage />
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="flex-1 min-h-[calc(100vh-76px)]">
            <SettingsPage />
          </div>
        )}
      </main>

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

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { JavaManager } from './pages/JavaManager';
import { Settings } from './pages/Settings';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { useAppStore } from './store/useAppStore';
import { Home as HomeIcon, Coffee, Settings as SettingsIcon, Gamepad2 } from 'lucide-react';
import './index.css';

function App() {
  const { isGameRunning, runningVersion, performanceData } = useAppStore();

  // 模拟性能数据
  const mockPerformanceData = performanceData || {
    cpu: 35 + Math.random() * 20,
    ram: 60 + Math.random() * 15,
    gpu: 45 + Math.random() * 25,
    diskRead: Math.random() * 5000,
    diskWrite: Math.random() * 3000,
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">MC 启动器</h1>
            </div>
            
            {isGameRunning && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">游戏运行中</span>
              </div>
            )}
          </div>
        </header>

        <div className="flex">
          {/* Sidebar Navigation */}
          <nav className="w-48 bg-gray-800 border-r border-gray-700 min-h-[calc(100vh-73px)] p-4">
            <div className="space-y-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <HomeIcon className="w-5 h-5" />
                <span>游戏版本</span>
              </NavLink>
              
              <NavLink
                to="/java"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Coffee className="w-5 h-5" />
                <span>Java 管理</span>
              </NavLink>
              
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <SettingsIcon className="w-5 h-5" />
                <span>设置</span>
              </NavLink>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto max-h-[calc(100vh-73px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/java" element={<JavaManager />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        {/* Performance Monitor */}
        {isGameRunning && runningVersion && (
          <PerformanceMonitor
            data={mockPerformanceData}
            version={runningVersion}
          />
        )}
      </div>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  MemoryStick,
  Shield,
  Terminal,
  Coffee,
  Settings,
  Globe,
  Palette,
  Box,
  Cpu,
  Monitor,
  Check
} from 'lucide-react';

type SettingsSubTab = 'launch' | 'java' | 'management' | 'tools' | 'online' | 'customize' | 'misc' | 'about' | 'update' | 'feedback' | 'logs';

interface SettingsPageProps {
  activeSubTab: SettingsSubTab;
}

export const SettingsPage = ({ activeSubTab }: SettingsPageProps) => {
  const { gameSettings, setGameSettings } = useAppStore();
  const [tempMaxMemory, setTempMaxMemory] = useState(gameSettings.memory.max);

  // 渲染不同的设置内容
  const renderContent = () => {
    switch (activeSubTab) {
      case 'launch':
        return (
          <div className="space-y-6">
            {/* 启动选项 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">启动选项</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">默认版本隔离</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>隔离所有实例</option>
                    <option>不隔离</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">游戏窗口标题</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>默认</option>
                    <option>自定义</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">自定义信息</label>
                  <input type="text" className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500" placeholder="自定义信息" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">启动器可见性</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>游戏启动后仍保持不变</option>
                    <option>游戏启动后最小化</option>
                    <option>游戏启动后隐藏</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">进程优先级</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>中（平衡）</option>
                    <option>高</option>
                    <option>实时</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">窗口大小</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>默认</option>
                    <option>854×480</option>
                    <option>1280×720</option>
                    <option>1920×1080</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">正版验证方式</label>
                  <select className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 w-64 text-gray-500 cursor-not-allowed" disabled>
                    <option>设备代码流</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">IP协议偏好</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
                    <option>Java 默认</option>
                    <option>IPv4 优先</option>
                    <option>IPv6 优先</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 游戏内存 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-blue-600 mb-4">游戏内存</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-500">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">自动配置</span>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center" />
                  <span className="text-gray-700 font-medium">自定义</span>
                </div>
                <div className="ml-8">
                  <div className="w-full h-2 bg-gray-200 rounded-lg mb-2">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg" style={{ width: '66%' }} />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>已使用内存 / 已安装内存</span>
                    <span className="text-blue-600 font-bold">游戏分配</span>
                  </div>
                  <div className="flex justify-between font-mono text-lg mt-1">
                    <span className="text-gray-700">10.2 GB / 15.9 GB</span>
                    <span className="text-blue-600 font-bold">3.7 GB</span>
                  </div>
                </div>
                <label className="flex items-center gap-3 ml-8">
                  <input type="checkbox" className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">启动游戏前进行内存优化</span>
                </label>
              </div>
            </div>

            {/* 高级启动选项 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">高级启动选项</h3>
                <div className="text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      case 'java':
        return (
          <div className="space-y-6">
            {/* Java 版本选择 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="font-bold text-gray-800">自动选择</div>
                  <div className="text-sm text-gray-500">Java 选择自动档，依据游戏需要自动选择合适的 Java</div>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="font-medium text-gray-800">JDK 25</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">64 Bit</span>
                    <span>Microsoft</span>
                    <span className="text-gray-400">C:\Users\User\AppData\Roaming\.minecraft\runtime\java-runtime-epsilon\bin</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="font-medium text-gray-800">JDK 21</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">64 Bit</span>
                    <span>OpenJDK</span>
                    <span className="text-gray-400">E:\opendjk-21_windows-x64_bin.zipjdk-21\bin</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="font-medium text-gray-800">JDK 17</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">64 Bit</span>
                    <span>Oracle</span>
                    <span className="text-gray-400">C:\Program Files\Java\jdk-17\bin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'management':
        return (
          <div className="space-y-6">
            {/* 游戏资源获取行为 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-blue-600 mb-4">游戏资源获取行为</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">文件下载源</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500">
                    <option>尽量使用镜像源</option>
                    <option>只使用官方源</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">版本列表源</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500">
                    <option>尽量使用镜像源（可能缺少刚刚更新的版本）</option>
                    <option>只使用官方源</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">最大线程数</label>
                  <input type="range" className="w-80" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">速度限制</label>
                  <input type="range" className="w-80" />
                </div>
                <div className="text-sm text-gray-500">
                  <p>目标文件夹</p>
                  <p className="mt-1">请在 启动 → 实例选择 → 文件夹列表 中更改下载目标文件夹。</p>
                  <p>在某个文件夹或游戏实例上右键，即可选择打开对应文件夹。</p>
                </div>
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <input type="checkbox" className="w-4 h-4 text-blue-500" checked />
                    <span>安装新实例后自动选定该实例</span>
                  </label>
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <input type="checkbox" className="w-4 h-4 text-blue-500" checked />
                    <span>升级部分版本的 Authlib</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 社区资源获取行为 */}
            <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">社区资源获取行为</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">下载源</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500">
                    <option>尽量使用镜像源</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">文件名格式</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500">
                    <option>[机械动力] create-1.21.1-6.0.4</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium">Mod 管理样式</label>
                  <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500">
                    <option>标题显示译名，详情显示文件名</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <input type="checkbox" className="w-4 h-4 text-blue-500" />
                  <span>不显示 Quilt 加载器</span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-700 mb-2">即将到来</h2>
              <p className="text-gray-500">此功能正在开发中...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

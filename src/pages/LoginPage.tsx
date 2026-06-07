import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { User, LogOut, RefreshCw, ChevronLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CustomSkinStation, LoginType } from '../types';

interface LoginPageProps {
  onBack: () => void;
}

export const LoginPage = ({ onBack }: LoginPageProps) => {
  const { user, loginMicrosoft, loginThirdParty, addCustomSkinStation, removeCustomSkinStation } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<LoginType | 'addCustom'>('microsoft');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [customName, setCustomName] = useState('');
  const [customApiUrl, setCustomApiUrl] = useState('');
  const [customIsDefault, setCustomIsDefault] = useState(false);

  const handleMicrosoftLogin = () => {
    loginMicrosoft();
  };

  const handleThirdPartyLogin = (type: 'littleskin' | 'mslskin' | 'custom', station?: CustomSkinStation) => {
    if (!username || !password) {
      alert('请输入用户名和密码');
      return;
    }
    loginThirdParty(type, username, password, station);
  };

  const handleAddCustomStation = () => {
    if (!customName || !customApiUrl) {
      alert('请填写完整信息');
      return;
    }
    addCustomSkinStation({
      name: customName,
      apiUrl: customApiUrl,
      username: '',
      password: '',
      isDefault: customIsDefault,
    });
    setCustomName('');
    setCustomApiUrl('');
    setCustomIsDefault(false);
    setActiveTab('microsoft');
  };

  return (
    <div className="flex h-full">
      {/* 左侧边栏 */}
      <aside className="w-72 bg-gradient-to-b from-blue-50 to-white border-r border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">返回</span>
        </button>

        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('microsoft')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'microsoft'
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
              <path d="M11.5 0C5.15 0 0 5.15 0 11.5S5.15 23 11.5 23 23 17.85 23 11.5 17.85 0 11.5 0zm0 2.5c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"/>
              <path d="M11.5 4.75c-3.73 0-6.75 3.02-6.75 6.75s3.02 6.75 6.75 6.75 6.75-3.02 6.75-6.75-3.02-6.75-6.75-6.75z" opacity=".6"/>
            </svg>
            <span className="font-medium">微软登录</span>
          </button>

          <div className="text-xs text-gray-500 px-4 py-2 mt-4 font-semibold uppercase tracking-wider">
            第三方登录
          </div>

          <button
            onClick={() => setActiveTab('littleskin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'littleskin'
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              L
            </div>
            <span className="font-medium">LittleSkin</span>
          </button>

          <button
            onClick={() => setActiveTab('mslskin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'mslskin'
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            <span className="font-medium">MSLSkin</span>
          </button>

          {user.customSkinStations.map((station) => (
            <div key={station.id} className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('custom')}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'custom'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {station.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium truncate">{station.name}</span>
                {station.isDefault && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </button>
              <button
                onClick={() => removeCustomSkinStation(station.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setActiveTab('addCustom')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-2 border-dashed ${
              activeTab === 'addCustom'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-blue-400 text-gray-600'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">添加皮肤站</span>
          </button>
        </div>
      </aside>

      {/* 右侧主内容 */}
      <main className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {/* 微软登录 */}
          {activeTab === 'microsoft' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 23 23" fill="currentColor">
                    <path d="M11.5 0C5.15 0 0 5.15 0 11.5S5.15 23 11.5 23 23 17.85 23 11.5 17.85 0 11.5 0zm0 2.5c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">微软账号登录</h2>
                <p className="text-gray-500">使用你的微软账号登录 Minecraft</p>
              </div>
              <button
                onClick={handleMicrosoftLogin}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                登录微软账号
              </button>
            </div>
          )}

          {/* LittleSkin 登录 */}
          {activeTab === 'littleskin' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">L</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">LittleSkin 登录</h2>
                <p className="text-gray-500">使用你的 LittleSkin 账号登录</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱/用户名</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱或用户名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入密码"
                  />
                </div>
                <button
                  onClick={() => handleThirdPartyLogin('littleskin')}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  登录 LittleSkin
                </button>
              </div>
            </div>
          )}

          {/* MSLSkin 登录 */}
          {activeTab === 'mslskin' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">M</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">MSLSkin 登录</h2>
                <p className="text-gray-500">使用你的 MSLSkin 账号登录</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱/用户名</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱或用户名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入密码"
                  />
                </div>
                <button
                  onClick={() => handleThirdPartyLogin('mslskin')}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  登录 MSLSkin
                </button>
              </div>
            </div>
          )}

          {/* 添加自定义皮肤站 */}
          {activeTab === 'addCustom' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">添加皮肤站</h2>
                <p className="text-gray-500">添加自定义皮肤站以支持更多登录方式</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">皮肤站名称</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例如：MySkin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API 地址</label>
                  <input
                    type="text"
                    value={customApiUrl}
                    onChange={(e) => setCustomApiUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/api"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customIsDefault}
                    onChange={(e) => setCustomIsDefault(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">设为默认皮肤站</span>
                </label>
                <button
                  onClick={handleAddCustomStation}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  添加皮肤站
                </button>
              </div>
            </div>
          )}

          {/* 自定义皮肤站登录 */}
          {activeTab === 'custom' && user.customSkinStations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {user.customSkinStations[0]?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user.customSkinStations[0]?.name} 登录
                </h2>
                <p className="text-gray-500">使用你的账号登录</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱/用户名</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱或用户名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="请输入密码"
                  />
                </div>
                <button
                  onClick={() => handleThirdPartyLogin('custom', user.customSkinStations[0])}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  登录
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

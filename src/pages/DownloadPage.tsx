import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GameVersionCard } from '../components/GameVersionCard';
import { fetchGameVersions } from '../utils/downloader';
import { GameVersion } from '../types';
import { ChevronDown, ChevronUp, Gamepad2, Settings, Search } from 'lucide-react';

type VersionCategory = 'latest' | 'release' | 'snapshot' | 'old' | 'aprilfools';

interface CategoryConfig {
  id: VersionCategory;
  name: string;
  count: number;
  filter: (v: GameVersion) => boolean;
}

export const DownloadPage = () => {
  const { gameVersions, setGameVersions, selectedVersion, setSelectedVersion } = useAppStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<VersionCategory, boolean>>({
    latest: true,
    release: false,
    snapshot: false,
    old: false,
    aprilfools: false,
  });

  // 模拟版本数据
  const mockVersions: GameVersion[] = [
    {
      id: '1.21.4',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2026-05-20T14:00:00Z',
      installed: true,
      launchCount: 42,
    },
    {
      id: '26w22a',
      type: 'snapshot',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2026-06-04T10:00:00Z',
      installed: false,
      launchCount: 0,
    },
    {
      id: '24w14potato',
      type: 'old_alpha',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2024-04-01T00:00:00Z',
      installed: false,
      launchCount: 0,
    },
    {
      id: '1.20.6',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2024-04-25T10:00:00Z',
      installed: false,
      launchCount: 0,
    },
    {
      id: '1.12.2',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2018-09-18T12:00:00Z',
      installed: true,
      forgeVersion: '14.23.5.2859',
      launchCount: 128,
    },
  ];

  const categories: CategoryConfig[] = [
    {
      id: 'latest',
      name: '最新版本',
      count: 2,
      filter: (v) => ['1.21.4', '26w22a'].includes(v.id),
    },
    {
      id: 'release',
      name: '正式版',
      count: 110,
      filter: (v) => v.type === 'release',
    },
    {
      id: 'snapshot',
      name: '预览版',
      count: 800,
      filter: (v) => v.type === 'snapshot',
    },
    {
      id: 'old',
      name: '远古版',
      count: 165,
      filter: (v) => v.type === 'old_alpha' || v.type === 'old_beta',
    },
    {
      id: 'aprilfools',
      name: '愚人节版',
      count: 12,
      filter: (v) => v.id.includes('potato') || v.id.includes('love') || v.id.includes('shulker'),
    },
  ];

  const toggleCategory = (category: VersionCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const versionsToShow = gameVersions.length > 0 ? gameVersions : mockVersions;

  return (
    <div className="flex h-full">
      {/* 左侧边栏 - Minecraft API 设置 */}
      <aside className="w-64 bg-gradient-to-b from-[#e3f2fd]/95 to-[#bbdefb]/95 backdrop-blur border-r border-blue-200/30 p-4">
        <div className="space-y-4">
          <h2 className="text-gray-800 font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Minecraft API 设置
          </h2>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">下载源</label>
            <div className="space-y-1">
              <label className="flex items-center gap-3 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/70 transition-colors">
                <input
                  type="radio"
                  name="downloadSource"
                  value="mojang"
                  checked={true}
                  className="w-4 h-4 text-blue-500"
                  onChange={() => {}}
                />
                <span className="text-gray-800 text-sm">Mojang API</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-200 rounded-lg cursor-not-allowed opacity-60">
                <input
                  type="radio"
                  name="downloadSource"
                  value="coming"
                  disabled
                  className="w-4 h-4 text-gray-400"
                />
                <span className="text-gray-500 text-sm">敬请期待</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* 右侧主内容 */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* 搜索框 */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索游戏实例..."
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* 版本分类 */}
          {categories.map((category) => {
            const categoryVersions = versionsToShow.filter(category.filter);
            const isExpanded = expandedCategories[category.id];
            
            return (
              <div
                key={category.id}
                className="bg-white/80 backdrop-blur rounded-xl border border-blue-200/50 overflow-hidden shadow-lg"
              >
                {/* 分类标题 */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Gamepad2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                      <span className="text-gray-500 text-sm">({category.count})</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {/* 分类内容 */}
                {isExpanded && (
                  <div className="border-t border-blue-100 p-4 space-y-3">
                    {category.id === 'latest' ? (
                      // 最新版本特殊展示 - 两列布局
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryVersions.slice(0, 2).map((version) => (
                          <GameVersionCard
                            key={version.id}
                            version={version}
                            isSelected={selectedVersion === version.id}
                            onSelect={() => setSelectedVersion(version.id)}
                            onDownload={() => console.log('Download', version.id)}
                            onLaunch={() => console.log('Launch', version.id)}
                            onDelete={() => console.log('Delete', version.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      // 其他版本列表
                      <div className="space-y-3">
                        {categoryVersions.slice(0, 5).map((version) => (
                          <GameVersionCard
                            key={version.id}
                            version={version}
                            isSelected={selectedVersion === version.id}
                            onSelect={() => setSelectedVersion(version.id)}
                            onDownload={() => console.log('Download', version.id)}
                            onLaunch={() => console.log('Launch', version.id)}
                            onDelete={() => console.log('Delete', version.id)}
                          />
                        ))}
                        {category.count > 5 && (
                          <div className="text-center py-3 text-gray-500">
                            显示 5 个，共 {category.count} 个版本
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GameVersionCard } from '../components/GameVersionCard';
import { fetchGameVersions } from '../utils/downloader';
import { GameVersion } from '../types';
import { ChevronDown, ChevronUp, Gamepad2 } from 'lucide-react';

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
    release: true,
    snapshot: false,
    old: false,
    aprilfools: false,
  });

  useEffect(() => {
    loadGameVersions();
  }, []);

  const loadGameVersions = async () => {
    const data = await fetchGameVersions();
    if (data?.versions) {
      const versions: GameVersion[] = data.versions.map((v: any) => ({
        ...v,
        installed: false,
        launchCount: 0,
      }));
      setGameVersions(versions);
    }
  };

  const toggleCategory = (category: VersionCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // 模拟版本数据
  const mockVersions: GameVersion[] = [
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
      id: '1.21.4',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2026-05-20T14:00:00Z',
      installed: true,
      launchCount: 42,
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
      id: '1.12.2',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2018-09-18T12:00:00Z',
      installed: true,
      forgeVersion: '14.23.5.2859',
      launchCount: 128,
    },
    {
      id: '1.8.9',
      type: 'release',
      url: '',
      time: new Date().toISOString(),
      releaseTime: '2015-12-09T10:00:00Z',
      installed: true,
      launchCount: 256,
    },
  ];

  const categories: CategoryConfig[] = [
    {
      id: 'latest',
      name: '最新版本',
      count: 2,
      filter: (v) => ['26w22a', '1.21.4'].includes(v.id),
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

  const versionsToShow = gameVersions.length > 0 ? gameVersions : mockVersions;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100/10 to-blue-50/5 min-h-full">
      <div className="max-w-4xl mx-auto space-y-4">
        {categories.map((category) => {
          const categoryVersions = versionsToShow.filter(category.filter);
          const isExpanded = expandedCategories[category.id];
          
          return (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur rounded-lg border border-white/20 overflow-hidden"
            >
              {/* 分类标题 */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Gamepad2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <span className="text-gray-400 text-sm">({category.count})</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {/* 分类内容 */}
              {isExpanded && (
                <div className="border-t border-white/10 p-4 space-y-3">
                  {category.id === 'latest' ? (
                    // 最新版本特殊展示
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
                    <div className="grid gap-3">
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
                      {categoryVersions.length > 5 && (
                        <div className="text-center py-3 text-gray-400">
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
    </div>
  );
};

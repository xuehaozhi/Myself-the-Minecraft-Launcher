import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GameVersionCard } from '../components/GameVersionCard';
import { fetchGameVersions } from '../utils/downloader';
import { GameVersion } from '../types';

export const Home = () => {
  const {
    gameVersions,
    setGameVersions,
    selectedVersion,
    setSelectedVersion,
    setIsGameRunning,
    setRunningVersion,
    isGameRunning,
    runningVersion,
    performanceData,
  } = useAppStore();

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

  const handleDownload = (version: GameVersion) => {
    console.log('Downloading version:', version.id);
    // TODO: 实现下载逻辑
  };

  const handleLaunch = (version: GameVersion) => {
    console.log('Launching version:', version.id);
    setIsGameRunning(true);
    setRunningVersion(version.id);
    // TODO: 实现启动逻辑
  };

  const handleDelete = (version: GameVersion) => {
    console.log('Deleting version:', version.id);
    // TODO: 实现删除逻辑
  };

  const releaseVersions = gameVersions.filter(v => v.type === 'release');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">游戏版本</h1>
        <p className="text-gray-400">选择一个 Minecraft 版本来下载或启动</p>
      </div>

      {releaseVersions.length > 0 ? (
        <div className="grid gap-4">
          {releaseVersions.slice(0, 20).map((version) => (
            <GameVersionCard
              key={version.id}
              version={version}
              isSelected={selectedVersion === version.id}
              onSelect={() => setSelectedVersion(version.id)}
              onDownload={() => handleDownload(version)}
              onLaunch={() => handleLaunch(version)}
              onDelete={() => handleDelete(version)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">加载版本列表中...</p>
        </div>
      )}

      {releaseVersions.length > 20 && (
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">只显示了前 20 个版本</p>
        </div>
      )}
    </div>
  );
};

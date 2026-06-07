import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { JavaVersionCard } from '../components/JavaVersionCard';
import { getJavaVersions, getRecommendedJavaForVersion } from '../utils/javaFinder';

export const JavaManager = () => {
  const {
    javaVersions,
    setJavaVersions,
    gameSettings,
    setGameSettings,
    selectedVersion,
  } = useAppStore();

  useEffect(() => {
    const versions = getJavaVersions();
    setJavaVersions(versions);
  }, []);

  const handleSelectJava = (javaId: string) => {
    setGameSettings({ selectedJava: javaId });
  };

  const handleDownloadJava = (java: any) => {
    console.log('Downloading Java:', java.version);
    // TODO: 实现下载逻辑
  };

  const recommendedJava = selectedVersion 
    ? getRecommendedJavaForVersion(selectedVersion)
    : null;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Java 环境管理</h1>
        <p className="text-gray-400">下载和管理 Minecraft 所需的 Java 运行环境</p>
      </div>

      {recommendedJava && (
        <div className="mb-6 p-4 bg-primary-900/20 border border-primary-700 rounded-lg">
          <p className="text-primary-300 text-sm">
            💡 推荐使用 <span className="font-semibold">Java {recommendedJava}</span> 运行当前选择的版本
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {javaVersions.map((java) => (
          <JavaVersionCard
            key={java.id}
            java={java}
            isSelected={gameSettings.selectedJava === java.id}
            onSelect={() => handleSelectJava(java.id)}
            onDownload={() => handleDownloadJava(java)}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h3 className="text-white font-semibold mb-2">提示</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Minecraft 1.17+ 需要 Java 17 或更高版本</li>
          <li>• Minecraft 1.20.5+ 推荐使用 Java 21</li>
          <li>• 旧版本 (1.16.5 及以下) 使用 Java 8</li>
        </ul>
      </div>
    </div>
  );
};

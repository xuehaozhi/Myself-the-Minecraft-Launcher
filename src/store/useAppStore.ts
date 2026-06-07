import { create } from 'zustand';
import { GameVersion, JavaVersion, GameSettings, PerformanceData, DownloadProgress } from '../types';

interface AppStore {
  // 游戏版本
  gameVersions: GameVersion[];
  setGameVersions: (versions: GameVersion[]) => void;
  selectedVersion: string | null;
  setSelectedVersion: (version: string | null) => void;
  
  // Java 版本
  javaVersions: JavaVersion[];
  setJavaVersions: (versions: JavaVersion[]) => void;
  
  // 游戏设置
  gameSettings: GameSettings;
  setGameSettings: (settings: Partial<GameSettings>) => void;
  
  // 性能监控
  performanceData: PerformanceData | null;
  setPerformanceData: (data: PerformanceData | null) => void;
  isMonitoring: boolean;
  setIsMonitoring: (monitoring: boolean) => void;
  
  // 下载进度
  downloadProgress: DownloadProgress | null;
  setDownloadProgress: (progress: DownloadProgress | null) => void;
  
  // 游戏运行状态
  isGameRunning: boolean;
  setIsGameRunning: (running: boolean) => void;
  runningVersion: string | null;
  setRunningVersion: (version: string | null) => void;
}

const initialSettings: GameSettings = {
  memory: {
    min: 2048,
    max: 4096,
  },
  versionIsolation: true,
  selectedJava: '',
  javaArgs: '',
};

export const useAppStore = create<AppStore>((set) => ({
  gameVersions: [],
  setGameVersions: (versions) => set({ gameVersions: versions }),
  selectedVersion: null,
  setSelectedVersion: (version) => set({ selectedVersion: version }),
  
  javaVersions: [],
  setJavaVersions: (versions) => set({ javaVersions: versions }),
  
  gameSettings: initialSettings,
  setGameSettings: (settings) => set((state) => ({
    gameSettings: { ...state.gameSettings, ...settings },
  })),
  
  performanceData: null,
  setPerformanceData: (data) => set({ performanceData: data }),
  isMonitoring: false,
  setIsMonitoring: (monitoring) => set({ isMonitoring: monitoring }),
  
  downloadProgress: null,
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  
  isGameRunning: false,
  setIsGameRunning: (running) => set({ isGameRunning: running }),
  runningVersion: null,
  setRunningVersion: (version) => set({ runningVersion: version }),
}));

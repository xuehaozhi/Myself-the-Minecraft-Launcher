// 游戏版本类型
export interface GameVersion {
  id: string;
  type: 'release' | 'snapshot' | 'old_alpha' | 'old_beta';
  url: string;
  time: string;
  releaseTime: string;
  installed?: boolean;
  forgeVersion?: string;
  neoForgeVersion?: string;
  launchCount: number;
}

// Java 版本类型
export interface JavaVersion {
  id: string;
  version: '8' | '11' | '17' | '21' | '25' | '26';
  path?: string;
  installed: boolean;
  downloadUrl: string;
  displayName: string;
}

// 游戏设置类型
export interface GameSettings {
  memory: {
    min: number;
    max: number;
  };
  versionIsolation: boolean;
  selectedJava: string;
  javaArgs: string;
}

// 性能监控数据
export interface PerformanceData {
  cpu: number;
  ram: number;
  gpu: number;
  diskRead: number;
  diskWrite: number;
}

// 下载进度
export interface DownloadProgress {
  version: string;
  percent: number;
  speed: number;
  status: 'downloading' | 'installing' | 'complete' | 'error';
}

import { create } from 'zustand';
import { GameVersion, JavaVersion, GameSettings, PerformanceData, DownloadProgress, UserState, UserProfile, CustomSkinStation, LoginType } from '../types';

// 密码简单加密函数（实际项目中应该使用更安全的方式）
const simpleEncrypt = (text: string): string => {
  return btoa(text.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join(''));
};

const simpleDecrypt = (encrypted: string): string => {
  try {
    return atob(encrypted).split('').map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join('');
  } catch {
    return '';
  }
};

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

  // 用户登录状态
  user: UserState;
  loginMicrosoft: () => void;
  loginThirdParty: (type: 'littleskin' | 'mslskin' | 'custom', username: string, password: string, skinStation?: CustomSkinStation) => void;
  logout: () => void;
  switchProfile: (profile: UserProfile) => void;
  refreshSkin: () => void;
  addCustomSkinStation: (station: Omit<CustomSkinStation, 'id'>) => void;
  removeCustomSkinStation: (id: string) => void;
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

const initialUserState: UserState = {
  isLoggedIn: false,
  loginType: null,
  currentProfile: null,
  profiles: [],
  customSkinStations: [],
};

// 从 localStorage 加载数据
const loadUserState = (): UserState => {
  try {
    const saved = localStorage.getItem('m2tl_user');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return initialUserState;
};

// 保存用户状态到 localStorage
const saveUserState = (state: UserState) => {
  try {
    localStorage.setItem('m2tl_user', JSON.stringify(state));
  } catch {
    // ignore
  }
};

export const useAppStore = create<AppStore>((set, get) => ({
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

  // 用户登录状态
  user: loadUserState(),
  
  loginMicrosoft: () => {
    // 模拟微软登录
    const mockProfile: UserProfile = {
      id: '1',
      username: 'Steve',
      uuid: '00000000-0000-0000-0000-000000000000',
      skinUrl: 'https://textures.minecraft.net/texture/1a4af032c4d593e4f8e096627434401c637d7e39c0f9c526e646f34c4d6e6',
    };
    
    const newState: UserState = {
      isLoggedIn: true,
      loginType: 'microsoft',
      currentProfile: mockProfile,
      profiles: [mockProfile],
      customSkinStations: get().user.customSkinStations,
    };
    
    set({ user: newState });
    saveUserState(newState);
  },
  
  loginThirdParty: (type, username, password, skinStation) => {
    // 模拟第三方登录
    const mockProfile: UserProfile = {
      id: Date.now().toString(),
      username: username,
      uuid: `${Date.now().toString().padStart(8, '0')}-0000-0000-0000-000000000000`,
      skinUrl: 'https://textures.minecraft.net/texture/1a4af032c4d593e4f8e096627434401c637d7e39c0f9c526e646f34c4d6e6',
    };
    
    const newState: UserState = {
      isLoggedIn: true,
      loginType: type,
      currentProfile: mockProfile,
      profiles: [mockProfile],
      customSkinStations: get().user.customSkinStations,
    };
    
    set({ user: newState });
    saveUserState(newState);
  },
  
  logout: () => {
    const newState = {
      ...initialUserState,
      customSkinStations: get().user.customSkinStations,
    };
    set({ user: newState });
    saveUserState(newState);
  },
  
  switchProfile: (profile) => {
    const newState = {
      ...get().user,
      currentProfile: profile,
    };
    set({ user: newState });
    saveUserState(newState);
  },
  
  refreshSkin: () => {
    const { user } = get();
    if (user.currentProfile) {
      console.log('Refreshing skin for', user.currentProfile.username);
      // 这里可以实现真正的刷新逻辑
    }
  },
  
  addCustomSkinStation: (station) => {
    const newStation: CustomSkinStation = {
      ...station,
      id: Date.now().toString(),
      password: simpleEncrypt(station.password),
    };
    
    const newStations = [...get().user.customSkinStations, newStation];
    const newState = {
      ...get().user,
      customSkinStations: newStations,
    };
    
    set({ user: newState });
    saveUserState(newState);
  },
  
  removeCustomSkinStation: (id) => {
    const newStations = get().user.customSkinStations.filter(s => s.id !== id);
    const newState = {
      ...get().user,
      customSkinStations: newStations,
    };
    
    set({ user: newState });
    saveUserState(newState);
  },
}));

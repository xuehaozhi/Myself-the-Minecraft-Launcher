import { GameSettings } from '../types';

export const generateLaunchArguments = (
  version: string,
  settings: GameSettings,
  javaPath: string
): string[] => {
  const args: string[] = [];
  
  // Java 内存参数
  args.push(`-Xms${settings.memory.min}M`);
  args.push(`-Xmx${settings.memory.max}M`);
  
  // 额外的 Java 参数
  if (settings.javaArgs) {
    args.push(...settings.javaArgs.split(' '));
  }
  
  // Minecraft 主类
  args.push('net.minecraft.client.main.Main');
  
  // 游戏参数
  args.push('--version', version);
  args.push('--gameDir', './.minecraft');
  
  return args;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

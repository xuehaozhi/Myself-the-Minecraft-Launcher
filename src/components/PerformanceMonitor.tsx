import { PerformanceData } from '../types';
import { Cpu, HardDrive, Activity } from 'lucide-react';

interface PerformanceMonitorProps {
  data: PerformanceData;
  version: string;
}

export const PerformanceMonitor = ({ data, version }: PerformanceMonitorProps) => {
  return (
    <div className="fixed bottom-4 right-4 w-72 bg-gray-900/95 backdrop-blur border border-gray-700 rounded-lg shadow-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">
          Minecraft {version} 性能监视
        </h3>
        <Activity className="w-4 h-4 text-primary-400 animate-pulse" />
      </div>

      <div className="space-y-3">
        {/* CPU */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              CPU
            </span>
            <span className="text-xs text-white font-mono">{data.cpu.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, data.cpu)}%` }}
            />
          </div>
        </div>

        {/* RAM */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              内存
            </span>
            <span className="text-xs text-white font-mono">{data.ram.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, data.ram)}%` }}
            />
          </div>
        </div>

        {/* GPU */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              GPU
            </span>
            <span className="text-xs text-white font-mono">{data.gpu.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-full bg-purple-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, data.gpu)}%` }}
            />
          </div>
        </div>

        {/* Disk I/O */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
          <div className="text-center">
            <span className="text-xs text-gray-400 block mb-1">读取</span>
            <span className="text-xs text-white font-mono flex items-center justify-center gap-1">
              <HardDrive className="w-3 h-3" />
              {(data.diskRead / 1024).toFixed(1)} MB/s
            </span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 block mb-1">写入</span>
            <span className="text-xs text-white font-mono flex items-center justify-center gap-1">
              <HardDrive className="w-3 h-3" />
              {(data.diskWrite / 1024).toFixed(1)} MB/s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

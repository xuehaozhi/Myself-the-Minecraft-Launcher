interface ProgressBarProps {
  percent: number;
  status?: 'downloading' | 'installing' | 'complete' | 'error';
  showPercent?: boolean;
  height?: string;
}

export const ProgressBar = ({
  percent,
  status = 'downloading',
  showPercent = true,
  height = 'h-2',
}: ProgressBarProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'downloading':
        return 'bg-primary-500';
      case 'installing':
        return 'bg-yellow-500';
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
        <div
          className={`h-full ${getStatusColor()} transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      {showPercent && (
        <div className="text-right text-sm text-gray-400 mt-1">
          {Math.round(percent)}%
        </div>
      )}
    </div>
  );
};

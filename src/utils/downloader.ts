import axios from 'axios';

export const downloadFile = async (
  url: string,
  onProgress?: (percent: number, speed: number) => void
): Promise<Blob> => {
  const response = await axios.get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        const speed = progressEvent.loaded / 1024; // KB/s
        onProgress(percent, speed);
      }
    },
  });
  return response.data;
};

export const fetchGameVersions = async (): Promise<any> => {
  try {
    const response = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch game versions:', error);
    return null;
  }
};

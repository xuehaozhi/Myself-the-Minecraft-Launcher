import { JavaVersion } from '../types';

export const JAVA_DOWNLOAD_URLS: Record<string, string> = {
  '8': 'http://43.248.187.60:42461/d/Java/JRE%208u491.exe?sign=T7bpU88YqteqJkjZjaYxIx084aXV81zkzEvjTzVqOZk=:0',
  '11': 'http://43.248.187.60:42461/d/Java/Zulu%20jre11.msi?sign=YNld2tyyEU3Kujj9A7Twsm-nGoZaaNUofaByfZW4eug=:0',
  '17': 'http://43.248.187.60:42461/d/Java/zulu17.66.19-ca-jdk17.0.19-win_x64.msi?sign=z5fD8ktuh0ZcSqUiKxGU6e7UwIVSxbz9BCEPFpfi2Uk=:0',
  '21': 'http://43.248.187.60:42461/d/Java/zulu21.50.19-ca-jdk21.0.11-win_x64.msi?sign=6so6K-0kEyIzZLlQK5f3rKqRPz0ogyYLh4PHiyr8nbE=:0',
  '25': 'http://43.248.187.60:42461/d/Java/zulu25.34.17-ca-jdk25.0.3-win_x64.msi?sign=y5f9T62VThIuAGm-fgcgtjYdUI8A2NdCV-Ep1BGA2Y=:0',
  '26': 'http://43.248.187.60:42461/d/Java/zulu26.30.11-ca-jdk26.0.1-win_x64.msi?sign=uczX2L_IrGwBzH4-QVfxTUXmokkeH0QLKzS3OJM1edw=:0',
};

export const getJavaVersions = (): JavaVersion[] => {
  return [
    {
      id: 'java-8',
      version: '8',
      displayName: 'Java 8 (JRE 8u491)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['8'],
    },
    {
      id: 'java-11',
      version: '11',
      displayName: 'Java 11 (Zulu JRE 11)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['11'],
    },
    {
      id: 'java-17',
      version: '17',
      displayName: 'Java 17 (Zulu JDK 17)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['17'],
    },
    {
      id: 'java-21',
      version: '21',
      displayName: 'Java 21 (Zulu JDK 21)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['21'],
    },
    {
      id: 'java-25',
      version: '25',
      displayName: 'Java 25 (Zulu JDK 25)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['25'],
    },
    {
      id: 'java-26',
      version: '26',
      displayName: 'Java 26 (Zulu JDK 26)',
      installed: false,
      downloadUrl: JAVA_DOWNLOAD_URLS['26'],
    },
  ];
};

export const getRecommendedJavaForVersion = (gameVersion: string): string => {
  const majorVersion = parseInt(gameVersion.split('.')[1] || '0');
  if (majorVersion >= 17) return '21';
  if (majorVersion >= 12) return '17';
  if (majorVersion >= 7) return '11';
  return '8';
};

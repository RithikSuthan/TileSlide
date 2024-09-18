import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'tile-slide',
  webDir: 'dist/TileSlide',
  server: {
    androidScheme: 'https'
  }
};

export default config;

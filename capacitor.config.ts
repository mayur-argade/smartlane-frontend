import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartlane',
  appName: 'smartlane',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'tn.houma.loupgaroubeltounsi',
  appName: 'Loup Garou bel Tounsi',
  webDir: 'dist',
  // 100 % hors-ligne : on embarque le bundle, aucun serveur distant
  server: { androidScheme: 'https' },
  android: { backgroundColor: '#0A0D16', allowMixedContent: true },
  ios: { backgroundColor: '#0A0D16', contentInset: 'always' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#0A0D16',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: { style: 'DARK', backgroundColor: '#0A0D16' },
  },
}

export default config

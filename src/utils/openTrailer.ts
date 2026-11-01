import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

export async function openTrailer(youtubeKey: string) {
  const url = `https://www.youtube.com/watch?v=${youtubeKey}`;
  
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url, presentationStyle: 'fullscreen' });
  } else {
    window.open(url, '_blank');
  }
}

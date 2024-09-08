import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Emotion analyzer',
    short_name: 'Emotion analyzer',
    description: 'Analysis of emotions of text messages',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg',
      },
    ],
  };
}

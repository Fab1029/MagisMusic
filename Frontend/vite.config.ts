import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallbackAllowlist: [/^\/$/],
      },
      includeAssets: ['favicon.ico', 'magisMusic.png'],
      manifest: {
        name: 'Magis Music',
        short_name: 'MagisMusic',
        description: 'Tu reproductor de música favorito con soporte offline',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'magisMusic.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'magisMusic.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'home.png',
            sizes: '1910x897',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Magis Music Desktop'
          },
          {
            src: 'home_mobile.png',
            sizes: '400x903',
            type: 'image/png',
            label: 'Magis Music Mobile'
          }
        ]
      },
      workbox: {
        mode: 'production',
        cleanupOutdatedCaches: true,
        globPatterns: mode === 'production' ? ['**/*.{js,css,html,png,svg}'] : [],
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.host.includes('dzcdn.net'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'music-tracks-cache',
              matchOptions: {
                ignoreSearch: true, 
                ignoreVary: true
              },
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, 
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              plugins: [
                {
                  cachedResponseWillBeUsed: async ({ cachedResponse }) => {
                    if (cachedResponse) {
                      return cachedResponse;
                    }
                    return null;
                  },
                }
              ]
            },
          },
          {
            // Cachear imágenes de portadas y artistas
            urlPattern: ({ url }) => url.origin.includes('deezer.com') && url.pathname.includes('/images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'deezer-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: ['magismusic.mocki.work'],
    proxy: {
      '/api-deezer': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-deezer/, '/api'),
      },

      '/api-jam': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-jam/, '/api'),
      },

      '/ws-jam': {
        target: 'ws://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws-jam/, '/api'),
      },
    },

    
  },
}))
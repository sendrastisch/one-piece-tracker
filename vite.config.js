import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['luffy.png'],
          manifest: {
              name: 'Sandras One Piece Progression',
              short_name: 'OP Sandra',
              description: 'Check Sandras One Piece Progression',
              theme_color: '#000000',
              background_color: '#000000',
              display: 'standalone',
              orientation: 'portrait',
              icons: [
                  {
                      src: 'luffy192.png',
                      sizes: '192x192',
                      type: 'image/png',
                  },
                  {
                      src: 'luffy512.png',
                      sizes: '512x512',
                      type: 'image/png',
                  },
              ],
          },
      }),
  ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
})

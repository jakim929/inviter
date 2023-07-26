import { vitePluginEvmts } from '@evmts/vite-plugin'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), vitePluginEvmts() as any],
})

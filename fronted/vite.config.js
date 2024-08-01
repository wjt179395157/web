import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 指定输出目录
    assetsDir: 'assets', // 静态资源存放目录
    sourcemap: false, // 是否生成 source map 文件
    minify: 'esbuild', // 压缩选项，使用 esbuild
    rollupOptions: {
      input: 'index.html', // 指定入口文件
      output: {
        format: 'esm', // 输出格式
      },
    },
  },

})

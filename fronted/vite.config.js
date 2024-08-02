import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// 定义目录路径，指向根目录
const htmlDir = resolve(__dirname, '.');

// 读取目录下的所有 HTML 文件并生成入口配置
function getHtmlInputs(dir) {
  const files = fs.readdirSync(dir);
  console.log('Files in directory:', files); // 打印目录下的文件
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  console.log('HTML files found:', htmlFiles); // 打印找到的 HTML 文件
  const inputs = {};

  htmlFiles.forEach(file => {
    const name = file.replace('.html', ''); // 去掉文件后缀作为入口名
    inputs[name] = resolve(dir, file);
  });

  console.log('Generated HTML inputs:', inputs); // 打印生成的入口配置

  // 如果没有找到任何 HTML 文件，使用默认入口
  if (Object.keys(inputs).length === 0) {
    inputs.main = resolve(dir, 'index.html'); // 假设有一个默认的 index.html 文件
  }

  return inputs;
}

// 使用动态生成的入口配置
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 输出目录，默认是'dist'
    rollupOptions: {
      input: getHtmlInputs(htmlDir)
    }
  }
});
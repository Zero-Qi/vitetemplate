import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint"; // 引入vite-plugin-vue
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 设置eslint
    eslintPlugin({
      include: ["src/**/*.vue", "src/**/*.js"], // 检查的文件
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

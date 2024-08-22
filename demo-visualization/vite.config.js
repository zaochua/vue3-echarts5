import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // 这里用于打包厚放到github的时候的路径
  base:"/",
  plugins: [vue()],

  // 别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // 热更新
    hmr: true,
  },
});

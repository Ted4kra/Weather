import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "https://restapi.amap.com/v3/",
        changeOrigin: true,
        rewrite: (p) => {
          return p.replace(/^\/api/, "");
        },
      },
    },
  },
  resolve: {
    alias: {
      // 别名 `@` 指向 `src` 目录 PS:IDEA编辑器还是不能识别
      "@": path.resolve(__dirname, "src"),
      assets: "/src/assets",
      comp: "/src/components",
      extensions: [".js", ".vue"],
    },
  },

  plugins: [vue()],
});

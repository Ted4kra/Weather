// 在 src/store/index.js 文件中
import { createPinia } from "pinia";

export const pinia = createPinia();

// 导出 Pinia store
export const useStore = pinia.useStore;

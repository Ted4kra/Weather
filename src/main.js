import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers"; // 导入 router.js
import { pinia } from "./store";
// createApp(App).mount("#app");
const app = createApp(App);

app.use(router); // 使用 Vue Router
app.use(pinia);
app.mount("#app"); // 挂载到 #app 元素

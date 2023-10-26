import { createRouter, createWebHashHistory } from "vue-router";
import Weather from "@/views/Weather.vue";
import WeatherByCode from "@/views/WeatherByCode.vue";
const routes = [
  {
    path: "/weather/:cityId",
    name: "Weather",
    component: WeatherByCode,
    props: (route) => ({ search: route.query.search, adcode: route.params.adcode }),
  },
  // 添加一个默认路由规则，将根路径重定向到 '/weather' 页面
  {
    path: "/weather",
    component: Weather,
  },
  {
    path: "/",
    redirect: "/weather",
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式，你也可以选择使用 history 模式
  routes,
});

router.beforeEach((to, from, next) => {
  // 在路由切换前执行逻辑，可以在这里处理状态管理
  // 例如，不清空 store 中的数据
  // 你可以根据具体的需求来处理状态
  next();
});

export default router;

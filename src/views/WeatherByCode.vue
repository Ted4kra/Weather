<template>
  <div class="flex flex-col w-full min-h-screen bg-weather-primary">
    <main class="container mx-auto text-white">
      <div class="p-2 text-center bg-weather-secondary">你正在预览{{ city }}的天气信息<span>，可以通过右上角的"+"号按钮保存起来</span></div>
      <div class="container flex flex-col gap-4 mt-6 text-center">
        <h1>当日气温是：{{ weatherData.temperature }}°C</h1>
        <h1>当日天气是：{{ weatherData.weather }}</h1>
        <h1>当日风向是：{{ weatherData.winddirection }}风</h1>
        <h1>当日风力是：{{ weatherData.windpower }}级</h1>
      </div>
      <hr class="mt-6 border-white border-opacity-10" />
      <Recent></Recent>
    </main>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Recent from "./components/recent.vue";
import { useWeatherStore } from "@/store/weatherStore";
import { storeToRefs } from "pinia";

const router = useRouter(); // 获取路由实例
const route = useRoute(); // 获取路由信息
const weatherStore = useWeatherStore(); // 使用 Pinia store
const { weatherData } = storeToRefs(weatherStore);
const city = ref(null);
onMounted(() => {
  const adCode = route.params.cityId;
  city.value = route.query.search;
  weatherStore.queryWeatherAction(adCode, 0);
});
</script>
<script>
export default {
  name: "weather",
};
</script>

<style scoped></style>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <!-- nav -->
    <header class="sticky top-0 z-10 shadow-lg bg-weather-primary">
      <nav class="container flex flex-col items-center w-full gap-4 py-6 mx-auto text-white px-44 sm:flex-row">
        <router-link to="/weather" class="router-link-active router-link-exact-active">
          <div class="flex items-center gap-3">
            <img :src="sun" alt="" class="w-9 h-9" />
            <p class="text-2xl">新中地天气</p>
          </div>
        </router-link>
        <div class="flex items-center gap-4">
          <h4 class="text-lg">{{ locationWeatherData.city }}</h4>
          <span class="text-sm">实时天气：{{ locationWeatherData.weather }} {{ locationWeatherData.temperature }}°C</span>
          <span class="text-sm">{{ locationWeatherData.winddirection }}风{{ locationWeatherData.windpower }}级</span>
        </div>
        <div class="flex items-center justify-end flex-1 gap-3">
          <img :src="info" alt="" class="duration-1000 cursor-pointer w-7 h-7" @click="showInfoAction" />
          <img v-if="showAddIcon" :src="add" alt="" class="w-5 h-5 duration-1000 cursor-pointer" @click="saveCurrentCity" />
        </div>
      </nav>
    </header>
    <!-- router -->
    <router-view></router-view>
    <!-- info view -->
    <div v-if="showInfo" class="fixed top-0 left-0 z-20 flex justify-center w-full h-screen px-8 text-black bg-black bg-opacity-30">
      <div class="self-start max-w-screen-md p-4 mt-32 bg-white">
        <h2>关于:</h2>
        <p class="mb-4 text-xs">这个应用可以用来追踪你选择城市的当前天气</p>
        <h2>如何使用:</h2>
        <p class="mb-4 text-xs">
          1.点击搜索框输入你希望追踪的城市<br />
          2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
          3.点击右侧的＋号可以将追踪城市的天气情况保存在首页
        </p>
        <h2>移除城市:</h2>
        <p class="text-xs">如果你不想在首页关注某个城市,可以通过底部的按钮删<br />除它</p>
        <button class="px-6 py-2 mt-8 text-xs text-white bg-weather-primary" @click="closeInfoAction">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import sun from "@/assets/sun.png";
import info from "@/assets/info.png";
import add from "@/assets/add.png";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useWeatherStore } from "@/store/weatherStore";
import { storeToRefs } from "pinia";
import { key, successKey } from "@/utils/config";
import { queryWeather, queryIP, queryAdCodeByName } from "@/api";

const showInfo = ref(false);

const showInfoAction = () => {
  showInfo.value = true;
};

const closeInfoAction = () => {
  showInfo.value = false;
};

const weatherStore = useWeatherStore();
// 回显，转换成ref
const { locationWeatherData, savedCitiesData, weatherData } = storeToRefs(weatherStore);

const route = useRoute();
const showAddIcon = computed(() => {
  // 有cityID
  const cityID = route.params.cityId;
  // 没有保存到本地
  const exist = savedCitiesData.value.some((item) => item.adcode === weatherData.value.adcode);
  // console.log("show computed", cityID, exist);
  return cityID && !exist;
});

onMounted(() => {
  getAdCodeByIPAction();
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
});

//  根据 IP 查询 AdCode、查询天气
const getAdCodeByIPAction = () => {
  const params = {
    key,
  };
  queryIP(params).then((res) => {
    if (res.status === successKey) {
      // 查询天气
      weatherStore.queryWeatherAction(res.adcode, 1);
    }
  });
};

// 保存当前的城市信息
const saveCurrentCity = () => {
  weatherStore.addCityData(weatherStore.weatherData);
};
</script>

<style scoped></style>

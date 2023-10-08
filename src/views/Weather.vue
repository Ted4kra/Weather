<template>
  <div class="flex flex-col w-full min-h-screen bg-weather-primary">
    <main class="container mx-auto text-white px-44">
      <div class="relative pt-4 mb-8">
        <input
          type="text"
          placeholder="请输入城市名称"
          v-model="searchTerm"
          @input="inputAction"
          class="w-full px-1 py-2 bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
        />
        <!-- 查询 -->
        <ul v-if="searchStatus === 1" class="bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[62px]">
          <p v-if="searchStatus === -1">对不起网络似乎除了点问题 请稍后再查询</p>
          <p v-if="searchStatus === 0">似乎没有找到你查找的城市</p>
          <div v-if="searchStatus === 1">
            <li @click="toNewPageAction(item)" class="py-2 cursor-pointer" v-for="item in searchResult" :key="item.adcode">{{ item.city }}</li>
          </div>
        </ul>
      </div>
      <!-- 保存的数据 -->
      <div v-if="savedCitiesData.length > 0" class="mt-10 max-h-[300px] overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-blue-300 w-full">
        <div class="flex justify-between group" v-for="item in savedCitiesData" :key="item.adcode">
          <div class="flex justify-between w-full px-4 py-2 mb-4 duration-300 cursor-pointer hover:flex bg-weather-secondary group-hover:w-4/5">
            <h3>{{ item.city }}</h3>
            <span>{{ item.temperature }}度</span>
          </div>
          <div class="hidden gap-2 mb-4 group-hover:flex">
            <button class="bg-yellow-500 text-center w-[80px]" @click="toNewPageAction(item)">查看</button>
            <button class="bg-yellow-500 text-center w-[80px]" @click="deleteSavedCityAction(item)">删除</button>
          </div>
        </div>
      </div>
      <h2 v-else class="text-center duration-200">暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>
      <h2 class="mt-6">近期天气</h2>
      <Recent ref="recentRef" :weatherData="weatherData"></Recent>
    </main>
  </div>
</template>
<script setup>
import { onMounted, ref, toRef } from "vue";
import { queryAdCodeByName } from "@/api";
import { useRouter, useRoute } from "vue-router";
import Recent from "./components/recent.vue";
import { key, successKey } from "@/utils/config";
import { useWeatherStore } from "@/store/weatherStore";
import { storeToRefs } from "pinia";

// some constant value
const searchResult = ref([]);
const searchStatus = ref(0);

let currentLocation = null;
const weatherData = ref({});
const searchTerm = ref("");

const weatherStore = useWeatherStore();
const { savedCitiesData } = storeToRefs(weatherStore);

// 去新页面
const router = useRouter(); // 获取路由实例
const route = useRoute(); // 获取路由信息

// 删除存储的city
const deleteSavedCityAction = ({ adcode }) => {
  weatherStore.removeCityData(adcode);
};

// 检查 cityId 参数
const toNewPageAction = ({ adcode, city }) => {
  const path = `/weather/${adcode}`;
  router.push({ path, query: { search: city } });
};

// 输入
let searchTimer = -1;
const inputAction = () => {
  // 清除之前的定时器
  clearTimeout(searchTimer);

  // 启动一个新的定时器，在1秒后执行查询操作
  searchTimer = setTimeout(() => {
    // 执行查询操作，可以在这里调用你的查询函数
    getAdCodeByNameAction(searchTerm.value);
  }, 500); // 1000毫秒（1秒）后执行查询
};

// 根据输入查询 adCode
const getAdCodeByNameAction = (address) => {
  if (address.trim().length === 0) return {};
  const params = {
    address,
    key,
  };
  queryAdCodeByName(params).then((res) => {
    if (res.status === successKey) {
      searchResult.value = res.geocodes;
      searchStatus.value = 1;
    } else {
      searchResult.value = [];
      searchStatus.value = -1;
    }
  });
};
</script>
<script>
export default {
  name: "weather",
};
</script>

<style scoped></style>

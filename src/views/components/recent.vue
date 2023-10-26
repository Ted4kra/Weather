<template>
  <div class="px-12 pt-10 mx-auto mt-2 rounded bg-weather-secondary">
    <div class="flex gap-6">
      <div v-for="item in castData" :key="item.date" class="flex flex-col flex-1 gap-4 text-center">
        <span>{{ dayFunc(item) }}</span>
        <span>{{ dateFormat(item.date) }}</span>
        <span>{{ item.dayweather }}</span>
        <span>风力 {{ item.nightpower }}级</span>
      </div>
    </div>
    <div class="mt-10 h-96" id="main"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { defineProps, watchEffect, watch, nextTick, onMounted, toRef } from "vue";
import * as echarts from "echarts";
import { dayFunc, dateFormat } from "@/utils";
import { useWeatherStore } from "@/store/weatherStore";

const weatherStore = useWeatherStore();
// 回显
const { weatherData, castData } = storeToRefs(weatherStore);

onMounted(() => {
  drawChart(weatherStore.castData);
});

// 折线图
let chart = null;
const drawChart = (listData) => {
  nextTick(() => {
    if (!chart) {
      const chartDom = document.getElementById("main");
      chart = echarts.init(chartDom);
    }
    const option = getChartOption(listData);
    chart.setOption(option);
  });
};

const getChartOption = (data) => {
  const [xData, series1Data, series2Data] = data.reduce(
    (reducer, item) => {
      const [xData, series1Data, series2Data] = reducer;
      xData.push(item.date);
      series1Data.push(item.daytemp);
      series2Data.push(item.nighttemp);
      return reducer;
    },
    [[], [], []]
  );
  const option = {
    grid: {
      left: 0,
      right: 0,
    },
    xAxis: {
      type: "category",
      data: xData,
      axisLabel: {
        show: false, // 不显示纵坐标标签
      },
      axisTick: {
        show: false, // 不显示纵坐标刻度
      },
      axisLine: {
        show: false, // 不显示纵坐标刻度线
      },
      splitLine: {
        show: false, // 不显示横坐标网格线
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: false, // 不显示纵坐标标签
      },
      axisTick: {
        show: false, // 不显示纵坐标刻度
      },
      axisLine: {
        show: false, // 不显示纵坐标刻度线
      },
      splitLine: {
        show: false, // 不显示横坐标网格线
      },
    },
    series: [
      {
        data: series1Data,
        type: "line",
        smooth: true,
        label: {
          show: true, // 显示数据标签
          position: "top", // 数据标签位置，可以根据需要调整为其他位置
          color: "white", // 文字颜色
          backgroundColor: "transparent", // 背景颜色设为透明
          borderColor: "transparent", // 边框颜色设为透明
          formatter: function (params) {
            return "白 " + params.value + "°C"; // 添加自定义标签文本
          },
        },
      },
      {
        data: series2Data,
        type: "line",
        smooth: true,
        label: {
          show: true, // 显示数据标签
          position: "top", // 数据标签位置，可以根据需要调整为其他位置
          color: "white", // 文字颜色
          backgroundColor: "transparent", // 背景颜色设为透明
          borderColor: "transparent", // 边框颜色设为透明
          formatter: function (params) {
            return "夜 " + params.value + "°C"; // 添加自定义标签文本
          },
        },
      },
    ],
  };
  return option;
};

watch(
  () => weatherStore.castData,
  (newVal) => {
    // 在这里处理数据变化
    if (newVal) {
      drawChart(newVal);
    }
  }
);
</script>

<script>
export default {
  name: "Recent",
};
</script>

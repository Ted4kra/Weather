import { defineStore } from "pinia";
import { queryWeather } from "@/api";
import { key, successKey } from "@/utils/config";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    // 归属地的
    locationWeatherData: {},
    // 查询的
    weatherData: {},
    // 查询的预测
    forCastWeatherData: {},
    /**
       {
          "city": "南京市",
          "adcode": "320100",
          "temperature": "32",
        }
     */
    savedCitiesData: [],
  }),
  getters: {
    castData({ forCastWeatherData }) {
      if (forCastWeatherData.casts && forCastWeatherData.casts.length > 0) return forCastWeatherData.casts;
      return [];
    },
  },
  actions: {
    // 查询天气
    queryWeatherAction(adCode, isLocation) {
      this.queryTodayWeatherAction(adCode, isLocation);
      this.queryForecastWeatherAction(adCode);
    },
    // 实时数据
    queryTodayWeatherAction(adCode, isLocation) {
      const params = {
        city: adCode,
        key,
      };
      queryWeather(params).then((res) => {
        if (successKey === res.status) {
          this.weatherData = res.lives[0];
          // 归属地
          if (isLocation) {
            this.locationWeatherData = res.lives[0];
          }
        }
      });
    },
    // 预测数据
    queryForecastWeatherAction(adCode) {
      const params = {
        city: adCode,
        key,
        extensions: "all",
      };
      queryWeather(params).then((res) => {
        if (successKey === res.status) {
          this.forCastWeatherData = res.forecasts[0];
        }
      });
    },
    // 添加城市
    addCityData(data) {
      const exist = this.indexOfCityCode(data.adcode);
      if (!exist) {
        const { adcode, city, temperature } = data;
        const validData = { adcode, city, temperature };
        this.savedCitiesData.push(validData);
      }
    },
    // 移除城市
    removeCityData(adCode) {
      this.savedCitiesData = this.savedCitiesData.filter((item) => item.adcode !== adCode);
    },
    // 查询 index
    indexOfCityCode(adCode) {
      const exist = this.savedCitiesData.some((item) => item.adcode === adCode);
      return exist;
    },
  },
});

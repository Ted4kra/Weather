import request from "@/utils/request";

// 通过 adCode 查询城市天气
export function queryWeather(params) {
  return request({
    url: "/weather/weatherInfo",
    params,
    method: "get",
  });
}

// 通过 ip 查询所在城市
export function queryIP(params) {
  return request({
    url: "/ip",
    params,
    method: "get",
  });
}

// 通过城市明查询 adCode
export function queryAdCodeByName(params) {
  return request({
    url: "/geocode/geo",
    params,
    method: "get",
  });
}

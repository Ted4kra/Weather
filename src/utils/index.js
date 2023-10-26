import dayjs from "dayjs";

const numberMap = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "日",
};

// 今天｜明天｜周x
const dayFunc = (obj) => {
  // 获取当前日期
  const currentDate = dayjs();

  // 要判断的日期
  const dateToCheck = dayjs(obj.date);

  // 判断日期是否是今天
  if (dateToCheck.isSame(currentDate, "day")) {
    return "今天";
  } else if (dateToCheck.isSame(currentDate.add(1, "day"), "day")) {
    return "明天";
  } else {
    return "周" + numberMap[obj.week]; // 修正此处的写法
  }
};

// 2023-09-09 => 09-09
const dateFormat = (dateString) => {
  // 修改参数名称为 dateString
  const match = dateString.match(/\d{2}-(\d{2})/); // 使用正则表达式匹配 "09-19" 部分

  if (match) {
    const truncatedDate = match[1]; // 获取匹配到的子串
    return truncatedDate; // 输出 "09-19"
  } else {
    return dateString; // 修正此处的返回值
  }
};

export { dayFunc, dateFormat }; // 导出 dayFunc 和 dateFormat

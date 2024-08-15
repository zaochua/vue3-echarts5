<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});

const target = ref();
let myChart = ref(null);

// 数据变化，重新绘制图表
watch(
  () => props.data,
  () => {
    renderChart();
  }
);

onMounted(() => {
  myChart.value = echarts.init(target.value);

  renderChart();
});

const getSeriesData = () => {
  const series = [];
  props.data.abnormals.forEach((item, index) => {
    // 盖在上层有数值的环
    series.push({
      name: item.name,
      type: "pie",
      // 逆时针
      clockWise: false,
      // 关闭动画
      hoverAnimation: false,
      // 圆环逐渐递减，每个环间隔10
      // radius两个参数，一个外半径，一个内半径
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      // 显示的占比文字
      label: { show: false },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        // 最大值
        {
          value: 1000,
          itemStyle: {
            // 不显示
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });

    // 下层当背景进度的环
    series.push({
      name: item.name,
      type: "pie",
      // 关闭所有事件
      silent: true,
      z: 1,
      // 逆时针
      clockWise: false,
      // 关闭动画
      hoverAnimation: false,
      // 和上层重合
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      label: { show: false },
      data: [
        // 四分之三的位置
        {
          value: 7.5,
          itemStyle: {
            color: "rgba(3,31,62)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
        // 四分之一的给透明
        {
          value: 2.5,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
  });

  // series中的每一个对象，代表一个饼图
  // 这里利用后一个饼图和前一个重合，来达到效果
  return series;
};

// 构建option配置对象
const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      // 色块
      icon: "circle",
      top: "14%",
      left: "60%",
      data: props.data.abnormals.map((item) => item.name),
      // 让图例每一个换行
      width: 0,
      itemWidth: 10,
      itemHeight: 10,
      // 每个间隔
      itemGap: 6,
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: "rgba(255,255,255,0.8)",
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: "item",
      // 模版字符串
      // 在饼图中 a(系列名称),b(数据项名称),c(数值),d(百分比)
      formatter: "{a}<br>{b}:{c}({d}%)",
    },
    // Y 轴
    yAxis: [
      {
        type: "category",
        // 反项
        inverse: true,
        show: false,
      },
    ],
    // X 轴
    xAxis: [
      {
        show: false,
      },
    ],
    // 核心配置
    series: getSeriesData(),
  };

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

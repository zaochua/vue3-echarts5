<template>
  <div>
    <div>【大区数据信息】</div>
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

// 构建option配置对象
const renderChart = () => {
  const options = {
    xAxis: {
      // 不显示x轴
      show: false,
      // 值是数据类型
      type: "value",
      // 在最大的数据中*1.2  作为x轴最大值
      max: function (val) {
        return parseInt(val.max * 1.2);
      },
    },
    yAxis: {
      // 类别展示
      type: "category",
      data: props.data.regions.map((item) => item.name),
      // 从上到下展示
      inverse: true,
      // 不展示线
      axisLine: {
        show: false,
      },
      // 不展刻度
      axisTick: {
        show: false,
      },
      // 刻度标签文字的颜色
      axisLabel: {
        color: "#91b1c8",
      },
    },
    // 图表位置
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // 包含坐标轴的刻度标签位置
      containLabel: true,
    },
    // 核心配置
    series: [
      {
        // 图表类型  bar柱状图
        type: "bar",
        data: props.data.regions.map((item) => {
          return {
            name: item.name,
            value: item.value,
          };
        }),
        // 显示背景
        showBackground: true,
        // 背景色
        backgroundStyle: {
          color: "rgba(180,180,180,0.2)",
        },
        itemStyle: {
          // 柱子条颜色
          color: "#489ad3",
          // 圆角
          barBorderRadius: 5,
          // 阴影
          shadowColor: "rgba(0,0,0,0.3)",
          // 模糊
          shadowBlur: 5,
        },
        // 柱子宽度
        barWidth: 12,
        // 柱子上文本标签
        label: {
          show: true,
          // 位置
          position: "right",
          // 文字样式
          textStyle: {
            color: "#FFF",
          },
        },
      },
    ],
  };

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

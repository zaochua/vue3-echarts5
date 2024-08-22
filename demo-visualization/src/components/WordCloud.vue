<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
// 词云的包
import "echarts-wordcloud";

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

// 随机生成RGB颜色值
const randomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r},${g},${b})`;
};

// 构建option配置对象
const renderChart = () => {
  const options = {
    series: [
      {
        type: "wordCloud",
        // 文字大小范围
        sizeRange: [8, 46],
        // 旋转范围
        rotationRange: [0, 0],
        // 间距
        girdSize: 0,
        // 动画
        layoutAnimation: true,
        // 文字样式
        textStyle: {
          color: randomRGB,
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: "bold",
            color: "#000",
          },
        },
        data: props.data.datas,
      },
    ],
  };

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

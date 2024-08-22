<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import 'echarts-wordcloud'

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
    
  }

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

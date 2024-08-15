<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.data,
  () => {
    renderChart();
  }
);

const target = ref();
let myChart = ref(null);

onMounted(() => {
  myChart.value = echarts.init(target.value);

  renderChart();
});

const renderChart = () => {
  const options = {
    xAxis: {
      type: "category",
      data: props.data.servers.map((item) => item.name),
      axisLabel: {
        color: "#9EB1C8",
      },
    },
    yAxis: {
      type: "value",
      show: false,
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
    },
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        data: props.data.servers.map((item) => {
          return {
            name: item.name,
            value: item.value,
          };
        }),
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
          position: "top",
          // 文字样式
          textStyle: {
            color: "#FFF",
          },
          // 在文字后加东西
          formatter: "{c}%",
        },
      },
    ],
  };
  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

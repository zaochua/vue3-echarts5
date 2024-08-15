<template>
  <div>
    <div>【云端报警风险】</div>
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
    // 雷达图坐标系配置
    radar: {
      name: {
        textStyle: {
          color: "#05D5FF",
          fontSize: 14,
        },
      },
      // 绘制类型
      shape: "polygon",
      center: ["50%", "50%"],
      // 半径值
      radius: "80%",
      // 起始轴角度
      startAngle: 120,
      // 坐标轴线线的颜色
      axisLine: {
        lineStyle: {
          color: "rgba(5,213,255,0.8)",
        },
      },
      // 分隔线配置
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(5,213,255,0.8)",
        },
      },
      // 指示器,指定雷达图多个变量
      indicator: props.data.risks.map((item) => {
        return {
          name: item.name,
          max: 100,
        };
      }),
      // 坐标轴中的分隔区域
      splitArea: {
        show: false,
      },
    },
    // 坐标极点
    polar: {
      // 居中
      center: ["50%", "50%"],
      // 外半径值
      radius: "0%",
    },
    // 角度轴配置
    angleAxis: {
      min: 0,
      // 分隔间隔
      interval: 5,
      // 逆时针开始
      clockwise: false,
    },
    // 径向轴 (X轴)
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show: true,
      },
    },
    // 核心配置
    series: {
      type: "radar",
      // 点的形状
      symbol: "circle",
      // 点的大小
      symbolSize: 10,
      itemStyle: {
        // 默认状态下
        normal: {
          color: "#05B5FF",
        },
      },
      // 填充区域
      areaStyle: {
        normal: {
          color: "#05D5FF",
          opacity: 0.5,
        },
      },
      // 区域线的样式
      lineStyle: {
        width: 2,
        color: "#05D5FF",
      },
      // 对于区域内的点是否显示数值
      label: {
        normal: {
          show: true,
          color: "#FFF",
        },
      },
      data: [
        {
          value: props.data.risks.map((item) => item.value),
        },
      ],
    },
  };

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

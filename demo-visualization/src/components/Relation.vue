<template>
  <div>
    <div>【数据关系传递图】</div>
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
      show: false,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        // 关系图
        type: "graph",
        // 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
        layout: "none",
        // 二维的直角坐标系
        coordinateSystem: "cartesian2d",
        // 节点标记的大小
        symbolSize: 26,
        // 标签设置
        edgeLabel: {
          show: true,
          color: "#FFF",
          // textStyle:{}
          fontSize: 14,
          // 标签内容格式器
          formatter: function (params) {
            return params.data.speed;
          },
        },
        // 节点下标签文字
        label: {
          // normal:{}
          show: true,
          position: "bottom",
          color: "#5E5E5E",
        },
        // 节点连接线的两段标记  arrow(箭头)
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        data: props.data.relations.map((item) => {
          if (item.id !== 0) {
            return {
              name: item.name,
              value: item.value,
              // active: true,
              // 索引
              // category: 0,
              // 提供字段给上面标签配置展示数据
              speed: `${item.speed}kb/s`,
            };
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              speed: `${item.speed}kb/s`,
              // 渐变
              itemStyle: {
                // normal:{}
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#157EFF",
                    },
                    {
                      offset: 1,
                      color: "#35C3FF",
                    },
                  ],
                },
              },
              label: {
                show: true,
                // normal:{}
                fontSize: 14,
              },
            };
          }
        }),
        // 数据关系  从哪里来到哪里去
        links: props.data.relations.map((item) => {
          return {
            source: item.source,
            target: item.target,
            speed: `${item.speed}kb/s`,
            lineStyle: {
              // normal:{}
              color: "#12b5d0",
              // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
              curveness: 0.2,
            },
            label: {
              show: true,
              position: "middle",
              // 偏移量
              offset: [10, 0],
            },
          };
        }),
      },

      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        // 线特效配置项
        effect: {
          show: true,
          smooth: false,
          // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
          trailLength: 0,
          // 特效图形的标记
          symbol: "arrow",
          color: "rgba(55,15,255,0.6)",
          symbolSize: 12,
        },
        lineStyle: {
          // normal:{}
          curveness: 0.2,
        },
        // 线数据集
        data: [
          {
            coords: [
              [0, 300],
              [50, 200],
              [0, 100],
              [50, 200],
              [50, 200],
              [100, 100],
              [50, 200],
              [100, 300],
            ],
          },
        ],
      },
    ],
  };
  console.log("🚀 ~ renderChart ~ options:", options);

  myChart.value.setOption(options);
};
</script>

<style lang="scss" scoped></style>

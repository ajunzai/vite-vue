<template>
  <div class="echarts-wrapper">
    <div class="title">展示div</div>
    <div ref="charts" id="echarts-content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as echarts from 'echarts'
import { options } from './config'
import mapJson from './map.json'
export default defineComponent({
  name: 'echarts-map',
  mounted() {
    const myCharts = echarts.init((this.$refs as any).charts)
    echarts.registerMap('HK', mapJson as any)
    myCharts.setOption(options);
  }
})
</script>

<style lang="scss" scoped>
.echarts-wrapper {
  height: 100%;
}
.title {
  width: 100%;
  height: 50px;
  font-size: 30px;
  color: #000;
  font-weight: 700;
  text-align: center;
}
#echarts-content {
  width: 700px;
  height: 650px;
  margin: 0 auto;
  border: 1px solid #000;
  background: #f0f0f0;
}
</style>
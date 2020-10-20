<template>
  <contentBox title="动力监控">
    <div class="top">
      <div>
        <div id="chartBox3" class="chart-box"></div>
        <span class="w">相电压</span>
      </div>
      <div>
        <div id="chartBox4" class="chart-box"></div>
        <span class="s">相电流</span>
      </div>
    </div>
    <div class="bottom">
      <div class="block-item">
        <span>42.2kw</span>
        <p>相电压</p>
      </div>
      <div class="block-item">
        <span>42.2Hz</span>
        <p>频率</p>
      </div>
      <div class="block-item">
        <span class="dot unusual">异常</span>
        <p>市电停电报警</p>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
const echarts = require('echarts/lib/echarts')

export default {
  components: {
    contentBox
  },
  data() {
    return {
      boxStyle: {},
      value: 50,
      value1: 80,
      chart1: null,
      chart2: null
    }
  },
  computed: {
    p() {
      return this.value / 70
    },
    p1() {
      return this.value1 / 100
    }
  },
  watch: {
    p(val) {
      this.chart1.setOption({
        series: {
          axisLine: {
            lineStyle: {
              color: [
                [this.p, 'rgba(51, 251, 183, 1)'],
                [1, '#2B418C']
              ]
            }
          },
          data: [
            {
              value: this.value
            }
          ]
        }
      })
    },
    p1(val) {
      this.chart2.setOption({
        series: {
          axisLine: {
            lineStyle: {
              color: [
                [this.p1, 'rgba(124, 130, 255, 1)'],
                [1, '#2B418C']
              ]
            }
          },
          data: [
            {
              value: this.value1
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.chart1 = echarts.init(document.getElementById('chartBox3'))
      this.chart2 = echarts.init(document.getElementById('chartBox4'))
      const options1 = {
        grid: {
          bottom: 0
        },
        series: [
          {
            name: 'Indicator',
            type: 'gauge',
            startAngle: 180,
            radius: '100%',
            endAngle: 0,
            min: 0,
            max: 70,
            title: {
              show: false
            },
            detail: {
              formatter: '{value}V',
              fontSize: 17,
              color: '#FFF'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
              // splitNumber: 1,
              // length: 6,
              // lineStyle: {
              //   width: 2,
              //   color: 'auto'
              // }
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: [
                  [this.p, '#35CCE7'],
                  [1, 'rgba(43, 65, 140,0.65)']
                ],
                width: 20
              }
            },
            pointer: {
              length: '36%',
              width: 5
            },
            itemStyle: {
              color: '#33DEFB'
            },
            data: [
              {
                value: this.value
              }
            ]
          }
        ]
      }
      const options2 = {
        grid: {
          left: '0%',
          right: '0%',
          top: 20,
          bottom: 0
        },
        series: [
          {
            name: 'Indicator',
            type: 'gauge',
            startAngle: 180,
            radius: '100%',
            endAngle: 0,
            min: 0,
            max: 100,
            title: {
              show: false
            },
            detail: {
              formatter: '{value}A',
              fontSize: 17,
              color: '#FFF'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
              // splitNumber: 1,
              // length: 6,
              // lineStyle: {
              //   width: 2,
              //   color: 'auto'
              // }
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: [
                  [this.p1, '#7C82FF'],
                  [1, 'rgba(43, 65, 140,0.65)']
                ],
                width: 20
              }
            },
            pointer: {
              length: '36%',
              width: 5
            },
            itemStyle: {
              color: '#33DEFB'
            },
            data: [
              {
                value: this.value1
              }
            ]
          }
        ]
      }
      this.chart1.setOption(options1)
      this.chart2.setOption(options2)
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  height: 110px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 15px;
  & > div {
    flex: 1;
    width: 50%;
    .chart-box {
      height: 100%;
    }
    span {
      display: block;
      margin: 0 auto;
      width: 60px;
      height: 17px;
      line-height: 18px;
      border-radius: 18px;
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.75);
      margin-top: -20px;
    }
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  .block-item {
    width: 90px;
    height: 63px;
    font-size: 12px;
    padding: 5px 10px;
    border: 2px solid rgba(41, 68, 105, 0.3);
    background: rgba(41, 68, 105, 0.3);
    border-radius: 2px;
    text-align: center;
    line-height: 17px;
    color: #fff;
    overflow: hidden;
    .icon-box {
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      margin-top: -2px;
      &.ib-01 {
        background-image: url('../../image/icon-10.png');
        background-size: 27px;
      }
      &.ib-02 {
        background-image: url('../../image/icon-11.png');
        background-size: 30px;
      }
      &.ib-03 {
        background-image: url('../../image/icon-12.png');
        background-size: 25px;
      }
    }
    span {
      display: block;
      margin-top: 15px;
      color: #35cce7;
      line-height: 18px;
      font-size: 18px;
      &.unusual {
        color: #de7be2;
      }
      &.dot {
        &::before {
          position: relative;
          top: 3px;
          content: '●';
          font-size: 34px;
          margin-right: 2px;
        }
      }
    }
    &:nth-child(3) {
      span {
        margin-top: 6px;
        line-height: 26px;
      }
    }
  }
}
</style>

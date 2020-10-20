<template>
  <contentBox title="环境监控">
    <div class="top">
      <div>
        <div id="chartBox1" class="chart-box"></div>
        <span class="w">温度</span>
      </div>
      <div>
        <div id="chartBox2" class="chart-box"></div>
        <span class="s">湿度</span>
      </div>
    </div>
    <div class="bottom">
      <div class="block-item">
        <div class="icon-box ib-01"></div>
        <p>烟感状态</p>
        <span>正常</span>
      </div>
      <div class="block-item">
        <div class="icon-box ib-02"></div>
        <p>明火感应状态</p>
        <span class="unusual">异常</span>
      </div>
      <div class="block-item">
        <div class="icon-box ib-03"></div>
        <p>漏水传感器状态</p>
        <span>正常</span>
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
                [this.p, '#DE7BE2'],
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
                [this.p1, '#35CCE7'],
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
      this.chart1 = echarts.init(document.getElementById('chartBox1'))
      this.chart2 = echarts.init(document.getElementById('chartBox2'))
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
              formatter: '{value}℃',
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
                  [this.p, '#DE7BE2'],
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
              formatter: '{value}%rh',
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
                  [this.p1, 'rgba(51, 222, 251, 1)'],
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
  padding-top: 4px;
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
      width: 45px;
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
  margin-top: 10px;
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
    .icon-box {
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      margin-top: -2px;
      &.ib-01 {
        background-image: url('../../image/icon-10.png');
        background-size: 21px;
      }
      &.ib-02 {
        background-image: url('../../image/icon-11.png');
        background-size: 25px;
      }
      &.ib-03 {
        background-image: url('../../image/icon-12.png');
        background-size: 20px;
      }
    }
    span {
      color: #35cce7;
      line-height: 16px;
      &::before {
        position: relative;
        top: 3px;
        content: '●';
        font-size: 22px;
        margin-right: 2px;
      }
      &.unusual {
        color: #de7be2;
      }
    }
  }
}
</style>

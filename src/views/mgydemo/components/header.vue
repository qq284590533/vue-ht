<template>
  <div class="header">
    <div class="date-bar">
      <p class="date">{{ date }}&nbsp;{{ weekday }}&nbsp;&nbsp;&nbsp;{{ moment }}</p>
    </div>
    <p class="title">合肥一六八玫瑰园教育集团运营中心</p>
    <div class="weather-bar">多云 18~24 ℃ PM2.5</div>
    <div class="light"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Header',
  data() {
    return {
      time: null,
      getMoment: null
    }
  },
  computed: {
    weekday() {
      const weekText = '星期'
      const weekTextList = ['一', '二', '三', '四', '五', '六', '日']
      return weekText + weekTextList[dayjs(this.date).day() - 1]
    },
    date() {
      return dayjs(this.time).format('YYYY-MM-DD')
    },
    moment() {
      return dayjs(this.time).format('HH:mm:ss')
    }
  },
  mounted() {
    this.initDateFun()
  },
  methods: {
    initDateFun() {
      this.time = dayjs()
      this.getMoment = setInterval(() => {
        this.time = dayjs()
      }, 1000)
      this.$on('hook:beforeDestroy', () => {
        this.getMoment = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 81px;
  background: url('../image/top.png') no-repeat center;
  background-size: cover;
  color: #fff;
  position: relative;
  display: flex;
  justify-content: space-between;
  .date-bar,
  .weather-bar {
    font-size: 22px;
    width: 457px;
    text-align: center;
    line-height: 60px;
    box-sizing: border-box;
    padding-top: 20px;
  }
  .title {
    font-size: 32px;
    background: linear-gradient(0deg, #59b8ff 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 82px;
  }
  .light {
    position: absolute;
    width: 462px;
    height: 203px;
    background: url('../image/light.png') no-repeat center;
    background-size: cover;
    left: 50%;
    transform: translateX(-50%);
    top: 5px;
  }
}
</style>

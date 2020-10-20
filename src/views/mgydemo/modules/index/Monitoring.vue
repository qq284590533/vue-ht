<template>
  <contentBox title="监控录像">
    <div class="monitoring">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <div class="slide-item">
            <img src="../../image/image.png" />
            <p>校园一号教学楼</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-item">
            <img src="../../image/image.png" />
            <p>校园二号教学楼</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-item">
            <img src="../../image/image.png" />
            <p>校园三号教学楼</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-item">
            <img src="../../image/image.png" />
            <p>校园四号教学楼</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-item">
            <img src="../../image/image.png" />
            <p>校园五号教学楼</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
export default {
  components: {
    contentBox
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 5,
        loop: true,
        speed: 500
      }
    }
  }

  // computed: {
  //   swiper() {
  //     return this.$refs['mySwiper']
  //   }
  // },
  // watch: {
  //   swiper(val) {
  //     if (val) {
  //       val.autoplay.start()
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.monitoring {
  pointer-events: auto;
  padding-top: 30px;
  .slide-item {
    width: 110px;
    height: 135px;
    img {
      width: 100%;
      height: 110px;
    }
    p {
      font-size: 12px;
      color: #fff;
      opacity: 0.85;
      text-align: center;
      line-height: 20px;
      margin-top: 5px;
    }
  }
}
</style>

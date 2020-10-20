<template>
  <contentBox title="教师考勤">
    <div class="teacher-attendance">
      <div class="top">
        <div>
          <p>500</p>
          <p>应到人数</p>
        </div>
        <div>
          <p>492</p>
          <p>实到人数</p>
        </div>
        <div>
          <p>8</p>
          <p>未打卡</p>
        </div>
      </div>
      <dv-scroll-board
        class="list"
        :config="{ ...config, data: listData }"
        style="width:100%;height:189px"
      />
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
      config: {
        data: this.listData,
        evenRowBGC: 'none',
        oddRowBGC: 'none',
        waitTime: '3000',
        rowNum: 6
      },
      list: [
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        },
        {
          name: '王丽丽',
          value1: '西校区',
          value2: '体育',
          value3: '发烧'
        }
      ]
    }
  },
  computed: {
    listData() {
      return this.list.map((item, index) => {
        const rowData = []
        const model = `
        <div class="list-item">
          <p class="index">${index + 1}</p>
          <p class="info">
            <span>${item.name}</span>
            <span>${item.value1}</span>
            <span>${item.value2}</span>
            <span>${item.value3}</span>
          </p>
        </div>
        `
        rowData.push(model)
        return rowData
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-attendance {
  padding-top: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    & > div {
      flex: 1;
      p {
        color: rgba($color: #fff, $alpha: 0.85);
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        &:first-child {
          font-size: 28px;
        }
      }
      &:nth-child(2) {
        position: relative;
        p:first-child {
          color: rgba(53, 204, 231, 0.85);
        }
        &::before,
        &::after {
          content: '';
          display: block;
          width: 1.5px;
          height: 37px;
          background: #a0a0a0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.65;
        }
        &::after {
          right: 0;
        }
      }
      &:nth-child(3) {
        p:first-child {
          color: rgba(222, 123, 226, 0.85);
        }
      }
    }
  }
  /deep/.list {
    margin-top: 20px;
    .list-item {
      display: flex;
      color: rgba($color: #fff, $alpha: 0.85);
      font-size: 12px;
      background: rgba(41, 68, 105, 0.3);
      height: 26.5px;
      line-height: 26px;
      .index {
        width: 30px;
        text-align: center;
      }
      .info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        span {
          width: 25%;
          text-align: center;
        }
      }
    }
  }
}
</style>

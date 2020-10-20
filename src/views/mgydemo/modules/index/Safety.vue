<template>
  <contentBox title="安全预警">
    <div class="safety">
      <div class="top">
        <div>
          <p class="num">1</p>
          <p class="title">重大预警</p>
        </div>
        <div>
          <p class="num">2</p>
          <p class="title">较大预警</p>
        </div>
        <div>
          <p class="num">5</p>
          <p class="title">一般预警</p>
        </div>
      </div>
      <dv-scroll-board
        class="list"
        :config="{ ...config, data: listData }"
        style="width:100%;height:287px"
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
        align: ['left', 'right'],
        evenRowBGC: 'none',
        oddRowBGC: 'none',
        waitTime: '3000',
        rowNum: 4
      },
      list: [
        {
          title: '火灾预警',
          time: '2020-05-23 13:00',
          info: '有学生吸烟致使西校区图书馆二楼202室发生火灾',
          type: 1
        },
        {
          title: '设备故障预警',
          time: '2020-05-23 13:00',
          info: '有人误触消防告警设备，警报响声扰民',
          type: 2
        },
        {
          title: '设备故障预警',
          time: '2020-05-23 13:00',
          info: '有人误触消防告警设备，警报响声扰民',
          type: 2
        },
        {
          title: '围栏攀爬预警',
          time: '2020-05-23 13:00',
          info: '有学生吸烟致使西校区图书馆二楼202室发生火灾',
          type: 3
        },
        {
          title: '火灾预警',
          time: '2020-05-23 13:00',
          info: '西校区东侧靠近操场处围栏有人攀爬',
          type: 1
        },
        {
          title: '火灾预警',
          time: '2020-05-23 13:00',
          info: '西校区东侧靠近操场处围栏有人攀爬',
          type: 1
        }
      ]
    }
  },
  computed: {
    listData() {
      return this.list.map((item, index) => {
        const rowData = []
        const model = `
        <div class="list-item type_${item.type}">
          <p class="title">
            <span>${item.title}</span>
            <span>${item.time}</span>
          </p>
          <p class="info">${item.info}</p>
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
.safety {
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 25px;
    & > div {
      flex: 1;
      .num {
        font-size: 28px;
        text-align: center;
        line-height: 50px;
      }
      .title {
        padding-left: 25px;
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 16px;
        color: rgba($color: #fff, $alpha: 0.85);
        font-size: 14px;
        text-align: left;
        width: 66px;
        margin: 0 auto;
      }
      &:nth-child(1) {
        .num {
          color: rgba(222, 123, 226, 1);
        }
        .title {
          background-image: url('../../image/icon-01.png');
        }
      }
      &:nth-child(2) {
        .num {
          color: rgba(234, 147, 70, 1);
        }
        .title {
          background-image: url('../../image/icon-02.png');
        }
      }
      &:nth-child(3) {
        .num {
          color: rgba(53, 204, 231, 1);
        }
        .title {
          background-image: url('../../image/icon-03.png');
        }
      }
    }
  }
  /deep/ .list {
    .list-item {
      height: 64px;
      margin: 0 -10px;
      background: rgba(41, 68, 105, 0.3);
      padding: 14px 15px 14px 30px;
      background-position: 7px 14px;
      background-size: 14px;
      background-repeat: no-repeat;
      box-sizing: border-box;
      &.type_1 {
        background-image: url('../../image/icon-01.png');
      }
      &.type_2 {
        background-image: url('../../image/icon-02.png');
      }
      &.type_3 {
        background-image: url('../../image/icon-03.png');
      }
      .title {
        display: flex;
        justify-content: space-between;
        line-height: 18px;
        opacity: 0.85;
      }
      .info {
        line-height: 24px;
        color: #fff;
        opacity: 0.45;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

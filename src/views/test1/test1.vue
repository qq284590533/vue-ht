<template>
  <ht-container>
    <div class="ht-cont" ref="htCont"></div>
    <div class="view-2d">
      <button @click="changeToFirstPerson">切换为第{{ isFirst ? '三' : '一' }}人称视角</button>
      <ul class="archives-list">
        <li v-for="(item, index) in archivesBox" :key="index" @click="flyToNode(item.node)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </ht-container>
</template>

<script>
import createScript from '@/utils/createScript'
import HtContainer from '@/components/HtContainer'
import MainEntry from './js/main'
export default {
  components: {
    HtContainer
  },
  data() {
    return {
      htObject: null,
      isFirst: false,
      archivesBox: []
    }
  },
  created() {
    createScript(['libs/plugin/ht-obj.js', '/libs/plugin/ht-vector.js'])
      .then(res => {
        this.htObject = new MainEntry(this.$refs['htCont'], this)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    changeToFirstPerson() {
      this.isFirst = !this.isFirst
      this.htObject.g3d.setFirstPersonMode(this.isFirst)
    },
    flyToNode(node) {
      this.htObject.g3d.flyTo(node, {
        animation: true,
        direction: [1, 0, -0.5],
        distance: 200
      })
      this.htObject.pushPullArchivesBoxEvent(node)
    }
  }
}
</script>

<style lang="scss" scoped>
.ht-cont {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
}
.view-2d {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  .archives-list {
    padding: 10px;
    color: #ffffff;
    border: 1px solid rgba($color: #fff, $alpha: 0.7);
    border-radius: 4px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;

    flex-wrap: wrap;
    li {
      margin: 0 5px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      pointer-events: auto;
      user-select: none;
    }
  }
}
</style>

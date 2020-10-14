import Screen from './utils/screen'

window.htconfig = {
  Default: {
    convertURL: function(url) {
      return 'assets/' + url
    }
  }
}

class MainEntry {
  constructor(el, vm) {
    this.vm = vm

    // // 是否显示模型的线框
    // ht.Style['wf.geometry'] = true
    // // 控制是否载入 obj 的四边面，否的话通过算法合并三角面
    // ht.Style['wf.loadQuadWireframe'] = false
    // // 控制是否显示四边面
    // ht.Style['wf.combineTriangle'] = true
    this.loadScreen(el)
  }

  loadScreen(el) {
    const screen = (this.screen = new Screen())
    screen.init3dScreen(el, g3d => {
      console.log('test1')
      // g3d.setEye([1946, 4134, -2026])
      // console.log(g3d.getEye())
      // const position3d = [142, 3671, 3200]
      // ht.Default.startAnim({
      //   duration: 3000, // 动画周期毫秒数，默认采用`ht.Default.animDuration`
      //   action: function (v) {
      //     // action 函数必须提供，实现动画过程中的属性变化。
      //     const eyePos = g3d.getEye()
      //     g3d.setEye([
      //       eyePos[0] + (position3d[0] - eyePos[0]) * (v / 10),
      //       eyePos[1] + (position3d[1] - eyePos[1]) * (v / 5),
      //       eyePos[2] + (position3d[2] - eyePos[2]) * (v / 10)
      //     ])
      //   },
      //   finishFunc: function () {
      //     // 动画结束后调用的函数。
      //     console.log('动画结束')
      //   }
      // })

      const that = this
      const r = 18490
      ht.Default.startAnim({
        duration: 6000,
        easing: function(t) {
          return t
        },
        action: function(v, t) {
          // 圆的参数方程 半径和角度都在变
          const r1 = (0.8 - t) * r
          const angle = (t * t - 0.5) * Math.PI
          const x = r1 * Math.cos(angle)
          const z = r1 * Math.sin(angle)
          const y = 4260 + 1068 * t * t * t
          that.g3d.moveCamera([x, y, z])
        },
        finishFunc: function() {}
      })

      this.load168mgy()
      Object.assign(this, {
        g2d: screen.g2d,
        g3d: screen.g3d,
        dm2d: screen.dm2d,
        dm3d: screen.dm3d
      })
    })
  }

  load168mgy() {
    const { screen } = this
    screen.load3dScreen('scenes/玫瑰园南区/168玫瑰园南区.json', null, (g3d, dm3d) => {
      console.log('场景加载完成')
      console.log(dm3d.getDataByTag('主建筑'))
    })
  }
}

export default MainEntry

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
      g3d.setCenter([0, 0, 0])
      g3d.setEye([-5425, 12325, -7120])
      this.loadMgyDemo()
      Object.assign(this, {
        g2d: screen.g2d,
        g3d: screen.g3d,
        dm2d: screen.dm2d,
        dm3d: screen.dm3d
      })
    })
  }

  loadMgyDemo() {
    const { screen } = this
    screen.load3dScreen('scenes/玫瑰园南区/168mgy.json', null, (g3d, dm3d) => {
      console.log('场景加载完成')
      console.log(dm3d.getDataByTag('教学楼'))
      g3d.setFar(1000000)

      // 漫游动画
      setTimeout(() => {
        this.roamingAnim(g3d, dm3d)
      }, 500)
      // this.roamingAnim(g3d, dm3d)
      // setTimeout(() => {
      //   g3d.moveCamera([-3210, 12325, 1020], [0, 0, 0], {
      //     duration: 3000,
      //     finishFunc: () => {
      //       g3d.moveCamera([-1637, 3000, 6221], [0, 0, 0], {
      //         duration: 3000,
      //         finishFunc: () => {
      //           console.log('动画执行完成')
      //         }
      //       })
      //     }
      //   })
      // }, 1000)
      screen.add3dMiEvent(this.miCampus3dEvent, this)
    })
  }

  miCampus3dEvent(e) {
    const { kind, data } = e
    if (!data) return
    if (kind === 'doubleClickData') {
      console.log(data)
      const tagName = data.getTag()
      console.log(tagName)
      if (tagName === '教学楼') {
        this.loadBuilding()
      }
    }
  }

  loadBuilding() {
    const { screen } = this
    screen.load3dScreen('scenes/玫瑰园南区/玫瑰园机房.json', null, (g3d, dm3d) => {
      g3d.setFar(20000)
      console.log('机房加载完成')
    })
  }
  roamingAnim(g3d, dm3d) {
    // polyline
    const polyline = dm3d.getDataByTag('polyline')
    console.log(polyline)
    ht.Default.startAnim({
      duration: 10000,
      easing: t => {
        return t
      },
      finishFunc: () => {}, // 动画结束后调用的函数。
      action: (v, t) => {
        const length = g3d.getLineLength(polyline)
        const offset = g3d.getLineOffset(polyline, length * v)
        const point = offset.point
        const px = point.x
        const py = point.y
        const pz = point.z
        g3d.setEye(px, py, pz)
        g3d.setCenter(0, 0, 0)
      }
    })
  }
}
export default MainEntry

import Screen from './utils/screen'

class MainEntry {
  constructor(el, vm) {
    this.vm = vm
    this.loadScreen(el)
  }

  loadScreen(el) {
    const screen = (this.screen = new Screen())
    screen.init3dScreen(el, g3d => {
      console.log('test1')
      // g3d.setEye([1946, 4134, -2026])
      console.log(g3d.getEye())
      const position3d = [142, 3671, 3200]
      ht.Default.startAnim({
        duration: 3000, // 动画周期毫秒数，默认采用`ht.Default.animDuration`
        action: function(v) {
          // action 函数必须提供，实现动画过程中的属性变化。
          const eyePos = g3d.getEye()
          g3d.setEye([
            eyePos[0] + (position3d[0] - eyePos[0]) * (v / 10),
            eyePos[1] + (position3d[1] - eyePos[1]) * (v / 5),
            eyePos[2] + (position3d[2] - eyePos[2]) * (v / 10)
          ])
        },
        finishFunc: function() {
          // 动画结束后调用的函数。
          console.log('动画结束')
        }
      })
      this.loadArchives()
      Object.assign(this, {
        g2d: screen.g2d,
        g3d: screen.g3d,
        dm2d: screen.dm2d,
        dm3d: screen.dm3d
      })
    })
  }

  getArchiverList() {
    const archiverDataList = this.screen.getAllArchivesBoxDatas().map((item, index) => {
      return {
        name: `档案盒${index + 1}`,
        node: item
      }
    })
    this.vm.$set(this.vm, 'archivesBox', archiverDataList)
  }

  loadArchives() {
    const { screen } = this
    screen.load3dScreen('scenes/HT档案馆 2.json', null, (g3d, dm3d) => {
      screen.add3dMiEvent(this.miArchivesBoxEvent, this)
      this.getArchiverList()
    })
  }

  miArchivesBoxEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (!displayName) return
      console.log(data)
      console.log(displayName)
      if (displayName === '档案盒') {
        // this.screen.g3d.flyTo(data, {
        //   animation: true,
        //   direction: [2, 0, -2],
        //   distance: 300
        // })
        this.pushPullArchivesBoxEvent(data)
        console.log('档案盒被双击')
      }
      if (displayName.match('camera')) {
        this.screen.g3d.flyTo(data, {
          animation: true,
          direction: [0, 0, 2],
          distance: 200
        })
      }
    }
    if (kind === 'endRotate') {
      console.log(this.g3d.getEye())
    }
  }

  // 推拉档案盒动画
  pushPullArchivesBoxEvent(boxNode) {
    const pos3d = boxNode.getPosition3d()
    if (boxNode.a('isPushInAnimating')) return
    boxNode.a('isPushInAnimating', true)
    let isPush = boxNode.a('isPush')
    const animProp = {
      duration: 400,
      easing: function(t) {
        return t
      },
      finishFunc: () => {
        boxNode.a('isPush', isPush)
        boxNode.a('isPushInAnimating', false)
      },
      action: function(v) {
        boxNode.setPosition3d([pos3d[0], pos3d[1], isPush ? pos3d[2] + 15 * v : pos3d[2] - 15 * v])
      }
    }
    if (isPush) {
      this.lastPushOutArchivesBox = null
      isPush = false
    } else {
      this.lastPushOutArchivesBox && this.pushPullArchivesBoxEvent(this.lastPushOutArchivesBox)
      this.lastPushOutArchivesBox = boxNode
      isPush = true
    }
    ht.Default.startAnim(animProp)
  }
}

export default MainEntry

import Screen from './utils/screen'
import mainUtil from './utils/mainUtil'

window.htconfig = {
  Default: {
    convertURL: function(url) {
      return 'assets/' + url
    }
    // graph3dViewMaxPhi: (Math.PI * 5) / 12
  }
}

class MainEntry {
  constructor(el, vm) {
    this.vm = vm
    this.screen = new Screen()
    this.map_2d_3d = {
      index: {
        screenCallback: this.loadMgyDemo,
        parentScreenCallback: null
      },
      buildFloor: {
        screenCallback: this.loadBuildFloor,
        parentScreenCallback: this.loadMgyDemo
      },
      machineRoom: {
        screenCallback: this.loadMachineRoom,
        parentScreenCallback: this.loadBuildFloor
      }
    }
    this.buildNamesVisible = false
    this.buildNamesList = []

    this.cameraVisible = false
    this.cameraList = []

    this.floorList = []

    this.screenList = []
    this.datas = []

    this.openedCabinet = []
    this.opacityMap = {}
    this.loadScreen(el)
  }

  loadScreen(el) {
    const screen = this.screen
    this.screen.init3dScreen(el, g3d => {
      g3d.setCenter([0, 0, 0])
      g3d.setEye([-5425, 12325, -7120])
      const mapInteractor = new ht.graph3d.MapInteractor(g3d)
      g3d.setInteractors([mapInteractor])

      this.loadMgyDemo()
      // this.loadBuildFloor()
      // this.loadMachineRoom()
      Object.assign(this, {
        g2d: screen.g2d,
        g3d: screen.g3d,
        dm2d: screen.dm2d,
        dm3d: screen.dm3d,
        mapInteractor: mapInteractor
      })
    })
  }

  loadMgyDemo() {
    const { screen } = this
    const hasloaded = this.screenList.indexOf('mgydemo')
    if (hasloaded > -1) {
      this.vm.dataView = ''
    }
    screen.load3dScreen('scenes/玫瑰园南区/168mgy.json', null, (g3d, dm3d) => {
      console.log('场景加载完成')
      console.log(dm3d.getDataByTag('教学楼'))
      g3d.setFar(1000000)
      g3d.setCenter(0, 0, 0)
      // 设置最大仰角
      this.mapInteractor.maxPhi = Math.PI / 2.1

      this.vm.showBack = false

      this.datas = dm3d.getDatas().toArray()
      this.getBuildNames()
      this.getCamera()

      if (this.cameraVisible) {
        this.showCamera()
      }

      if (this.buildNamesVisible) {
        this.showBuildNames()
      }

      if (hasloaded > -1) {
        const polyline = dm3d.getDataByTag('polyline')
        const length = g3d.getLineLength(polyline)
        const offset = g3d.getLineOffset(polyline, length)
        const point = offset.point
        const px = point.x
        const py = point.y
        const pz = point.z
        g3d.setEye(px, py, pz)
        g3d.setCenter(0, 0, 0)
        screen.add3dMiEvent(this.miIndex3dEvent, this)
        this.vm.dataView = 'index'
      } else {
        this.screenList.push('mgydemo')
        // 漫游动画
        setTimeout(() => {
          this.roamingAnim(g3d, dm3d, () => {
            // 添加事件监听
            screen.add3dMiEvent(this.miIndex3dEvent, this)
            this.vm.dataView = 'index'
          })
        }, 1000)
      }
    })
  }

  // 加载机房
  loadMachineRoom() {
    const { screen } = this
    screen.load3dScreen('scenes/玫瑰园南区/玫瑰园机房.json', null, (g3d, dm3d) => {
      console.log('机房加载完成')
      this.vm.dataView = 'machineRoom'
      g3d.setFar(20000)
      this.mapInteractor.maxPhi = Math.PI / 2.3
      g3d.setCenter(0, 0, 0)
      g3d.enablePostProcessing('Bloom', false)

      this.initControllPanelEvent()
      screen.add3dMiEvent(this.machineRoom3dEvent, this)
    })
  }

  // 加载楼层
  loadBuildFloor() {
    const { screen } = this
    screen.load3dScreen('scenes/玫瑰园南区/楼层.json', null, (g3d, dm3d) => {
      console.log('楼层加载完成')
      this.datas = dm3d.getDatas().toArray()

      this.vm.dataView = 'buildFloor'
      this.vm.showBack = true
      g3d.setFar(20000)
      this.mapInteractor.maxPhi = Math.PI / 2
      g3d.setCenter(0, 0, 0)
      g3d.enablePostProcessing('Bloom', false)

      g3d.setEye([0, 3474, 311])
      const position3d = [-2358, 937, 2401]
      ht.Default.startAnim({
        duration: 3000, // 动画周期毫秒数，默认采用`ht.Default.animDuration`
        action: v => {
          // action 函数必须提供，实现动画过程中的属性变化。
          const eyePos = g3d.getEye()
          g3d.setEye([
            eyePos[0] + (position3d[0] - eyePos[0]) * v,
            eyePos[1] + (position3d[1] - eyePos[1]) * v,
            eyePos[2] + (position3d[2] - eyePos[2]) * v
          ])
          if ((v > 0.3) & !this.floorAnimed) {
            this.floorAnim()
          }
        },
        finishFunc: () => {
          // 动画结束后调用的函数。
          console.log('动画结束')
          this.floorAnimed = false
        }
      })

      this.getFloorList(dm3d)
    })
  }

  floorAnim() {
    this.floorAnimed = true
    ht.Default.startAnim({
      duration: 500,
      easing: t => {
        return t
      },
      finishFunc: () => {
        this.showFloorName()
      }, // 动画结束后调用的函数。
      action: (v, t) => {
        this.floorList.forEach((item, index) => {
          const d = (index + 1 - 3) * 300
          const p = item.p3Value
          item.p3(p[0], p[1] + d * v, p[2] - d * v)
        })
      }
    })
  }

  showFloorName() {
    const floorNameList = []
    this.datas.forEach(item => {
      const displayName = item.getDisplayName()
      if (displayName && (displayName === '机房' || displayName.indexOf('楼') > -1)) {
        floorNameList.push(item)
      }
    })
    console.log(floorNameList)
    ht.Default.startAnim({
      duration: 300,
      easing: t => {
        return t * t
      },
      finishFunc: () => {
        this.screen.add3dMiEvent(this.miFloor3dEvent, this)
      }, // 动画结束后调用的函数。
      action: (v, t) => {
        floorNameList.forEach(item => {
          if (item._displayName === '机房') {
            item.setScale3d(...[2 * v, 2 * v, 1])
          } else {
            item.setScale3d(...[1 * v, 1 * v, 1])
          }
        })
      }
    })
  }

  getFloorList(dm3d) {
    this.floorList = []
    this.datas.forEach(item => {
      const displayName = item.getDisplayName()
      if (displayName && displayName.indexOf('louceng') > -1) {
        item['p3Value'] = item.p3()
        this.floorList.push(item)
      }
    })
    this.floorList.sort((a, b) => {
      return a._displayName.split('_')[1] - b._displayName.split('_')[1]
    })
  }

  // 添加3D场景事件方法
  miIndex3dEvent(e) {
    const { kind, data } = e
    if (!data) return
    if (kind === 'doubleClickData') {
      const tagName = data.getTag()
      if (tagName === '教学楼') {
        this.loadBuildFloor()
      }
    }
  }

  // 添加3D场景事件方法
  miFloor3dEvent(e) {
    const { kind, data } = e
    if (!data) return
    if (kind === 'doubleClickData') {
      const tagName = data.getTag()
      if (tagName === '机房') {
        this.loadMachineRoom()
      }
    }
  }

  machineRoom3dEvent(e) {
    const { dm3d, g3d } = this
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (displayName && displayName.indexOf('门') > -1) {
        const cabinetNode = mainUtil.getCabinetChilds(data, dm3d).cabinetNode
        cabinetNode.a('isDoorOpen') ? this.closeDoor(data) : this.openDoor(data)
      }
      if (displayName && displayName.indexOf('显卡') > -1) {
        const cabinetNode = mainUtil.getCabinetChilds(data, dm3d).cabinetNode
        if (data.a('isPush')) {
          this.pushBackBoard(data)
        } else {
          this.pushOutBoard(data, cabinetNode)
        }
      }
    }
    if (kind === 'onEnter') {
      if (e.type === 'data') {
        const node = data
        const displayName = node.getDisplayName()
        if (displayName === '转动面板') {
          this.stopRotatePanel()
        } else {
          const cabinetAndChilds = mainUtil.getCabinetChilds(node, dm3d)
          const { tip } = cabinetAndChilds.childsObj
          const cabinetNode = cabinetAndChilds.cabinetNode
          if (tip) {
            tip.s({
              '2d.visible': true,
              '3d.visible': true
            })
          } else if (mainUtil.isCabinetNode(node)) {
            this.initToolTip(cabinetNode)
          }
        }
      }
    }
    if (kind === 'onLeave') {
      if (e.type === 'data') {
        const node = data
        const displayName = node.getDisplayName()
        if (displayName === '转动面板') {
          const controlPanel = this.currentControllPanel
          if (controlPanel.s('3d.visible')) {
            this.startRotatePanel()
          }
        } else {
          const { tip } = mainUtil.getCabinetChilds(node, dm3d).childsObj
          if (tip) {
            tip.s({
              '2d.visible': false,
              '3d.visible': false
            })
          }
        }
      }
    }
    if (kind === 'doubleClickData') {
      const { cabinetNode, childsArr } = mainUtil.getCabinetChilds(data, dm3d)
      if (cabinetNode) {
        this.focusCabinetNode = cabinetNode
        !cabinetNode.a('isDoorOpen') && this.openDoor(cabinetNode)
        mainUtil.blurBackground(
          this.dm3d,
          this.opacityMap,
          childsArr
            .concat(cabinetNode)
            .concat(this.scanNode)
            .concat(this.serverPanel)
        )
        g3d.flyTo(cabinetNode, {
          animation: true,
          direction: [0, 0, -12],
          distance: 300
        })

        if (g3d.isFirstPersonMode()) {
          this.cancleRoomFirstPerson()
        }
        this.startScanCabinet(cabinetNode)
      }
    }
    if (kind === 'doubleClickBackground') {
      if (this.focusCabinetNode) {
        this.focusCabinetNode.a('isDoorOpen') && this.closeDoor(this.focusCabinetNode)
        this.focusCabinetNode = null
        mainUtil.restoreBackground(this.dm3d, this.opacityMap)
        mainUtil.flyToView(g3d, this.screen.defaultScene.eye, this.screen.defaultScene.center)
        this.stopScanCabinet()
      }
    }
  }

  // 获取楼栋名称标签
  getBuildNames() {
    this.datas.forEach(item => {
      if (item.getTag() === '楼栋名称') {
        this.buildNamesList.push(item)
      }
    })
  }

  showBuildNames() {
    const flag = this.cameraVisible
    this.cameraVisible = false
    this.buildNamesVisible = true
    ht.Default.startAnim({
      duration: 300,
      easing: t => {
        return t * t
      },
      finishFunc: () => {}, // 动画结束后调用的函数。
      action: (v, t) => {
        let scaled3d = []
        if (this.buildNamesVisible) {
          scaled3d = [2 * v, 2 * v, 1]
        } else {
          scaled3d = [2 - 2 * v, 2 - 2 * v, 1]
        }
        this.buildNamesList.forEach(item => {
          item.setScale3d(...scaled3d)
        })
        if (flag) {
          this.cameraList.forEach(item => {
            item.setScale3d(...[2 - 2 * v, 2 - 2 * v, 1])
          })
        }
      }
    })
  }

  // 获取摄像头
  getCamera() {
    this.datas.forEach(item => {
      const tagName = item.getTag()
      if (tagName && tagName.indexOf('摄像头') > -1) {
        this.cameraList.push(item)
      }
    })
  }

  showCamera() {
    const flag = this.buildNamesVisible
    this.buildNamesVisible = false
    this.cameraVisible = true
    ht.Default.startAnim({
      duration: 300,
      easing: t => {
        return t * t
      },
      finishFunc: () => {}, // 动画结束后调用的函数。
      action: (v, t) => {
        let scaled3d = []
        if (this.cameraVisible) {
          scaled3d = [2 * v, 2 * v, 1]
        } else {
          scaled3d = [2 - 2 * v, 2 - 2 * v, 1]
        }
        this.cameraList.forEach(item => {
          item.setScale3d(...scaled3d)
        })
        if (flag) {
          this.buildNamesList.forEach(item => {
            item.setScale3d(...[2 - 2 * v, 2 - 2 * v, 1])
          })
        }
      }
    })
  }
  // 场景漫游
  roamingAnim(g3d, dm3d, callback) {
    // polyline
    const polyline = dm3d.getDataByTag('polyline')
    ht.Default.startAnim({
      duration: 10000,
      easing: t => {
        return t
      },
      finishFunc: () => {
        callback()
      }, // 动画结束后调用的函数。
      action: (v, t) => {
        if (v > 0.5) {
          if (!this.buildNamesVisible) {
            this.showBuildNames()
          }
        }
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
  initControllPanelEvent() {
    this.serverPanel = this.dm3d.getDataByTag('serverPanel')
    this.serverPanel.a('hidePanel', () => {
      this.pushBackBoard(this.lastPushOutBoard)
      this.serverPanel.s({
        '2d.visible': false,
        '3d.visible': false
      })
    })
  }
  openDoor(node) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(node, this.dm3d)
    const cabinetNode = cabinetAndChilds.cabinetNode
    const { door, tip } = cabinetAndChilds.childsObj
    if (cabinetNode && !cabinetNode.a('isDoorOpen')) {
      const rotateVal = (Math.PI * 3) / 4
      this.closeDoorInterval && this.closeDoorInterval.stop()
      this.closeDoorInterval = null
      if (door) {
        const doorRotate = door.getRotationY()
        this.openDoorInterval = ht.Default.startAnim({
          duration: 1000,
          finishFunc: function() {
            door.setRotationY(doorRotate - rotateVal)
          },
          action: function(v) {
            door.setRotationY(doorRotate - v * rotateVal)
          }
        })
      }
      if (tip) {
        tip.a('doorStatusText', '关闭机柜')
        tip.a('isDoorOpen', true)
      }
      cabinetNode.a('isDoorOpen', true)
      this.openedCabinet.push(cabinetNode)
    }
  }
  closeDoor(node) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(node, this.dm3d)
    const cabinetNode = cabinetAndChilds.cabinetNode
    const { door, tip } = cabinetAndChilds.childsObj
    const childsArr = cabinetAndChilds.childsArr

    if (cabinetNode && cabinetNode.a('isDoorOpen')) {
      const rotateVal = (Math.PI * 3) / 4
      this.openDoorInterval && this.openDoorInterval.stop()
      this.openDoorInterval = null
      if (door) {
        const doorRotate = door.getRotationY()
        this.closeDoorInterval = ht.Default.startAnim({
          duration: 1000,
          finishFunc: function() {
            door.setRotationY(doorRotate + rotateVal)
          },
          action: function(v) {
            door.setRotationY(doorRotate + v * rotateVal)
          }
        })
      }
      if (tip) {
        tip.a('doorStatusText', '打开机柜')
        tip.a('isDoorOpen', false)
      }
      cabinetNode.a('isDoorOpen', false)
      for (let i = 0, l = this.openedCabinet.length; i < l; i++) {
        if (this.openedCabinet[i] === cabinetNode) {
          this.openedCabinet.splice(i, 1)
          break
        }
      }
      childsArr.forEach(data => {
        const displayName = data.getDisplayName()
        if (displayName && displayName.indexOf('显卡') > -1) {
          data.a('isPush') && this.pushBackBoard(data)
        }
      })
    }
  }
  pushOutBoard(boardNode, cabinetNode) {
    const pos3d = boardNode.getPosition3d()
    const childPushOut = boardNode => {
      const childs = boardNode.getChildren()
      if (childs.size() > 0) {
        childs.each(child => {
          const displayName = child.getDisplayName()
          if (displayName === '子显') {
            const childPos3d = child.getPosition3d()
            ht.Default.startAnim({
              duration: 200,
              easing: function(t) {
                return t
              },
              action: function(v) {
                child.setPosition3d([childPos3d[0], childPos3d[1], childPos3d[2] + 10 * v])
              }
            })
          }
        })
      }
    }
    if (
      !boardNode.a('isPush') &&
      !boardNode.a('isPushOutAnimating') &&
      cabinetNode.a('isDoorOpen')
    ) {
      this.lastPushOutBoard && this.pushBackBoard(this.lastPushOutBoard)
      this.lastPushOutBoard = boardNode
      this.currentControllPanel = this.dm3d.getDataByTag('serverPanel')
      this.startRotatePanel(cabinetNode, boardNode)
      boardNode.a('isPushOutAnimating', true)
      // 点击的为前机架显卡
      if (boardNode.getDisplayName() === '显卡z-') {
        ht.Default.startAnim({
          duration: 400,
          easing: function(t) {
            return t
          },
          finishFunc: () => {
            boardNode.a('isPush', true)
            boardNode.a('isPushOutAnimating', false)
            childPushOut(boardNode)
          },
          action: function(v) {
            boardNode.setPosition3d([pos3d[0], pos3d[1], pos3d[2] - 35 * v])
          }
        })
      } else {
        ht.Default.startAnim({
          duration: 400,
          easing: function(t) {
            return t
          },
          finishFunc: () => {
            boardNode.a('isPush', true)
            boardNode.a('isPushOutAnimating', false)
            childPushOut(boardNode)
          },
          action: function(v) {
            boardNode.setPosition3d([pos3d[0], pos3d[1], pos3d[2] + 35 * v])
          }
        })
      }
      this.stopScanCabinet()
      this.focusCabinetNode && this.startScanCabinet(boardNode)
    }
  }
  pushBackBoard(boardNode) {
    const pos3d = boardNode.getPosition3d()
    const childPushBack = boardNode => {
      const childs = boardNode.getChildren()
      if (childs.size() > 0) {
        childs.each(child => {
          const displayName = child.getDisplayName()
          if (displayName === '子显') {
            const childPos3d = child.getPosition3d()
            ht.Default.startAnim({
              duration: 200,
              easing: function(t) {
                return t
              },
              action: function(v) {
                child.setPosition3d([childPos3d[0], childPos3d[1], childPos3d[2] - 10 * v])
              }
            })
          }
        })
      }
    }
    if (boardNode.a('isPush') && !boardNode.a('isPushInAnimating')) {
      this.stopRotatePanel(true)
      this.lastPushOutBoard = null
      boardNode.a('isPushInAnimating', true)
      // 点击的为前机架显卡
      if (boardNode.getDisplayName() === '显卡z-') {
        ht.Default.startAnim({
          duration: 400,
          easing: function(t) {
            return t
          },
          finishFunc: () => {
            boardNode.a('isPush', false)
            boardNode.a('isPushInAnimating', false)
            childPushBack(boardNode)
          },
          action: function(v) {
            boardNode.setPosition3d([pos3d[0], pos3d[1], pos3d[2] + 35 * v])
          }
        })
      } else {
        ht.Default.startAnim({
          duration: 400,
          easing: function(t) {
            return t
          },
          finishFunc: () => {
            boardNode.a('isPush', false)
            boardNode.a('isPushInAnimating', false)
            childPushBack(boardNode)
          },
          action: function(v) {
            boardNode.setPosition3d([pos3d[0], pos3d[1], pos3d[2] - 35 * v])
          }
        })
      }
      this.stopScanCabinet()
      this.focusCabinetNode && this.startScanCabinet(boardNode.getParent())
    }
  }
  startRotatePanel(cabinetNode, boardNode) {
    if (this.rotationInterval) {
      return
    }
    const dr = (Math.PI / 180) * 3
    const PI2 = Math.PI * 2
    const controlPanel = this.currentControllPanel
    if (cabinetNode) {
      controlPanel.setParent(cabinetNode)
      controlPanel.setX(cabinetNode.getX())
      controlPanel.setY(cabinetNode.getY())
      controlPanel.setRotationY(Math.PI)
    }
    controlPanel.s({
      '2d.visible': true,
      '3d.visible': true
    })
    this.rotationInterval = setInterval(() => {
      controlPanel.setRotation((controlPanel.getRotation() - dr) % PI2)
    }, 120)
    if (boardNode) {
      const bindHtTagList = boardNode.a('bindHtTagList')
      if (bindHtTagList) {
        for (let i = 0, l = bindHtTagList.length; i < l; i++) {
          const softValues = parseInt(bindHtTagList[i].softValues)
          const statusData = this.getStatusByValue(softValues)
          if (statusData) {
            bindHtTagList[i].softStatus = statusData.status
            bindHtTagList[i].alarmColor = statusData.color
          }
        }
        boardNode.a('bindHtTagList', bindHtTagList)
        controlPanel.a('ht.dataSource', bindHtTagList)
      }

      const bindHtTagRam = boardNode.a('bindHtTagRam')
      if (bindHtTagRam) {
        for (const key in bindHtTagRam) {
          if (key === 'HARDWARE.NAME') {
            let serverName = ''
            const statusData = this.getStatusByValue(bindHtTagRam['HARDWARE.STATUS'])
            serverName = bindHtTagRam['HARDWARE.NAME'] + '(' + statusData.status + ')'
            controlPanel.a('serverName', serverName)
          } else {
            controlPanel.a(key, bindHtTagRam[key])
          }
        }
      }
    }
  }
  stopRotatePanel(isHide) {
    if (!this.rotationInterval) {
      return
    }
    const controlPanel = this.currentControllPanel
    isHide &&
      controlPanel.s({
        '2d.visible': false,
        '3d.visible': false
      })
    clearInterval(this.rotationInterval)
    this.rotationInterval = null
  }

  startScanCabinet(cabinetNode) {
    let scanNode = this.scanNode
    if (!scanNode) {
      scanNode = this.scanNode = new ht.Node()
      scanNode.s({
        'all.color': null,
        'all.image': 'symbols/扫描.json',
        'all.transparent': true,
        'all.reverse.cull': true,
        '2d.selectable': false,
        '3d.selectable': false
      })
      this.dm3d.add(scanNode)
    }
    scanNode.setHost(cabinetNode)
    scanNode.setAnchor3d(cabinetNode.getAnchor3d())
    scanNode.s3(cabinetNode.s3())
    scanNode.p3(cabinetNode.p3())
    scanNode.s({
      '2d.visible': true,
      '3d.visible': true
    })

    this.scanTask = {
      interval: 50,
      action: data => {
        if (data === this.scanNode) {
          const offset = data.s('all.uv.offset') || [0, 0]
          let offsetY = offset[1]
          offsetY = (offsetY - 0.02) % 1
          data.s('all.uv.offset', [0, offsetY])
        }
      }
    }

    this.dm3d.addScheduleTask(this.scanTask)
  }

  stopScanCabinet() {
    this.scanTask && this.dm3d.removeScheduleTask(this.scanTask)
    const scanNode = this.scanNode
    if (scanNode) {
      scanNode.s({
        '2d.visible': false,
        '3d.visible': false
      })
      scanNode.setHost(null)
    }
  }
}
export default MainEntry

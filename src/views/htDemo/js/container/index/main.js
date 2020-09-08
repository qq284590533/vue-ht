/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import mainUtil from '../../util/mainUtil'
import Inspect from '../../util/inspect'
import util from '../../util/util'
import Scene from '../../util/screen'
import PreLoadSource from '../../util/preLoadSource'
import '../config'

class MainEntry {
  constructor() {
    this.opacityMap = {}
    this.openedCabinet = []
    this.scene = new Scene()
    this.scene.init3dScreen((g3d, dm3d) => {
      const mapInteractor = new ht.graph3d.MapInteractor(g3d)
      mapInteractor.maxPhi = Math.PI / 2
      mapInteractor.keepHorizon = false
      g3d.setInteractors([mapInteractor])
      mainUtil.setSkyBox(g3d, 'assets/background/天空球.jpg')
      g3d.getHighlightHelper().setFetchTargetFunc(function(list) {
        if (list) {
          const notShowWire = ['弹窗', '机柜', '门']
          const displayName = list[0].getDisplayName()
          const result = notShowWire.some(name => {
            return displayName && displayName.indexOf(name) > -1
          })
          if (!result) {
            return list
          }
        }
      })
    })
    this.scene.init2dScreen()
    this.homeG3d = this.scene.g3d
    this.homeDm = this.scene.dm3d
    this.panelGv = this.scene.g2d
    this.panelDm = this.scene.dm2d

    new PreLoadSource(window.kasike_config.preLoad)

    window.addEventListener('load', () => {
      this.scene.load2dScreen('displays/2d.json', null, () => {
        this.initTime()
      })
      this.scene.load3dScreen('scenes/机房/卡斯柯机房二期.json', null, (g3d, dm3d, screenAttr) => {
        screenAttr
          ? (this.getStatusByValue = screenAttr['getStatusByValue'])
          : (this.getStatusByValue = mainUtil.getStatusByValue)
        this.initInspect()
        this.inspect.initInspectList(this.getInspectList())
        this.initControllPanelEvent()
        if (window.kasike_config.isOnline) {
          BrowserNotify('HT', 'UI', 'OnInit', '')
        }
        if (this.updateHTValueQueue) {
          this.updateHTValueQueue.forEach(queue => {
            const { type, tag, value } = queue
            if (type === 1) {
              this.UpdateHtRamValue(type, tag, value)
            } else if (type === 2) {
              this.UpdateHtTableValue(type, tag, value)
            }
          })
          this.updateHTValueQueue = null
        }
      })
      this.scene.init2dEvent(this.panel2dEvent, null, this)
      this.scene.init3dEvent(this.home3dEvent, null, this)
    })
    window.test = this
  }
  panel2dEvent(e) {
    const { panelDm, panelGv, homeDm, homeG3d } = this
    if (e.kind === 'clickData') {
      const data = e.data
      const tag = data.getTag()
      const displayName = data.getDisplayName()
      if (displayName && displayName.indexOf('机柜') > -1) {
        if (tag) {
          const cabinetNode = this.homeDm.getDataByTag(tag)
          if (this.focusCabinetNode) {
            this.closeDoor(this.focusCabinetNode)
            const { childsArr } = mainUtil.getCabinetChilds(cabinetNode, homeDm)
            this.focusCabinetNode = cabinetNode
            !cabinetNode.a('isDoorOpen') && this.openDoor(cabinetNode)
            mainUtil.restoreBackground(homeDm, this.opacityMap)
            mainUtil.blurBackground(homeDm, this.opacityMap, childsArr.concat(cabinetNode))
            homeG3d.flyTo(cabinetNode, {
              animation: true,
              direction: [0, 0, 12],
              distance: 300
            })
          } else {
            cabinetNode &&
              homeG3d.flyTo(cabinetNode, {
                animation: true,
                direction: [0, 0, 12],
                distance: 300
              })
          }
        }
      }
      if (tag === 'backToDefaultScene') {
        mainUtil.flyToView(
          this.homeG3d,
          this.scene.defaultScene.eye,
          this.scene.defaultScene.center
        )
      }
      if (tag === 'firstPerson' && !this.inspect.isInspecting) {
        homeG3d.isFirstPersonMode() ? this.cancleRoomFirstPerson(true) : this.setRoomFirstPerson()
      }
      // 开始巡视
      if (tag === 'autoMonitor') {
        const tempOpenedCabinet = ht.Default.clone(this.openedCabinet)
        tempOpenedCabinet.forEach(cabinetNode => {
          this.closeDoor(cabinetNode)
        })
        const pauseAnimate = panelDm.getDataByTag('pauseAnimate') // 暂停
        const stopAnimate = panelDm.getDataByTag('stopAnimate') // 结束
        data.s('2d.visible', false)
        pauseAnimate.s('2d.visible', true)
        stopAnimate.s('2d.visible', true)
        this.inspect.startInspect()
      }
      // 暂停
      if (tag === 'pauseAnimate') {
        const resumeAnimate = panelDm.getDataByTag('resumeAnimate') // 继续
        data.s('2d.visible', false)
        resumeAnimate.s('2d.visible', true)
        this.inspect.pauseInspect()
      }
      // 继续
      if (tag === 'resumeAnimate') {
        const pauseAnimate = panelDm.getDataByTag('pauseAnimate') // 暂停
        data.s('2d.visible', false)
        pauseAnimate.s('2d.visible', true)
        this.inspect.resumeInspect()
      }
      // 结束
      if (tag === 'stopAnimate') {
        const autoMonitor = panelDm.getDataByTag('autoMonitor') // 开始巡视
        const pauseAnimate = panelDm.getDataByTag('pauseAnimate') // 暂停
        const resumeAnimate = panelDm.getDataByTag('resumeAnimate') // 继续
        data.s('2d.visible', false)
        pauseAnimate.s('2d.visible', false)
        resumeAnimate.s('2d.visible', false)
        autoMonitor.s('2d.visible', true)
        this.inspect.endInspect()
      }
    }
  }
  home3dEvent(e) {
    const { homeDm, homeG3d } = this
    if (e.kind === 'clickData') {
      const data = e.data
      const displayName = data.getDisplayName()
      if (displayName && displayName.indexOf('门') > -1) {
        const cabinetNode = mainUtil.getCabinetChilds(data, homeDm).cabinetNode
        cabinetNode.a('isDoorOpen') ? this.closeDoor(data) : this.openDoor(data)
      }
      if (displayName && displayName.indexOf('显卡') > -1) {
        const cabinetNode = mainUtil.getCabinetChilds(data, homeDm).cabinetNode
        if (data.a('isPush')) {
          this.pushBackBoard(data)
        } else {
          this.pushOutBoard(data, cabinetNode)
        }
      }
    }
    if (e.kind === 'onEnter') {
      if (e.type === 'data') {
        const node = e.data
        const displayName = node.getDisplayName()
        if (displayName === '转动面板') {
          this.stopRotatePanel()
        } else {
          const cabinetAndChilds = mainUtil.getCabinetChilds(node, homeDm)
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
    if (e.kind === 'onLeave') {
      if (e.type === 'data') {
        const node = e.data
        const displayName = node.getDisplayName()
        if (displayName === '转动面板') {
          const controlPanel = this.currentControllPanel
          if (controlPanel.s('3d.visible')) {
            this.startRotatePanel()
          }
        } else {
          const { tip } = mainUtil.getCabinetChilds(node, homeDm).childsObj
          if (tip) {
            tip.s({
              '2d.visible': false,
              '3d.visible': false
            })
          }
        }
      }
    }
    if (e.kind === 'doubleClickData' && !this.inspect.isInspecting) {
      const data = e.data
      const { cabinetNode, childsObj, childsArr } = mainUtil.getCabinetChilds(data, homeDm)
      if (cabinetNode) {
        this.focusCabinetNode = cabinetNode
        !cabinetNode.a('isDoorOpen') && this.openDoor(cabinetNode)
        mainUtil.blurBackground(
          this.homeDm,
          this.opacityMap,
          childsArr.concat(cabinetNode).concat(this.scanNode)
        )
        homeG3d.flyTo(cabinetNode, {
          animation: true,
          direction: [0, 0, 12],
          distance: 300
        })

        if (homeG3d.isFirstPersonMode()) {
          this.cancleRoomFirstPerson()
        }
        this.startScanCabinet(cabinetNode)
      }
    }
    if (e.kind === 'doubleClickBackground' && !this.inspect.isInspecting) {
      if (this.focusCabinetNode) {
        this.focusCabinetNode.a('isDoorOpen') && this.closeDoor(this.focusCabinetNode)
        this.focusCabinetNode = null
        mainUtil.restoreBackground(this.homeDm, this.opacityMap)
        mainUtil.flyToView(homeG3d, this.scene.defaultScene.eye, this.scene.defaultScene.center)
        this.stopScanCabinet()
      }
    }
  }
  getInspectList() {
    const { homeDm, homeG3d, panelDm } = this
    const beginCallBack = tag => {
      if (homeG3d.isFirstPersonMode()) {
        this.cancleRoomFirstPerson()
      }
      if (this.focusCabinetNode) {
        mainUtil.restoreBackground(homeDm, this.opacityMap)
        this.focusCabinetNode = null
        this.stopScanCabinet()
      }
      if (tag) {
        const cabinetNode = homeDm.getDataByTag(tag)
        const notBLurNodeArr = mainUtil.getCabinetChilds(cabinetNode, homeDm).childsArr
        mainUtil.blurBackground(homeDm, this.opacityMap, notBLurNodeArr.concat(cabinetNode))
        this.openDoor(cabinetNode)
      }
    }
    const endCallBack = tag => {
      mainUtil.restoreBackground(homeDm, this.opacityMap)
      this.closeDoor(homeDm.getDataByTag(tag))
    }
    const actionFun = cabinetTag => {
      const cabinetNode = homeDm.getDataByTag(cabinetTag)
      const { card } = mainUtil.getCabinetChilds(cabinetNode).childsObj
      const length = card.length
      if (length > 0) {
        const step = () => {
          const currentCard = card[this.currentCardIndex]
          this.pushOutBoard(currentCard, cabinetNode)
          this.currentInspectCardTime = setTimeout(() => {
            this.currentCardIndex++
            if (this.currentCardIndex < length) {
              step()
            } else {
              this.inspect.inspectNext()
            }
          }, window.kasike_config.rotationTime)
        }
        if (this.currentCardIndex < length) {
          step()
        } else {
          this.inspect.inspectNext()
        }
      }
    }
    return [
      {
        roadTag: 'road1',
        inspectTime: 1500,
        beginCallBack: () => {
          beginCallBack()
        }
      },
      {
        objectTag: 'cabinet1',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet1')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet1')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet1')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet1')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet2',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet2')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet2')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet2')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet2')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet3',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet3')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet3')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet3')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet3')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet4',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet4')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet4')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet4')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet4')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet5',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet5')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet5')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet5')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet5')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet6',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet6')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet6')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet6')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet6')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet7',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet7')
        },
        endCallBack: () => {
          endCallBack('cabinet7')
        }
      },
      {
        objectTag: 'cabinet8',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet8')
        },
        endCallBack: () => {
          endCallBack('cabinet8')
        }
      },
      {
        roadTag: 'road2',
        inspectTime: 6000
      },
      {
        objectTag: 'cabinet9',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet9')
        },
        endCallBack: () => {
          endCallBack('cabinet9')
        }
      },
      {
        objectTag: 'cabinet10',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet10')
        },
        endCallBack: () => {
          endCallBack('cabinet10')
        }
      },
      {
        objectTag: 'cabinet11',
        inspectTime: 1000,
        beginCallBack: () => {
          beginCallBack('cabinet11')
        },
        endCallBack: () => {}
      },
      {
        action: () => {
          this.currentCardIndex = 0
          actionFun('cabinet11')
        },
        actionPause: () => {
          clearTimeout(this.currentInspectCardTime)
        },
        actionResume: () => {
          this.currentCardIndex++
          actionFun('cabinet11')
        },
        actionStop: () => {
          clearTimeout(this.currentInspectCardTime)
          this.currentCardIndex = 0
        },
        endCallBack: () => {
          endCallBack('cabinet11')
        },
        inspectTime: 0
      },
      {
        objectTag: 'cabinet12',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet12')
        },
        endCallBack: () => {
          endCallBack('cabinet12')
        }
      },
      {
        objectTag: 'cabinet13',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet13')
        },
        endCallBack: () => {
          endCallBack('cabinet13')
        }
      },
      {
        objectTag: 'cabinet14',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet14')
        },
        endCallBack: () => {
          endCallBack('cabinet14')
        }
      },
      {
        objectTag: 'cabinet15',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet15')
        },
        endCallBack: () => {
          endCallBack('cabinet15')
        }
      },
      {
        objectTag: 'cabinet16',
        inspectTime: 4500,
        beginCallBack: () => {
          beginCallBack('cabinet16')
        },
        endCallBack: () => {
          endCallBack('cabinet16')
          const autoMonitor = panelDm.getDataByTag('autoMonitor') // 开始巡视
          const pauseAnimate = panelDm.getDataByTag('pauseAnimate') // 暂停
          const resumeAnimate = panelDm.getDataByTag('resumeAnimate') // 继续
          const stopAnimate = panelDm.getDataByTag('stopAnimate') // 结束
          stopAnimate.s('2d.visible', false)
          pauseAnimate.s('2d.visible', false)
          resumeAnimate.s('2d.visible', false)
          autoMonitor.s('2d.visible', true)
        }
      }
    ]
  }
  initInspect() {
    if (!this.inspect) {
      this.inspect = new Inspect(this.homeG3d, this.homeDm, this.scene.defaultScene)
      this.inspect.setRotateStepFrame(Math.PI / 120)
      this.inspect.setInspectObjDirection([0, 0, 12])
      this.inspect.setInspectObjDistance(300)
    }
  }
  initTime() {
    this.timeInterval && clearInterval(this.timeInterval)
    const dm = this.panelDm
    const time = dm.getDataByTag('time')
    const week = dm.getDataByTag('week')
    const date = dm.getDataByTag('date')
    const resetTime = () => {
      const now = new Date()
      date.s('text', util.formatDate(now, 'YYYY-MM-DD'))
      time.s('text', util.formatDate(now, 'hh:mm'))
      week.s('text', '星期' + util.formatDate(now, 'w'))
    }
    resetTime()
    this.timeInterval = setInterval(resetTime, 30000)
  }
  setRoomFirstPerson() {
    const homeG3d = this.homeG3d
    const homeDm = this.homeDm
    let boundaries = []
    const mapInteractor = homeG3d.getInteractors().get(0)
    mapInteractor.maxPhi = Math.PI

    const wall = [homeDm.getDataByTag('wall1'), homeDm.getDataByTag('wall2')]
    mainUtil.flyToView(homeG3d, [-973, 115, 1778], [-524, 135, 1805], () => {
      homeG3d.setFirstPersonMode(true)
      wall.forEach(data => {
        if (data instanceof ht.Shape && !(data instanceof ht.Polyline)) {
          boundaries = boundaries.concat(
            ht.Default.toBoundaries(data.getPoints(), data.getSegments())
          )
        }
      })
      homeG3d.setBoundaries(boundaries)
    })
    this.panelDm.getDataByTag('eyeMode').s('text', '自由模式')

    const tempOpenedCabinet = ht.Default.clone(this.openedCabinet)
    tempOpenedCabinet.forEach(cabinetNode => {
      this.closeDoor(cabinetNode)
    })

    if (this.focusCabinetNode) {
      mainUtil.restoreBackground(homeDm, this.opacityMap)
      this.focusCabinetNode = null
      this.stopScanCabinet()
    }
  }
  cancleRoomFirstPerson(isBackToView) {
    const homeG3d = this.homeG3d
    const mapInteractor = homeG3d.getInteractors().get(0)
    mapInteractor.maxPhi = Math.PI / 2
    homeG3d.setFirstPersonMode(false)
    isBackToView &&
      mainUtil.flyToView(homeG3d, this.scene.defaultScene.eye, this.scene.defaultScene.center)
    this.panelDm.getDataByTag('eyeMode').s('text', '第一人称')
  }
  openDoor(node) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(node, this.homeDm)
    const cabinetNode = cabinetAndChilds.cabinetNode
    const { door, tip, blinkLight } = cabinetAndChilds.childsObj
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
      this.startBlinkLight(blinkLight)
    }
  }
  closeDoor(node) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(node, this.homeDm)
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
      this.stopBlinkLight()
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
      if (boardNode.a('boardType') === '核心交换机') {
        this.currentControllPanel = this.homeDm.getDataByTag('coreSwitchPanel')
      } else {
        this.currentControllPanel = this.homeDm.getDataByTag('serverPanel')
      }
      boardNode.a('bindHtTagList') && this.startRotatePanel(cabinetNode, boardNode)
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
      boardNode.a('bindHtTagList') && this.stopRotatePanel(true)
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
  startBlinkLight(blinkLight) {
    const lightImg = ['assets/objs/机房/设备零件/d-hy0.png', 'assets/objs/机房/设备零件/d-hf0.png']
    if (blinkLight && blinkLight.length > 0) {
      this.blinkInterval = setInterval(() => {
        blinkLight.forEach(light => {
          const showLightImg = lightImg[util.randomNumBetween(0, 1)]
          light.s('shape3d.image', showLightImg)
        })
      }, 300)
    }
  }
  stopBlinkLight() {
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval)
      this.blinkInterval = null
    }
  }
  initToolTip(cabinetNode) {
    const cabinetNodeP3 = cabinetNode.p3()
    const cabinetNodeHeight = cabinetNode.s3()[1] / 2
    const toolTipNode = new ht.Node()
    toolTipNode.s({
      'all.color': '#DDDDDD',
      shape3d: 'billboard',
      'shape3d.autorotate': true,
      'shape3d.transparent': true,
      '2d.movable': false,
      '3d.movable': false,
      'shape3d.alwaysOnTop': true,
      'wf.visible': 'selected',
      'wf.short': true,
      'shape3d.texture.scale': 1,
      'shape3d.image': 'symbols/3d场景用/标签/指向标签适配大小.json',
      interactive: false
    })
    toolTipNode.setAnchor3d(0.5, 0, 0.5)
    toolTipNode.s3(200, 114, 6)
    toolTipNode.p3([cabinetNodeP3[0], cabinetNodeP3[1] + cabinetNodeHeight, cabinetNodeP3[2]])
    toolTipNode.setDisplayName('弹窗')
    toolTipNode.a({
      cabinetName: cabinetNode.getDisplayName()
    })
    this.homeDm.add(toolTipNode)
    cabinetNode.addChild(toolTipNode)
    toolTipNode.a('openDoor', () => {
      this.openDoor(toolTipNode.getParent())
    })
    toolTipNode.a('closeDoor', () => {
      this.closeDoor(toolTipNode.getParent())
    })
  }
  initControllPanelEvent() {
    const serverPanel = this.homeDm.getDataByTag('serverPanel')
    serverPanel.a('hidePanel', () => {
      this.pushBackBoard(this.lastPushOutBoard)
      serverPanel.s({
        '2d.visible': false,
        '3d.visible': false
      })
    })
    const coreSwitchPanel = this.homeDm.getDataByTag('coreSwitchPanel')
    coreSwitchPanel.a('hidePanel', () => {
      this.pushBackBoard(this.lastPushOutBoard)
      coreSwitchPanel.s({
        '2d.visible': false,
        '3d.visible': false
      })
    })
  }
  UpdateHtTableValue(type, tag, value) {
    let cardTag = null
    const controlPanel = this.currentControllPanel
    for (const key in bindHtTagListObject) {
      const tagArr = bindHtTagListObject[key]
      if (tagArr.indexOf(tag) > -1) {
        cardTag = key
        break
      }
    }
    if (cardTag) {
      const cardNode = this.homeDm.getDataByTag(cardTag)
      if (cardNode) {
        const bindHtTagList = cardNode.a('bindHtTagList')
        for (let i = 0, l = bindHtTagList.length; i < l; i++) {
          if (bindHtTagList[i].softTag === tag) {
            bindHtTagList[i].softValues = value
            const statusData = this.getStatusByValue(value)
            if (statusData) {
              bindHtTagList[i].softStatus = statusData.status
              bindHtTagList[i].alarmColor = statusData.color
              cardNode.a('bindHtTagList', bindHtTagList)
              mainUtil.getCardMaxStatusBySoftAndHardWare(this.getStatusByValue, cardNode)
              this.updataCabinetStatus(cardNode)
            }
            break
          }
        }
        if (controlPanel && controlPanel.s('3d.visible') && this.lastPushOutBoard === cardNode) {
          controlPanel.a('ht.dataSource', bindHtTagList)
        }
      } else {
        !this.updateHTValueQueue && (this.updateHTValueQueue = [])
        this.updateHTValueQueue.push({
          type: type,
          tag: tag,
          value: value
        })
      }
    } else {
      for (const key in bindHtTagHardWareObject) {
        const tagArr = bindHtTagHardWareObject[key]
        if (tagArr.indexOf(tag) > -1) {
          cardTag = key
          break
        }
      }
      if (cardTag) {
        const cardNode = this.homeDm.getDataByTag(cardTag)
        const bindHtTagRam = cardNode.a('bindHtTagRam')
        const statusData = this.getStatusByValue(value)
        bindHtTagRam['HARDWARE.STATUS'] = value
        if (statusData) {
          bindHtTagRam['serverName'] = bindHtTagRam['HARDWARE.NAME'] + '(' + statusData.status + ')'
        }
        cardNode.a('bindHtTagRam', bindHtTagRam)
        cardNode.a('hardWareMaxValue', value)

        mainUtil.getCardMaxStatusBySoftAndHardWare(this.getStatusByValue, cardNode)
        this.updataCabinetStatus(cardNode)

        if (controlPanel && controlPanel.s('3d.visible') && this.lastPushOutBoard === cardNode) {
          controlPanel.a('serverName', bindHtTagRam['serverName'])
        }
      }
    }
  }
  updataCabinetStatus(cardNode) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(cardNode)
    const cabinetNode = cabinetAndChilds.cabinetNode
    const { door } = cabinetAndChilds.childsObj
    const cabinetTag = cabinetNode.getTag()
    const panelCardColorNode = this.panelDm.getDataByTag(cabinetTag + 'Background')
    const maxStatusData = mainUtil.getCabinetMaxStatusBySoftAndHardWare(
      this.getStatusByValue,
      cardNode
    )

    const { status, color } = maxStatusData
    cabinetNode.s('shape3d.blend', color)
    door.s('shape3d.blend', color)
    if (panelCardColorNode) {
      if (status === '正常') {
        panelCardColorNode.s('shape.background', 'rgb(0, 255, 128)')
      } else {
        panelCardColorNode.s('shape.background', color)
      }
    }
  }
  UpdateHtRamValue(type, tag, value) {
    let cardTag = null
    const controlPanel = this.currentControllPanel
    for (const key in bindHtTagRamObject) {
      const tagArr = bindHtTagRamObject[key]
      if (tagArr.indexOf(tag) > -1) {
        cardTag = key
        break
      }
    }
    if (cardTag) {
      const cardNode = this.homeDm.getDataByTag(cardTag)
      if (cardNode) {
        const bindHtTagRam = cardNode.a('bindHtTagRam')
        if (bindHtTagRam) {
          for (const key in bindHtTagRam) {
            if (tag.indexOf(key) > -1) {
              switch (key) {
                case '1.AVAILABLE':
                case '1.CAPACITY':
                case '2.AVAILABLE':
                case '2.CAPACITY':
                case 'MEMORY.CAPACITY':
                case 'MEMORY.AVAILABLE':
                  const GRam = (value / 1024).toFixed(2)
                  bindHtTagRam[key] = GRam
                  if (
                    controlPanel &&
                    controlPanel.s('3d.visible') &&
                    this.lastPushOutBoard === cardNode
                  ) {
                    controlPanel.a(key, bindHtTagRam[key])
                  }
                  break
                case 'CPU.NUMBER':
                  bindHtTagRam[key] = value
                  if (
                    controlPanel &&
                    controlPanel.s('3d.visible') &&
                    this.lastPushOutBoard === cardNode
                  ) {
                    controlPanel.a(key, bindHtTagRam[key])
                  }
                  break
                case 'CPU.UTILIZATION':
                  bindHtTagRam[key] = value + '%'
                  if (
                    controlPanel &&
                    controlPanel.s('3d.visible') &&
                    this.lastPushOutBoard === cardNode
                  ) {
                    controlPanel.a(key, bindHtTagRam[key])
                  }
                  break
                case '1.UTILIZATION':
                case '2.UTILIZATION':
                  bindHtTagRam[key] = value + '%'
                  bindHtTagRam[key + '.BAR.PERCENT'] = value / 100
                  if (
                    controlPanel &&
                    controlPanel.s('3d.visible') &&
                    this.lastPushOutBoard === cardNode
                  ) {
                    controlPanel.a(key, bindHtTagRam[key])
                    controlPanel.a(key + '.BAR.PERCENT', bindHtTagRam[key + '.BAR.PERCENT'])
                  }
                  break
                case 'MEMORY.UTILIZATION':
                  const oneDegree = Math.PI / 180
                  const percentDegree = (value / 100) * 360
                  const usePercent = -oneDegree * percentDegree
                  bindHtTagRam[key] = usePercent
                  bindHtTagRam['MEMORY.UTILIZATION.VALUE'] = value + '%'
                  bindHtTagRam['MEMORY.NOT.UTILIZATION'] = Math.PI * 2 + usePercent
                  if (
                    controlPanel &&
                    controlPanel.s('3d.visible') &&
                    this.lastPushOutBoard === cardNode
                  ) {
                    controlPanel.a(key, bindHtTagRam[key])
                    controlPanel.a(
                      'MEMORY.UTILIZATION.VALUE',
                      bindHtTagRam['MEMORY.UTILIZATION.VALUE']
                    )
                    controlPanel.a('MEMORY.NOT.UTILIZATION', bindHtTagRam['MEMORY.NOT.UTILIZATION'])
                  }
                  break
              }
              break
            }
          }
          cardNode.a('bindHtTagRam', bindHtTagRam)
        }
      } else {
        !this.updateHTValueQueue && (this.updateHTValueQueue = [])
        this.updateHTValueQueue.push({
          type: type,
          tag: tag,
          value: value
        })
      }
    }
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
      this.homeDm.add(scanNode)
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

    this.homeDm.addScheduleTask(this.scanTask)
  }
  stopScanCabinet() {
    this.scanTask && this.homeDm.removeScheduleTask(this.scanTask)
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

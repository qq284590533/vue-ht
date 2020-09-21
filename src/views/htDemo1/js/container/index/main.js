import projectUtil from '../../util/projectUtil'
import Screen from '../../util/screen'
import '../config'
class MainEntry {
  constructor(el) {
    this.loadScreen(el)
    window.test = this
  }
  loadScreen(el) {
    const screen = (this.screen = new Screen())
    screen.init3dScreen(el, g3d => {
      projectUtil.setSkyBox(g3d, 'assets/贴图/天空球/简单黄昏3.jpg')
    })
    screen.init2dScreen()
    this.loadCampus()
    Object.assign(this, { g2d: screen.g2d, g3d: screen.g3d, dm2d: screen.dm2d, dm3d: screen.dm3d })
  }
  removeScreen() {
    this.screen.destory()
  }
  loadCampus() {
    const { screen } = this
    screen.load3dScreen('scenes/浙大/浙大紫金校区.json', null, (g3d, dm3d) => {
      screen.add3dMiEvent(this.miCampus3dEvent, this)
      this.initCampus3dInteractiveNodes()
    })
    screen.load2dScreen('displays/浙江大学紫金校区.json', null, (g2d, dm2d) => {
      screen.add2dMiEvent(this.miCampus2dEvent, this)
      this.initCampus2dInteractiveNodes()
    })
  }
  loadBuilding() {
    const { screen } = this
    screen.load3dScreen('scenes/浙大/楼层.json', null, (g3d, dm3d) => {
      screen.add3dMiEvent(this.miBuilding3dEvent, this)
      this.initBuilding3dInteractiveNodes()
      for (const key in this.buildFloorsMap) {
        projectUtil.floorOpenAnimate(this.buildFloorsMap[key], 50)
      }
    })
    screen.load2dScreen('displays/楼层2d图纸.json', null, (g2d, dm2d) => {
      screen.add2dMiEvent(this.miBuilding2dEvent, this)
      this.initBuilding2dInteractiveNodes()
    })
  }
  loadClassRoom() {
    const { screen } = this
    screen.load3dScreen('scenes/-ing/浙大/教室.json', null, (g3d, dm3d) => {
      screen.add3dMiEvent(this.miClassRoom3dEvent, this)
      this.initClassRoom3dInteractiveNodes()
    })
    screen.load2dScreen('displays/教室2d图纸.json', null, (g2d, dm2d) => {
      screen.add2dMiEvent(this.miClassRoom2dEvent, this)
      this.initClassRoom2dInteractiveNodes()
    })
  }
  initCampus3dInteractiveNodes() {}
  initBuilding3dInteractiveNodes() {
    const { dm3d } = this
    const buildFloorsMap = (this.buildFloorsMap = {})
    dm3d.each(node => {
      const displayName = node.getDisplayName()
      if (displayName && displayName.indexOf('楼层') > -1) {
        if (!buildFloorsMap[displayName]) {
          buildFloorsMap[displayName] = []
        }
        buildFloorsMap[displayName].push(node)
      }
    })
  }
  initClassRoom3dInteractiveNodes() {}
  initCampus2dInteractiveNodes() {
    const { dm2d } = this
    const classRoomPanel = (this.classRoomPanel = [])
    const basicResourcePanel = (this.basicResourcePanel = [])
    dm2d.each(node => {
      const displayName = node.getDisplayName()
      if (displayName === '教室和教学相关') {
        this.classRoomTextNode = node
      }
      if (displayName === '基础资源运维') {
        this.basicResourceTextNode = node
      }
      if (displayName === '选择文字底部矩形') {
        this.selectTextRect = node
      }
      if (displayName && displayName.indexOf('教室和教学相关') > -1 && node instanceof ht.Block) {
        classRoomPanel.push(node)
      }
      if (displayName && displayName.indexOf('基础资源运维') > -1 && node instanceof ht.Block) {
        basicResourcePanel.push(node)
      }
    })
  }
  initBuilding2dInteractiveNodes() {}
  initClassRoom2dInteractiveNodes() {}
  miCampus2dEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const {
        classRoomTextNode,
        classRoomPanel,
        basicResourceTextNode,
        basicResourcePanel,
        selectTextRect
      } = this
      const displayName = data.getDisplayName()
      if (displayName === '教室和教学相关') {
        selectTextRect.p(data.p())
        classRoomTextNode.s('text.color', 'rgb(93, 217, 174)')
        basicResourceTextNode.s('text.color', 'rgb(124, 145, 155)')
        classRoomPanel.forEach(panel => {
          panel.s('2d.visible', true)
        })
        basicResourcePanel.forEach(panel => {
          panel.s('2d.visible', false)
        })
      }
      if (displayName === '基础资源运维') {
        selectTextRect.p(data.p())
        basicResourceTextNode.s('text.color', 'rgb(93, 217, 174)')
        classRoomTextNode.s('text.color', 'rgb(124, 145, 155)')
        basicResourcePanel.forEach(panel => {
          panel.s('2d.visible', true)
        })
        classRoomPanel.forEach(panel => {
          panel.s('2d.visible', false)
        })
      }
    }
  }
  miBuilding2dEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (displayName === '返回') {
        this.loadCampus()
      }
    }
  }
  miClassRoom2dEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (displayName === '返回') {
        this.loadBuilding()
      }
    }
  }
  miCampus3dEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (displayName === '教学楼') {
        this.loadBuilding()
      }
    }
  }
  miBuilding3dEvent(e) {
    const { kind, data } = e
    if (kind === 'clickData') {
      const displayName = data.getDisplayName()
      if (displayName === '进入标签') {
        this.loadClassRoom()
      }
    }
  }
  miClassRoom3dEvent(e) {}
}

export default MainEntry

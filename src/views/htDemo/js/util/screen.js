/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */

export default class Screen {
  constructor() {}
  init2dScreen(callBack) {
    const g3d = this.g3d
    const dm2d = (this.dm2d = new ht.DataModel())
    const g2d = (this.g2d = new ht.graph.GraphView(dm2d))
    const g2dView = g2d.getView()
    g2dView.style.left = '0'
    g2dView.style.right = '0'
    g2dView.style.top = '0'
    g2dView.style.bottom = '0'
    // 选中边框为0
    g2d.getSelectWidth = function() {
      return 0
    }
    // 禁止鼠标缩放
    g2d.handleScroll = function() {}
    // 禁止 touch 下双指缩放
    g2d.handlePinch = function() {}
    // 禁止平移
    g2d.setPannable(false)
    // 禁止框选
    g2d.setRectSelectable(false)
    // 隐藏滚动条
    g2d.setScrollBarVisible(false)
    // 禁止图元移动
    g2d.setMovableFunc(function() {
      return false
    })

    if (g3d) {
      g3d.getView().appendChild(g2d.getView())
    } else {
      g2d.addToDOM()
    }

    window.addEventListener('resize', function(e) {
      g2d.fitContent(false, 0)
    })

    const eventListener = e => {
      const node = g2d.getDataAt(e)
      if (node) {
        e.stopPropagation()
      }
    }
    g2dView.addEventListener('mousedown', eventListener)
    g2dView.addEventListener('mousemove', eventListener)
    g2dView.addEventListener('mouseup', eventListener)

    g2dView.addEventListener('touchstart', eventListener)
    g2dView.addEventListener('touchmove', eventListener)
    g2dView.addEventListener('touchend', eventListener)

    typeof callBack === 'function' && callBack(g2d, dm2d)
  }
  init3dScreen(callBack) {
    const dm3d = (this.dm3d = new ht.DataModel())
    const g3d = (this.g3d = new ht.graph3d.Graph3dView(dm3d))
    g3d.addToDOM()

    typeof callBack === 'function' && callBack(g3d, dm3d)
  }
  load2dScreen(g2dUrl, beforeCallBack, afterCallBack) {
    const dm2d = this.dm2d
    const g2d = this.g2d
    dm2d.clear()
    typeof beforeCallBack === 'function' && beforeCallBack(g2d, dm2d)
    if (typeof g2dUrl === 'string') {
      ht.Default.xhrLoad(g2dUrl, json => {
        if (json) {
          dm2d.deserialize(json)
          g2d.fitContent(false, 0)
          typeof afterCallBack === 'function' && afterCallBack(g2d, dm2d)
        } else {
          console.log('资源加载失败')
        }
      })
    } else if (g2dUrl instanceof ht.Data) {
      const node = g2dUrl
      g2dUrl = null
      dm2d.add(node)
      this.addNodeChilds(node, dm2d)
      typeof afterCallBack === 'function' && afterCallBack(g2d, dm2d)
    }
  }
  load3dScreen(g3dUrl, beforeCallBack, afterCallBack) {
    const dm3d = this.dm3d
    const g3d = this.g3d
    dm3d.clear()
    typeof beforeCallBack === 'function' && beforeCallBack(g3d, dm3d)
    if (typeof g3dUrl === 'string') {
      ht.Default.xhrLoad(g3dUrl, json => {
        if (json) {
          dm3d.deserialize(json)
          const screenJson = ht.Default.parse(json)
          const screenAttr = ht.Default.clone(screenJson.a)
          const defaultScene = (this.defaultScene = screenJson.scene)
          g3d.setEye(defaultScene.eye)
          g3d.setCenter(defaultScene.center)
          g3d.setFar(defaultScene.far)
          g3d.setNear(defaultScene.near)
          typeof afterCallBack === 'function' && afterCallBack(g3d, dm3d, screenAttr)
        } else {
          console.log('资源加载失败')
        }
      })
    } else if (g3dUrl instanceof ht.Data) {
      const node = g3dUrl
      g3dUrl = null
      dm3d.add(node)
      this.addNodeChilds(node, dm3d)
      typeof afterCallBack === 'function' && afterCallBack(g3d, dm3d)
    }
  }
  init2dEvent(miListener, umiListener, scope) {
    const g2d = this.g2d
    umiListener && g2d.umi(umiListener, scope)
    miListener && g2d.mi(miListener, scope)
  }
  init3dEvent(miListener, umiListener, scope) {
    const g3d = this.g3d
    umiListener && g3d.umi(umiListener, scope)
    miListener && g3d.mi(miListener, scope)
  }
  addNodeChilds(node, dm) {
    const childs = node.getChildren()
    if (childs && childs.size() > 0) {
      childs.each(child => {
        dm.add(child)
        const grandSon = child.getChildren()
        if (grandSon && grandSon.size() > 0) {
          this.addNodeChilds(child, dm)
        }
      })
    }
  }
}

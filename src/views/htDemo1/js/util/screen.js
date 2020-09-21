export default class Screen {
  constructor() {
    this.mi2dEventArray = []
    this.mi3dEventArray = []
    this.mp2dEventArray = []
    this.mp3dEventArray = []
  }
  init2dScreen(g2dMouseListener, callBack) {
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
      document.body.appendChild(g2d.getView())
    }
    if (g2dMouseListener) {
      this.g2dMouseListener = g2dMouseListener
      g2dView.addEventListener('mousedown', this.g2dMouseListener)
      g2dView.addEventListener('mousemove', this.g2dMouseListener)
      g2dView.addEventListener('mouseup', this.g2dMouseListener)

      g2dView.addEventListener('touchstart', this.g2dMouseListener)
      g2dView.addEventListener('touchmove', this.g2dMouseListener)
      g2dView.addEventListener('touchend', this.g2dMouseListener)

      g2dView.addEventListener('mousewheel', this.g2dMouseListener)
    }
    this.g2dResizeListener = e => {
      g2d.fitContent(false, 0)
      g2d.iv()
    }
    window.addEventListener('resize', this.g2dResizeListener)

    typeof callBack === 'function' && callBack(g2d, dm2d)
  }
  init3dScreen(parentElement = document.body, callBack) {
    const dm3d = (this.dm3d = new ht.DataModel())
    const g3d = (this.g3d = new ht.graph3d.Graph3dView(dm3d))
    const view = g3d.getView()
    const style = view.style
    style.left = '0'
    style.right = '0'
    style.top = '0'
    style.bottom = '0'
    parentElement.appendChild(view)

    this.g3dResizeListener = e => {
      g3d.iv()
    }
    window.addEventListener('resize', this.g3dResizeListener)

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
  reset2dEvent({ miListener, umiListener, mpListener, umpListener, scope }) {
    miListener && this.add2dMiEvent(miListener, scope)
    umiListener && this.remove2dMiEvent(umiListener, scope)
    mpListener && this.add2dMpEvent(mpListener, scope)
    umpListener && this.remove2dMpEvent(umpListener, scope)
  }
  reset3dEvent({ miListener, umiListener, mpListener, umpListener, scope }) {
    miListener && this.add3dMiEvent(miListener, scope)
    umiListener && this.remove3dMiEvent(umiListener, scope)
    mpListener && this.add3dMpEvent(mpListener, scope)
    umpListener && this.remove3dMpEvent(umpListener, scope)
  }
  add2dMiEvent(miListener, scope) {
    const { g2d, mi2dEventArray } = this
    mi2dEventArray.forEach(addedMiListener => {
      this.remove2dMiEvent(addedMiListener, scope)
    })
    mi2dEventArray.indexOf(miListener) === -1 && this.mi2dEventArray.push(miListener)
    miListener && g2d.mi(miListener, scope)
  }
  remove2dMiEvent(umiListener, scope) {
    const g2d = this.g2d
    umiListener && g2d.umi(umiListener, scope)
  }
  add3dMiEvent(miListener, scope) {
    const { g3d, mi3dEventArray } = this
    mi3dEventArray.forEach(addedMiListener => {
      this.remove3dMiEvent(addedMiListener, scope)
    })
    mi3dEventArray.indexOf(miListener) === -1 && this.mi3dEventArray.push(miListener)
    miListener && g3d.mi(miListener, scope)
  }
  remove3dMiEvent(umiListener, scope) {
    const g3d = this.g3d
    umiListener && g3d.umi(umiListener, scope)
  }
  add2dMpEvent(mpListener, scope) {
    const { g2d, mp2dEventArray } = this
    mp2dEventArray.forEach(addedMpListener => {
      this.remove2dMpEvent(addedMpListener, scope)
    })
    mp2dEventArray.indexOf(mpListener) === -1 && this.mp2dEventArray.push(mpListener)
    mpListener && g2d.mp(mpListener, scope)
  }
  remove2dMpEvent(umpListener, scope) {
    const g2d = this.g2d
    umpListener && g2d.ump(umpListener, scope)
  }
  add3dMpEvent(mpListener, scope) {
    const { g3d, mp3dEventArray } = this
    mp3dEventArray.forEach(addedMpListener => {
      this.remove3dMpEvent(addedMpListener, scope)
    })
    mp3dEventArray.indexOf(mpListener) === -1 && this.mp3dEventArray.push(mpListener)
    mpListener && g3d.mp(mpListener, scope)
  }
  remove3dMpEvent(umpListener, scope) {
    const g3d = this.g3d
    umpListener && g3d.ump(umpListener, scope)
  }
  remove2d() {
    const { g2d, dm2d, g3d } = this
    if (g2d) {
      dm2d.clear()
      if (this.g2dResizeListener) {
        window.removeEventListener('resize', this.g2dResizeListener)
      }
      if (this.g2dMouseListener) {
        const g2dView = g2d.getView()
        g2dView.removeEventListener('mousedown', this.g2dMouseListener)
        g2dView.removeEventListener('mousemove', this.g2dMouseListener)
        g2dView.removeEventListener('mouseup', this.g2dMouseListener)

        g2dView.removeEventListener('touchstart', this.g2dMouseListener)
        g2dView.removeEventListener('touchmove', this.g2dMouseListener)
        g2dView.removeEventListener('touchend', this.g2dMouseListener)

        g2dView.removeEventListener('mousewheel', this.g2dMouseListener)
      }
      if (this.mi2dEventArray.length > 0) {
        this.mi2dEventArray.forEach(event => {
          this.remove2dMiEvent(event)
        })
        this.mi2dEventArray = []
      }
      if (this.mp2dEventArray.length > 0) {
        this.mp2dEventArray.forEach(event => {
          this.remove2dMpEvent(event)
        })
        this.mp2dEventArray = []
      }
      if (g3d) {
        g3d.getView().removeChild(g2d.getView())
      } else {
        document.body.removeChild(g2d.getView())
      }
    }
  }
  remove3d(parentElement) {
    this.remove2d()
    if (this.mi3dEventArray.length > 0) {
      this.mi3dEventArray.forEach(event => {
        this.remove3dMiEvent(event)
      })
      this.mi3dEventArray = []
    }
    if (this.mp3dEventArray.length > 0) {
      this.mp3dEventArray.forEach(event => {
        this.remove3dMpEvent(event)
      })
      this.mp3dEventArray = []
    }
    if (this.g3dResizeListener) {
      window.removeEventListener('resize', this.g3dResizeListener)
    }
    const { g3d, dm3d } = this
    dm3d.clear()
    parentElement.removeChild(g3d.getView())
  }
  destory(parentElement = document.body) {
    this.remove3d(parentElement)
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

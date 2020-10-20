class Screen {
  constructor() {
    this.mi3dEventArray = []
    this.mp3dEventArray = []
  }

  // 初始化3D
  init3dScreen(parentElement = document.body, callBack) {
    const dm3d = (this.dm3d = new ht.DataModel()) // 实例化数据容器（数据模型）
    const g3d = (this.g3d = new ht.graph3d.Graph3dView(dm3d)) // 实例化3D渲染引擎
    const view = g3d.getView() // 获取3D组件根div
    const style = view.style // 设置根div的样式
    // const childs = g3d.getChildren()
    // console.log(childs)
    style.left = '0'
    style.right = '0'
    style.top = '0'
    style.bottom = '0'
    parentElement.appendChild(view) // 将根div插入到一个容器中，通常是用户自定义的一个div

    g3d.setFar(100000)
    this.g3dResizeListener = e => {
      g3d.iv()
    }
    window.addEventListener('resize', this.g3dResizeListener)

    typeof callBack === 'function' && callBack(g3d, dm3d)
  }

  // 加载3D资源
  load3dScreen(g3dUrl, beforeCallBack, afterCallBack) {
    const dm3d = this.dm3d
    const g3d = this.g3d
    dm3d.clear() // 清空容器中所有Data对象
    typeof beforeCallBack === 'function' && beforeCallBack(g3d, dm3d)
    if (typeof g3dUrl === 'string') {
      g3d.deserialize(g3dUrl, function(json, dm3d, g3d, datas) {
        if (json) {
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

  getAllArchivesBoxDatas() {
    const allData = this.dm3d.getDatas()
    const archives = allData.toArray(item => {
      return item.getTag() === '档案盒'
    })
    return archives
  }

  // 添加孩子节点
  addNodeChilds(node, dm) {
    const childs = node.getChildren() // 获取node的所有孩子节点
    if (childs && childs.size() > 0) {
      childs.each(child => {
        dm.add(child)
        const grandSon = child.getChildren()
        if (grandSon && grandSon.size() > 0) {
          this.addNodeChilds(child, dm) // 递归添加孩子节点
        }
      })
    }
  }

  // 注册事件监听函数
  add3dMiEvent(miListener, scoped) {
    const { g3d, mi3dEventArray } = this
    mi3dEventArray.forEach(addedMiListener => {
      this.remove3dMiEvent(addedMiListener, scoped)
    })

    // 如果事件没有被添加到实践列表中就添加进去
    mi3dEventArray.indexOf(miListener) === -1 && this.mi3dEventArray.push(miListener)
    miListener && g3d.mi(miListener, scoped) // mi:增加交互事件监听器，addInteractorListener的缩写
  }

  remove3dMiEvent(umiListener, scoped) {
    const { g3d } = this
    umiListener && g3d.umi(umiListener, scoped) // umi:删除交互事件监听器，removeInteractorListener的缩写
  }
}

export default Screen

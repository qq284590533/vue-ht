const ht = window.ht

const mainUtil = {
  setSkyBox(g3d, url) {
    const sky = new ht.Node()
    sky.s3([100, 100, 100])
    sky.setTag('sky')
    sky.s({
      shape3d: 'sphere',
      'shape3d.image': url,
      'all.reverse.flip': true
    })
    g3d.setSkyBox(sky)
  },
  blurBackground(dataModel, opacityMap, notBlurNode) {
    const opacity = 0.1
    dataModel.each(d => {
      if (!opacityMap[d.getId()]) {
        opacityMap[d.getId()] = {
          'shape3d.opacity': d.s('shape3d.opacity'),
          'shape3d.transparent': d.s('shape3d.transparent'),
          'all.opacity': d.s('all.opacity'),
          'all.transparent': d.s('all.transparent'),
          'left.opacity': d.s('left.opacity'),
          'left.transparent': d.s('left.transparent'),
          'right.opacity': d.s('right.opacity'),
          'right.transparent': d.s('right.transparent'),
          'front.opacity': d.s('front.opacity'),
          'front.transparent': d.s('front.transparent'),
          'back.opacity': d.s('back.opacity'),
          'back.transparent': d.s('back.transparent'),
          'top.opacity': d.s('top.opacity'),
          'top.transparent': d.s('top.transparent'),
          'bottom.opacity': d.s('bottom.opacity'),
          'bottom.transparent': d.s('bottom.transparent'),
          '3d.selectable': d.s('3d.selectable')
        }
      }
      if (notBlurNode instanceof Array) {
        if (notBlurNode.indexOf(d) > -1) {
          return
        }
      } else if (d === notBlurNode || !d.s('3d.selectable')) return
      d.s({
        'shape3d.opacity': opacity,
        'shape3d.transparent': true,
        'all.opacity': opacity,
        'all.transparent': true,
        'left.opacity': opacity,
        'left.transparent': true,
        'right.opacity': opacity,
        'right.transparent': true,
        'front.opacity': opacity,
        'front.transparent': true,
        'back.opacity': opacity,
        'back.transparent': true,
        'top.opacity': opacity,
        'top.transparent': true,
        'bottom.opacity': opacity,
        'bottom.transparent': true,
        '3d.selectable': false
      })
    })
  },
  restoreBackground(dataModel, opacityMap) {
    dataModel.each(d => {
      d.s(opacityMap[d.getId()])
    })
  },
  flyToView(g3d, eye, center, cb) {
    const e = ht.Default.clone(g3d.getEye())
    const c = ht.Default.clone(g3d.getCenter())

    const edx = eye[0] - e[0]
    const edz = eye[1] - e[1]
    const edy = eye[2] - e[2]
    const cdx = center[0] - c[0]
    const cdz = center[1] - c[1]
    const cdy = center[2] - c[2]
    ht.Default.startAnim({
      duration: 500,
      finishFunc: function() {
        if (typeof cb === 'function') {
          cb()
        }
      },
      action: function(v) {
        g3d.setEye([e[0] + edx * v, e[1] + edz * v, e[2] + edy * v])
        g3d.setCenter([c[0] + cdx * v, c[1] + cdz * v, c[2] + cdy * v])
      }
    })
  },
  getCabinetChilds(cabinetNode) {
    const nodeParent = cabinetNode.getParent()
    const nodeParentName = nodeParent ? nodeParent.getDisplayName() : null
    const nodeName = cabinetNode.getDisplayName()
    let childs = []
    const result = {
      cabinetNode: null,
      childsObj: {},
      childsArr: []
    }
    if (/机柜/.test(nodeName)) {
      result.cabinetNode = cabinetNode
      childs = cabinetNode.getChildren().toArray()
    }
    if (/机柜/.test(nodeParentName)) {
      result.cabinetNode = cabinetNode.getParent()
      childs = cabinetNode
        .getParent()
        .getChildren()
        .toArray()
    }
    if (childs.length > 0) {
      for (let i = 0, l = childs.length; i < l; i++) {
        const temp = childs[i]
        const displayName = temp.getDisplayName()
        if (/门/.test(displayName)) {
          result.childsObj['door'] = temp
          result.childsArr.push(temp)
        } else if (/显卡/.test(displayName)) {
          !result.childsObj['card'] && (result.childsObj['card'] = [])
          const childs = temp.getChildren()
          childs.forEach(child => {
            result.childsArr.push(child)
            mainUtil.pushChildsToNotBlur(result, child)
          })
          result.childsArr.push(temp)
          result.childsObj['card'].push(temp)
        } else {
          result.childsArr.push(temp)
        }
      }
    }
    return result
  },
  pushChildsToNotBlur(result, node) {
    const childs = node.getChildren()
    if (childs && childs.size() > 0) {
      childs.each(child => {
        result.childsArr.push(child)
        mainUtil.pushChildsToNotBlur(result, child)
      })
    }
  },
  isCabinetNode(cabinetNode) {
    if (cabinetNode && cabinetNode.getDisplayName) {
      const nodeName = cabinetNode.getDisplayName()
      if (nodeName && /机柜/.test(nodeName)) {
        return true
      }
      const cabinetChilds = mainUtil.getCabinetChilds(cabinetNode).childsArr
      if (cabinetChilds.length > 0) {
        return true
      }
    }
    return false
  },
  blendNodeAndChilds(node, color) {
    node.s('shape3d.blend', color)
    const childs = node.getChildren()
    if (childs && childs.size() > 0) {
      childs.each(child => {
        mainUtil.blendNodeAndChilds(child, color)
      })
    }
  },
  getStatusByValue(value) {
    if (value === 254) {
      return {
        status: '正常',
        color: undefined
      }
    } else if (value >= 0 && value < 10) {
      return {
        status: '故障',
        color: 'rgb(242, 83, 75)'
      }
    } else if (value >= 10 && value < 20) {
      return {
        status: '异常',
        color: 'rgb(255, 165, 0)'
      }
    } else if (value === 255) {
      return {
        status: '未知',
        color: 'rgb(128, 128, 128)'
      }
    } else {
      return null
    }
  },
  getCabinetMaxStatusBySoftAndHardWare(getStatusByValue, cardNode) {
    const cabinetAndChilds = mainUtil.getCabinetChilds(cardNode)
    const { card } = cabinetAndChilds.childsObj
    if (card && card.length > 0) {
      let minColor = 255
      for (let i = 0, l = card.length; i < l; i++) {
        const softWareMaxValue = card[i].a('softWareMaxValue')
        if (softWareMaxValue !== undefined) {
          if (minColor > softWareMaxValue) {
            minColor = softWareMaxValue
          }
        }
        const hardWareMaxValue = card[i].a('hardWareMaxValue')
        if (hardWareMaxValue !== undefined) {
          if (minColor > hardWareMaxValue) {
            minColor = hardWareMaxValue
          }
        }
      }
      return getStatusByValue(minColor)
    }
  },
  getCardMaxStatusBySoftAndHardWare(getStatusByValue, cardNode) {
    const bindHtTagList = cardNode.a('bindHtTagList')
    let minColorValue = 255
    for (let i = 0, l = bindHtTagList.length; i < l; i++) {
      const softValues = parseInt(bindHtTagList[i].softValues)
      if (softValues < minColorValue) {
        minColorValue = softValues
      }
    }
    const hardWareMaxValue = cardNode.a('hardWareMaxValue')
    if (hardWareMaxValue !== undefined && hardWareMaxValue < minColorValue) {
      minColorValue = hardWareMaxValue
    }
    const statusData = getStatusByValue(minColorValue)
    if (statusData) {
      mainUtil.blendNodeAndChilds(cardNode, statusData.color)
      cardNode.a('softWareMaxValue', minColorValue)
    }
  }
}

export default mainUtil

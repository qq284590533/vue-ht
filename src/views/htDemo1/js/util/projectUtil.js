/* eslint-disable indent */
export default {
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
      duration: 3000,
      easing: function(t) {
        return t
      },
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
  setSkyBox(g3d, url) {
    const sky = new ht.Node()
    sky.s3([100, 100, 100])
    sky.setTag('sky')
    sky.s({
      shape3d: 'sphere',
      'shape3d.image': url,
      'all.reverse.flip': true,
      'shape3d.blend': 'rgb(48,59,77)',
      'shape3d.image.cache': true
    })
    g3d.setSkyBox(sky)
  },
  blurBackground(dataModel, notBlurNode) {
    if (!this.opacityMap) {
      this.opacityMap = {}
    }
    const opacity = 0.1
    const opacityMap = this.opacityMap
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
  restoreBackground(dataModel) {
    const opacityMap = this.opacityMap
    dataModel.each(d => {
      d.s(opacityMap[d.getId()])
    })
  },
  floorOpenAnimate(floorNodes, floorSpace, callAnimateStepTimes = 50, startFloorIndex) {
    floorNodes.sort((node1, node2) => {
      return node1.getElevation() - node2.getElevation()
    })
    const floorNodeLength = floorNodes.length
    const middleFloorIndex =
      startFloorIndex !== undefined
        ? startFloorIndex
        : floorNodeLength % 2 === 0
        ? floorNodeLength / 2 - 1
        : Math.floor(floorNodeLength / 2)
    const aboveFloors = floorNodes.slice(middleFloorIndex + 1, floorNodes.length)
    const underFloors = floorNodes.slice(0, middleFloorIndex).reverse()
    let currentCallTime = 0
    const initFloorsOpenSpeed = () => {
      aboveFloors.forEach((floorNode, index) => {
        const changeYValue = (index + 1) * floorSpace
        const stepY = changeYValue / callAnimateStepTimes
        floorNode.a('stepY', stepY)
        floorNode.a('endY', floorNode.getElevation() + changeYValue)
      })
      underFloors.forEach((floorNode, index) => {
        const changeYValue = (index + 1) * floorSpace
        const stepY = changeYValue / callAnimateStepTimes
        floorNode.a('stepY', stepY)
        floorNode.a('endY', floorNode.getElevation() - changeYValue)
      })
    }
    initFloorsOpenSpeed()
    const animateStep = () => {
      if (aboveFloors.length > 0) {
        aboveFloors.forEach((floorNode, index) => {
          const stepY = floorNode.a('stepY')
          const endY = floorNode.a('endY')
          const nextY = floorNode.getElevation() + stepY
          if (nextY < endY) {
            floorNode.setElevation(nextY)
          }
        })
      }
      if (underFloors.length > 0) {
        underFloors.forEach((floorNode, index) => {
          const stepY = floorNode.a('stepY')
          const endY = floorNode.a('endY')
          const nextY = floorNode.getElevation() - stepY
          if (nextY > endY) {
            floorNode.setElevation(nextY)
          }
        })
      }
      currentCallTime++
      if (currentCallTime <= callAnimateStepTimes) {
        window.requestAnimationFrame(animateStep)
      }
    }
    window.requestAnimationFrame(animateStep)
  }
}

export default class Inspect {
  /*
    inspectList: [
        {roadTag: 'road1', inspectTime: 2000, beginCallBack: () => {}, endCallBack: () => {}},
        {objectTag: 'object1', inspectTime: 2000, beginCallBack: () => {}, endCallBack: () => {}},
        {roadTag: 'road2', inspectTime: 2000, beginCallBack: () => {}, endCallBack: () => {}},
        {action: () => {}, actionPause: () => {}, actionResume: () => {}, actionStop: () => {}, inspectTime: 4000, beginCallBack: () => {}, endCallBack: () => {}}
        {roadPoints: [{x: 100, y: 200}, {x: 300, y: 900},], inspectTime: 2000, beginCallBack: () => {}, endCallBack: () => {}},
    ] action 时 inspectTime 为 0 可在业务里手动调用 inspectNext 继续开始下一个巡查
     */
  constructor(g3dScreen, g3dDm, scene, inspectList) {
    this.g3dScreen = g3dScreen
    this.g3dDm = g3dDm
    this.scene = scene
    this.personHeight = 140 // 当前巡检人视角高度
    this.isEndBackToScene = true // 当巡检结束是否返回到传入的 scene
    inspectList && this.initInspectList(inspectList)
  }
  // 开始巡查
  startInspect() {
    if (this.isInspecting) {
      return
    }
    this.inspectIndex = 0
    this.isInspecting = true
    this.judgeInspectType()
  }
  // 暂停巡查
  pauseInspect() {
    this.actionData && this.actionData.actionPause()
    this.walkControll && this.walkControll.pause()
    this.isPause = true
    if (this.inspectObjTimeout) {
      clearTimeout(this.inspectObjTimeout)
      this.inspectObjTimeout = 'timePause'
    }
  }
  // 继续巡查
  resumeInspect() {
    this.actionData && this.actionData.actionResume()
    this.walkControll && this.walkControll.resume()
    this.isPause = false
    if (this.stepNum !== null) {
      window.requestAnimationFrame(this.rotateStep.bind(this))
    }
    if (this.inspectObjTimeout === 'timePause') {
      this.currentObjEndCallBack && this.currentObjEndCallBack()
      this.currentObjEndCallBack = null
      this.inspectObjTimeout = null
      this.inspectIndex++
      if (this.inspectIndex < this.inspectList.length) {
        this.judgeInspectType()
      } else {
        this.endInspect()
      }
    }
  }
  // 结束巡查
  endInspect() {
    this.actionData && this.actionData.actionStop()
    this.actionData = null
    this.isInspecting = false
    this.walkControll && this.walkControll.stop()
    this.walkControll = null
    this.inspectObjTimeout && clearTimeout(this.inspectObjTimeout)
    this.inspectObjTimeout = null
    this.isPause = false
    this.currentObjEndCallBack && this.currentObjEndCallBack()
    this.currentObjEndCallBack = null
    this.isEndBackToScene && this.flyToView(this.g3dScreen, this.scene.eye, this.scene.center)
  }
  startInspectRoad(roadData) {
    const { points, beginCallBack, endCallBack } = roadData
    this.roadForwardIndex = 0
    const point1 = points[0]
    const point2 = points[1]
    const patrolEye = [point1.x, this.personHeight, point1.y]
    const patrolCenter = [point2.x, this.personHeight, point2.y]
    this.currentObjEndCallBack = endCallBack
    this.flyToView(this.g3dScreen, patrolEye, patrolCenter, () => {
      if (this.isInspecting) {
        typeof beginCallBack === 'function' && beginCallBack()
        this.inspectNextRoad(roadData)
      }
    })
  }
  inspectNextRoad(roadData) {
    const { points, endCallBack } = roadData
    const roadForwardIndex = this.roadForwardIndex
    const g3dScreen = this.g3dScreen
    const point1 = points[roadForwardIndex]
    const point2 = points[roadForwardIndex + 1]
    const distanceVector = new ht.Math.Vector2(point2.x - point1.x, point2.y - point1.y)
    const distance = distanceVector.length()

    distanceVector.setLength(distance + 10)
    distanceVector.add(new ht.Math.Vector2({ x: point1.x, y: point1.y }))

    g3dScreen.setEye([point1.x, this.personHeight, point1.y])
    g3dScreen.setCenter([point2.x, this.personHeight, point2.y])
    this.walkControll = g3dScreen.walk(distance, {
      duration: point1.inspectTime || 1000,
      easing: t => {
        return t
      },
      finishFunc: () => {
        if (this.isInspecting) {
          this.roadForwardIndex += 1
          this.walkControll = null
          if (this.roadForwardIndex < points.length - 1) {
            const point3 = points[roadForwardIndex + 2]
            const toCenter = new ht.Math.Vector2(
              point3.x - point2.x,
              point3.y - point2.y
            ).setLength(10)
            this.fromCenter = distanceVector
            this.toCenter = toCenter.add(new ht.Math.Vector2({ x: point2.x, y: point2.y }))
            this.stepNum = -1
            this.curRoadData = roadData
            this.curRotateVal = Math.abs(point2.rotate)
            window.requestAnimationFrame(this.rotateStep.bind(this))
          } else {
            typeof endCallBack === 'function' && endCallBack()
            this.currentObjEndCallBack = null
            this.curRoadData = null
            this.inspectIndex++
            if (this.inspectIndex < this.inspectList.length) {
              this.judgeInspectType()
            } else {
              this.endInspect()
            }
          }
        }
      }
    })
  }
  startInspectObject(objData) {
    const { inspectNode, inspectTime, beginCallBack, endCallBack } = objData
    this.g3dScreen.flyTo(inspectNode, {
      animation: true,
      direction: this.inspectObjDirection || [0, 12, 12],
      distance: this.inspectObjDistance || 200
    })
    typeof beginCallBack === 'function' && beginCallBack()
    this.currentObjEndCallBack = endCallBack
    this.inspectObjTimeout = setTimeout(() => {
      typeof endCallBack === 'function' && endCallBack()
      this.currentObjEndCallBack = null
      this.inspectIndex++
      this.inspectObjTimeout = null
      if (this.inspectIndex < this.inspectList.length) {
        this.judgeInspectType()
      } else {
        this.endInspect()
      }
    }, inspectTime)
  }
  startDoAction(actionData) {
    const { action, inspectTime, beginCallBack, endCallBack } = actionData
    typeof beginCallBack === 'function' && beginCallBack()
    typeof action === 'function' && action()
    this.currentObjEndCallBack = endCallBack
    this.actionData = actionData
    if (inspectTime > 0) {
      setTimeout(() => {
        typeof endCallBack === 'function' && endCallBack()
        this.currentObjEndCallBack = null
        this.actionData = null
        this.inspectIndex++
        if (this.inspectIndex < this.inspectList.length) {
          this.judgeInspectType()
        } else {
          this.endInspect()
        }
      }, inspectTime)
    }
  }
  inspectNext() {
    this.currentObjEndCallBack && this.currentObjEndCallBack()
    this.currentObjEndCallBack = null
    this.actionData = null
    this.inspectIndex++
    if (this.inspectIndex < this.inspectList.length) {
      this.judgeInspectType()
    } else {
      this.endInspect()
    }
  }
  judgeInspectType() {
    const currentInspect = this.inspectList[this.inspectIndex]
    const toString = Object.prototype.toString
    if (toString.call(currentInspect) === '[object Object]') {
      if (currentInspect.action) {
        this.startDoAction(currentInspect)
      } else if (currentInspect.inspectNode) {
        this.startInspectObject(currentInspect)
      } else if (currentInspect.points) {
        this.startInspectRoad(currentInspect)
      }
    }
  }
  initInspectList(inspectList) {
    this.inspectList = []
    if (inspectList instanceof Array) {
      inspectList.forEach(inspect => {
        if (inspect.roadTag || inspect.roadPoints) {
          this.convertPoints(inspect)
        } else if (inspect.objectTag) {
          this.convertObjects(inspect)
        } else if (inspect.action) {
          this.convertAction(inspect)
        }
      })
    }
  }
  convertPoints(roadData) {
    let roadPoints = null
    const inspectTime = roadData.inspectTime || 1000
    if (roadData.roadTag) {
      // 根据标签名称获取路线数据模型
      const inspectRoad = this.g3dDm.getDataByTag(roadData.roadTag)
      if (inspectRoad) {
        // 获取路线的点位信息
        roadPoints = inspectRoad.getPoints().toArray()
      }
    } else {
      roadPoints = roadData.roadPoints
    }
    const points = []
    const rotateArr = this.getRotateVal(roadPoints)
    const timePercent = this.getRoadTimePercent(roadPoints)
    roadPoints.forEach(function(point, index) {
      points.push({
        x: point.x,
        y: point.y,
        rotate: rotateArr[index],
        inspectTime: Math.ceil(timePercent[index] * inspectTime)
      })
    })
    this.inspectList.push({
      points: points,
      beginCallBack: roadData.beginCallBack || function() {},
      endCallBack: roadData.endCallBack || function() {}
    })
  }
  convertObjects(objData) {
    const { objectTag, inspectTime, beginCallBack, endCallBack } = objData
    this.inspectList.push({
      inspectNode: this.g3dDm.getDataByTag(objectTag),
      inspectTime: inspectTime || 1000,
      beginCallBack: beginCallBack || function() {},
      endCallBack: endCallBack || function() {}
    })
  }
  convertAction(actionData) {
    const {
      action,
      actionPause,
      actionResume,
      actionStop,
      inspectTime,
      beginCallBack,
      endCallBack
    } = actionData
    this.inspectList.push({
      action: action || function() {},
      actionPause: actionPause || function() {},
      actionResume: actionResume || function() {},
      actionStop: actionStop || function() {},
      inspectTime: inspectTime,
      beginCallBack: beginCallBack || function() {},
      endCallBack: endCallBack || function() {}
    })
  }
  // 设置当巡检结束时是否视野返回到 scene 中传入的 eye 以及 center 的位置
  setIsEndBackToScene(isEndBackToScene) {
    this.isEndBackToScene = isEndBackToScene
  }
  // 设置观察物体时的视角方向 参数为 [0, 12, 12] 数组
  setInspectObjDirection(inspectObjDirection) {
    this.inspectObjDirection = inspectObjDirection
  }
  // 设置观察物体时距离物体的距离
  setInspectObjDistance(inspectObjDistance) {
    this.inspectObjDistance = inspectObjDistance
  }
  // 设置巡视人物眼睛的高度
  setPersonInspectHeight(personHeight) {
    this.personHeight = personHeight
  }
  // 初始化巡视列表
  setInspectList(inspectList) {
    this.initInspectList(inspectList)
  }
  // 设置视角旋转时候屏幕每帧旋转的角度 angle 默认为 Math.PI / 180 即每帧旋转一度
  setRotateStepFrame(angle) {
    this.rotateFrame = angle
  }
  rotateStep() {
    this.stepNum = this.stepNum + 1
    if (this.stepNum >= 0 && !this.isPause) {
      const rotateCenter = this.getCenterPercent()
      this.g3dScreen.setCenter(rotateCenter)
      window.requestAnimationFrame(this.rotateStep.bind(this))
    } else if (this.stepNum < 0) {
      if (this.isInspecting) {
        this.fromCenter = null
        this.toCenter = null
        this.stepNum = null
        this.curRotateVal = null
        this.inspectNextRoad(this.curRoadData)
      }
    }
  }
  getCenterPercent() {
    const fromCenter = this.fromCenter
    const toCenter = this.toCenter
    const rotateValue = this.rotateFrame || Math.PI / 180 // 每帧转一度
    const centerVector = new ht.Math.Vector2(toCenter.x - fromCenter.x, toCenter.y - fromCenter.y)
    const centerVectorLength = centerVector.length()
    let rotatePercent = (rotateValue * this.stepNum) / this.curRotateVal
    if (rotatePercent >= 1) {
      rotatePercent = 1
      this.stepNum = -2
    }
    const newLength = rotatePercent * centerVectorLength
    centerVector.setLength(newLength)
    const newCenterVector = centerVector.add(fromCenter)
    const newCenterPosition = [newCenterVector.x, this.personHeight, newCenterVector.y]
    return newCenterPosition
  }
  getRoadTimePercent(points) {
    let length = 0
    const distanceArr = []
    const timePercent = []
    points.forEach((point, index) => {
      if (index <= points.length - 2) {
        const nextPoint = points[index + 1]
        const distanceX = nextPoint.x - point.x
        const distanceY = nextPoint.y - point.y
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        distanceArr.push(distance)
        length = length + distance
      }
    })
    distanceArr.push(0)
    distanceArr.forEach(distance => {
      timePercent.push(distance / length)
    })
    return timePercent
  }
  getRotateVal(points) {
    const rotateArr = [0]
    for (let i = 1, l = points.length - 1; i < l; i++) {
      const fromPoint = points[i - 1]
      const midPoint = points[i]
      const toPoint = points[i + 1]
      const fromLine = {
        x: midPoint.x - fromPoint.x,
        y: midPoint.y - fromPoint.y
      }
      const toLine = {
        x: toPoint.x - midPoint.x,
        y: toPoint.y - midPoint.y
      }

      // 计算路线长度（勾股定理）
      const fromLineLength = Math.sqrt(Math.pow(fromLine.x, 2) + Math.pow(fromLine.y, 2))
      const toLineLength = Math.sqrt(Math.pow(toLine.x, 2) + Math.pow(toLine.y, 2))
      const unitVectorFrom = {
        x: fromLine.x / fromLineLength,
        y: fromLine.y / fromLineLength
      }
      const unitVectorTo = {
        x: toLine.x / toLineLength,
        y: toLine.y / toLineLength
      }

      // 计算向量长度
      const vectorFromLength = Math.sqrt(
        Math.pow(unitVectorFrom.x, 2) + Math.pow(unitVectorFrom.y, 2)
      )
      const vectorToLength = Math.sqrt(Math.pow(unitVectorTo.x, 2) + Math.pow(unitVectorTo.y, 2))

      // 向量法计算余弦值
      const angleVal =
        (unitVectorFrom.x * unitVectorTo.x + unitVectorFrom.y * unitVectorTo.y) /
        (vectorFromLength * vectorToLength)

      // 反余弦计算角度
      const angle = Math.acos(angleVal)
      const k = fromLine.x * toLine.y - toLine.x * fromLine.y
      if (k < 0) {
        rotateArr.push(angle)
      } else if (k > 0) {
        rotateArr.push(-angle)
      } else if (k === 0) {
        rotateArr.push(0)
      }
    }
    rotateArr.push(0)
    return rotateArr
  }
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
      duration: 1000,
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
  }
}

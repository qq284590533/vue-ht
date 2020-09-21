/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable indent */
export default {
  trim: s => {
    return s.replace(/^\s+|\s+$/g, '')
  },
  formatDate(date, formatStr) {
    var str = formatStr
    var Week = ['日', '一', '二', '三', '四', '五', '六']

    str = str.replace(/yyyy|YYYY/, date.getFullYear())
    str = str.replace(
      /yy|YY/,
      date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100)
    )
    var month = date.getMonth() + 1
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month)
    str = str.replace(/M/g, month)

    str = str.replace(/w|W/g, Week[date.getDay()])

    str = str.replace(
      /dd|DD/,
      date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate()
    )
    str = str.replace(/d|D/g, date.getDate())

    str = str.replace(
      /hh|HH/,
      date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours()
    )
    str = str.replace(/h|H/g, date.getHours())
    str = str.replace(
      /mm/,
      date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes()
    )
    str = str.replace(/m/g, date.getMinutes())
    str = str.replace(
      /ss|SS/,
      date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds()
    )
    str = str.replace(/s|S/g, date.getSeconds())

    return str
  },
  random(min, max) {
    if (max === undefined) {
      max = min
      min = 0
    }
    const rang = max - min
    return Math.floor(Math.random() * rang) + min
  },
  randomFloat(min, max) {
    if (max === undefined) {
      max = min
      min = 0
    }
    var rang = max - min
    return Math.random() * rang + min
  },
  setBindingData(dm, values) {
    dm.each(data => {
      var dataBindings = data.getDataBindings()
      if (dataBindings) {
        // update attrs
        for (var name in dataBindings.a) {
          var db = dataBindings.a[name]
          var value = values[db.id]
          if (value) {
            if (db.func) {
              value = db.func(value)
            }
            data.a(name, value)
          }
        }
        // update styles
        for (var name in dataBindings.s) {
          var db = dataBindings.s[name]
          var value = values[db.id]
          if (value) {
            if (db.func) {
              value = db.func(value)
            }
            data.s(name, value)
          }
        }
        // update properties
        for (var name in dataBindings.p) {
          var db = dataBindings.p[name]
          var value = values[db.id]
          if (value) {
            if (db.func) {
              value = db.func(value)
            }
            data[ht.Default.setter(name)](value)
          }
        }
      }
    })
  },
  toScreenPosition(gv, p) {
    var tx = gv.tx()
    var ty = gv.ty()
    var scale = gv._zoom

    return {
      x: p.x * scale + tx,
      y: p.y * scale + ty
    }
  },
  latLonToLogical: (function() {
    const CHINA_CENTER_WM = { x: 11131949.077777777, y: 3503549.843016676 }
    // let CHINA_CENTER = { x: 0, y: 0 };
    const MAX_P = 20037508.34
    return function(lon, lat) {
      var p = { x: 0, y: 0 }
      p.x = (lon * MAX_P) / 180.0
      var y = Math.log(Math.tan(((90.0 + lat) * Math.PI) / 360.0)) / (Math.PI / 180.0)
      p.y = (y * MAX_P) / 180.0
      p.x = p.x - CHINA_CENTER_WM.x
      p.y = p.y - CHINA_CENTER_WM.y
      p.x = p.x / 3000.0
      p.y = p.y / 3000.0
      p.y = 0 - p.y
      return p
    }
  })(),
  ajax(option) {
    const { url, type = 'get', data, dataType, resultType = 'json' } = option

    let xhrRequest = null
    if (window.XMLHttpRequest) {
      xhrRequest = new XMLHttpRequest()
    } else {
      xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')
    }
    let str = ''
    xhrRequest.open(type, url, true)
    if (type.toUpperCase() === 'POST' && data != null) {
      if (dataType === 'json') {
        xhrRequest.setRequestHeader('Content-type', 'application/json;charset=utf-8')
        // xhrRequest.overrideMimeType('application/json');
        str = data
      } else if (dataType === 'text') {
        xhrRequest.setRequestHeader('Content-type', 'text/plain')
        str = data
      } else {
        xhrRequest.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded;charset=utf-8'
        )
        for (var key in data) {
          str += '&' + key + '=' + data[key]
        }
        str = str.slice(1)
      }
    } else {
      str = null
    }
    xhrRequest.onreadystatechange = function() {
      if (xhrRequest.readyState === 4) {
        if (xhrRequest.status === 200) {
          let responseData = null
          if (xhrRequest.responseText) {
            if (resultType === 'json') {
              responseData = JSON.parse(xhrRequest.responseText)
            } else if (resultType === 'text') {
              responseData = xhrRequest.responseText
            }
          }
          option.success(responseData)
        } else {
          console.log(xhrRequest.status)
          if (option.erorr) {
            option.error(xhrRequest.status)
          }
        }
      }
    }
    xhrRequest.send(str)
  },
  setCSSFull(dom) {
    const style = dom.style
    style.position = 'absolute'
    style.top = 0
    style.right = 0
    style.bottom = 0
    style.left = 0
  },
  setValueWithAnimation(node, name, value, format, accesstype = 'a') {
    let oldValue
    if (accesstype === 'a') {
      oldValue = node.a(name)
    } else if (accesstype === 's') {
      oldValue = node.s(name)
    } else {
      oldValue = node[ht.Default.getter(name)]()
    }
    value *= 1
    const range = value - oldValue

    ht.Default.startAnim({
      frames: 12,
      interval: 10,
      easing: function(t) {
        return 1 - --t * t * t * t
      },
      action: (v, t) => {
        let newValue = oldValue + range * v
        if (format) {
          newValue = format(newValue)
        }
        if (accesstype === 'a') {
          node.a(name, newValue)
        } else if (accesstype === 's') {
          node.s(name, newValue)
        } else {
          node[ht.Default.setter(name)]()(node, newValue)
        }
      }
    })
  },
  prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n)
  },
  randomNumBetween(Min, Max) {
    var Range = Max - Min
    var Rand = Math.random()
    var num = Min + Math.round(Rand * Range) // 四舍五入
    return num
  },
  getRandomValue(range, maxBits, pointNum) {
    let reg = null
    if (pointNum !== undefined) {
      reg = new RegExp('(\\d)(?=(?:\\d{' + pointNum + '})+$)', 'g')
      return this.prefixInteger(this.randomNumBetween(range[0], range[1]), maxBits).replace(
        reg,
        '$1,'
      )
    } else {
      return this.prefixInteger(this.randomNumBetween(range[0], range[1]), maxBits)
    }
  },
  isDom(obj) {
    typeof HTMLElement === 'object'
      ? function(obj) {
          return obj instanceof HTMLElement
        }
      : function(obj) {
          return (
            obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
          )
        }
  }
}

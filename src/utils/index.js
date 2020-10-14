/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}
/**
 * 时间戳转换成日期 njy 20190110
 */
export function formatDate(date, fmt) {
  if (date && date !== '') {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    return date.getFullYear() + '-' + o['M+'] + '-' + o['d+']
    // if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    // for (const k in o) {
    //   if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    // }
  }
}
/**
 * 完整的时间戳转换成日期 cb 20200119
 */
export function formatDateFull(date, fmt) {
  if (date && date !== '') {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    return (
      date.getFullYear() +
      '-' +
      o['M+'] +
      '-' +
      o['d+'] +
      ' ' +
      o['h+'] +
      ':' +
      o['m+'] +
      ':' +
      o['s+']
    )
    // if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    // for (const k in o) {
    //   if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    // }
  }
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * @author yaodongcai
 * github yaodongcai@github
 * 聚合数组为tree的结构 这种写法V1 暂时为一个过渡时期 后面优化一个更好的方法来递归parentId菜单
 * @param { Array list} 数组原始数据
 * @param { String idStr } key
 * @param { String pIdStr } 父id
 * 使用方法 // let menuList = transListToTree(data.data, 'id', 'parentId')
 */
export function transListToTreeV1(list = [], idStr, pIdStr, tag = 'list') {
  const result = []
  const temp = {}
  for (let i = 0; i < list.length; i++) {
    temp[list[i][idStr]] = list[i] // 根据id 来转换为所有的数组为对象
  }
  for (let j = 0; j < list.length; j++) {
    const tempVp = temp[list[j][pIdStr]] // 获取每一个子对象的父对象
    if (tempVp) {
      // 判断父对象是否存在，如果不存在直接将对象放到第一层
      if (!tempVp[tag]) tempVp[tag] = [] // 如果父元素的nodes对象不存在，则创建数组
      tempVp[tag].push(list[j]) // 将本对象压入父对象的nodes数组
    } else {
      result.push(list[j]) // 将不存在父对象的对象直接放入一级目录
    }
  }
  return result
}
/**
 * @author yaodongcai
 * github yaodongcai@github
 * 聚合数组为tree的结构 利用递归来判断
 * 这个里面需要挖掘出2个东西：
 *  {
 *    1： 规律： node.parentId == id
 *    2： 递归的截止条件：node.parentId 为空的时候
 *  }
 * @param { Array list} 数组原始数据
 * @param { String parentId } 父id
 * @param { String tag } 表示子代的字段 默认为list 或者tag='childList'
 */
export function transListToTree(menuList, parentId, tag = 'list') {
  const result = []
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i]
    if (menu.parentId === parentId) {
      let label = ''
      if (Object.prototype.hasOwnProperty.call(menu, 'name')) {
        label = menu.name
      }
      if (Object.prototype.hasOwnProperty.call(menu, 'label')) {
        label = menu.label
      }
      const node = { ...menu, label: label }
      node[tag] = transListToTree(menuList, node.id, tag)
      result.push(node)
    }
  }
  return result
}

export function transformTozTreeFormat(key, parentKey, tag, sNodes) {
  var i
  var l
  if (!key || key === '' || !sNodes) return []

  if (sNodes instanceof Array) {
    var r = []
    var tmpMap = {}
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (Object.prototype.hasOwnProperty.call(sNodes, 'name')) {
        sNodes[i].label = sNodes[i].name
      }
      sNodes[i][tag] = []
      tmpMap[sNodes[i][key]] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i][parentKey]]
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        var children = nodeChildren(tag, p)
        if (!children) {
          children = nodeChildren(tag, p, [])
        }
        children.push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  } else {
    return [sNodes]
  }
}

export function nodeChildren(tag, node, newChildren) {
  if (!node) {
    return null
  }
  var key = tag
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren
  }
  return node[key]
}
/**
 *
 * @param list 返回的数组 可以为一个空数组
 * @param dataSource 原数组
 * @returns {*}
 */
export function transTreeToList(list, dataSource, isIcon = false) {
  if (!(Array.isArray(dataSource) && dataSource.length > 0)) return
  dataSource.map(father => {
    if (isIcon) {
      // 是单位
      if (father.orgType === '1') {
        father.iconClass = 'hx-icon-process'
      }
      // 是部门
      if (father.orgType === '2') {
        father.iconClass = 'hx-icon-approval'
      }
      // 是团队
      if (father.orgType === '3') {
        father.iconClass = 'hx-icon-card'
      }
    }
    if (typeof father.childrenOrgList === 'undefined') {
      return false
    } else {
      transTreeToList(list, father.childrenOrgList, isIcon)
    }
  })
  return dataSource
}

/**
 * 改变url的参数的值
 * @param url
 * @param arg
 * @param arg_val
 * @returns {*}
 */
export function changeURLArg(url, arg, arg_val) {
  const pattern = arg + '=([^&]*)'
  const replaceText = arg + '=' + arg_val
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi'
    // eslint-disable-next-line no-eval
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText
    } else {
      return url + '?' + replaceText
    }
  }
}

export function isFontClassOrSVG(iconName) {
  if (iconName) {
    const result = (iconName + '')[0] !== '#'
    return result
  }
  return true
}

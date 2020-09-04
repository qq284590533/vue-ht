let pormiseList = []

function createScriptEle(src) {
  pormiseList.push(
    new Promise((resolve, reject) => {
      if (document.querySelector(`[data-src="${src}"]`)) resolve(true)
      const scriptEle = document.createElement('script')
      scriptEle.setAttribute('type', 'text/javascript')
      scriptEle.setAttribute('data-src', src)
      scriptEle.async = false
      scriptEle.src = src
      document.head.appendChild(scriptEle)

      // 超时30s视为加载失败
      setTimeout(() => {
        reject(`脚本: ${src} 加载超时！`)
      }, 30000)

      if (scriptEle.readyState) {
        scriptEle.onreadystatechange = () => {
          if (scriptEle.readyState === 'complete' || scriptEle.readyState === 'loaded') {
            scriptEle.onreadystatechange = null
            resolve(true)
          } else {
            reject(`脚本: ${src} 加载出错！`)
          }
        }
      } else {
        scriptEle.onload = () => {
          resolve(true)
        }
        scriptEle.onerror = () => {
          reject(`脚本: ${src} 加载出错！`)
        }
      }
    })
  )
}

export default function(scripts) {
  pormiseList = []
  if (typeof scripts === 'string') {
    createScriptEle(scripts)
  } else if (scripts instanceof Array) {
    scripts.forEach(src => {
      createScriptEle(src)
    })
  } else {
    throw new Error('只能传脚本路径字符串或者包含脚本路径字符串的数组')
  }
  return Promise.all(pormiseList)
}

/* eslint-disable prefer-const */
/* eslint-disable no-undef */
export default class MyEChart {
  constructor(gv, host, option) {
    const div = (this.div = document.createElement('div'))
    this.gv = gv
    this.host = host

    div.style.position = 'absolute'
    div.style.boxSizing = 'border-box'
    div.style.zIndex = 100
    gv.getView().appendChild(div)

    this.chart = echarts.init(div)
    if (option) {
      this.chart.setOption(option)
    }
    gv.fitContent()
    this.layout()

    gv.mp(this.layout, this)
  }
  layout() {
    const { gv, host, div } = this
    const zoom = gv.getZoom()
    const tx = gv.tx()
    const ty = gv.ty()
    const rect = host.getRect()
    let x
    let y

    rect.x *= zoom
    rect.y *= zoom
    rect.width *= zoom
    rect.height *= zoom

    x = rect.x + tx
    y = rect.y + ty

    div.style.width = rect.width + 'px'
    div.style.height = rect.height + 'px'
    div.style.left = x + 'px'
    div.style.top = y + 'px'

    this.chart.resize()
  }

  setOption(o) {
    this.chart.setOption(o)
  }

  hide() {
    this.div.style.display = 'none'
  }

  show() {
    this.div.style.display = 'block'
  }
  showLayer() {
    if (!this._layer) {
      const layer = (this._layer = ht.Default.createDiv())
      const style = layer.style
      this.div.appendChild(layer)
      style.position = 'absolute'
      style.left = 0
      style.top = 0
      style.right = 0
      style.bottom = 0
      style.background = 'rgba(0,0,0,0.50)'
    }
    this._layer.style.display = 'block'
  }
  hideLayer() {
    if (this._layer) {
      this._layer.style.display = 'none'
    }
  }
}

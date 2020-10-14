export default {
  // 镜头动画
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

  // 设置天空球
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
  }
}

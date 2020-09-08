export default class PreLoadSource {
  constructor(preLoadConfig) {
    const { jsonTypeUrlArray, imgTypeUrlArray, modelTypeUrlArray } = preLoadConfig
    this.jsonTypeUrlArray = jsonTypeUrlArray || []
    this.imgTypeUrlArray = imgTypeUrlArray || []
    this.modelTypeUrlArray = modelTypeUrlArray || []
    this.startPreLoadSource()
  }
  startPreLoadSource() {
    this.startPreLoadJson()
    this.startPreLoadImg()
    this.startPreLoadModel()
  }
  startPreLoadJson() {
    const jsonTypeUrlArray = this.jsonTypeUrlArray
    ht.Default.xhrLoad(jsonTypeUrlArray, json => {
      jsonTypeUrlArray.forEach((jsonName, index) => {
        ht.Default.setImage(jsonName, ht.Default.parse(json[index]))
      })
    })
  }
  startPreLoadImg() {
    const imgTypeUrlArray = this.imgTypeUrlArray
    imgTypeUrlArray.forEach(imgName => {
      ht.Default.setImage(imgName)
    })
  }
  startPreLoadModel() {
    const modelTypeUrlArray = this.modelTypeUrlArray
    ht.Default.xhrLoad(modelTypeUrlArray, json => {
      modelTypeUrlArray.forEach((modelName, index) => {
        const temp = ht.Default.parse(json[index])
        const mtl = temp.mtl
        const obj = temp.obj
        ht.Default.loadObj(obj, mtl, {
          prefix: temp.prefix,
          shape3d: modelName,
          s3: temp.s3,
          cube: true,
          center: true,
          reverseFlipMtls: temp.reverseFlipMtls
        })
      })
    })
  }
}

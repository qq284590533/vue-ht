import htConfig from '@/config/htconfig'

window.htconfig = htConfig.htDemo

window.kasike_config = {
  rotationTime: 15400, // 单位毫秒
  isOnline: false,
  lightModel: [],
  preLoad: {
    jsonTypeUrlArray: [
      'symbols/3d场景用/标签/指向标签适配大小.json',
      'symbols/进度条.json',
      'symbols/softPanel/核心交换机软件状态.json',
      'symbols/softPanel/服务器软件状态.json'
    ],
    imgTypeUrlArray: []
  }
}
window.bindHtTagListObject = {
  'card-3-6-36.37U': [
    'SVR.JGX.CADSERVER.A.RT.AlarmStatus',
    'SVR.JGX.CADSERVER.A.HSTY.AlarmStatus',
    'SVR.JGX.CADSERVER.A.MDB.AlarmStatus',
    'SVR.JGX.CADSERVER.A.MMPLAN.AlarmStatus',
    'SVR.JGX.CADSERVER.A.PREDICT.AlarmStatus',
    'SVR.JGX.CADSERVER.A.REPLAY.AlarmStatus',
    'SVR.JGX.CADSERVER.A.SDB.AlarmStatus',
    'SVR.JGX.CADSERVER.A.SHIFT.AlarmStatus',
    'SVR.JGX.CADSERVER.A.DB.AlarmStatus',
    'SVR.JGX.CADSERVER.A.BASIC.AlarmStatus',
    'SVR.JGX.CADSERVER.A.TG52.AlarmStatus',
    'SVR.JGX.CADSERVER.A.TG53.AlarmStatus'
  ],
  'card-3-6-32.33U': [
    'SVR.JGX.CADSERVER.B.RT.AlarmStatus',
    'SVR.JGX.CADSERVER.B.HSTY.AlarmStatus',
    'SVR.JGX.CADSERVER.B.MDB.AlarmStatus',
    'SVR.JGX.CADSERVER.B.MMPLAN.AlarmStatus',
    'SVR.JGX.CADSERVER.B.PREDICT.AlarmStatus',
    'SVR.JGX.CADSERVER.B.REPLAY.AlarmStatus',
    'SVR.JGX.CADSERVER.B.SDB.AlarmStatus',
    'SVR.JGX.CADSERVER.B.SHIFT.AlarmStatus',
    'SVR.JGX.CADSERVER.B.DB.AlarmStatus',
    'SVR.JGX.CADSERVER.B.BASIC.AlarmStatus',
    'SVR.JGX.CADSERVER.B.TG52.AlarmStatus',
    'SVR.JGX.CADSERVER.B.TG53.AlarmStatus'
  ],
  'card-3-6-28.29U': ['SVR.JGX.RBCi.A.RBCi.AlarmStatus'],
  'card-3-6-24.25U': ['SVR.JGX.RBCi.B.RBCi.AlarmStatus'],
  'card-3-6-16.17U': ['SVR.JGX.TSRi.A.TSRi.AlarmStatus'],
  'card-3-6-12.13U': ['SVR.JGX.TSRi.B.TSRi.AlarmStatus'],
  'card-3-6-8.9U': ['SVR.JGX.JKJ.A.TKCTCI.AlarmStatus', 'SVR.JGX.JKJ.A.TZCTCI.AlarmStatus'],
  'card-3-6-4.5U': ['SVR.JGX.JKJ.B.TKCTCI.AlarmStatus', 'SVR.JGX.JKJ.B.TZCTCI.AlarmStatus'],

  'card-2-2-36.37U': ['SVR.JHX.JNCOMMLINK.A.COMMLINK.AlarmStatus'],
  'card-2-2-32.33U': ['SVR.JHX.JNCOMMLINK.B.COMMLINK.AlarmStatus'],
  'card-2-2-28.29U': ['SVR.JHX.GSMRi.A.GSMRi.AlarmStatus'],
  'card-2-2-24.25U': ['SVR.JHX.GSMRi.B.GSMRi.AlarmStatus'],
  'card-2-2-16.17U': ['SVR.JHX.BASELEVEL.A.BASELEVEL.AlarmStatus'],
  'card-2-2-12.13U': ['SVR.JHX.BASELEVEL.B.BASELEVEL.AlarmStatus'],
  'card-2-2-8.9U': [],
  'card-2-2-4.5U': [],

  'card-2-1-36.37U': ['SVR.JGX.ZZCOMMLINK.A.COMMLINK.AlarmStatus'],
  'card-2-1-32.33U': ['SVR.JGX.ZZCOMMLINK.B.COMMLINK.AlarmStatus'],
  'card-2-1-28.29U': ['SVR.JGX.GSMRi.A.GSMRi.AlarmStatus'],
  'card-2-1-24.25U': ['SVR.JGX.GSMRi.B.GSMRi.AlarmStatus'],
  'card-2-1-16.17U': ['SVR.JGX.BASELEVEL.A.BASELEVEL.AlarmStatus'],
  'card-2-1-12.13U': ['SVR.JGX.BASELEVEL.B.BASELEVEL.AlarmStatus'],
  'card-2-1-8.9U': ['SVR.JGX.CADSERVER.A.COMMSVR.AlarmStatus'],
  'card-2-1-4.5U': ['SVR.JGX.CADSERVER.B.COMMSVR.AlarmStatus'],

  'card-1-3-10.13U': [],
  'card-1-3-4.7U': [],

  'card-1-2-4.14U': [],

  'card-1-1-4.14U': []
}

window.indHtTagHardWareObject = {
  'card-3-6-36.37U': ['SVR.JGX.CADSERVER.A.AlarmStatus'],
  'card-3-6-32.33U': ['SVR.JGX.CADSERVER.B.AlarmStatus'],
  'card-3-6-28.29U': ['SVR.JGX.RBCi.A.AlarmStatus'],
  'card-3-6-24.25U': ['SVR.JGX.RBCi.B.AlarmStatus'],
  'card-3-6-16.17U': ['SVR.JGX.TSRi.B.AlarmStatus'],
  'card-3-6-12.13U': ['SVR.JGX.TSRi.B.AlarmStatus'],
  'card-3-6-8.9U': ['SVR.JGX.JKJ.A.AlarmStatus'],
  'card-3-6-4.5U': ['SVR.JGX.JKJ.B.AlarmStatus'],

  'card-2-2-36.37U': ['SVR.JHX.JNCOMMLINK.A.AlarmStatus'],
  'card-2-2-32.33U': ['SVR.JHX.JNCOMMLINK.B.AlarmStatus'],
  'card-2-2-28.29U': ['SVR.JHX.GSMRi.A.AlarmStatus'],
  'card-2-2-24.25U': ['SVR.JHX.GSMRi.B.AlarmStatus'],
  'card-2-2-16.17U': ['SVR.JHX.BASELEVEL.A.AlarmStatus'],
  'card-2-2-12.13U': ['SVR.JHX.BASELEVEL.B.AlarmStatus'],
  'card-2-2-8.9U': [],
  'card-2-2-4.5U': [],

  'card-2-1-36.37U': ['SVR.JGX.ZZCOMMLINK.A.AlarmStatus'],
  'card-2-1-32.33U': ['SVR.JGX.ZZCOMMLINK.B.AlarmStatus'],
  'card-2-1-28.29U': ['SVR.JGX.GSMRi.A.AlarmStatus'],
  'card-2-1-24.25U': ['SVR.JGX.GSMRi.B.AlarmStatus'],
  'card-2-1-16.17U': ['SVR.JGX.BASELEVEL.A.AlarmStatus'],
  'card-2-1-12.13U': ['SVR.JGX.BASELEVEL.B.AlarmStatus'],
  'card-2-1-8.9U': [''],
  'card-2-1-4.5U': [''],

  'card-1-3-10.13U': ['SVR.DBServer.A.AlarmStatus'],
  'card-1-3-4.7U': ['SVR.DBServer.B.AlarmStatus'],

  'card-1-2-4.14U': ['SVR.SWITCH.B.AlarmStatus'],

  'card-1-1-4.14U': ['SVR.SWITCH.A.AlarmStatus']
}

window.indHtTagRamObject = {
  'card-3-6-36.37U': [
    'SVR.JGX.CADSERVER.A.CPU.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.A.CPU.NUMBER.RealVal',
    'SVR.JGX.CADSERVER.A.MEMORY.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.MEMORY.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.MEMORY.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.1.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.1.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.1.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.2.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.2.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.A.PARTITION.2.UTILIZATION.RealVal'
  ],
  'card-3-6-32.33U': [
    'SVR.JGX.CADSERVER.B.CPU.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.B.CPU.NUMBER.RealVal',
    'SVR.JGX.CADSERVER.B.MEMORY.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.MEMORY.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.MEMORY.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.1.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.1.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.1.UTILIZATION.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.2.AVAILABLE.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.2.CAPACITY.RealVal',
    'SVR.JGX.CADSERVER.B.PARTITION.2.UTILIZATION.RealVal'
  ]
}

export default [
  {
    path: 'htDemo',
    component: () => import(/* webpackChunkName: "htDemo" */ '../views/htDemo/htDemo.vue'),
    name: 'HTDemo',
    mate: {
      name: 'HT Demo'
    }
  },
  {
    path: 'htDemo1',
    component: () => import(/* webpackChunkName: "htDemo1" */ '../views/htDemo1/htDemo1.vue'),
    name: 'HTDemo1',
    mate: {
      name: 'HT Demo1'
    }
  },
  {
    path: 'test1',
    component: () => import(/* webpackChunkName: "test1" */ '../views/test1/test1.vue'),
    name: 'Test1',
    mate: {
      name: 'Test1'
    }
  },
  {
    path: '168mgy',
    component: () => import(/* webpackChunkName: "168mgy" */ '../views/167mgy/index.vue'),
    name: 'MGY',
    mate: {
      name: '168玫瑰园南区'
    }
  },
  {
    path: 'mgydemo',
    component: () => import(/* webpackChunkName: "168mgy" */ '../views/mgydemo/index.vue'),
    name: 'MGYDEMO',
    mate: {
      name: '玫瑰园南区DEMO'
    }
  }
]

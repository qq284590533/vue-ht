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
    component: () => import(/* webpackChunkName: "htDemo" */ '../views/htDemo1/htDemo1.vue'),
    name: 'HTDemo1',
    mate: {
      name: 'HT Demo1'
    }
  },
  {
    path: 'test1',
    component: () => import(/* webpackChunkName: "htDemo" */ '../views/test1/test1.vue'),
    name: 'Test1',
    mate: {
      name: 'Test1'
    }
  }
]

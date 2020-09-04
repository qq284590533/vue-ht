export default [
  {
    path: 'htDemo',
    component: () => import(/* webpackChunkName: "htDemo" */ '../views/htDemo/htDemo.vue'),
    name: 'HTDemo',
    mate: {
      name: 'HT Demo'
    }
  }
]

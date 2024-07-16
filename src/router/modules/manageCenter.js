const manageCenter = {
  path: '/manageCenter',
  component: () => import('@/layout'),
  redirect: 'noRedirect',
  name: 'ManageCenter',
  alwaysShow: true,
  meta: {
    title: '管理中心',
    icon: 'lock',
  },
  children: [
    {
      path: 'agentManage',
      name: 'AgentManage',
      component: () => import('@/views/manageCenter/agentManage'),
      meta: { title: '代理商管理' }
    },
    {
      path: 'userQuery',
      name: 'UserQuery',
      component: () => import('@/views/manageCenter/userQuery'),
      meta: { title: '用户跟进' }
    },
  ]
}

export default manageCenter

const account = {
  path: '/account',
  component: () => import('@/layout'),
  redirect: 'noRedirect',
  name: 'Account',
  alwaysShow: true,
  meta: {
    title: '账户管理',
    icon: 'lock',
    menuId: '5'
  },
  children: [
    {
      path: 'editPassword',
      name: 'EditPassword',
      component: () => import('@/views/account/editPassword'),
      meta: { title: '修改密码', menuId: '50' }
    }
  ]
}

export default account

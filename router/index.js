import Container from '@/components/Container'
import Index from '@/pages/index'
import Product from '@/pages/product'
import Pay from '@/pages/pay'
import Login from '@/pages/login'
import Register from '@/pages/register'
import login1 from '@/pages/login1'

const routes = [
	{
    	path: '/',
        name: 'index',
        redirect: '/index'
	},
	{
    path: '/',
    name: 'Index',
    component: Container,
    children: [
      { path: 'index', name: '首页', component: Index },
    ]
  },
  {
    path: '/product',
    name: '列表',
    component: Product
    
  },
  {
    path: '/pay',
    name: '支付',
    component: Pay
    
  },
  {
    path: '/login',
    name: '登录',
    component: Login
    
  },
  {
    path: '/login1',
    name: '登录',
    component: login1
    
  },
  {
    path: '/register',
    name: '注册',
    component: Register
    
  },
  {
    path: '*',
    redirect: '/',
  },
  
]
export default routes

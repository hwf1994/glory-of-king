import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
  	path: '/login',
    title:"登陆",
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    title:"首页",
    name: 'main',
    component: () => import('@/views/main.vue'),
    children:[
       {
    	    path: '/categories/create',
			    title:"新建分类",
			    component: () => import('@/views/category/categoriesEdit.vue'),
       },
       {
    	    path: '/categories/list',
			    title:"分类列表",
			    component: () => import('@/views/category/list.vue'),
       },
       {
    	    path: '/categories/edit/:id',
			    title:"分类列表",
			    component: () => import('@/views/category/categoriesEdit.vue'),
			    props:true
       },
       
       //物品
       {
    	    path: '/items/create',
			    title:"新建物品",
			    component: () => import('@/views/item/itemsEdit.vue'),
       },
       {
    	    path: '/items/list',
			    title:"物品列表",
			    component: () => import('@/views/item/list.vue'),
       },
       {
    	    path: '/items/edit/:id',
			    title:"编辑物品",
			    component: () => import('@/views/item/itemsEdit.vue'),
			    props:true
       },
       
       //英雄
       {
    	    path: '/heroes/create',
			    title:"新建英雄",
			    component: () => import('@/views/hero/heroesEdit.vue'),
       },
       {
    	    path: '/heroes/list',
			    title:"英雄列表",
			    component: () => import('@/views/hero/list.vue'),
       },
       {
    	    path: '/heroes/edit/:id',
			    title:"编辑英雄",
			    component: () => import('@/views/hero/heroesEdit.vue'),
			    props:true
       },
       
       //文章
       {
    	    path: '/articles/create',
			    title:"新建文章",
			    component: () => import('@/views/article/articlesEdit.vue'),
       },
       {
    	    path: '/articles/list',
			    title:"文章列表",
			    component: () => import('@/views/article/list.vue'),
       },
       {
    	    path: '/articles/edit/:id',
			    title:"编辑文章",
			    component: () => import('@/views/article/articlesEdit.vue'),
			    props:true
       },
       
       //广告
       {
    	    path: '/ads/create',
			    title:"新建广告",
			    component: () => import('@/views/ad/adsEdit.vue'),
       },
       {
    	    path: '/ads/list',
			    title:"广告列表",
			    component: () => import('@/views/ad/list.vue'),
       },
       {
    	    path: '/ads/edit/:id',
			    title:"编辑广告",
			    component: () => import('@/views/ad/adsEdit.vue'),
			    props:true
       },
       
        //用户
       {
    	    path: '/users/create',
			    title:"新建用户",
			    component: () => import('@/views/user/usersEdit.vue'),
       },
       {
    	    path: '/users/list',
			    title:"用户列表",
			    component: () => import('@/views/user/list.vue'),
       },
       {
    	    path: '/users/edit/:id',
			    title:"编辑用户",
			    component: () => import('@/views/user/usersEdit.vue'),
			    props:true
       }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
		if(localStorage.getItem('Token')){  //如果用户已经登录
			if(to.path=="/login"){  //如果用户已经登录且跳转前往登录页面
				next({path:"/users/list"})
			}else{  //如果用户跳转的是其他页面则判断其是否拥有权限
				next()	
			}
		}else{
			if(to.path=="/login"){  //如果用户已经登录且跳转前往登录页面
				next()
			}else{  //如果用户跳转的是其他页面则判断其是否拥有权限
				next({name:"login"})	
			}
	  }
})

export default router

import Vue from 'vue'
import axios from 'axios';
import router from '@/router'

const http=axios.create({
	baseURL:'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {   //对数据请求进行拦截
	if(config.url.match(/login/)){   //当打印pdf文件时
		return config
	}
	if(localStorage.getItem("Token")){ //
		 config.headers['token']= localStorage.getItem("Token");  
    }
    return config
}, error => {
   return Promise.reject()
})

http.interceptors.response.use(  //对数据回复进行拦截	
    response => {
    	if(response.data.code=='202'){
    		Vue.prototype.$message({
    		  showClose: true,
	          message: '验证信息已过期，请重新登陆',
	          type: 'error'
            })
    		localStorage.removeItem("Token")
    		router.push({
    			path:"/login"
    		})
    	}
        return response
   
    },
    error => {
        return Promise.reject(error.data)
    }
)

export default http
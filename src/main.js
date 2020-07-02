import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './request/config';
import './plugins/element.js'

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.mixin({
	data(){
		return {
			  
		}
	},
	computed:{
		Token:()=>{
		   return {
		   	   token:localStorage.getItem("Token")
		   }
		}
	},
  created() {
    
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

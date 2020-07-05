<template>
    <el-container style="height: 100vh;">
	  <el-aside width="200px" style="height: 100%;background-color: rgb(238, 241, 246);position: fixed;overflow: hidden;">
		 <div style="height: 100%;width: 215px;overflow-y: scroll;">
		    <el-menu router  :default-active="$route.fullPath">
		      <el-submenu index="1">
			        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
			        <el-menu-item-group>
			          <template slot="title">物品</template>
			          <el-menu-item index="/items/create">新建物品</el-menu-item>
			          <el-menu-item index="/items/list">物品列表</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group>
			          <template slot="title">英雄</template>
			          <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
			          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group>
			          <template slot="title">文章</template>
			          <el-menu-item index="/articles/create">新建文章</el-menu-item>
			          <el-menu-item index="/articles/list">文章列表</el-menu-item>
			        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="2">
		      	    <template slot="title"><i class="el-icon-message"></i>系统管理</template>
		      	    <el-menu-item-group>
			          <template slot="title">分类</template>
			          <el-menu-item index="/categories/create">新建分类</el-menu-item>
			          <el-menu-item index="/categories/list">分类列表</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group>
			          <template slot="title">广告</template>
			          <el-menu-item index="/ads/create">添加广告</el-menu-item>
			          <el-menu-item index="/ads/list">广告列表</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group>
			          <template slot="title">用户</template>
			          <el-menu-item index="/users/create">添加用户</el-menu-item>
			          <el-menu-item index="/users/list">用户列表</el-menu-item>
			        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </div>
	  </el-aside>
	  
	  <el-container style="margin-left: 200px;">
	  	    <el-header style="text-align: right; font-size: 12px">
	  	    	<el-dropdown @command="handleCommand">
				  <span class="el-dropdown-link">
				    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				      <el-dropdown-item command="quite">退出</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
	  	    </el-header>
	        <div style="margin: 10px;"><router-view :key="$route.path"/></div>
	  </el-container>
	</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
    	handleCommand(item){
    		if(item=='quite'){
    			localStorage.removeItem("Token")
    			this.$router.push({
    				path:"/login"
    			})
    		}
    	}
    },
    created(){

    }
  };
</script>
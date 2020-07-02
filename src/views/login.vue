<template>
	<div>
		<el-card class="box-card">
		    <el-form :rules="rules" ref="form" style="margin-top: 50px;" :model="form" label-width="80px">
				<h2>后台管理系统</h2>
				<el-form-item label="用户名" prop="name">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
			        <el-input show-password v-model="form.password"></el-input>
			    </el-form-item>
			    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
		    </el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
	    data() {
		    return {
		        form:{
		        	name:"",
		        	password:""
		        },
		         rules: {
			          name: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			          ],
			          password: [
			            { required: true, message: '请输入密码', trigger: 'change' }
			          ],
			     }
		    }
	    },
	    methods:{
	    	 submitForm(formName) {
		        this.$refs[formName].validate(async (valid) => {
		          if (valid) {
		               let res=await this.$http.post('/sign_in',{name:this.form.name,password:this.form.password})
		               if(res.data.code==200){
		               	   localStorage.setItem('Token',res.data.data.token)
		               	   this.$router.push({
		               	   	   path:"/categories/list"
		               	   })
		               }else{
		               	   this.$message({
					          showClose: false,
					          message: res.data.msg,
					          type: 'error'
					        });
		               }
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
	    },
	    created(){
	       
	    }
    };
</script>

<style scoped="">
	.box-card{width: 500px;height: 300px;position: absolute;top: 40%;left: 50%;margin: -150px 0 0 -250px;}
</style>
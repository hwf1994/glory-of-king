<template>
	<div>
		<h2 style="text-align: left;">{{id?"编辑":"新建"}}用户</h2>
	    <el-form style="width: 50%;text-align: left;" ref="form" :model="form" label-width="80px">
		  <el-form-item label="用户名">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
          <el-form-item label="密码">
		    <el-input show-password v-model="form.password"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          icon: ''
        },
      }
    },
    props:{
    	id:{
    		type:String
    	}
    },
    created(){
    	this.id && this.getInfo()
    },
    methods: {
      async onSubmit() {
      	let result
      	!this.form.parent && delete this.form.parent
      	if(this.id){
      		result=await this.$http.put(`/rest/users/${this.id}`,this.form)
      	}else{
      		result=await this.$http.post("/rest/users",{...this.form})
      	}
      	this.$router.push({
      	   path:"/users/list"
      	})
      	this.$message({
	        showClose: true,
	        message: '操作成功！',
	        type: 'success'
        });
      },
      async getInfo(){
      	var result=await this.$http.get(`/rest/users/${this.id}`)
      	this.form=result.data
      },
      handleAvatarSuccess(res, file) {
      	console.log("上传成功！")
      	console.log(res)
        this.form.icon="http://localhost:3000/upload/"+res.filename
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
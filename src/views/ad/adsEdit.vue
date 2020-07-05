<template>
	<div>
		<h2 style="text-align: left;">{{id?"编辑":"新建"}}广告</h2>
	    <el-form style="width: 80%;text-align: left;" ref="form" :model="form" label-width="80px">
		  <el-form-item label="广告名称">
		      <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="广告">
		      <el-button @click="form.items.push({})">添加广告</el-button>
		  </el-form-item>
	      <el-row>
			  <el-col v-for="(item,index) in form.items" :key="index" :span="12">
			  	   <el-form-item label="标题">
				      <el-input v-model="item.title"></el-input>
				   </el-form-item>
				   <el-form-item label="广告图片">
				        <el-upload
						  class="avatar-uploader"
						  action="http://upload-z2.qiniup.com"
						  :show-file-list="false"
						  :data="uploadToken"
						  :on-success="res=>$set(item,'icon',`http://qcbslioi0.bkt.clouddn.com/${res.key}`)"
				          :before-upload="beforeAvatarUpload">
						  <img v-if="item.icon" :src="item.icon" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
				   </el-form-item>
				   <el-form-item label="链接">
				      <el-input v-model="item.url"></el-input>
				   </el-form-item>
				   <el-form-item label="广告提示">
				      <el-input v-model="item.tip"></el-input>
				   </el-form-item>
			  </el-col>
		  </el-row>
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
          items:[],
        },
        options:[],
        uploadToken:{
        	token:""
        }
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
      		result=await this.$http.put(`/rest/ads/${this.id}`,this.form)
      	}else{
      		result=await this.$http.post("/rest/ads",{...this.form})
      	}
      	this.$router.push({
      	   path:"/ads/list"
      	})
      	this.$message({
	        showClose: true,
	        message: '操作成功！',
	        type: 'success'
        });
      },
      async getInfo(){
      	var result=await this.$http.get(`/rest/ads/${this.id}`)
      	this.form=result.data
      },
      handleAvatarSuccess(res, file) {
      	console.log("活动")
        this.form.icon="http://qcbslioi0.bkt.clouddn.com/"+res.key
      },
      async beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        const res = await this.$http.get('/upload_token')
        this.uploadToken.token=res.data.uploadToken
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
<template>
	<div>
		<h2 style="text-align: left;">{{id?"编辑":"新建"}}英雄</h2>
	    <el-form style="width: 70%;text-align: left;" ref="form" :model="form" label-width="80px">
		  
		    <el-tabs type="border-card">
               <el-tab-pane label="基本信息">
					  <el-form-item label="名称">
					    <el-input v-model="form.name"></el-input>
					  </el-form-item>
					  <el-form-item label="头像">
					        <el-upload
							  class="avatar-uploader"
							  action="http://upload-z2.qiniup.com"
							  :show-file-list="false"
							  :data="uploadToken"
							  :before-upload="beforeAvatarUpload"
							  :on-success="handleAvatarSuccess">
							  <img v-if="form.avatar" :src="form.avatar" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
					  </el-form-item>
					  <el-form-item label="背景图片">
					        <el-upload
							  class="avatar-uploader"
							  action="http://upload-z2.qiniup.com"
							  :show-file-list="false"
							  :data="uploadToken"
							  :before-upload="beforeAvatarUpload"
							  :on-success="res=>$set(form,'background',`http://qcbslioi0.bkt.clouddn.com/${res.key}`)">
							  <img v-if="form.background" :src="form.background" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
					  </el-form-item>
					  <el-form-item label="称号">
					    <el-input v-model="form.title"></el-input>
					  </el-form-item>
					  <el-form-item label="分类">
					    <el-select v-model="form.categories" multiple placeholder="请选择">
						    <el-option
						      v-for="item in categories"
						      :key="item._id"
						      :label="item.name"
						      :value="item._id">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <h4 style="margin-left: 80px;">评分</h4>
					  <el-form-item label="难度">
					  	<el-rate style="margin-top: .6rem;" show-score :max='9' v-model="form.scores.difficult"></el-rate>
					  </el-form-item>
					  <el-form-item label="技能">
					  	<el-rate style="margin-top: .6rem;" show-score :max='9' v-model="form.scores.skill"></el-rate>
					  </el-form-item>
					  <el-form-item label="攻击">
					  	<el-rate style="margin-top: .6rem;" show-score :max='9' v-model="form.scores.attack"></el-rate>
					  </el-form-item>
					  <el-form-item label="生存">
					  	<el-rate style="margin-top: .6rem;" show-score :max='9' v-model="form.scores.servive"></el-rate>
					  </el-form-item>
					  <h4 style="margin-left: 80px;">出装</h4>
					  <el-form-item label="顺风出装">
					    <el-select v-model="form.items1" multiple placeholder="请选择">
						    <el-option
						      v-for="item in items"
						      :key="item._id"
						      :label="item.name"
						      :value="item._id">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <el-form-item label="逆风出装">
					    <el-select v-model="form.items2" multiple placeholder="请选择">
						    <el-option
						      v-for="item in items"
						      :key="item._id"
						      :label="item.name"
						      :value="item._id">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <h4 style="margin-left: 80px;">技巧</h4>
					  <el-form-item label="使用技巧">
					  	 <el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="form.usageTips">
						 </el-input>
					  </el-form-item>
					  <el-form-item label="对抗技巧">
					  	 <el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="form.battleTips">
						 </el-input>
					  </el-form-item>
					  <el-form-item label="团战思路">
					  	 <el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="form.teamTips">
						 </el-input>
					  </el-form-item>
		        </el-tab-pane>
		        <el-tab-pane label="技能">
		        	<el-button @click="form.skills.push({icon:''})" type="primary" icon="el-icon-plus">添加技能</el-button>
		        		<el-row :gutter="20">
						  <el-col v-for="(item,index) in form.skills" :key="index" :span="10"  style="margin-top: 10px;">
						  	   <el-form-item label="名称">
							  	 <el-input
								  type="input"
								  :rows="2"
								  placeholder="请输入内容"
								  v-model="item.name">
								 </el-input>
							    </el-form-item>
							    <el-form-item label="技能图标">
								    <el-upload
									  class="avatar-uploader"
									  action="http://upload-z2.qiniup.com"
									  :show-file-list="false"
									  :data="uploadToken"
									  :before-upload="beforeAvatarUpload"
									  :on-success="res=>$set(item,'icon',`http://qcbslioi0.bkt.clouddn.com/${res.filename}`)">
									  <img v-if="item.icon" :src="item.icon" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</el-form-item>
								<el-form-item label="技能描述">
									<el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="item.description">
									 </el-input>
							    </el-form-item>
							    <el-form-item label="技能建议">
									 <el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="item.tips">
									 </el-input>
							    </el-form-item>
							    <el-button @click="form.skills.splice(index,1)" style="margin-left: 45px;" type="danger">删除</el-button>
						  </el-col>
						</el-row>
		        </el-tab-pane>
		    </el-tabs>
		  
		  <el-form-item style="margin-top: 10px;">
		    <el-button @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
      return {
      	categories:[],  //身份选项
      	items:[], //装备选项
        form: {
          name: '',
          avatar: '',
          title:"",
          categories:[],
          scores:{
          	difficult:0,
          	skill:0,
          	attack:0,
          	servive:0
          },
          skills:[],
          items1:[],  //顺风出装
          items2:[], //逆风出装
          usageTips:"",
          battleTips:"",
          teamTips:""
        },
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
    	this.getCategories()
    	this.getOption()
    },
    methods: {
      async onSubmit() {
      	let result
      	!this.form.parent && delete this.form.parent
      	if(this.id){
      		result=await this.$http.put(`/rest/heroes/${this.id}`,this.form)
      	}else{
      		result=await this.$http.post("/rest/heroes",{...this.form})
      	}
      	this.$router.push({
      	   path:"/heroes/list"
      	})
      	this.$message({
	        showClose: true,
	        message: '操作成功！',
	        type: 'success'
        });
      },
      async getInfo(){
      	var result=await this.$http.get(`/rest/heroes/${this.id}`)
      	this.form=Object.assign({},this.form,result.data) 
      },
      handleAvatarSuccess(res, file) {
        this.form.avatar="http://qcbslioi0.bkt.clouddn.com/"+res.filename
      },
      async beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        const res = await this.$http.get('/upload_token')
        this.uploadToken.token=res.data.uploadToken
      },
      async getOption(){
      	 const categories=await this.$http.get('/rest/categories?type=hero')
      	 const items=await this.$http.get('/rest/items')
      	 this.categories=categories.data
      	 this.items=items.data
      },
      async getCategories(){
      	const result=await this.$http.get('/rest/categories')
      	this.categories=result.data
      	console.log(this.categories)
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
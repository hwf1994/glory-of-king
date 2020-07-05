<template>
	<div>
		<h2 style="text-align: left;">{{id?"编辑":"新建"}}分类</h2>
	    <el-form style="width: 50%;text-align: left;" ref="form" :model="form" label-width="80px">
	      <el-form-item label="上级分类">
		    <el-select v-model="form.parent" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item._id"
			      :label="item.name"
			      :value="item._id">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="分类名称">
		    <el-input v-model="form.name"></el-input>
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
          parent:''
        },
        options:[]
      }
    },
    props:{
    	id:{
    		type:String
    	}
    },
    created(){
    	this.id && this.getInfo()
    	this.getOption()
    },
    methods: {
      async onSubmit() {
      	let result
      	!this.form.parent && delete this.form.parent
      	if(this.id){
      		result=await this.$http.put(`/rest/categories/${this.id}`,this.form)
      	}else{
      		result=await this.$http.post("/rest/categories",{...this.form})
      	}
      	this.$router.push({
      	   path:"/categories/list"
      	})
      	this.$message({
	        showClose: true,
	        message: '操作成功！',
	        type: 'success'
        });
      },
      async getInfo(){
      	var result=await this.$http.get(`/rest/categories/${this.id}`)
      	this.form=result.data
      },
      async getOption(){
      	let res=await this.$http.get("/rest/categories",{page:1,size:1000})
      	this.options=res.data
      },
    }
  }
</script>
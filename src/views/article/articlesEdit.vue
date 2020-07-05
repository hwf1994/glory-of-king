<template>
	<div>
		<h2 style="text-align: left;">{{id?"编辑":"新建"}}文章</h2>
	    <el-form style="width: 80%;text-align: left;" ref="form" :model="form" label-width="80px">
		  <el-form-item label="文章名称">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="文章分类">
		    <el-select multiple v-model="form.categories" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item._id"
			      :label="item.name"
			      :value="item._id">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="文章内容">
		    <quill-editor ref="myTextEditor" v-model="form.content" :options="editOptions"></quill-editor>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
  import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
  const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    ['clean'],
    ['link', 'image', 'video']
];
  export default {
    data() {
      return {
        form: {
          name: '',
          categories:'',
          content:""
        },
        editOptions:{
        	modules:{
	           toolbar: {
	           	    container: toolOptions, 
		            handlers: {
		            	'image': (value)=>{
                            if (value) {
                                var input = document.createElement('input')  
								input.type = 'file'  
								input.id="file"
								input.accept="*"
								input.style.display="none"
								input.onchange =async (event,name) => {
									var formData = new FormData();
									formData.append('file', event.target.files[0]);
									var res=await this.$http.post('/upload',formData)
									var fileUrl="http://localhost:3000/upload/"+res.data.filename
									this.addRange = this.$refs.myTextEditor.quill.getSelection();
                                       // 调用编辑器的 insertEmbed 方法，插入URL
                                     this.$refs.myTextEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', fileUrl)   
								}
								input.click()
                            } else {
                                this.quill.format('image', false);
                            }
                        }
		            }  // 事件重写
		        }
            },
        },
        options:[],
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
    components: {
       quillEditor
    },
    methods: {
      async onSubmit() {
      	let result
      	!this.form.parent && delete this.form.parent
      	if(this.id){
      		result=await this.$http.put(`/rest/articles/${this.id}`,this.form)
      	}else{
      		result=await this.$http.post("/rest/articles",{...this.form})
      	}
      	this.$router.push({
      	   path:"/articles/list"
      	})
      	this.$message({
	        showClose: true,
	        message: '操作成功！',
	        type: 'success'
        });
      },
      async getInfo(){
      	var result=await this.$http.get(`/rest/articles/${this.id}`)
      	this.form=result.data
      },
      async getOption(){
      	let res=await this.$http.get("/rest/categories?type=news",{page:1,size:1000})
      	this.options=res.data
      },
    }
  }
</script>
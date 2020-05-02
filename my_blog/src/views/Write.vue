<template>
<div>
    <div v-if=" !$store.state.didlogin">
    请登录{{$store.getters.loginState}}
  </div>
  <div class="write" v-else key="$route.params.id">
    <label class="title">
      {{init}}
     标题:<input v-model="title" type="text" ><button class="insert" @click="insert">发布</button>
    </label >
    <div class="desc">
      <div>描述:</div>
       <textarea v-model="desc"></textarea>

    </div>
    <div class="container">
    <textarea v-model="comment"  class="comment"></textarea>
      <div v-html="compiledMarkdown" class="marked"></div>
    </div>
  </div>

</div>

</template>

<script>
import marked from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
renderer: rendererMD,
gfm: true,
tables: true,
breaks: false,
pedantic: false,
sanitize: false,
smartLists: true,
smartypants: false
})
export default {
  name:"Write",
  data(){
    return{
      title:'',
      comment:'',
      desc:''
    }
  },
  methods:{
    insert(){
      this.$route.params.id>0
     ? this.$store.commit("insert",{title:this.title,comment:this.comment,id: this.$route.params.id,desc:this.desc})
     :this.$store.commit("insert",{title:this.title,comment:this.comment,desc:this.desc})
      this.$router.push("/home")
      this.title=''
      this.comment=''
    }
  },
  computed:{
compiledMarkdown: function () {
return marked(this.comment, { sanitize: true })
},

    init(){
      if(this.$route.params.id>0){
        console.log("进入init")
        this.$store.commit("findInfo",this.$route.params.id)
        this.desc=this.$store.state.activeItem[0].desc
        this.title=this.$store.state.activeItem[0].title
        this.comment=this.$store.state.activeItem[0].comment
    }
    else{
        this.desc=""
        this.title=""
        this.comment=""
    }
  }
}
}
</script>

<style scoped>
.title{
  display: flex;
  margin: 5px 2%;
  font-size: 20px;
}
.title input{
  flex: 1;
  height: 20px;
  border: 1px solid #cecece;
  font-size:15px
}
.container{
  display: flex;
}
.comment{
  height: calc(80vh);
  flex: 1;
  border: none;
  background-color: #e9e9e9;
  overflow: auto;
  outline: none; 
  font-size: 20px;
}
.marked{
  flex: 1;
  height: calc(80vh);
  overflow: auto;
}
.insert{
  border: none;
  background-color: rgb(101, 136, 189);
}
.desc{
  font-size: 20px;
  margin:0 2%;
  height: 60px;
  /* background-color: blue; */
  display: flex;
}
.desc textarea{
  width: 95%;
  height: 30px;
  margin: 10px 0 10px 0;
  overflow: auto;
  font-size: 20px;

}
.desc div{
  line-height: 60px;
}
</style>
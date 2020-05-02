<template>
  <div class="show">
    <label class="title">
       标题:<input v-model="title" type="text" >
    </label >
    <div class="desc">
      <div>描述:</div>
     <textarea v-model="desc"></textarea>
   </div>
      <div v-html="compiledMarkdown" class="marked"></div>
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
  name:"show",
  data(){
    return{
      comment:"",
      title:"",
      desc:"",

    }
  },
  created(){
   this.$store.commit("findInfo",this.$route.params.id)
    // this.info=this.$store.state.activeItem
    this.comment=this.$store.state.activeItem[0].comment
    this.title=this.$store.state.activeItem[0].title
    this.desc=this.$store.state.activeItem[0].title

  },
  computed:{

compiledMarkdown: function () {
return marked(this.comment, { sanitize: true })
},
}
}
</script>

<style scoped>
.title{
  margin: 5px 2%;
  font-size: 20px;
}
.title input{
  width: 90%;
  height: 20px;
  border: 1px solid #cecece;
}

.marked{
  background-color: #e9e9e9;
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
  display: flex;
}
.desc textarea{
  width: 94%;
  height: 30px;
  margin: 10px 0 10px 0;
  overflow: auto;

}
.desc div{
  line-height: 60px;
}
</style>
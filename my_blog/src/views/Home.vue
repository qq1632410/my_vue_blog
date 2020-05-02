<template>
  <div class="home">
    <div class="comment" v-for="item in $store.state.info" :key="item.id" 
    @dblclick="show(item.id)">
      <div class="title">{{item.title}}</div>
      <p v-text="item.desc" ></p>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"Home",
  methods:{
    show(id){
      this.$router.push(`/show/${id}`)
    }
  }
}
</script>

<style scoped>


.comment{
  width: 98%;
  border-bottom: 1px solid #e9e9e9;
}
.title{
  font-size: 20px;
  font-weight: 20px;
}
.comment p{
  box-sizing: border-box;
text-indent: 2em;
width: 100%;
overflow: hidden;
word-break: break-all;  /*允许在单词内换行，更美观*/
text-overflow: ellipsis;
display: -webkit-box;  /*元素作为box伸缩盒子*/
-webkit-line-clamp: 2;  /*设置文本行数限制*/
-webkit-box-orient: vertical;  /*设置文本排列方式*/
  
}


</style>
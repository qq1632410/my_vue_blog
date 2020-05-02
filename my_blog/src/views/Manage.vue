<template>
  <div class="manage">
    <div v-if="!$store.state.didlogin">
      请登录
    </div>
   <div class="mycomments" v-for="item in  $store.getters.userinfo" :key="item.id">
          <div class="title">{{item.title}}</div>
      <p v-html="item.desc"></p>
      <span>{{item.name}}</span>
      <div class="modify">
       <button @click="modify(item.id,item.title,item.comment,item.desc)" >修改</button>
     <button @click="del(item.id)" >删除</button>
    
   </div>
   </div>

  </div>
</template>

<script>
export default {
  name:"Manage",
  methods:{
    del(id){
      this.$store.commit("del",id)
    },
    modify(id,title,comment,desc){
      console.log("跳转成功")
      console.log(id);
      console.log(title);
      console.log(comment);
      this.$router.push(`/write/${id}`)
    }
  }
}
</script>

<style scoped>

.mycomments{
  width: 98%;
  border-bottom: 1px solid #e9e9e9;
}
.title{
  font-size: 20px;
  font-weight: 20px;
}
.comment p{
  text-indent: 2em;
  width: 100%;
  
}
</style>
<template>
  <div class="leftBar">
    <div class="top">
      <div class="title">
        BLOG
      </div>
      <div class="desc">
        努力学习
      </div>
    </div>
    <div class="center">
     <div class="item" v-for="item in leftList" :key="item.id" :class="{active:item.id==active}"
      @click="toRoute(item.path,item.id)"
    >{{item.name}}</div>
    </div>

    <div class="top">
      <img src="../assets/img.png" alt="">
    {{length}}
     
    </div>
  </div>
</template>

<script>
import leftList from '../assets/leftList.json'
export default {
  name:"leftBar",
  data(){
    return{
      leftList,
      active:1,
    }
  },
  methods:{
    toRoute(path,id){
      this.$router.push(path)
      this.active=id
    }
  },
  computed:{
    length(){
      return this.$store.getters.userinfo?"日志："+this.$store.getters.userinfo.length:"请登录"
    }
  }
}
</script>

<style scoped>

.leftBar{
  width: 150px;
  height: 400px;
  margin-right: 5px;
}
.top{
  background-color:black;
  color:white;
  height: 200px;
  font-size: 30px;
  padding:10% 10% 0 10%;

}
.top img{
  width: 100%;
}
.center{
  cursor: pointer;
}
.item{
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 16px;
  border-bottom: 1px solid #eee;
  text-align: center;
}
.item:hover{
  background-color: #9e9e9e;
}
.active{
  background-color: #eee;
}

</style>
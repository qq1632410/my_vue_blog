<template>
  <div id="app">
    <leftbar></leftbar>
    <div class="right">
    <keep-alive exclude="show">
      <router-view></router-view>
    </keep-alive>
    </div>

  </div>
</template>
<script>
import leftbar from './views/leftBar'
import {request} from './netWork/index.js'

export default{
  name:"app",
  components:{
    leftbar
  },
  created(){
      request({
        url:"/data"
      }).then(res=>{
        this.$store.commit("initData",res)
      })
  }
}
</script>
<style lang="less" >
#app{
  display: flex;
}
#app .right{
  flex: 1;
}

</style>

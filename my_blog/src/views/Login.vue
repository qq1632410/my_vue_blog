<template>
<div class="loginContainer">
  <div v-if="$store.state.didlogin">
    已登录
  </div>
    <div class="login" v-else>
    <label>
      账号:<input v-model="name"  placeholder="请输入账号"/>
    </label>
    <label>
      密码:<input type="password" ref="password" />
    </label>
      <div class="button">
      <button @click="login">登陆</button>
     <button @click="regest">注册</button>
  </div>
  </div>

</div>

</template>

<script>
import { request } from '../netWork/index.js'
export default {
  name:"Login",
  data(){
    return{
      name:"",
    
    }
  },
  methods:{
    login(){
      request({
        url:'/login',
        params:{
          name:this.name,
          password:this.$refs.password.value
        }
      }).then(res=>{
        if(res.data==true){
          this.$store.commit("logined",this.name)
          this.$message({
          showClose: true,
          message: '成功登录',
          type: 'success'
        });
          this.$router.push("/home")
        }
        else{
          console.log("账号或密码错误")
        }
      })
    },
    regest(){
       request({
        url:'/regest',
        params:{
          name:this.name,
          password:this.$refs.password.value
        }
      }).then(res=>{
        if(res.data==true){
          this.$message({
          showClose: true,
          message: '注册成功,请登录',
          type: 'success'
        });
        }
        else{
      this.$message({
          showClose: true,
          message: '此账号已被注册',
          type: 'error'
        });
        }
      })
    }
  }
}
</script>

<style scoped>
.loginContainer{
  display: flex;
  height: calc(60vh);
  justify-content: center;
  align-items: center;
}
.login{
  
  width: 300px;
  height: 100px;
  border: 1px solid #3e3e3e;
  padding: 40px 20px;
  
}
.login label{

display: block;
height: 40px;
}
label input{
  width: 80%;
  height: 30px;
}

.button{
  text-align: right;
  margin: 0 8%;
}
.button button{
  border: none;
  background-color: rgb(171, 228, 171);
  height: 30px;
  margin: 5px;
}
</style>
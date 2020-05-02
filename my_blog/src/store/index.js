import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../netWork/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info:[],
    username:window.sessionStorage.getItem('username')||"",
    didlogin:window.sessionStorage.getItem('didlogin')||false,
    activeItem:[]
  },

  mutations: {

    initData(state,data){
    this.state.info=data.data
    // console.log(data)
     window.sessionStorage.setItem('info',data.data)
    },

    logined(state,name){
      // this.state.username=name
      // this.state.didlogin=true
      window.sessionStorage.setItem('username',name)
      window.sessionStorage.setItem('didlogin',true)
    state.username=window.sessionStorage.getItem('username')
    state.didlogin=window.sessionStorage.getItem('didlogin')
    },

    del(state,id){
      let index=this.state.info.findIndex((item)=>{
        return item.id==id
      })
      // console.log("被删除项的index:",index)
      this.state.info.splice(index,1);
      this.dispatch('save')
    },

    insert(state,payload){
      // console.log("insert payload",payload)
      if(payload.id>0){
        // console.log(this.state.info)
        let config={
        title:payload.title,
        comment:payload.comment,
        id:payload.id,
        desc:payload.desc,
        name:this.state.username
      }
      let index=this.state.info.findIndex((item)=>{
        return item.id==payload.id
      })
      // console.log("index",index)
       this.state.info.splice(index,1);
      //  console.log(config)
       this.state.info.unshift(config)
      // console.log(this.state.info)
       this.dispatch('save')
      }

      else{

       let maxId=this.state.info.reduce((pre,cur)=>{
         if(cur.id>=pre)
        {
          pre=cur.id
          return pre
        }
        return pre
      },0)
      // console.log("maxId",maxId)
      let config={
        title:payload.title,
        comment:payload.comment,
        id:maxId+1,
        desc:payload.desc,
        name:this.state.username
      }
      // console.log(config)
      this.state.info.unshift(config)
       this.dispatch('save')
      }
 
    },

    findInfo(state,id){
      console.log("进入findinfo")
      let x=this.state.info.filter((item)=>{
        return item.id==id
      })
      state.activeItem=x
     
    }
  },

  getters: {
    userinfo: state => {
      if(state.didlogin){
        // console.log("123")
        let x=state.info.filter((item)=>{
          // console.log(item.name==state.username)
          return item.name==state.username
        })
        // console.log(x)
       return x;
      }
    },
  },

  actions: {
    save(){
      request({
        url:'/save',
        params:{
          info:JSON.stringify(this.state.info)
        }
      }).then((res)=>{
        // console.log("save")
        // console.log(res)
      })
    }
  },
  modules: {
  }
})

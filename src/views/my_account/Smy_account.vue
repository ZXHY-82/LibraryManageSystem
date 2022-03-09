<template>
  <div>
    <br>
<el-descriptions title="我的账户" :model="user">
    <el-descriptions-item label="ID" >{{this.user.id}}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{this.user.name}}</el-descriptions-item>
    <el-descriptions-item label="密码">{{this.user.pwd}}</el-descriptions-item>
    <el-descriptions-item label="学校">{{this.user.school}}</el-descriptions-item>
    <el-descriptions-item label="邮箱">{{this.user.email}}</el-descriptions-item>
</el-descriptions>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Smy_account',
  mounted(){
    this.ini()
  },
  data(){
    return{
      user:{
        id : "1",
        name:"2",
        pwd:"",
        school:"",
        email:""
      }
    }
  },
  methods:{
    ini(){
        this.$store.commit('getToken')
        const token = this.$store.state.user.token
        console.log(token)
        axios
        .post("http://10.131.214.7:8080/user/search?id=" + token)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.user.id = token
            this.user.name = res.data.name
            this.user.pwd = res.data.pwd
            this.user.school = res.data.school
            this.user.email = res.data.email
          } else {
            alert("初始化失败！");
          }
      });
    }
  }
  
}
</script>
<style scoped>

</style>
<template>
  <div class="login" clearfix>
    <br/>
    <br/>
    <br/>
  <h1 align="center">图书馆管理系统1.0</h1>
    <div class="login-wrap">

      <el-row type="flex"  justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="60px">
          <h3 align="center">用户注册</h3>
          <hr>
          <el-form-item label-width="0px" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item> -->
          <el-form-item label-width="0px" prop="password">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" prop="school">
            <el-input v-model="user.school" placeholder="请输入学校"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <div align="center">
            <el-button  type="primary" icon @click="doRegister()">注册账号</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        school: "",
        email: "",
      },
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    doRegister() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } 
      else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        }
      else if(!this.user.school){
          this.$message.error("请输入学校! ");
          return;
        } 
      else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
          return;
        } 
        else {
          // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          axios
            .post("http://10.131.214.7:8080/interface/ordinary/signup?uname=" + this.user.username +"&pwd=" + this.user.password
             + "&school=" + this.user.school + "&email=" + this.user.email)
            // this.$router.push({ path: "/" });
            .then(res => {
              console.log("输出response.data", res.data);
              if (res.data.flag === 1) {
                this.$router.push({ path: "/" });
                this.$message.success(res.data.msg + "你的id号为" + res.data.ID);
              } else {
                alert("您输入的用户名已存在！");
              }
            });
        }
      }
    }
  }
};
</script>
 
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/images/login_back.png") no-repeat;
  background-size: cover;
  overflow: hidden;
}

  .login-wrap {
    width: 240px;
    height: 280px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 0px 40px 120px 40px;
    box-shadow: -15px 15px 15px rgba(53, 57, 66, 0.7);
    opacity: 1;
    background: linear-gradient(
      230deg,
      rgba(78, 80, 88, 0) 0%,
      rgb(85, 81, 81) 100%
    );
  }
 
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
 
.el-button {
  width: 100%;
  margin-left: -70px;
}
</style>
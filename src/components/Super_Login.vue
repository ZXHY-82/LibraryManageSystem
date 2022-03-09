<template>
  <div class="login" >
    <br/>
    <br/>
    <br/>
  <h1 align="center">图书馆管理系统1.0</h1>
    <div class="login-wrap">
      <el-row type="flexd" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="70px">
          <h2 align="center">管理员登录</h2>
          <hr>
          <!-- <el-form-item prop="username" label="用户名"> -->
          <el-form-item label-width="0px" prop="username">
            <!-- <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input> -->
             <el-input v-model="user.username" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          <!-- <el-form-item id="password" prop="password" label="密码"> -->
          <el-form-item label-width="0px" id="password" prop="password">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <br/>
          <el-form-item>
            <div align="center">
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
            <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
            <!-- <el-button type="primary" icon="el-icon-upload" @click="$router.push('/register')">注 册</el-button> -->
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
  name: "Super_Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }  
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        // const token = this.user.username
        // this.$store.commit('setToken', token)
        // this.$router.push({ path: "/superuser" });

        axios
          .post("http://10.131.214.7:8080/interface/root/login?id=" + this.user.username + "&pwd=" + this.user.password)
          // this.$router.push({ path: "/superuser" });
          .then(res => {
            console.log("输出response.data", res.data);
            if (res.data.flag === 1) {
              const token = this.user.username
              this.$store.commit('setToken', token)
              this.$router.push({ path: "/superuser" });
            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
      }
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
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
    padding: 40px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(53, 57, 66, 0.7);
    opacity: 1;
    background: linear-gradient(
      230deg,
      rgba(78, 80, 88, 0) 0%,
      rgb(85, 81, 81) 100%
    );
  }
#password {
  margin-bottom: 5px;
}
h2 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 100%;
  margin-left: -70px;
  /* align-content: center; */
}
</style>
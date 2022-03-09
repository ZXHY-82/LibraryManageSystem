<template>
      <header >
        <h1>模块选择</h1>
        <h1  align="center">图书馆管理系统 1.0</h1>
        <div class="r-content">
            <el-dropdown class="right" trigger="click" size="small">
                <span>
                    <img  :src="userImg" height="60px" width="60px">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="quit()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>

export default{
    name: 'CommonHeader',
    data (){
        return {
            userImg: require('../assets/images/logo.png'),
        }
    },
    methods: {
        quit(){
            console.log("1111222")
            this.$emit('quit')
        },
    },
}
</script>
<style  scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center; 
}
.h1{
    color: white;
}
</style>
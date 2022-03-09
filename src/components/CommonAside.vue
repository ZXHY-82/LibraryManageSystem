<template>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <span slot="title">论文板块</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">论文查询</el-menu-item>
      <el-menu-item index="1-2">下载记录</el-menu-item>
      <el-menu-item index="1-3">论文管理</el-menu-item>
    </el-menu-item-group>
    <!-- <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <span slot="title">图书板块</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="2-1">图书查询</el-menu-item>
      <el-menu-item index="2-2">借阅状态</el-menu-item>
      <el-menu-item index="2-3">图书管理</el-menu-item>
    </el-menu-item-group>
    <!-- <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <span slot="title">用户管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="3-1">我的账户</el-menu-item>
      <el-menu-item index="3-2">账户管理</el-menu-item>
      <!-- <el-menu-item index="1-3">论文管理</el-menu-item> -->
    </el-menu-item-group>
    <!-- <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  <!-- <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item> -->
</el-menu>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
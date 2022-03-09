<template>
    <el-container style="height : 100%">
    <el-header>
        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button class="right">tuichu</el-button> -->
        <common-header @quit="quit"></common-header>
    </el-header>
    <el-container>
        <el-aside width="auto">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <!-- <el-submenu v-for="item in hasChildren0" :index="item.path" :key="item.path">
                <template slot="title">
                <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="(subItem, subIndex) in item.chileren0" :key="subItem.path">
                <el-menu-item :index="subIndex">{{ subItem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-for="item in hasChildren1" :index="item.path" :key="item.path">
                <template slot="title">
                <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="(subItem, subIndex) in item.chileren1" :key="subItem.path">
                <el-menu-item :index="subIndex">{{ subItem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-for="item in hasChildren2" :index="item.path" :key="item.path">
                <template slot="title">
                <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="(subItem, subIndex) in item.chileren2" :key="subItem.path">
                <el-menu-item :index="subIndex">{{ subItem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
            <el-submenu index="1">
                <template slot="title">
                <span slot="title">论文板块</span>
                </template>
                <el-menu-item-group>
                <el-menu-item @click="clickpaper0()" index="1-1">论文查询</el-menu-item>
                <!-- <el-menu-item @click="clickpaper1()" index="1-2">下载记录</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <span slot="title">图书板块</span>
                </template>
                <el-menu-item-group>
                <el-menu-item @click="clickbook0()" index="2-1">图书查询</el-menu-item>
                <el-menu-item @click="clickbook1()" index="2-2">借阅状态</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item @click="clickmy()" index="3-1">我的账户</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
import CommonHeader from './CommonHeader.vue';
export default {
    components:{
        CommonHeader,
    },
  // eslint-disable-next-line vue/multi-word-component-names
    name: 'User',
    data() {
        return {
            // userImg: require('../assets/images/logo.png'),
            isCollapse: false,
            menu:[
            {
                label: '论文板块',
                chileren0:[
                    {
                        path: '/paper_search',
                        name: 'paper_search',
                        label: '论文查询',
                        url: ''
                    },
                    {
                        path: '/paper_down',
                        name: 'paper_down',
                        label: '下载记录',
                        url: ''
                    },
                ]
            },
            {
                label: '图书板块',
                chileren1:[
                    {
                        path: '/book_search',
                        name: 'book_search',
                        label: '图书查询',
                        url: ''
                    },
                    {
                        path: '/book_state',
                        name: 'book_state',
                        label: '借阅状态',
                        url: ''
                    },
                ]
            },
            {
                label: '用户管理',
                chileren2:[
                    {
                        path: '/my_account',
                        name: 'my_account',
                        label: '我的账户',
                        url: ''
                    },
                ]
            }
        ]
        };
    },
    methods: {
        quit(){
            console.log("1111")
            this.$store.commit('clearToken')
            this.$router.push({
                path: '/'
            })
        },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        },
        clickpaper0(){
            this.$router.push({
                path: '/user/paper_search'
            })
        },
        clickpaper1(){
            this.$router.push({
                path: '/user/paper_down'
            })
        },
        clickbook0(){
            this.$router.push({
                path: '/user/book_search'
            })
        },
        clickbook1(){
            this.$router.push({
                path: '/user/book_state'
            })
        },
        clickmy(){
            this.$router.push({
                path: '/user/my_account'
            })
        },
    },
    computed:{
        hasChildren0(){
            return this.menu.filter(item => item.chileren0)
        },
        hasChildren1(){
            return this.menu.filter(item => item.chileren1)
        },
        hasChildren2(){
            return this.menu.filter(item => item.chileren2)
        }
    }
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: rgb(172, 171, 171);
  }

.el-main {
    padding-top: 0 ;
    background-color: #E9EEF3;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
</style>


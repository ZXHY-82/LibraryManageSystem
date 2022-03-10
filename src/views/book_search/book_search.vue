<template>
  <div class="manage">
    <br>
    <el-row  :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><h3>图书查询</h3></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      <el-input style="width:200px" v-model="searchForm.name" ></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </el-row>
  <el-table  :data="tableData"  border height="600" style="width: 1420px">
    <el-table-column  prop="name" label="name" width="265"></el-table-column>
    <el-table-column  prop="author" label="author" width="165"></el-table-column>
    <el-table-column prop="pub_ho" label="pub_ho"  width="165"></el-table-column>
    <el-table-column prop="pub_time" label="pub_time"  width="165"></el-table-column>
    <el-table-column prop="introduction" label="introduction"  width="165"></el-table-column>
    <el-table-column prop="book_id" label="book_id"  width="150"></el-table-column>
    <el-table-column prop="all_num" label="all_num"  width="165"></el-table-column>
    <el-table-column prop="now_num" label="now_num"  width="135"></el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="120">
      <template slot-scope="scope">
          <el-button  @click="downRow(scope)"  type="primary"  size="small">借阅</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import ip from '../../ip/ip.js'
export default {
  name: 'book_search',
  mounted(){
    this.ini()
  },
  data () {
    return {
      tableData:
      [
        {
        name: "1",
        author: "1",
        pub_ho: "1",
        pub_time: "1",
        introduction: "1",
        book_id:"1",
        all_num: "1",
        now_num: "1"
        },
        {
        name: "1",
        author: "1",
        pub_ho: "1",
        pub_time: "1",
        introduction: "1",
        book_id:"1",
        all_num: "1",
        now_num: "1"
        }
      ],
      manageForm:{
        name: "",
        author: "",
        pub_ho: "",
        pub_time: "",
        introduction: "",
        book_id:"",
        all_num: "",
        now_num: ""
      },
      searchForm:{
        name: ""
      }
    }
  },
  methods:{
    ini(){
      axios
        .post("http://"+ip.ipall+":8080/interface/bookop/all")
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.searchresult
          } else {
            alert("初始化失败！");
          }
      });
    },
    downRow(scope){
      console.log(scope.row)
      this.$store.commit('getToken')
      const token = this.$store.state.user.token
      console.log(token)
      axios
        .post("http://"+ip.ipall+":8080/user/borrowone?userid="+ token + "&bookid="+ scope.row.book_id)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            alert(res.data.msg);
            this.ini()
          } else {
            alert(res.data.msg);
          }
      });
    },
    search(){
      console.log("1111")
      axios
        .post("http://"+ip.ipall+":8080/interface/bookop/search?name=" + this.searchForm.name)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.searchresult
          } else {
            alert("未找到相关图书！");
          }
      });
    },
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #E9EEF3;
  }
  .bg-purple {
    background: #E9EEF3;
  }
  .bg-purple-light {
    background: #E9EEF3;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #E9EEF3;
  }
</style>
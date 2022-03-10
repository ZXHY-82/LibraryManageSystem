<template>
  <div class="manage">
    <br>
    <el-row  :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><h3>论文查询</h3></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      <el-input style="width:200px" v-model="searchForm.name" ></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </el-row>
  <el-table  :data="tableData"  border height="600" style="width: 1420px">
    <el-table-column  prop="name" label="name" width="265"></el-table-column>
    <el-table-column  prop="author" label="author" width="165"></el-table-column>
    <el-table-column prop="Document_ID" label="Document_ID"  width="165"></el-table-column>
    <el-table-column prop="publish_time" label="publish_time"  width="165"></el-table-column>
    <el-table-column prop="citation_amount" label="citation_amount"  width="165"></el-table-column>
    <el-table-column prop="publisher" label="publisher"  width="165"></el-table-column>
    <el-table-column prop="stars" label="stars"  width="135"></el-table-column>
        <el-table-column  label="url"  width="150">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.url}}</a>
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import ip from '../../ip/ip.js'
export default {
  name: 'paper_search',
  mounted(){
    this.ini()
  },
  data () {
    return {
      tableData:
      [
        {
        uname: "1",
        author: "1",
        Document_ID: "1",
        publish_time: "1111-11-11",
        citation_amount: "1",
        publisher: "1",
        stars: "1",
        },
        {
        uname: "12",
        author: "1",
        Document_ID: "12",
        publish_time: "1111-11-11",
        citation_amount: "1",
        publisher: "1",
        stars: "1",
        }
      ],
      operateType: "add",
      isShow : false,
      manageForm:{
        name: "",
        author: "",
        Document_ID: "",
        publish_time: "",
        citation_amount: "",
        publisher: "",
        stars: "",
        url:""
      },
      searchForm:{
        name: ""
      }
    }
  },
  methods:{
    ini(){
      axios
        .post("http://"+ip.ipall+":8080/interface/op/all")
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.papersearch
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
        .post("http://"+ip.ipall+":8080/?userid="+ token + "&="+ scope.row.uname)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            alert(res.data.msg);
          } else {
            alert(res.data.msg);
          }
      });
    },
    search(){
      console.log("1111")
      axios
        .post("http://"+ip.ipall+":8080/interface/op/search?name=" + this.searchForm.name)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.papersearch
          } else {
            alert("未找到相关论文！");
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
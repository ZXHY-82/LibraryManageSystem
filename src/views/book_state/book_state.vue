<template>
    <el-row  :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="13"><div class="grid-content bg-purple"> 
        <div class="manage" align="center">
    <br>
    <h3>我的借阅信息</h3>
  <el-table   :data="tableData"  border height="600" style="width: 720px">
    <el-table-column  prop="book_id" label="book_id" width="300"></el-table-column>
    <el-table-column  prop="book_name" label="book_name" width="300"></el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="120">
      <template slot-scope="scope">
          <el-button  @click="returnRow(scope)"  type="primary"  size="small">还书</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div></div>
  </el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script>
import axios from 'axios';
import ip from '../../ip/ip.js'
export default {
  name: 'book_state',
  mounted(){
    this.ini()
  },
  data () {
    return {
      tableData:
      [
        {
        book_id:"1",
        book_name: "1",
        },
        {
        book_id:"1",
        book_name: "1",
        }
      ],
      manageForm:{
        book_id:"",
        book_name: "",
      },
    }
  },
  methods:{
    ini(){
      this.$store.commit('getToken')
      const token = this.$store.state.user.token
      console.log(token)
      axios
        .post("http://"+ip.ipall+":8080/user/allborrow?userid=" + token)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.borrowbooks
          } else {
            alert(res.data.msg);
          }
      });
    },
    returnRow(scope){
      console.log(scope.row)
      this.$store.commit('getToken')
      const token = this.$store.state.user.token
      console.log(token)
      axios
        .post("http://"+ip.ipall+":8080/user/returnone?userid="+ token + "&bookid="+ scope.row.book_id)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            alert(res.data.msg)
            this.ini()
          } else {
            alert(res.data.msg);
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
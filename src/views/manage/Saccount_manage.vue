<template>
  <div class="manage">
    <el-dialog
      :title="title = '用户修改'"
      :visible.sync="isShow"
    >
      <el-form ref="manageForm" label-with="100px" :model="manageForm" >
        <!-- <el-form-item label="id" prop="id">
          <el-input v-model="manageForm.id" placeholder="请输入用户id"></el-input>
        </el-form-item> -->
        <el-form-item label="name" prop="name">
          <el-input v-model="manageForm.uname" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="pwd" prop="pwd">
          <el-input v-model="manageForm.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="school" prop="school">
          <el-input v-model="manageForm.school" placeholder="请输入学校"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="manageForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="QX()">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
    <br>
    <el-row  :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><h1>账户管理</h1></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      <el-input style="width:200px" v-model="searchForm.name" ></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </el-row>
  <el-table  :data="tableData"  border height="600" style="width: 1420px">
    <el-table-column  prop="id" label="用户ID" width="236px"></el-table-column>
    <el-table-column  prop="name" label="用户名" width="236px"></el-table-column>
    <el-table-column prop="pwd" label="密码"  width="236px"></el-table-column>
    <el-table-column prop="school" label="学校"  width="236px"></el-table-column>
    <el-table-column prop="email" label="邮箱"  width="236px"></el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="236px">
      <template slot-scope="scope">
          <el-button  @click="editRow(scope)"  type="primary"  size="small">编辑</el-button>
      </template>
    </el-table-column>
    <!-- <el-pagination class="paper" layout="pre,paper,next"
    :total=30 :current-page.sync=1 @current-change="changePage()" :page-size="20"></el-pagination> -->
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Saccount_manage',
  mounted(){
    this.ini()
  },
  data () {
    return {
      tableData:
      [
        {
        id: "1",
        uname: "1",
        pwd: "1",
        school: "1",
        email: "1",
        },
        {
        id: "2",
        uname: "1",
        pwd: "1",
        school: "1",
        email: "1",
        }
      ],
      isShow : false,
      manageForm:{
        id: "1",
        uname: "1",
        pwd: "1",
        school: "1",
        email: "1",
      },
      searchForm:{
        name: ""
      }
    }
  },
  methods:{
    ini(){
      axios
        .post("http://10.131.214.7:8080/user/all")
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.usersearch
          } else {
            alert("初始化失败！");
          }
      });
    },
    confirm(){
        axios
        .post("http://10.131.214.7:8080/user/change?id="+ this.manageForm.id +"&uname=" + this.manageForm.uname
        + "&pwd=" + this.manageForm.pwd + "&school=" + this.manageForm.school + "&email=" + this.manageForm.email)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.isShow = false
            this.$message.success("修改成功！")
            this.ini()
          } else {
            this.isShow = false
            alert("修改失败！");
          }
        });
    },
    QX(){
      this.isShow = false 
    },
    search(){
      console.log("1111")
      axios
        .post("http://10.131.214.7:8080/user/search?id=" + this.searchForm.name)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data
          } else {
            alert("未找到相关用户！");
          }
      });
    },
    getList(){

    },
    editRow(scope){
      console.log(scope)
      this.operateType = 'edit'
      this.isShow = true
      this.manageForm = scope.row
    },
    deleteRow(scope){
      console.log(scope.row.Document_ID)
        axios
        .post("http://127.0.0.1:4523/interface/paperop/delete?Document_ID=" + scope.row.Document_ID)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.$message.success("删除成功！")
            this.ini()
          } else {
            alert("删除失败！");
          }
        });
    }
  }
}
</script>

<style scoped>
.manage_header{
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
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
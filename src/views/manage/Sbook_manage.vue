<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '添加图书' : '更新图书'"
      :visible.sync="isShow"
    >
      <el-form ref="manageForm" label-with="100px" :model="manageForm" >
        <el-form-item label="Name" prop="name">
          <el-input v-model="manageForm.name" placeholder="请输入图书名"></el-input>
        </el-form-item>
        <el-form-item label="Author" prop="author">
          <el-input v-model="manageForm.author" placeholder="请输入图书作者"></el-input>
        </el-form-item>
        <el-form-item label="Pub_ho" prop="Pub_ho">
          <el-input v-model="manageForm.pub_ho" placeholder="请输入Pub_ho"></el-input>
        </el-form-item>
        <el-form-item label="Pub_time" prop="Pub_time">
          <el-date-picker v-model="manageForm.pub_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="introduction" prop="introduction">
          <el-input v-model="manageForm.introduction" placeholder="请输入介绍"></el-input>
        </el-form-item>
        <el-form-item label="all_num" prop="all_num">
          <el-input v-model="manageForm.all_num" placeholder="请输入总书目"></el-input>
        </el-form-item>
        <el-form-item label="now_num" prop="now_num">
          <el-input v-model="manageForm.now_num" placeholder="请输入在架书目"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="QX()">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
    <br>
    <el-row  :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><el-button type="primary" @click="addpaper()">新增图书</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      <el-input style="width:200px" v-model="searchForm.name" ></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </el-row>
  <el-table  :data="tableData"  border height="600" style="width: 1420px">
    <el-table-column  prop="name" label="name" width="250"></el-table-column>
    <el-table-column  prop="author" label="author" width="150"></el-table-column>
    <el-table-column prop="pub_ho" label="pub_ho"  width="150"></el-table-column>
    <el-table-column prop="pub_time" label="pub_time"  width="150"></el-table-column>
    <el-table-column prop="introduction" label="introduction"  width="150"></el-table-column>
    <el-table-column prop="book_id" label="book_id"  width="150"></el-table-column>
    <el-table-column prop="all_num" label="all_num"  width="150"></el-table-column>
    <el-table-column prop="now_num" label="now_num"  width="120"></el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="240">
      <template slot-scope="scope">
          <el-button  @click="editRow(scope)"  type="primary"  size="small">编辑</el-button>
          <el-button  @click="deleteRow(scope)"  type="danger"  size="small">删除</el-button>
      </template>
    </el-table-column>
    <!-- <el-pagination class="paper" layout="pre,paper,next"
    :total=30 :current-page.sync=1 @current-change="changePage()" :page-size="20"></el-pagination> -->
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import ip from '../../ip/ip.js'
export default {
  name: 'Sbook_manage',
  mounted (){
    this.ini()
  },
  data () {
    return {
      // config:{
      //   page:1,
      //   total:30
      // },
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
      operateType: "add",
      isShow : false,
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
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.searchresult
          } else {
            alert("初始化失败！");
          }
      });
    },
    confirm(){
      if(this.operateType === 'add'){
        axios
        .post("http://"+ip.ipall+":8080/interface/bookop/add?name=" + this.manageForm.name + "&author=" + this.manageForm.author
        + "&pub_ho=" + this.manageForm.pub_ho + "&pub_time=" + this.manageForm.pub_time + "&introduction=" + this.manageForm.introduction
        + "&all_num=" + this.manageForm.all_num + "&now_num=" + this.manageForm.now_num)
        .then(res => {
          console.log("输出response.data", res.data);
          if (res.data.flag === 1) {
            this.isShow = false
            this.$message.success("添加成功！")
            this.ini()
          } else {
            this.isShow = false
            alert("添加失败！");
          }
        });
      }
      else{
        axios
        .post("http://"+ip.ipall+":8080/interface/bookop/revise?name=" + this.manageForm.name + "&author=" + this.manageForm.author
        + "&pub_ho=" + this.manageForm.pub_ho + "&pub_time=" + this.manageForm.pub_time + "&introduction=" + this.manageForm.introduction
        + "&id=" + this.manageForm.book_id + "&all_num=" + this.manageForm.all_num + "&now_num=" + this.manageForm.now_num)
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
      }
    },
    QX(){
      this.isShow = false 
    },
    addpaper(){
      this.isShow = true
      this.manageForm = {
        name: "",
        author: "",
        pub_ho: "",
        pub_time: "",
        introduction: "",
        all_num: "",
        now_num: ""
      }
      this.operateType = 'add'
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
    editRow(scope){
      console.log(scope)
      this.operateType = 'edit'
      this.isShow = true
      this.manageForm = scope.row
    },
    deleteRow(scope){
      console.log(scope.row.Document_ID)
        axios
        .post("http://"+ip.ipall+":8080/interface/bookop/delete?id=" + scope.row.book_id)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.$message.success("删除成功！")
            this.ini()
          } else {
            alert(res.data.msg);
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
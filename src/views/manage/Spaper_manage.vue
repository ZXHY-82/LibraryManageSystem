<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '添加论文' : '更新论文'"
      :visible.sync="isShow"
    >
      <el-form ref="manageForm" label-with="100px" :model="manageForm" >
        <el-form-item label="Name" prop="name">
          <el-input v-model="manageForm.uname" placeholder="请输入论文名"></el-input>
        </el-form-item>
        <el-form-item label="Author" prop="author">
          <el-input v-model="manageForm.author" placeholder="请输入论文作者"></el-input>
        </el-form-item>
        <el-form-item label="Document_ID" prop="Document_ID">
          <el-input v-model="manageForm.Document_ID" placeholder="请输入文献编号"></el-input>
        </el-form-item>
        <el-form-item label="Publish_Time" prop="publish_time">
          <el-date-picker v-model="manageForm.publish_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="Citation_Amount" prop="citation_amount">
          <el-input v-model="manageForm.citation_amount" placeholder="请输入引用文献数"></el-input>
        </el-form-item>
        <el-form-item label="Publisher" prop="publisher">
          <el-input v-model="manageForm.publisher" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="Stars" prop="stars">
          <el-input v-model="manageForm.stars" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="QX()">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
    <br>
    <el-row  :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><el-button type="primary" @click="addpaper()">新增论文</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      <el-input style="width:200px" v-model="searchForm.name" ></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </el-row>
  <el-table  :data="tableData"  border height="600" style="width: 1420px">
    <el-table-column  prop="uname" label="Name" width="250"></el-table-column>
    <el-table-column  prop="author" label="Author" width="150"></el-table-column>
    <el-table-column prop="Document_ID" label="Document_ID"  width="150"></el-table-column>
    <el-table-column prop="publish_time" label="Publish_Time"  width="150"></el-table-column>
    <el-table-column prop="citation_amount" label="Citation_Amount"  width="150"></el-table-column>
    <el-table-column prop="publisher" label="Publisher"  width="150"></el-table-column>
    <el-table-column prop="stars" label="Stars"  width="120"></el-table-column>
    <el-table-column  prop="url" label="Download_Address"  width="150">
              <!-- <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.url}}</a>
        </template> -->
    </el-table-column>
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
export default {
  name: 'Spaper_manage',
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
        Document_ID: "1",
        publish_time: "1111-11-11 11:11:11",
        citation_amount: "1",
        publisher: "1",
        stars: "1",
        },
        {
        name: "12",
        author: "1",
        Document_ID: "12",
        publish_time: "1111-11-11 11:11:11",
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
        stars: ""
      },
      searchForm:{
        name: ""
      }
    }
  },
  methods:{
    ini(){
      axios
        .post("http://10.131.214.7:8080/interface/op/all")
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.papersearch
          } else {
            alert("初始化失败！");
          }
      });
    },
    confirm(){
      if(this.operateType === 'add'){
        axios
        .post("http://10.131.214.7:8080/interface/paperop/add?name=" + this.manageForm.name + "&author=" + this.manageForm.author
        + "&Document_ID=" + this.manageForm.Document_ID + "&publish_time=" + this.manageForm.publish_time + "&citation_amount=" + this.manageForm.citation_amount
        + "&publisher=" + this.manageForm.publisher + "&stars=" + this.manageForm.stars)
        .then(res => {
          console.log("输出response.data.status", res.data);
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
        .post("http://10.131.214.7:8080/interface/paperop/revise?name=" + this.manageForm.uname + "&author=" + this.manageForm.author
        + "&Document_ID=" + this.manageForm.Document_ID + "&publish_time=" + this.manageForm.publish_time + "&citation_amount=" + this.manageForm.citation_amount
        + "&publisher=" + this.manageForm.publisher + "&stars=" + this.manageForm.stars)
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
        Document_ID: "",
        publish_time: "",
        citation_amount: "",
        publisher: "",
        stars: ""
      }
      this.operateType = 'add'
    },
    search(){
      console.log("1111")
      axios
        .post("http://10.131.214.7:8080/interface/op/search?name=" + this.searchForm.name)
        .then(res => {
          console.log("输出response.data.status", res.data);
          if (res.data.flag === 1) {
            this.tableData = res.data.papersearch
          } else {
            alert("未找到相关论文！");
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
        .post("http://10.131.214.7:8080/interface/paperop/delete?Document_ID=" + scope.row.Document_ID)
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
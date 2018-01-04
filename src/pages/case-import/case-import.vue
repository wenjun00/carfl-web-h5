<template>
  <section class="page case-import">
    <data-form :model="importModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="importModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="importClick">案件导入</el-button>
        <el-button @click="createClick">新增案件</el-button>
        <el-button @click="cancelClick">取消导入</el-button>
        <el-button @click="confirmClick">确认导入</el-button>
      </template>
    </data-form>
    <data-box :data="importDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="contractNumber" label="合同编号" min-width="125">
        </el-table-column>
        <el-table-column prop="trustee" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="actualName" label="车主姓名" min-width="80">
        </el-table-column>
        <el-table-column prop="phone" label="车主电话" min-width="90">
        </el-table-column>
        <el-table-column prop="province" label="省份" min-width="90">
        </el-table-column>
        <el-table-column prop="city" label="城市" min-width="80">
        </el-table-column>
        <el-table-column prop="licensePlateNumber" label="车牌号" min-width="80">
        </el-table-column>
        <el-table-column prop="vehicleBrands" label="车辆品牌" min-width="100">
        </el-table-column>
        <el-table-column prop="vehicleModel" label="车辆型号" min-width="100">
        </el-table-column>
        <el-table-column prop="vehicleColor" label="车辆颜色" min-width="80">
        </el-table-column>
        <el-table-column prop="businessDepartment" label="所属营业部" min-width="100">
        </el-table-column>
        <el-table-column prop="commissionDate" label="委案日期" min-width="90">
          <!--<template slot-scope="scope">
            <span>{{scope.row.commissionDate?dateFormat(scope.row.commissionDate ,'yyyy-MM-dd'): ''}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="closingDate " label="结案日期" min-width="90">
          <!--<template slot-scope="scope">
            <span>{{scope.row.closingDate?dateFormat(scope.row.closingDate ,'yyyy-MM-dd'): ''}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="createDate" label="案件详情" min-width="60">
          <template slot-scope="scope">
            <el-button type="text" @click="checkInfo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--新增案件弹框-->
    <el-dialog title="新增案件信息" :visible.sync="dialog.createCase" :center="true">
      <create-case @success="dialog.createCase=false" @close="dialog.createCase=false"></create-case>
    </el-dialog>
    <!--取消导入-->
    <el-dialog title="取消导入" :visible.sync="dialog.cancelImport" :center="true">
      <el-row type="flex" justify="center">
        <el-select v-model="batchNumber">
          <el-option v-for="(v,i) in this.batchList" :key="i" :label="v" :value="v">
          </el-option>
        </el-select>
      </el-row>
      <el-row style="margin-top:20px" type="flex" justify="center">
        <el-button @click="cancelHandle">取消</el-button>
        <el-button @click="confirmHandle">确认</el-button>
      </el-row>
    </el-dialog>
    <!--确认导入-->
    <el-dialog title="确认导入" :visible.sync="dialog.confirmImport" :center="true">
      <el-row type="flex" justify="center">
        <el-select v-model="batchNumber">
          <el-option v-for="(v,i) in this.batchList" :key="i" :label="v" :value="v">
          </el-option>
        </el-select>
      </el-row>
      <el-row style="margin-top:20px" type="flex" justify="center">
        <el-button @click="cancelImportClick">取消</el-button>
        <el-button @click="confirmImportClick">确认</el-button>
      </el-row>
    </el-dialog>
    <!--案件导入-->
    <el-dialog title="案件导入" :visible.sync="dialog.excelImport" :center="true">
      <file-upload :fileNumberLimit="1" :fileList.sync="importCaseFileList"></file-upload>

    </el-dialog>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    dataImpService
  } from "~/services/data-imp.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import CaseExcelImport from "~/pages/case-import/case-excel-import.vue";
  import CreateCase from "~/components/pages/case-import/create-case.vue";
  import FileUpload from '~/components/common/file-upload.vue'
  import {
    PageService
  } from "~/utils/page.service";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox,
      FileUpload,
      CaseExcelImport,
      CreateCase
    }
  })
  export default class CaseImport extends Vue {
    @Dependencies(dataImpService) private dataImpService: dataImpService;
    @Dependencies(PageService) private pageService: PageService;

    // 列表数据集
    private importDataSet: Array < any > = [];
    // 数据实体
    private importModel: any = {
      name: ""
    };
    private dialog: any = {
      checkUnconfirmInfo: false,
      checkErrInfo: false,
      excelImport: false,
      createCase: false,
      cancelImport: false,
      confirmImport: false
    };
    // 案件信息数据集
    private caseData: Array < any > = [];
    // 错误信息数据集
    private errData: Array < any > = [];
    private batchNumber: any = "";
    private batchList: Array < any > = [];
    private excelModel: any = {};
    private importCaseFileList: Array < any > = []
    /**
     * 初始化
     */
    mounted() {
      this.refreshData();
      // console.log(this.batchList)
      this.dataImpService.getAllBatch().subscribe(data => {
        // this.importDataSet = data.content;
        console.log("cancelHandle", data);
        this.batchList = data;
      });
    }

    /**
     * 获取刷新数据
     */
    refreshData() {
      this.dataImpService.getAllDataImpRecord().subscribe(data => {
        this.importDataSet = data.content;
        console.log('importDataSet', this.importDataSet)
      });
    }
    /**
     * 查看案件详情
     */
    checkInfo(row) {
      if (row.state === "UNCONFIRM") {
        this.dialog.checkUnconfirmInfo = true;
        this.getCaseData(row.batch);
      } else if (row.state === "ERROR") {
        this.dialog.checkErrInfo = true;
        console.log(this.dialog);
      }
    }
    /**
     * 获取案件详情
     */
    getCaseData(batch) {
      this.dataImpService.getDataImpByBatch(batch).subscribe(data => {
        this.caseData = data.content;
      });
    }
    /**
     * 获取错误信息
     */
    getErrData(batch) {
      this.dataImpService.getErrorMsgByBatch(batch).subscribe(data => {
        this.caseData = data.content;
      });
    }
    /**
     * 案件导入弹框
     */
    importClick() {
      this.dialog.excelImport = true;
    }
    /**
     * 新增案件弹框
     */
    createClick() {
      this.dialog.createCase = true;
      console.log(this);
    }
    /**
     * 取消导入
     */
    cancelClick() {
      this.dialog.cancelImport = true;
    }
    /**
     * 确认导入
     */
    confirmClick() {
      this.dialog.confirmImport = true;
    }
    cancelHandle() {
      this.dialog.cancelImport = false;
    }
    confirmHandle() {
      this.dataImpService.cancelImp(this.batchNumber).subscribe(data => {
        // this.importDataSet = data.content;
        console.log("cancelHandle", data);
        this.$message({
          type: "success",
          message: "取消导入成功"
        });
        this.batchNumber = "";
      });
    }
    confirmImportClick() {
      this.dataImpService.confirmImp(this.batchNumber).subscribe(data => {
        // this.importDataSet = data.content;
        console.log("cancelHandle", data);
        this.$message({
          type: "success",
          message: "确认导入成功"
        });
        this.batchNumber = "";
        this.dialog.confirmImport = false;
      });
    }
    cancelImportClick() {
      this.dialog.confirmImport = false;
    }
  }

</script>
<style>


</style>

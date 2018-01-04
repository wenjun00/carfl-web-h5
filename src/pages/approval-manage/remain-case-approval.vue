<template>
  <section class="page reamain-case-approval">
    <data-form :model="caseImportModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="车主姓名" prop="actualName">
          <el-input v-model="caseImportModel.actualName"></el-input>
        </el-form-item>
        <el-form-item label="车主电话" prop="phone">
          <el-input v-model="caseImportModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="licensePlateNumber">
          <el-input v-model="caseImportModel.licensePlateNumber"></el-input>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="caseImportData" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="contractNumber" label="合同编号" min-width="125">
        </el-table-column>
        <el-table-column prop="trustee" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="actualName" label="车主姓名" min-width="60">
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
        <el-table-column prop="vehicleModel" label="车辆型号" min-width="60">
        </el-table-column>
        <el-table-column prop="vehicleColor" label="车辆颜色" min-width="80">
        </el-table-column>
        <el-table-column prop="businessDepartment" label="所属营业部" min-width="80">
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
        <el-table-column prop="createDate" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="approvalClick(scope.row)">审批</el-button>
            <el-button type="text" @click="checkCaseInfo(scope.row)">案件详情</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
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
    stayApplyService
  } from "~/services/stay-apply.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class RemainCaseApproval extends Vue {
    @Dependencies(stayApplyService) private stayApplyService: stayApplyService;
    @Dependencies(PageService) private pageService: PageService;

    // 角色列表数据集
    private caseImportData: Array < any > = [];
    // 角色数据实体
    private caseImportModel: any = {
      actualName: "",
      phone: "",
      licensePlateNumber: ""
    };

    /**
     * 初始化
     */
    mounted() {
      this.refreshData()
    }

    /**
     * 获取刷新数据
     */
    refreshData() {
      this.stayApplyService.getAllStayApply(this.caseImportModel, this.pageService).subscribe(data => {
        this.caseImportData = data;
      });
    }
    approvalClick() {

    }
    checkCaseInfo() {

    }
  }

</script>
<style>


</style>

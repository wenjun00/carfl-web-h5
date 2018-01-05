<!--待接收案件-->
<template>
  <section class="page unreceived-case">
    <data-form :model="unReceivedModel" @onSearch="refreshData" @handleResetForm="resetForm">
      <template slot="default-input">
        <el-form-item label="车主姓名:" prop="actualName">
          <el-input v-model="unReceivedModel.actualName"></el-input>
        </el-form-item>
        <el-form-item label="车主电话:" prop="phone">
          <el-input v-model="unReceivedModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="车牌号:" prop="licensePlateNumber">
          <el-input v-model="unReceivedModel['vehicle.licensePlateNumber']"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="车架号:" prop="name">
          <el-input v-model="unReceivedModel['vehicle.frameNumber']"></el-input>
        </el-form-item>
        <el-form-item label="车辆型号:" prop="name">
          <el-input v-model="unReceivedModel['vehicle.vehicleModel']"></el-input>
        </el-form-item>
        <el-form-item label="委托方:" prop="trustee">
          <el-input v-model="unReceivedModel.trustee"></el-input>
        </el-form-item>
        <el-form-item label="委案日期:" prop="commissionDate">
          <el-input v-model="unReceivedModel.commissionDate"></el-input>
        </el-form-item>
        <el-form-item label="结案日期:" prop="closingDate">
          <el-input v-model="unReceivedModel.closingDate"></el-input>
        </el-form-item>
        <el-form-item label="所属营业部:" prop="businessDepartment">
          <el-input v-model="unReceivedModel['contract.businessDepartment']"></el-input>
        </el-form-item>
        <el-form-item label="省份:" prop="province">
          <el-input v-model="unReceivedModel.province"></el-input>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
          <el-input v-model="unReceivedModel.city"></el-input>
        </el-form-item>
      </template>
      <!--<template slot="default-button">
        <el-button @click="restartAllot">重新分配</el-button>
      </template>-->
    </data-form>
    <data-box :data="unReceivedDataStr" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="contractNumber" label="合同编号" min-width="100">
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
        <!--<el-table-column prop="businessDepartment" label="当前持有案件数" min-width="80">
        </el-table-column>
        <el-table-column prop="businessDepartment" label="案件滞留天数" min-width="80">
        </el-table-column>-->
        <el-table-column prop="commissionDate" label="委案日期" min-width="90">
          <!--<template slot-scope="scope">
            <span>{{scope.row.commissionDate?dateFormat(scope.row.commissionDate ,'yyyy-MM-dd'): ''}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="closingDate" label="结案日期" min-width="90">
          <!--<template slot-scope="scope">
            <span>{{scope.row.closingDate?dateFormat(scope.row.closingDate ,'yyyy-MM-dd'): ''}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="text">提醒接收</el-button>
            <el-button type="text" @click="restartAllot(scope)">重新分配</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="重新分配" :center="true" :visible.sync="dialog.restartAllot" @open="restartAllotOpen" width="20%">
      <restart-allot ref="restartAllot" @close="dialog.restartAllot = false" :caseIds="caseIds"></restart-allot>
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
    PageService
  } from "~/utils/page.service";
  import {
    orderService
  } from "~/services/order.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import RestartAllot from "~/components/pages/case-manage/restart-allot.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox,
      RestartAllot
    }
  })
  export default class UnreceivedCase extends Vue {
    @Dependencies(orderService) private orderService: orderService;
    @Dependencies(PageService) private pageService: PageService;
    // 角色列表数据集
    private unReceivedDataStr: Array < any > = [];
    private caseIds: String = ''
    // 角色数据实体
    private unReceivedModel: any = {
      actualName: '', //车主姓名
      phone: '', // 车主电话
      'vehicle.licensePlateNumber': '', // 车牌号
      'vehicle.frameNumber': '', // 车架号
      trustee: '', // 委托方
      commissionDate: '', // 委案日期
      closingDate: '', // 结案日期
      'contract.businessDepartment': '', // 所属营业部
      'vehicle.vehicleModel': '', // 车辆型号
      province: '', // 省份
      city: '', // 城市
      state: 'ASSIGNED'
    };
    private dialog: any = {
      restartAllot: false
    }

    /**
     * 初始化
     */
    mounted() {
      this.refreshData()
    }

    /**
     * 重新分配
     */
    restartAllot(scope) {
      this.caseIds = scope.row.id
      this.dialog.restartAllot = true
    }
    /**
     * 重置输入框
     */
    resetForm() {
      this.unReceivedModel['vehicle.licensePlateNumber'] = ''
      this.unReceivedModel['vehicle.vehicleModel'] = ''
      this.unReceivedModel['contract.businessDepartment'] = ''
      this.unReceivedModel['vehicle.frameNumber'] = ''
    }
    /**
     * 弹窗打开事件
     */
    restartAllotOpen() {
      this.$nextTick(() => {
        let restartAllot = < RestartAllot > this.$refs['restartAllot']
        restartAllot.refreshData()
      })
    }
    /**
     * 获取刷新数据
     */
    refreshData() {
      this.orderService.query(this.unReceivedModel, this.pageService, {
        trustee: "asc",
        "vehicle.licensePlateNumber": "asc"
      }).subscribe(data => {
        this.unReceivedDataStr = data;
      });
    }
  }

</script>
<style>


</style>

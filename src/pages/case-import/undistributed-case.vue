<template>
  <section class="page undistributed-case">
    <data-form :model="undistriCaseModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="车主姓名:" prop="name">
          <el-input v-model="undistriCaseModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="manualDistruibute">手动分案</el-button>
        <el-button @click="smartAllocatClick">策略分案</el-button>
      </template>
    </data-form>
    <data-box :data="undistributeData" @onPageChange="refreshData" :page="pageService">
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
        <el-table-column label="案件详情" min-width="90">
          <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text" @click="manualDistruibute(scope.row)">手动分案</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--策略分配结果-->
    <el-dialog :visible.sync="dialog.smartAllocate" title="策略分配结果" :center="true">
      <span>9999</span>
    </el-dialog>
    <!--手动分案-->
    <el-dialog :visible.sync="dialog.manualDistruibute" title="手动分案" :center="true">
      <manual-distruibute ref="manual-distruibute" @close="dialog.manualDistruibute=false"></manual-distruibute>
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
    orderService
  } from "~/services/order.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import ManualDistruibute from "~/components/pages/case-import/undistributed-case/manual-distruibute.vue";
  import {
    PageService
  } from "~/utils/page.service";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox,
      ManualDistruibute
    }
  })
  export default class UndistributedCase extends Vue {
    @Dependencies(orderService) private orderService: orderService;
    @Dependencies(PageService) private pageService: PageService;
    // 角色列表数据集
    private undistributeData: Array < any > = [];
    // 角色数据实体
    private undistriCaseModel: any = {
      name: ""
    };
    private dialog: any = {
      smartAllocate: false,
      manualDistruibute: false
    };

    /**
     * 初始化
     */
    mounted() {
      this.refreshData();
    }
    /**
     * 获取刷新数据
     */
    refreshData() {
      this.orderService.query("UNALLOCATED", this.pageService, {
        trustee: "asc",
        "vehicle.licensePlateNumber": "asc"
      }).subscribe(data => {
        this.undistributeData = data;
        console.log('undistributeData', data)
      });
    }
    /**
     * 手动分案
     */
    manualDistruibute(row) {
      this.dialog.manualDistruibute = true;
      this.$nextTick(() => {
        let manualDis: any = this.$refs['manual-distruibute'];
        manualDis.refreshData(row)
      })
    }
    /**
     * 策略分案
     */
    smartAllocatClick() {
      this.dialog.smartAllocate = true;
    }
  }

</script>
<style>


</style>

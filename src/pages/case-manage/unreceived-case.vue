<template>
  <section class="page unreceived-case">
    <data-form :model="unReceivedModel" @onSearch="refreshData">
      <template slot="default">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="unReceivedModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <!--<el-button @click="importClick">批量提醒</el-button>-->
        <el-button @click="createClick">重新分配</el-button>
      </template>
    </data-form>
    <data-box :data="unReceivedDataStr" @onPageChange="refreshData" :page="pageService">
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
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <!--<el-button type="text">提醒接收</el-button>-->
            <el-button type="text">重新分配</el-button>
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
    PageService
  } from "~/utils/page.service";
  import {
    orderService
  } from "~/services/order.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class UnreceivedCase extends Vue {
    @Dependencies(orderService) private orderService: orderService;
    @Dependencies(PageService) private pageService: PageService;
    // 角色列表数据集
    private unReceivedDataStr: Array < any > = [];
    // 角色数据实体
    private unReceivedModel: any = {
      name: ""
    };

    /**
     * 初始化
     */
    mounted() {
      console.log('this.orderService', this.orderService)
      this.refreshData()
    }

    /**
     * 获取刷新数据
     */
    refreshData() {
      this.orderService.query('ASSIGNED', this.pageService, {
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

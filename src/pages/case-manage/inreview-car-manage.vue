<template>
  <section class="page inreview-car-manage">
    <data-form :model="reviewModel" @onSearch="refreshData">
      <!--<template slot="default">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="roleModel.name"></el-input>
        </el-form-item>
      </template>-->
    </data-form>
    <data-box :data="reviewDataSet" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="batch" label="批次号" min-width="130">
        </el-table-column>
        <el-table-column prop="prinName" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" min-width="90">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" min-width="125">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" min-width="80">
        </el-table-column>
        <el-table-column prop="overDueDays" label="逾期天数" min-width="80">
        </el-table-column>
        <el-table-column prop="overdueAmount " label="案件金额(元)" min-width="100">
        </el-table-column>
        <el-table-column prop="operatorTime" label="导入日期" min-width="100">
        </el-table-column>
        <el-table-column prop="createDate" label="操作" min-width="60">
          <!--<template slot-scope="scope">
            <el-button type="text" @click="checkInfo(scope.row)" v-if="scope.row.state==='ERROR'&&'UNCONFIRM'">查看</el-button>
          </template>-->
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
  export default class InreviewCarManage extends Vue {
    @Dependencies(orderService) private orderService: orderService;

    // 角色列表数据集
    private reviewDataSet: Array < any > = [];
    // 角色数据实体
    private reviewModel: any = {
      name: ""
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
      this.orderService.query('ASSIGNED').subscribe(data => {
        this.reviewDataSet = data.content;
      });
    }
  }

</script>
<style>


</style>

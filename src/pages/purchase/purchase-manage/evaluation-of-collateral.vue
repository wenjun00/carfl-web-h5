<!--押品评估-->
<template>
  <section class="page evaluation-of-collateral">
    <page-header title="押品评估" hiddenPrint ></page-header>
    <data-form date-prop="timeSearch" :model="collaterallModel" @on-search="getCollateralList" :page="pageService">
      <template slot="input">
        <i-form-item prop="personalInfo" label="品牌型号">
          <i-input placeholder="请录入品牌\系列\\型号关键字查询" v-model="collaterallModel.personalInfo"></i-input>
        </i-form-item>
        <i-form-item prop="personalInfo" label="车牌号码">
          <i-input  v-model="collaterallModel.personalInfo"></i-input>
        </i-form-item>
        <i-form-item prop="personalInfo" label="客户姓名">
          <i-input  v-model="collaterallModel.personalInfo"></i-input>
        </i-form-item>
      </template>
      <template slot="button">
        <i-checkbox v-model="status">包含已评估</i-checkbox>
      </template>
    </data-form>
    <data-box  :columns="columns1" :data="data1" :page="pageService" @onPageChange="getCollateralList"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  import DataBox from "~/components/common/data-box.vue";
  import SvgIcon from "~/components/common/svg-icon.vue";
  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
    }
  })
  export default class EvaluationOfCollateral extends Page{
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: Array<Object> = [];
    private status: Boolean = false;
    private collaterallModel: any = {
      applicationType: "",
      isIncludeDealt: "",
      dynamicCondition: ""
    };
    getCollateralList(){

    }
    created() {
      this.getCollateralList();
      this.columns1 = [
        {
          title: "操作",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "评估编号",
          editable: true,
          key: "approvalDealStatus",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "状态",
          editable: true,
          key: "dealDate",
          align: "center",
          fixed: "left",
          width: 100
        },
        {
          title: "品牌",
          editable: true,
          key: "dealerName",
          align: "center"
        },
        {
          title: "系列",
          editable: true,
          key: "applicationType",
          align: "center",
        },
        {
          title: "车型",
          editable: true,
          key: "totalPayment",
          align: "center"
        },
        {
          title: "颜色",
          editable: true,
          key: "operatorTime",
          align: "center",
        },
        {
          title: "车牌号码",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "车架号",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "发动机号",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "客户姓名",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "联系电话",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "车况级别",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "估价",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "评估日期",
          editable: true,
          key: "operatorName",
          align: "center"
        },
        {
          title: "估价员",
          editable: true,
          key: "operatorName",
          align: "center"
        }
      ];
      this.data1 = [{

      }];
    }
  }
</script>

<style scoped>

</style>

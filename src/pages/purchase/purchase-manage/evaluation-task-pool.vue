<!--评估任务池-->
<template>
  <section class="page evaluation-task-pool">
    <span class="form-title">评估任务池</span>
    <span style="margin-left:50px;margin-right:5px;">品牌型号</span>
    <i-input placeholder="请录入品牌\系列\\型号关键字查询" style="display:inline-block;width:10%;" v-model="receipt.dynamicCondition"></i-input>
    <span style="margin-left:30px;margin-right:5px;">车牌号码</span>
    <i-input  style="display:inline-block;width:10%;" v-model="receipt.dynamicCondition"></i-input>
    <span style="margin-left:30px;margin-right:5px;">客户姓名</span>
    <i-input  style="display:inline-block;width:10%;" v-model="receipt.dynamicCondition"></i-input>
    <i-button style="margin-left:10px" class="blueButton" @click="searchReceiptapprove">搜索</i-button>
    <div style="font-size:16px;cursor:pointer;display:inline-block;color:#3367A7;float:right;margin-right:10px;margin-top:10px;">
      <i-button style="margin-right:10px" class="blueButton">批量领取</i-button>
      <svg-icon iconClass="daochu"></svg-icon>
      <span style="font-size: 12px;">导出</span>
    </div>
    <data-box  :columns="columns1" :data="data1" :page="pageService" @onPageChange="searchReceiptapprove"></data-box>
    <!--Model-->

    <!--<template>-->
    <!--<i-modal title="审批" width="500" v-model="approvalModal">-->
    <!--&lt;!&ndash;<approval :addAttachmentShow="addAttachmentShow"></approval>&ndash;&gt;-->
    <!--</i-modal>-->
    <!--</template>-->

    <!--<template>-->
    <!--<i-modal v-model="checkApplyModal" class="addApply" :title="type===1?'收款申请':'查看'" width="800">-->
    <!--&lt;!&ndash;<add-apply></add-apply>&ndash;&gt;-->
    <!--<apply-detail ref="applyDetail"></apply-detail>-->
    <!--<div slot="footer">-->
    <!--<i-button class="highDefaultButton" style="width:80px" @click="rebackClick" v-if="type===1">退回</i-button>-->
    <!--<i-button class="highButton" style="width:80px" @click="passClick" v-if="type===1">通过</i-button>-->
    <!--</div>-->
    <!--</i-modal>-->
    <!--</template>-->
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
  export default class EvaluationTaskPool extends Page{
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: Array<Object> = [];
    private receipt: any = {
      applicationType: "",
      isIncludeDealt: "",
      dynamicCondition: ""
    };
    searchReceiptapprove(){

    }
    created() {
      this.searchReceiptapprove();
      this.columns1 = [
        {
          type: "selection",
          align: "center",
          width: 60,
        },
        {
          title: "操作",
          align: "center",
          width: 60,
          render: (h, { row, columns, index }) => {
              return h("div", [
                h(
                  "i-button",
                  {
                    props: {
                      type: "text"
                    },
                    style: {
                      color: "#265EA2"
                    },
                    on: {
                      click: () => {
                        this.receive(row)
                      }
                    }
                  },
                  "领取"
                )
              ]);
            }
        },
        {
          title: "评估编号",
          editable: true,
          key: "approvalDealStatus",
          align: "center",
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
      ];
      this.data1 = [];
    }

    /**
     *  领取
     */
    receive(row){

    }
  }
</script>

<style scoped>

</style>

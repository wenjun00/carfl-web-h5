<!--减免申请记录-->
<template>
  <section class="page derate-apply-record">
    <span class="form-title">减免申请记录</span>
    <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div style="float:right;margin-top: 10px;margin-right:10px">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:6px;">
      <i-input style="display:inline-block;width:14%;margin-left:10px;" v-model="derateModel.orderInfo" placeholder="请输入客户姓名\证件号码\订单号\手机号(主)"></i-input>
      <span style="margin-left:10px;">日期：</span>
      <i-date-picker style="display:inline-block;width:10%;" v-model="derateModel.applyDateStart" placeholder="起始日期"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" v-model="derateModel.applyDateEnd" placeholder="终止日期"></i-date-picker>
      <i-select style="width:10%;margin-left:10px" placeholder="全部结算通道" v-model="derateModel.collectMoneyMethod" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;" @click="getDerateList">搜索</i-button>
    </i-row>
    <data-box :id="340" :columns="columns1" :data="derateList" :page="pageService" @onPageChange="getDerateList"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import RepaySum from "~/components/approval-manage/repay-sum.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { RemitApplicationService } from "~/services/manage-service/remit-application.service";
import { Layout } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    RepaySum,
    SvgIcon
  }
})
export default class DerateApplyRecord extends Page {
  @Dependencies(RemitApplicationService)
  private remitApplicationService: RemitApplicationService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private derateList: Array<Object> = [];
  private repayInfo: Boolean = false;
  private searchOptions: Boolean = false;
  private derateModel: any = {
    remitItem: 1121,
    applyDateStart: "",
    applyDateEnd: "",
    timeSearch: "",
    collectMoneyMethod: "",
    orderInfo: ""
  };

  mounted() {
    this.getDerateList();
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: 100,
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
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
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确定撤销吗？",
                      onOk: () => {
                        this.revertDerate(row);
                      }
                    });
                  }
                }
              },
              "撤销"
            )
          ]);
        }
      },
      {
        align: "center",
        editable: true,
        title: "应还罚息",
        key: "penaltyReceivable"
      },
      {
        align: "center",
        editable: true,
        title: "申请减免罚息",
        key: "penaltyDerate"
      },
      {
        align: "center",
        editable: true,
        title: "剩余罚息",
        key: "leftPenalty"
      },
      {
        align: "center",
        title: " 减免申请日期",
        editable: true,
        key: "applyDate",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.applyDate, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "name"
      },
      {
        align: "center",
        editable: true,
        title: " 证件号码",
        key: "idCard"
      },
      {
        align: "center",
        title: " 手机号",
        editable: true,
        key: "mobileNumber"
      },
      {
        align: "center",
        title: " 订单创建时间",
        editable: true,
        key: "orderCreateTime",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.orderCreateTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: " 订单编号",
        key: "orderNumber",
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              on: {
                click: () => {
                  this.$Modal.info({
                    width: "900",
                    render: h => h(PurchaseInformation)
                  });
                }
              }
            },
            row.orderNumber
          );
        }
      },
      {
        align: "center",
        title: " 合同生效日期",
        editable: true,
        key: "contractDate",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.contractDate, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: " 减免备注",
        key: "remitRemark"
      }
    ];
  }
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  repaySum(row) {}
  trailerCar(row) {}
  /**
   * 查看凭证
   */
  checkProof(row) {}
  getDerateList() {
    this.derateModel.applyDateStart = FilterService.dateFormat(
      this.derateModel.applyDateStart,
      "yyyy-MM-dd"
    );
    this.derateModel.applyDateEnd = FilterService.dateFormat(
      this.derateModel.applyDateEnd,
      "yyyy-MM-dd"
    );
    this.remitApplicationService
      .selectApplyForReliefHistory(this.derateModel, this.pageService)
      .subscribe(
        data => {
          this.derateList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 撤销
   */
  revertDerate(row) {
    this.remitApplicationService
      .remitCanceled({
        applyId: row.applyId
      })
      .subscribe(
        val => {
          this.$Message.success("撤销成功！");
          this.getDerateList();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  getTimeSearch(val) {
    this.derateModel.applyDateStart = "";
    this.derateModel.applyDateEnd = "";
    this.derateModel.collectMoneyMethod = "";
    this.derateModel.orderInfo = "";
    this.derateModel.timeSearch = val;
    this.getDerateList();
    this.derateModel.timeSearch = "";
  }
}
</script>
<style>

</style>

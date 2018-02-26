<!--订单查询-->
<template>
  <section class="page approval-order-query">
    <span class="form-title">订单查询</span>
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
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin-top:6px;position:relative;right:10px;">
      <i-input style="display:inline-block;width:14%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\手机号查询" v-model="approvalModel.personalInfo"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="approvalModel.startTime" placeholder="起始日期"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="approvalModel.endTime" placeholder="终止日期"></i-date-picker>
      <i-button style="margin-left:10px" class="blueButton" @click="getAllOrderList">搜索</i-button>
    </i-row>
    <data-box :id="322" :columns="columns1" :data="allOrderList" @onPageChange="getAllOrderList" :page="pageService"></data-box>

    <template>
      <i-modal @on-visible-change="visibleChange" title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information :scrollTopHeight="scrollTopHeight"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
import DataBox from "~/components/common/data-box.vue";
import Page from "~/core/page";
import Component from "vue-class-component";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import { ApprovalService } from "~/services/manage-service/approval.service";
import { PageService } from "~/utils/page.service";
import { CityService } from "~/utils/city.service";
import { FilterService } from "~/utils/filter.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    PurchaseInformation,
    SvgIcon
  }
})
export default class ApprovalOrderQuery extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private allOrderList: Array<Object> = [];
  private orderModal: Boolean = false;
  private searchOptions: Boolean = false;
  private purchaseInfoModal: Boolean = false;
  private scrollTopHeight = 0;
  private approvalModel: any = {
    timeSearch: "",
    startTime: "",
    endTime: "",
    personalInfo: ""
  };
  mounted() {
    this.getAllOrderList();
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
                    this.purchaseInfoModal = true;
                  }
                }
              },
              "查看"
            )
          ]);
        }
      },
      {
        key: "orderLink",
        align: "center",
        editable: true,
        title: "环节",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderLink));
        }
      },
      {
        title: "订单状态",
        align: "center",
        editable: true,
        key: "orderStatus",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderStatus));
        }
      },
      {
        align: "center",
        title: "订单创建时间",
        editable: true,
        key: "createTime",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "订单编号",
        key: "orderNumber",
        editable: true,
        align: "center",
        render: (h, { row, columns, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              on: {
                click: () => {
                  this.purchaseInfoModal = true;
                }
              }
            },
            row.orderNumber
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "personalName"
      },
      {
        align: "center",
        editable: true,
        title: "证件号",
        key: "idCard"
      },
      {
        align: "center",
        editable: true,
        title: "手机号",
        key: "mobileMain"
      },
      {
        align: "center",
        editable: true,
        title: "订单类型",
        key: "orderType",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },
      {
        align: "center",
        editable: true,
        title: "订单归属公司",
        key: "orderCompany"
      },
      {
        align: "center",
        editable: true,
        title: "归属部门",
        key: "orderDept"
      },
      {
        align: "center",
        editable: true,
        title: "制单人",
        key: "recorder"
      }
    ];
  }

  visibleChange() {
    let target = document.querySelector(".purchaseInformation .ivu-modal-body");
    if (target) {
      target.addEventListener("scroll", this.monitorScorll);
    }
  }
  monitorScorll() {
    let target = document.querySelector(".purchaseInformation .ivu-modal-body");
    if (target) {
      this.scrollTopHeight = target.scrollTop;
    }
  }
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  /**
   * 领取
   */
  getOrder(row) {
    this.orderModal = true;
  }

  getAllOrderList() {
    this.approvalModel.startTime = FilterService.dateFormat(
      this.approvalModel.startTime,
      "yyyy-MM-dd"
    );
    this.approvalModel.endTime = FilterService.dateFormat(
      this.approvalModel.endTime,
      "yyyy-MM-dd"
    );
    this.approvalService
      .approvalOrderSearch(this.approvalModel, this.pageService)
      .subscribe(
        data => {
          this.allOrderList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  getTimeSearch(val) {
    this.approvalModel.startTime = "";
    this.approvalModel.endTime = "";
    this.approvalModel.personalInfo = "";
    this.approvalModel.timeSearch = val;
    this.getAllOrderList();
    this.approvalModel.timeSearch = "";
  }
}
</script>

<style>

</style>

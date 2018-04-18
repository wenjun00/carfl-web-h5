<!--审批资源池-->
<template>
  <section class="page approval-resource-pool">
    <span class="form-title">审核资源池</span>
    <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
    <i-button @click="openSearch" class="open-search">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="command">
      <div class="command-item dayin">
        <svg-icon iconClass="dayin"></svg-icon>
        <span>打印</span>
      </div>
      <div class="command-item daochu">
        <svg-icon iconClass="daochu"></svg-icon>
        <span>导出</span>
      </div>
    </div>
    <i-row class="data-form" v-if="searchOptions">
      <i-input class="data-form-item searchinput"
               v-model="resourcePoolModel.personalInfo" placeholder="请录入客户姓名\证件号码\手机号查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker class="data-form-item date-picker" v-model="resourcePoolModel.startTime"
                     placeholder="起始日期"></i-date-picker>
      <i-date-picker class="data-form-item date-picker" v-model="resourcePoolModel.endTime" placeholder="终止日期"
                     :options="endDisabeldOptions"></i-date-picker>
      <i-select class="data-form-item select province" placeholder="选择省" v-model="resourcePoolModel.province" clearable>
        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label"
                  :value="value"></i-option>
      </i-select>
      <i-select class="data-form-item select city" placeholder="选择市" v-model="resourcePoolModel.city" clearable>
        <i-option
          v-for="{value,label} in this.resourcePoolModel.province ? this.$city.getCityData({ level: 1, id: this.resourcePoolModel.province }) : []"
          :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-select class="data-form-item select product-type" placeholder="订单类型" v-model="resourcePoolModel.productType" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0301')" :key="value" :label="label"
                  :value="value"></i-option>
      </i-select>
      <i-button class="data-form-item serch-button blueButton" @click="getApprovalListByCondition">搜索</i-button>
    </i-row>
    <data-box :id="235" :columns="columns1" :data="resourcePoolList" @onPageChange="getApprovalListByCondition"
              ref="databox" :page="pageService"></data-box>

    <!--Modal-->
    <template>
      <i-modal title="订单领取" v-model="orderModal" width="300">
        <span>确定将所选订单领取到我的审核？</span>
        <div slot="footer">
          <i-button @click="orderModal=false">取消</i-button>
          <i-button @click="confirmGetOrder" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--Model-->

    <template>
      <i-modal title="订单详情" width="1000" id="orderDetail" v-model="purchaseInformationModal" class="purchaseInformation"
               @on-visible-change="visibleChange">
        <purchase-information :scrollTopHeight="scrollTopHeight" ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInformationModal=false">返回</i-button>
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
  import {ApprovalService} from "~/services/manage-service/approval.service";
  import {Tooltip} from "iview";
  import {Dependencies} from "~/core/decorator";
  import {Layout} from "~/core/decorator";
  import {Mutation} from "vuex-class";
  import {PageService} from "~/utils/page.service";
  import {FilterService} from "~/utils/filter.service";
  import {CityService} from "~/utils/city.service";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class ApprovalResourcePool extends Page {
    @Dependencies(ApprovalService) private approvalService: ApprovalService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private resourcePoolList: Array<Object> = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private purchaseInformationModal: Boolean = false;
    private scrollTopHeight = 0;
    private val: Date;
    private resourcePoolModel: any = {
      startTime: "",
      endTime: "",
      province: "",
      city: "",
      personalInfo: "",
      timeSearch: "",
      productType: ""
    };
    private getOrderModel: any;
    private endDisabeldOptions: any = {
      disabledDate(date) {
      }
    };
    @Mutation("openPage") openPage;

    mounted() {
      this.getApprovalListByCondition();
    }

    activated() {
      this.getApprovalListByCondition();
    }

    created() {
      this.getOrderModel = {
        userId: "",
        orderIds: []
      };
      this.columns1 = [
        {
          title: "操作",
          align: "center",
          fixed: "left",
          width: 100,
          render: (h, {row, column, index}) => {
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
                      this.getOrder(row);
                    }
                  }
                },
                "领取"
              )
            ]);
          }
        },
        {
          key: "orderLink",
          align: "center",
          editable: true,
          title: "环节",
          render: (h, {row, columns, index}) => {
            if (row.riskStatus) {
              return h("div", [
                h("span", {}, this.$dict.getDictName(row.orderLink)),
                h(
                  "Tooltip",
                  {
                    props: {
                      content: row.riskRemark
                    }
                  },
                  [
                    h("svg-icon", {
                      props: {
                        iconClass: this.getIconClass(row)
                      },
                      style: {
                        color: this.getIconColor(row),
                        fontSize: "26px",
                        position: "relative",
                        top: "6px"
                      }
                    })
                  ]
                )
              ]);
            } else {
              return h("div", [
                h("span", {}, this.$dict.getDictName(row.orderLink))
              ]);
            }
          }
        },
        {
          title: "订单编号",
          key: "orderNumber",
          align: "center",
          editable: true,
          render: (h, {row, column, index}) => {
            if (row && row.orderNumber) {
              return h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.checkOrderInfo(row);
                    }
                  }
                },
                row.orderNumber
              );
            } else if (!row) {
              return h("span", {}, "");
            }
          }
        },
        {
          align: "center",
          title: "订单创建时间",
          editable: true,
          key: "createTime",
          render: (h, {row, column, index}) => {
            return h(
              "span",
              FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          align: "center",
          title: "进入资源池时间",
          editable: true,
          key: "intoPoolDate",
          render: (h, {row, column, index}) => {
            return h(
              "span",
              FilterService.dateFormat(row.intoPoolDate, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          align: "center",
          editable: true,
          title: "省份",
          key: "province",
          render: (h, {row, column, index}) => {
            return h("span", CityService.getCityName(row.province));
          }
        },
        {
          align: "center",
          editable: true,
          title: "城市",
          key: "city",
          render: (h, {row, column, index}) => {
            return h("span", CityService.getCityName(row.city));
          }
        },
        {
          align: "center",
          editable: true,
          title: "订单类型",
          key: "orderType",
          render: (h, {row, column, index}) => {
            return h("span", {}, this.$dict.getDictName(row.orderType));
          }
        },
        {
          align: "center",
          editable: true,
          title: "产品名称",
          key: "productName"
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
          title: "证件号码",
          key: "idCard"
        },
        {
          align: "center",
          editable: true,
          title: "手机号",
          key: "mobileMain"
        }
      ];
    }

    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true;
      this.getOrderModel.orderIds = row.orderId;
      this.getOrderModel.userId = this.$store.state.userData.id;
    }

    /**
     * 获取Icon类
     */
    getIconClass(row) {
      if (row.riskStatus === 345) {
        return "heimingdan";
      } else if (row.riskStatus === 346) {
        return "huimingdan";
      } else if (row.riskStatus === 347) {
        return "neishen";
      }
    }

    /**
     * 获取Icon颜色
     */
    getIconColor(row) {
      if (row.riskStatus === 345) {
        return "#666666";
      } else if (row.riskStatus === 346) {
        return "#B6B6B6";
      } else if (row.riskStatus === 347) {
        return "#F9435D";
      }
    }

    confirmGetOrder() {
      this.approvalService.batchReceiveApproval(this.getOrderModel).subscribe(
        data => {
          this.$Message.success("领取成功！");
          this.getApprovalListByCondition();
        },
        ({msg}) => {
          this.$Message.error(msg);
        }
      );
      this.orderModal = false;
    }

    /**
     * 获取审核资源池列表
     */
    getApprovalListByCondition() {
      this.resourcePoolModel.startTime = FilterService.dateFormat(
        this.resourcePoolModel.startTime,
        "yyyy-MM-dd"
      );
      this.resourcePoolModel.endTime = FilterService.dateFormat(
        this.resourcePoolModel.endTime,
        "yyyy-MM-dd"
      );
      this.approvalService
        .auditResourcePool(this.resourcePoolModel, this.pageService)
        .subscribe(
          data => {
            this.resourcePoolList = data;
          },
          ({msg}) => {
            this.$Message.error(msg);
          }
        );
    }

    getTimeSearch(val) {
      this.resourcePoolModel.startTime = "";
      this.resourcePoolModel.endTime = "";
      this.resourcePoolModel.city = "";
      this.resourcePoolModel.province = "";
      this.resourcePoolModel.personalInfo = "";
      this.resourcePoolModel.productType = "";
      this.resourcePoolModel.timeSearch = val;
      this.getApprovalListByCondition();
      this.resourcePoolModel.timeSearch = "";
    }

    openSearch() {
      this.searchOptions = !this.searchOptions;
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

    timeRangeChange(val) {
      let startTime, endTime;
      startTime = new Date(val[0]);
      endTime = new Date(val[1]);
      this.resourcePoolModel.startTime = startTime;
      this.resourcePoolModel.endTime = endTime;
    }

//   clearTime() {}
    checkOrderInfo(row) {
      this.purchaseInformationModal = true;
      let _purchaseInfo: any = this.$refs["purchase-info"];
      _purchaseInfo.getOrderDetail(row);
    }
  }
</script>

<style lang="less" scoped>
  .page.approval-resource-pool {
    .open-search {
      color: #265EA2
    }
    .command {
      float: right;
      margin-right: 10px;
      margin-top: 10px;
      .command-item {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        color: #3367A7;
        span {
          font-size: 12px;
        }
        &.dayin {
          font-size: 18px;
        }
        &.daochu {
          font-size: 16px;
        }
      }
    }

    .data-form {
      position: relative;
      right: 10px;
      .data-form-item {
        &.searchinput {
          display: inline-block;
          width: 14%;
          min-width: 230px;
          margin-left: 20px;
        }
        &.date-picker {
          display: inline-block;
          width: 10%;
        }
        &.select{
          &.province{
            width: 80px;
            margin-left: 10px;
          }
          &.city{
            width: 80px;
            margin-left: 10px;
          }
          &.product-type{
            width:120px;
          }
        }
        &.search-button{
          margin-left:10px;
        }
      }


    }
  }
</style>

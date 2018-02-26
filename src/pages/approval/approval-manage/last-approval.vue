<!--终审-->
<template>
  <section class="page last-approval">
    <span class="form-title">终审</span>
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
    <i-row v-if="searchOptions" style="margin-top:6px;position:relative;right:10px;">
      <i-input style="display:inline-block;width:14%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\手机号查询" v-model="resourcePoolModel.resourcePoolModel"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="resourcePoolModel.startTime" placeholder="起始日期"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="resourcePoolModel.endTime" placeholder="终止日期"></i-date-picker>
      <span style="margin-left:10px;">省市：</span>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择省" v-model="resourcePoolModel.province" clearable>
        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择市" v-model="resourcePoolModel.city" clearable>
        <i-option v-for="{value,label} in this.resourcePoolModel.province ? this.$city.getCityData({ level: 1, id: this.resourcePoolModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <span style="margin-left:10px;">产品类型</span>
      <i-select placeholder="产品类型" style="width:120px;" v-model="resourcePoolModel.productType" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0419')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getLastList">搜索</i-button>
    </i-row>

    <data-box :id="262" :columns="columns1" :data="lastList" @onPageChange="getLastList" :page="pageService"></data-box>
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

    <template>
      <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information></purchase-information>
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
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";
import { CityService } from "~/utils/city.service";
import { ApprovalService } from "~/services/manage-service/approval.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    PurchaseInformation
  }
})
export default class LastApproval extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private lastList: Array<Object> = [];
  private orderModal: Boolean = false;
  private searchOptions: Boolean = false;
  private purchaseInfoModal: Boolean = false;
  private resourcePoolModel: any = {
    orderLink: 334,
    startTime: "",
    endTime: "",
    province: "",
    city: "",
    personalInfo: "",
    timeSearch: "",
    productType: ""
  };
  private getOrderModel: any = {
    userId: "",
    orderIds: []
  };

  mounted() {
    this.getLastList();
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
        key: "orderLink",
        title: "环节",
        editable: true,
        align: "center",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderLink));
        }
      },
      {
        title: "订单编号",
        key: "orderNumber",
        editable: true,
        align: "center",
        render: (h, { row, column, index }) => {
          if (row && row.orderNumber) {
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
        render: (h, { row, column, index }) => {
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
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.intoPoolDate, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        align: "center",
        title: "省份",
        editable: true,
        key: "province",
        render: (h, { row, column, index }) => {
          return h("span", CityService.getCityName(row.province));
        }
      },
      {
        align: "center",
        title: "城市",
        editable: true,
        key: "city",
        render: (h, { row, column, index }) => {
          return h("span", CityService.getCityName(row.city));
        }
      },
      {
        align: "center",
        title: "订单类型",
        editable: true,
        key: "orderType",
        render: (h, { row, columns, index }) => {
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
        title: "证件号",
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
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  /**
   * 领取
   */
  getOrder(row) {
    this.orderModal = true;
    this.getOrderModel.orderIds = row.orderId;
    this.getOrderModel.userId = this.$store.state.userData.id;
  }
  confirmGetOrder() {
    this.approvalService.batchReceiveApproval(this.getOrderModel).subscribe(
      val => {
        this.$Message.success("领取成功！");
        this.getLastList();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
    this.orderModal = false;
  }
  getLastList() {
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
          this.lastList = data;
        },
        ({ msg }) => {
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
    this.getLastList();
    this.resourcePoolModel.timeSearch = "";
  }
}
</script>

<style>

</style>

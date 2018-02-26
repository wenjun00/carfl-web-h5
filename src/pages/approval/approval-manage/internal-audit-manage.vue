<!--内审-->
<template>
  <section class="page internal-audit-manage">
    <span class="form-title">内审</span>
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
      <span style="margin-left:10px;">省市：</span>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择省" v-model="approvalModel.province" clearable>
        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择市" v-model="approvalModel.city" clearable>
        <i-option v-for="{value,label} in this.approvalModel.province ? this.$city.getCityData({ level: 1, id: this.approvalModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <span style="margin-left:10px;">产品类型</span>
      <i-select placeholder="产品类型" style="width:120px;" v-model="approvalModel.productType" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0419')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getInternalAuditList">搜索</i-button>

    </i-row>

    <data-box :id="295" :columns="columns1" :data="internalList" @onPageChange="getInternalAuditList" :page="pageService"></data-box>

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
export default class InternalAuditManage extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private internalList: Array<Object> = [];
  private orderModal: Boolean = false;
  private searchOptions: Boolean = false;
  private purchaseInfoModal: Boolean = false;
  private approvalModel: any = {
    riskStatus: 0,
    timeSearch: "",
    province: "",
    city: "",
    personalInfo: "",
    productType: ""
  };

  mounted() {
    this.getInternalAuditList();
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: 200,
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
            ),
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
                      content: "确定移出此订单吗？",
                      onOk: () => {
                        this.moveOut(row);
                      }
                    });
                  }
                }
              },
              "移出"
            )
          ]);
        }
      },
      {
        key: "orderLink",
        editable: true,
        align: "center",
        title: "环节",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderLink));
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
        align: "center",
        editable: true,
        title: "进入资源池时间",
        key: "intoPoolDate",
        width: 180,
        render: (h, { row, column, index }) => {
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
        title: "手机号",
        editable: true,
        key: "mobileMain"
      }
    ];
  }

  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  getInternalAuditList() {
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
          this.internalList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  timeRangeChange(val) {
    let startTime, endTime;
    startTime = new Date(val[0]);
    endTime = new Date(val[1]);
    this.approvalModel.startTime = startTime;
    this.approvalModel.endTime = endTime;
    this.approvalModel.timeSearch = "";
  }
  getTimeSearch(val) {
    this.approvalModel.startTime = "";
    this.approvalModel.endTime = "";
    this.approvalModel.city = "";
    this.approvalModel.province = "";
    this.approvalModel.endTime = "";
    this.approvalModel.productType = "";
    this.approvalModel.personalInfo = "";
    this.approvalModel.timeSearch = val;
    this.getInternalAuditList();
    this.approvalModel.timeSearch = "";
  }
  moveOut(row) {
    this.approvalService
      .removeRiskStatus({
        orderIds: row.orderId
      })
      .subscribe(
        val => {
          this.$Message.success("移出成功");
          this.getInternalAuditList();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
}
</script>

<style>

</style>

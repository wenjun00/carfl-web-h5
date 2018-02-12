<template>
  <section class="page customer-sign">
    <span class="form-title">客户签约</span>
    <i-button @click="getOrderInfoByTime(0)" type="text">昨日</i-button>
    <i-button @click="getOrderInfoByTime(1)" type="text">今日</i-button>
    <i-button @click="getOrderInfoByTime(2)" type="text">本周</i-button>
    <i-button @click="getOrderInfoByTime(3)" type="text">本月</i-button>
    <i-button @click="getOrderInfoByTime(4)" type="text">上月</i-button>
    <i-button @click="getOrderInfoByTime(5)" type="text">最近三月</i-button>
    <i-button @click="getOrderInfoByTime(6)" type="text">本季度</i-button>
    <i-button @click="getOrderInfoByTime(7)" type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
        <span style="font-size:12px;">打印</span>
      </div>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input v-model="customName" style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <i-button class="blueButton" style="margin-left:10px;" @click="getSignList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="customerSignList" @onPageChange="getSignList" :page="pageService"></data-box>
    <!--弹出框-->
    <template>
      <!--生成合同-->
      <i-modal v-model="openCreateCompact" title="合同生成">
        <i-row>
          <span style="position:relative;bottom:6px;margin-right:10px;">订单类型</span>
          <i-radio-group v-model="checkRadio" @on-change="changeCompactType">
            <i-row>
              <i-col :span="6">
                <i-radio label="融资租赁合同"></i-radio>
                <i-radio label="长租合同"></i-radio>
              </i-col>
              <i-col :span="6">
                <i-radio label="全款销售合同"></i-radio>
                <i-radio label="长租合同（银行版）"></i-radio>
              </i-col>
            </i-row>
            <!--<i-row>-->
            <!--<i-table :columns="columns3" :data="data3" border stripe></i-table>-->
            <!--</i-row>-->
          </i-radio-group>
          <i-table :columns="columns3" :data="data3"></i-table>
        </i-row>
        <div slot="footer">
          <i-button class="blueButton" @click="openCreateCompact=false">确认打印</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="openCompact" title="上传合同">
        <i-upload action="//jsonplaceholder.typicode.com/posts/">
          <i-button type="ghost" icon="ios-cloud-upload-outline">上传</i-button>
        </i-upload>
        <div style="font-size:18px;font-weight:bold;margin-top:10px">
          <span>文件数量（3）</span>
          <div style="display:inline-block;float:right;">
            <svg-icon style="font-size:24px;cursor:pointer;position:relative;left:18px;" iconClass="xiazai"></svg-icon>
            <i-button type="text">全部下载</i-button>
          </div>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>身份证-001fdawdeklvkje...</span>
          <span style="margin-left:10px;">驾驶证-001fdawdeklvkje...</span>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>结婚证-001fdawdeklvkje...</span>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import { Layout } from "~/core/decorator";
import { PersonalService } from "~/services/manage-service/personal.service";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class CustomerSign extends Page {
  @Dependencies(PersonalService) private personalService: PersonalService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private customerSignList: Array<Object> = [];
  private searchOptions: Boolean = false;
  private customName: String = "";
  private openCreateCompact: Boolean = false;
  private openColumnsConfig: Boolean = false;
  private openCompact: Boolean = false;
  private columns2: any;
  private data2: Array<Object> = [];
  private data3: Array<Object> = [];
  private checkRadio: String = "融资租赁合同";
  private columns3: any;
  private customerSignModel: any = {};

  mounted() {
    this.getSignList();
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
                    this.createCompact(row);
                  }
                }
              },
              "生成合同"
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
                    this.openCompactInfos(row);
                  }
                }
              },
              "合同资料"
            )
          ]);
        }
      },
      {
        title: "订单编号",
        align: "center",
        key: "orderId"
      },
      {
        align: "center",
        title: "订单创建时间",
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
        title: "订单类型",
        key: "orderType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },
      {
        align: "center",
        title: "产品名称",
        key: "productName"
      },
      {
        align: "center",
        title: "客户姓名",
        key: "personalName"
      },
      {
        align: "center",
        title: "证件号码",
        key: "idCard"
      },
      {
        align: "center",
        title: "联系号码",
        key: "mobileMain"
      },
      {
        align: "center",
        title: "最近合同生成日期",
        key: "latelyContractTime",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(
              row.latelyContractTime,
              "yyyy-MM-dd hh:mm:ss"
            )
          );
        }
      }
    ];
    this.columns2 = [
      {
        title: "序号",
        type: "index",
        width: 80,
        align: "center"
      },
      {
        title: "列名",
        key: "columnsName",
        align: "center"
      },
      {
        type: "selection",
        width: 80,
        align: "center"
      }
    ];
    this.columns3 = [
      {
        title: "文件名称",
        align: "center",
        key: "fileName"
      },
      {
        type: "selection",
        align: "center",
        width: 80
      }
    ];
    this.data2 = [
      {
        columnsName: "订单编号"
      },
      {
        columnsName: "订单创建时间"
      },
      {
        columnsName: "订单类型"
      },
      {
        columnsName: "产品名称"
      },
      {
        columnsName: "客户姓名"
      },
      {
        columnsName: "证件号码"
      },
      {
        columnsName: "最近合同生成日期"
      }
    ];

    this.data3 = [
      {
        fileName: "融资租赁申请单"
      },
      {
        fileName: "融资租赁合同正文"
      },
      {
        fileName: "合同附件一(付款时间表)"
      },
      {
        fileName: "合同附件二(配偶确认书)"
      },
      {
        fileName: "合同附件三(共同承租人确认书)"
      },
      {
        fileName: "委托收款合同"
      },
      {
        fileName: "首付款明细"
      },
      {
        fileName: "服务确认书"
      },
      {
        fileName: "责任告知书"
      },
      {
        fileName: "车辆交接单"
      },
      {
        fileName: "车辆出库单"
      },
      {
        fileName: "补充协议（减免）"
      }
    ];
  }
  /**
   * 获取客户签约列表
   */
  getSignList() {
    this.personalService
      .getCustomerSignList(this.customerSignModel, this.pageService)
      .subscribe(
        data => {
          this.customerSignList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  oneKeyToConnect() {}
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  /**
   * 生成合同
   */
  createCompact(row) {
    this.openCreateCompact = true;
  }
  openCompactInfos(row) {
    this.openCompact = true;
  }
  /**
   * 多选
   */
  multipleSelect(selection) {}
  /**
   * 切换合同种类
   */
  changeCompactType(type) {
    if (type === "全款销售合同") {
      this.data3 = [
        {
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        },
        {
          fileName: "合同附件三(共同承租人确认书)"
        }
      ];
    } else if (type === "长租合同（银行版）") {
      this.data3 = [
        {
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        }
      ];
    } else if (type === "长租合同") {
      this.data3 = [
        {
          fileName: "长期租赁申请单"
        },
        {
          fileName: "长期租赁合同正文"
        },
        {
          fileName: "合同附件一(甲乙双方相关责任条款)"
        },
        {
          fileName: "合同附件二(车辆交接清单)"
        },
        {
          fileName: "委托收款合同"
        },
        {
          fileName: "车辆销售协议"
        },
        {
          fileName: "收款明细"
        },
        {
          fileName: "车辆出库单"
        },
        {
          fileName: "补充协议（减免）"
        }
      ];
    } else {
      this.data3 = [
        {
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        },
        {
          fileName: "合同附件三(共同承租人确认书)"
        },
        {
          fileName: "委托收款合同"
        },
        {
          fileName: "首付款明细"
        },
        {
          fileName: "服务确认书"
        },
        {
          fileName: "责任告知书"
        },
        {
          fileName: "车辆交接单"
        },
        {
          fileName: "车辆出库单"
        },
        {
          fileName: "补充协议（减免）"
        }
      ];
    }
  }
  /**
   * 确定
   */
  confirm() {}
}
</script>

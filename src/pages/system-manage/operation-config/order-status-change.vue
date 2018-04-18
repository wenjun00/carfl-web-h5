<!--订单状态变更-->
<template>
  <section class="page order-status-change">
    <span class="form-title">订单状态变更</span>
    <i-row  class="data-form">
      <div class="command" >
        <div class="command-item dayin">
          <svg-icon iconClass="dayin"></svg-icon>
          <span>打印</span>
        </div>
        <div class="command-item daochu">
          <svg-icon iconClass="daochu"></svg-icon>
          <span>导出</span>
        </div>
      </div>
      <i-input class="form-input" placeholder="请录入客户姓名\证件号码\手机号\订单号查询" v-model="orderInfo"></i-input>
      <i-button class="blue-button" @click="getOrderStatusChangeList">搜索</i-button>
      <!-- <i-button class="blueButton" style="margin-left:10px;" @click="refreshRoleList">重置</i-button> -->
    </i-row>
    <data-box :id="48" :columns="columns1" :data="orderStatusChangeList" @onPageChange="getOrderStatusChangeList" :page="pageService"></data-box>
    <!--Model-->

    <template>
      <i-modal v-model="changeStatusOpen" title="状态变更" width="300">
        <i-select placeholder="请选择状态" v-model="orderLink">
          <i-option v-for="item in orderStatusList" :key="item.code" :label="item.name" :value="item.code"></i-option>
        </i-select>
        <div slot="footer">
          <i-button @click="changeStatusOpen=false">取消</i-button>
          <i-button @click="confirmChangeStatus" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class OrderStatusChange extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;
  private changeStatusOpen: Boolean = false;
  private columns1: any;
  private orderStatusChangeList: Array<any> = [];
  private orderInfo: String = "";
  private orderLink: Number = 0;
  private orderStatusList: Array<any> = [];
  private orderId: Number = 0;

  mounted() {
    this.getOrderStatusChangeList();
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        width: 120,
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
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
                  this.changeStatus(row);
                }
              }
            },
            "更改状态"
          );
        }
      },
      {
        title: "客户姓名",
        key: "personalName",
        editable: true,
        align: "center"
      },
      {
        title: "环节",
        editable: true,
        key: "orderLink",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderLink));
        }
      },
      {
        title: "证件号码",
        editable: true,
        key: "idCard",
        align: "center",
        // render: (h, { row, columns, index }) => {
        //   return h("span", {}, row.orderType | encryptIDCardFour);
        // }
      },
      {
        title: "联系号码",
        editable: true,
        key: "mobileMain",
        align: "center",
        // render: (h, { row, columns, index }) => {
        //   return h("span", {}, this.$dict.getDictName(row.orderType));
        // }
      },
      {
        title: "订单创建时间",
        editable: true,
        key: "createTime",
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "订单编号",
        editable: true,
        key: "orderNumber",
        align: "center"
      },
      {
        title: "订单类型",
        editable: true,
        key: "orderType",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },
      {
        title: "产品名称",
        editable: true,
        key: "productName",
        align: "center"
      },
      {
        title: "产品期数",
        editable: true,
        key: "periods",
        align: "center"
      },
      {
        title: "利率（月）",
        editable: true,
        key: "productRate",
        align: "center"
      },
      {
        title: "还款方式",
        editable: true,
        key: "payWay",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.payWay));
        }
      },
      {
        title: "融资总额",
        editable: true,
        key: "financingAmount",
        align: "center"
      },
      {
        title: "订单状态",
        editable: true,
        key: "orderStatus",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderStatus));
        }
      }
    ];
  }
  /**
   * 确定改变状态
   */
  confirmChangeStatus() {
    this.productOrderService
      .changeOrderStatus({
        orderId: this.orderId,
        linkId: this.orderLink
      })
      .subscribe(
        data => {
          this.$Message.success("更改成功！");
          this.changeStatusOpen = false;
          this.getOrderStatusChangeList();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 订单状态变更列表
   */
  getOrderStatusChangeList() {
    this.productOrderService
      .getOrderStatusChange(
        {
          orderInfo: this.orderInfo
        },
        this.pageService
      )
      .subscribe(
        data => {
          this.orderStatusChangeList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 更改状态
   */
  changeStatus(row) {
    this.orderLink = row.orderLink;
    this.orderId = row.orderId;
    this.changeStatusOpen = true;
    this.productOrderService
      .getPreProcess({
        orderId: row.orderId
      })
      .subscribe(
        data => {
          this.orderStatusList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 重置搜索
   */
  // refreshRoleList() {}
}
</script>

<style lang="less" scope>
  .page.order-status-change{
    .data-form{
      margin:6px;
      .command{
          float:right;
          margin-right:10px;
          margin-top:-48px;
          .command-item{
            display:inline-block;
            color:#3367A7;
            margin-left:10px;
            cursor:pointer;
             &.dayin{
              font-size:18px;
               span{
                font-size: 12px;
                }
            }
             &.daochu{
              font-size:16px;
               span{
                font-size: 12px;
                }
            }
           
          }
      }
      .form-input{
          display:inline-block;
          width:14%;
          margin-left:5px;
          min-width:260px;
          margin-right:10px
      }
      .blue-button{
        margin-left:10px;
        background: #265EA2;
        color: #fff;
      }
    }
  }
</style>

<template>
  <section class="page home-page theme-default">
    <data-box :columns="testColumns" :data="testData" :page="pageService" @page-change="updateData"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import { OrderQueryService } from "~/services/business-service/order-query.service";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class Test1 extends Vue {
  @Dependencies() private pageService: PageService;
  @Dependencies(OrderQueryService) private orderQueryService: OrderQueryService;

  private testData: Array<any> = [];
  private testColumns: Array<any> = [];

  created() {
    this.testColumns = [
      {
        align: "center",
        type: "index",
        renderHeader: (h, { row, column, index }) => {
          return h(
            "div",
            {
              on: {
                click: () => {
                }
              },
              style: {
                cursor: "pointer"
              }
            },
            [
              h("Icon", {
                props: {
                  type: "gear-b",
                  size: "20"
                }
              })
            ]
          );
        }
      },
      {
        title: "操作",
        width: "200",
        align: "center",
        render: (h, params) => {
          if (params.row.link === "待命") {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "blue"
                  },
                  on: {
                    click: () => {
                    }
                  }
                },
                "编辑订单"
              )
            ]);
          } else {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "blue"
                  },
                  on: {
                  }
                },
                "申请收款"
              ),
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      console.log(333);
                    }
                  }
                },
                "进度查询"
              )
            ]);
          }
        }
      },
      {
        title: "销售单号",
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                  }
                }
              },
              params.row.orderId
            )
          ]);
        }
      },
      {
        align: "center",
        title: "订单创建时间",
        key: "orderCreateTime"
      },
      {
        align: "center",
        title: "客户",
        key: "customName"
      },
      {
        align: "center",
        title: "订单类型",
        key: "orderType"
      },
      {
        align: "center",
        title: "产品名称",
        key: "prdName"
      },
      {
        align: "center",
        title: "产品期数",
        key: "prdPeriod"
      },
      {
        align: "center",
        title: "利率(月)",
        key: "prdInterest"
      },
      {
        align: "center",
        title: "还款方式",
        key: "repaymentMethod"
      },
      {
        align: "center",
        title: "融资总额",
        key: "totalFinancing"
      },
      {
        align: "center",
        title: "环节",
        key: "link"
      },
      {
        align: "center",
        title: "订单状态",
        key: "orderStatus"
      }
    ];

    this.updateData()
  }

  updateData(){
    console.log(1123)
     this.orderQueryService.getOrderQueryData().subscribe(({ val }) => {
      this.testData = val;
    });
  }
}
</script>

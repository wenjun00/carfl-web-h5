<!--客户还款撤销-->
<template>
  <section class="page customer-repay-revert">
    <span class="form-title">客户还款撤销</span>
    <i-row class="data-form">
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

      <span>客户姓名：</span>
      <i-input class="form-input" placeholder="请输入客户姓名"></i-input>
      <span>证件号码：</span>
      <i-input class="form-input" placeholder="请输入证件号码"></i-input>
      <span >联系号码：</span>
      <i-input class="form-input" placeholder="请输入联系号码"></i-input>
      <span>订单编号：</span>
      <i-input class="form-input" placeholder="请输入订单编号"></i-input>
      <i-button class="form-button"  @click="getCustomerRepayList">搜索</i-button>
      <i-button class="form-button"  @click="refreshRoleList">重置</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" @rowClick="rowClick" @onPageChange="getCustomerRepayList"
              :page="pageService"></data-box>

    <template>
      <i-modal v-model="deductRecordModal" title="划扣记录" width="1200">
        <deduct-record></deduct-record>
      </i-modal>
    </template>

    <template>
      <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button class="pop-up-button" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import DeductRecord from "~/components/system-manage/deduct-record.vue";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import {PageService} from "~/utils/page.service";
  import {Dependencies} from "~/core/decorator";
  import {Layout} from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      DeductRecord,
      PurchaseInformation
    }
  })
  export default class CustomerRepayRevert extends Page {
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private data1: Array<Object> = [];
    private openColumnsConfig: Boolean = false;
    private deductRecordModal: Boolean = false;
    private columns2: any;
    private data2: Array<Object>;
    private purchaseInfoModal: Boolean = false;

    created() {
      this.columns1 = [
        {
          title: "操作",
          width: 120,
          fixed: "left",
          align: "center",
          render: (h, {row, column, index}) => {
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
                    this.deductRecordModal = true;
                  }
                }
              },
              "划扣记录"
            );
          }
        },
        {
          title: "客户姓名",
          key: "customerName",
          align: "center"
        },
        {
          title: "证件号码",
          key: "idCard",
          align: "center"
        },
        {
          title: "联系号码",
          key: "phone",
          align: "center"
        },
        {
          title: "订单编号",
          key: "orderId",
          align: "center",
          render: (h, params) => {
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
                    this.purchaseInfoModal = true;
                  }
                }
              },
              "KB2017101001"
            );
          }
        },
        {
          title: "客户结算号",
          key: "customerSettleAccountId",
          align: "center"
        },
        {
          title: "合同生效日",
          key: "compactEffectDate",
          align: "center"
        },
        {
          title: "还款日",
          key: "repayDate",
          align: "center"
        },
        {
          title: "代还本金",
          key: "expectMajorMoney",
          align: "center"
        },
        {
          title: "待还利息",
          key: "expectInterest",
          align: "center"
        },
        {
          title: "待还罚息",
          key: "expectPunishInterest",
          align: "center"
        },
        {
          title: "利率（%/月）",
          key: "interestRate",
          align: "center"
        },
        {
          title: "结算通道",
          key: "settleAccountChannel",
          align: "center"
        },
        {
          title: "公司",
          key: "firm",
          align: "center"
        }
      ];

      // 获取数据
      this.data1 = [
        {
          customerName: "陈丽",
          idCard: "610101199411102415",
          phone: "13125653242",
          orderCreateTime: "2017-12-01",
          orderId: "KB2017101001",
          customerSettleAccountId: "622820190001",
          compactEffectDate: "2017-12-01",
          repayDate: "2017-12-2",
          expectMajorMoney: "800",
          expectInterest: "200",
          expectPunishInterest: "0",
          interestRate: "3.45",
          settleAccountChannel: "汇付",
          firm: "群泰西安"
        }
      ];

      this.columns2 = [
        {
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];

      this.data2 = [
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "联系号码"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "订单编号"
        },
        {
          columnsName: "客户结算号"
        },
        {
          columnsName: "合同生效日"
        },
        {
          columnsName: "还款日"
        },
        {
          columnsName: "代还本金"
        },
        {
          columnsName: "待还利息"
        },
        {
          columnsName: "待还罚息"
        },
        {
          columnsName: "利率（%/月）"
        },
        {
          columnsName: "结算通道"
        },
        {
          columnsName: "公司"
        }
      ];
    }

    rowClick(row) {
    }

    /**
     *  获取客户还款查询撤销列表
     */
    getCustomerRepayList() {
    }

    /**
     * 重置搜索
     */
    refreshRoleList() {
    }
  }
</script>

<style lang="less" scoped>
  .page.customer-repay-revert{
    .data-form{
        margin:6px;
        .command{
          float:right;
          margin-right:10px;
          margin-top:-48px;
          .command-item{
            display:inline-block;
            margin-left:10px;
            cursor:pointer;
            color:#3367A7;
              &.dayin{
              font-size:18px;
            }
             &.daochu{
              font-size:16px;
            }
             span{
              font-size: 12px
            }
          }
        }
        .form-input{
          display:inline-block;
          width:10%;
          margin-right:10px;
        }
        .form-button{
          margin-left:10px;
          background: #265EA2;
          color: #fff;

        }
    }
    .pop-up-button{
        background:#265ea2;
        color:#fff;
    }
  }
 
</style>

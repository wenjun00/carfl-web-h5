<!--提前结清收款明细-->
<template>
  <section class="component gather-detail-early-pay">
    <i-card>
      <data-box :columns="feeItemColumns" :data="saleItemList" ref="table" @on-selection-change="currentSelect" :showConfigColumn="false" :height="300"></data-box>
      <div class="total-money">
        总金额：
        <b>{{totalMoney | toThousands}}</b> 元
      </div>
    </i-card>
    <div class="form-title">账户信息</div>
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="户名" :span="4">{{accountInfo.personalName}}</data-grid-item>
      <data-grid-item label="开户银行" :span="4">{{accountInfo.depositBank}}</data-grid-item>
      <data-grid-item label="银行卡号" :span="4">{{accountInfo.cardNumber}}</data-grid-item>
      <data-grid-item label="支行名称" :span="4">{{accountInfo.depositBranch}}</data-grid-item>
      <data-grid-item label="第三方客户号" :span="8">{{accountInfo.clientNumber}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import DataBox from '~/components/common/data-box.vue'
import { Prop } from 'vue-property-decorator'
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
import { LodashService } from "~/utils/lodash.service.ts";

@Component({
  components: {
    DataBox,
    DataGrid,
    DataGridItem
  }
})
export default class GatherDetailEarlyPay extends Vue {
  @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService;

  /**
   * 提前结清 true
   * 提前收回 false
   */
  @Prop({
    required: true,
    type: Boolean
  }) typeData

  private modifyGatherItemModal: Boolean = false
  private changeGatherItemModal: Boolean = false
  private addGatherItemModal: Boolean = false // 添加收款项
  private otherTotal: number = 0 // 除其他费用的合计
  private gatherItemList: Array<any> = []
  private gatherItemModel: any
  private otherFee: number = 0 // 输入框的其他费用
  private accountInfo: Array<any> = [] // 账户信息
  private feeItemColumns: Array<any> = [] // 收费项目列配置
  public saleItemList = [] // 收费项目列表
  public totalMoney = 0 // 总金额

  created() {
    this.gatherItemModel = {
      itemName: '',
      itemMoney: ''
    }
    this.feeItemColumns = [{
      align: "center",
      type: "selection",
      width: 60,
      _checked: true
    },
    {
      align: "center",
      title: "收款项",
      key: "itemLabel",
      render: (h, { row }) => h("span", {}, this.$dict.getDictName(row.itemLabel))
    },
    {
      align: "center",
      title: "金额",
      key: "itemMoney",
      render: (h, { row }) => {
        if (row.itemName === 'otherFee') {
          return h('i-input-number', {
            props: {
              formatter: this.$filter.moneyFormat,
              parser: this.$filter.moneyParse,
              min: 0
            }
          })
        } else {
          return h('div', {
            style: {
              textAlign: "right",
              paddingRight: "40%"
            },
          }, this.$filter.toThousands(row.itemMoney))
        }
      }
    }
    ];
  }

  /**
   * 设置默认选中项
  */
  private setDefaultChecked(data) {
    let total = 0
    data.forEach(item => {
      if (item.itemName === "surplusPrincipal" || item.itemName === "surplusPenaltyFreeze") {
        item._checked = true;
        item._disabled = true;
        total += item.itemMoney
      }
    })
    this.totalMoney = LodashService.round(total, 2)
  }

  /**
    * 获取收费项目
    */
  public changeGatherItem(orderId) {
    let _Observable = null

    return new Promise((resolve, reject) => {
      if (this.typeData) {
        this.withdrawApplicationService
          .getAdvanceRevokeItems(orderId)
          .subscribe(
            data => {
              this.setDefaultChecked(data)
              this.saleItemList = data;
              resolve()
            },
            err => {
              this.$Message.error(err.msg)
              reject()
            });
      } else {
        this.withdrawApplicationService
          .getAdvancePayoffItems(orderId)
          .subscribe(
            data => {
              this.setDefaultChecked(data)
              this.saleItemList = data;
              resolve()
            }, err => {
              this.$Message.error(err.msg);
              reject()
            }
          );
      }
    })
  }

  /**
   * 修改其他费用重新计算合计
   */
  private currentSelect(selectionList) {
    let total = selectionList.reduce((x, y) => x + y.itemMoney, 0)
    this.totalMoney = LodashService.round(total, 2)
  }

  /**
   * 订单收费项返显示
  */
  public makeListdataSet(data) {
    if (data && data.advanceRevokeApplicationItems) {
      let itemNames: Array<string> = data.advanceRevokeApplicationItems.map(v => v.itemName)
      this.gatherItemList.forEach(v => v._checked = itemNames.includes(v.itemName))
    }
  }

  // 重置表格
  public resetTable() {
    this.saleItemList = []
  }
}
</script>

<style lang="less" scoped>
.component.gather-detail-early-pay {
  .total-money {
    text-align: right;
    padding-right: 15%;
  }
  .gather-type-table {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #dddee1;
    .item-money {
      width: 10%;
    }
  }
  .add-icon {
    position: relative;
    left: 16px;
    top: 5px;
    color: #265ea2;
  }
  .add-button {
    margin-top: 10px;
    color: #265ea2;
  }
}

.choose-buy-materials {
  .ivu-select-selection {
    // width: 240%;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
}

.calculate {
  .ivu-modal-footer {
    display: none !important;
  }
}
</style>

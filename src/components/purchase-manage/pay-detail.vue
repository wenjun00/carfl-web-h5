<!--提前结清付款明细-->
<template>
  <section class="component pay-detail">
    <!--<i-table :columns="columns1" :data="data1" width="1100"></i-table>-->
    <table border="1" width="1100" class="gather_type_table" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" width="40">
          <span>操作</span>
        </td>
        <td bgcolor="#F2F2F2">
          <span>项目名称</span>
        </td>
        <td bgcolor="#F2F2F2">
          <span>金额</span>
        </td>
      </tr>
      <tr height="40" v-for="item in personalInfo" :key="item.index">
        <td width="40">
          <i-button  v-show="item.refundItem===125" type="text" style="color:#265ea2" @click="deleteGatherItem(item)">删除</i-button>
        </td>
        <td>
          <span>{{item.refundItem}}</span>
        </td>
        <td>
          <span>{{item.refundAmount}}</span>
        </td>
      </tr>
      <tr height="40" v-show="changeGatherItemModal">
        <td></td>
        <td>
          <i-input v-model="gatherItemModel.refundItem"></i-input>
        </td>
        <td>
          <i-col :span="18">
            <i-input v-model="gatherItemModel.refundAmount"></i-input>
          </i-col>
          <i-col :span="6">
            <i-button style="background:#265ea2;color:#fff" @click="addGatherItem">添加</i-button>
          </i-col>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td>合计（元）</td>
        <td><span>{{this.totleAccount}}</span></td>
      </tr>
    </table>
    <div>
      <Icon type="plus" style="position:relative;left:16px;top:5px;color:#265ea2"></Icon>
      <i-button type="text" style="margin-top:10px;color:#265ea2" @click="changeGatherItem">添加付款项</i-button>
    </div>
    <div class="form-title">账户信息</div>
    <i-table :columns="columns3" :data="bankList" width="1100"></i-table>
    <!--编辑付款项-->
    <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑付款项" width="300">
        <modify-gather-item></modify-gather-item>
      </i-modal>

      <!--添加付款项-->
      <i-modal v-model="payItems" title="付款项目" width="600" @on-ok="confirChoose">
        <data-box  border stripe ref="payItemDialog" :columns="columns2" :data="itemInfos"></data-box>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from "~/components/common/data-box.vue"
  import {
    Prop
  } from "vue-property-decorator";
  import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
  import ChangeGatherItem from "~/components/purchase-manage/change-gather-item.vue";

  @Component({
    components: {
      SvgIcon,
      DataBox,
      ModifyGatherItem,
      ChangeGatherItem
    }
  })
  export default class PayDetail extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns3: any;
    private columns2: any;
    private totleAccount: String = '';
    private payItems: Boolean = false;
    private bankList: Array < Object > = [];
    private modifyGatherItemModal: Boolean = false;
    private changeGatherItemModal: Boolean = false;
    private personalInfo: Array < any >= []
    private itemInfos: Array < any >= []
    private gatherItemModel: any;
    private multipleSelection: any = [];
    created() {
      this.gatherItemModel = {
        refundAmount: '',
        refundItem: ''
      }
      this.columns2 = [{
        title: "全选",
        width: 60,
        type: 'selection',
        align: "center"
      }, {
        key: 'refundItem',
        title: '项目名称',
        align: 'center'
      }, {
        key: 'refundAmount',
        title: '金额',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          if (index === 1) {
            return row.refundAmount = 0
          } else {
            return row.refundAmount
          }
        }
      }]

      this.columns1 = [{
        title: "操作",
        width: 340,
        align: "center",
        render: (h, {
          row,
          column,
          index
        }) => {
          if (row.itemName !== '合计') {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.data1.forEach((x, i) => {
                            if (i === index) {
                              this.data1.splice(i, 1)
                            }
                          })
                        }
                      })
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      }, {
        key: 'refundName',
        title: '项目名称',
        align: 'center'
      }, {
        key: 'refundAmount',
        title: '金额',
        align: 'center'
      }]

      this.columns3 = [{
        key: 'personalName',
        align: 'center',
        title: '户名'
      }, {
        key: 'depositBank',
        align: 'center',
        title: '开户银行'
      }, {
        key: 'cardNumber',
        align: 'center',
        title: '银行卡号'
      }, {
        key: 'depositBranch',
        align: 'center',
        title: '支行名称'
      }, {
        key: 'clientNumber',
        align: 'center',
        title: '第三方客户号'
      }]
    }
    refresh(childMessage) {
      this.bankList = childMessage.bankList
      this.personalInfo = childMessage.itemList
      this.itemInfos = childMessage.itemList
    }
    modifyGatherItem() {
      this.modifyGatherItemModal = true
    }
    /**
     * 变更付款项
     */
    changeGatherItem() {
      this.payItems = true
    }
    addGatherItem() {
      this.changeGatherItemModal = false
    }
    deleteGatherItem(item) {
      console.log(item)
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除吗？',
        onOk: () => {
          this.personalInfo.splice(0, 1);
        }
      })
    }
    confirChoose() {
      this.multipleSelection = this.$refs['payItemDialog']
      this.multipleSelection = this.multipleSelection.getCurrentSelection()
      this.personalInfo.push(this.multipleSelection[0])
      console.log(this.itemInfos, 666666)
    }
   }

</script>

<style lang="less" scope>
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

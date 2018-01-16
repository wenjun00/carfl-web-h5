<!--提前结清收款明细-->
<template>
  <section class="component gather-detail-early-pay">
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
      <tr height="40" v-for="item in gatherItemList" :key="item.index">
        <td width="40">
        </td>
        <td>
          <span>{{item.itemName}}</span>
        </td>
        <td>
          <span>{{item.itemMoney}}</span>
        </td>
      </tr>
      <tr height="40" v-show="changeGatherItemModal">
        <td>
          <i-button type="text" style="color:#265ea2" @click="deleteGatherItem">删除</i-button>
        </td>
        <td>
          <i-input v-model="gatherItemModel.itemName"></i-input>
        </td>
        <td>
          <i-col :span="18">
            <i-input v-model="gatherItemModel.itemMoney"></i-input>
          </i-col>
          <i-col :span="6">
            <i-button style="background:#265ea2;color:#fff" @click="addGatherItem">添加</i-button>
          </i-col>
        </td>
      </tr>
      <tr height="40">
        <td></td>
        <td>合计（元）</td>
        <td>9000</td>
      </tr>
    </table>
    <div>
      <Icon type="plus" style="position:relative;left:16px;top:5px;color:#265ea2"></Icon>
      <i-button type="text" style="margin-top:10px;color:#265ea2" @click="changeGatherItem">添加收款项</i-button>
    </div>
    <div class="form-title">账户信息</div>
    <i-table :columns="columns3" :data="data3" width="1100"></i-table>
    <!--编辑收款项-->
    <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑收款项" width="300">
        <modify-gather-item></modify-gather-item>
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
  export default class GatherDetailEarlyPay extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private modifyGatherItemModal: Boolean = false;
    private changeGatherItemModal: Boolean = false;
    private gatherItemList: Array < Object >= []
    private gatherItemModel: any;
    created() {
      this.gatherItemModel = {
        itemName: '',
        itemMoney: ''
      }
      this.gatherItemList = [{
        index: 1,
        itemName: '剩余未还总额',
        itemMoney: '8000'
      }, {
        index: 1,
        itemName: '提前结清手续费',
        itemMoney: '1000'
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
              // h(
              //   "i-button", {
              //     props: {
              //       type: "text"
              //     },
              //     style: {
              //       color: "#265EA2"
              //     },
              //     on: {
              //       click: () => {
              //         this.modifyGatherItem();
              //       }
              //     }
              //   },
              //   "编辑"
              // ),
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
        key: 'itemName',
        title: '项目名称',
        align: 'center'
      }, {
        key: 'itemMoney',
        title: '金额',
        align: 'center'
      }]

      this.data1 = [{
        itemName: '首付金额',
        itemMoney: '9000'
      }, {
        itemName: '首付月供',
        itemMoney: '9000'
      }, {
        itemName: '合计',
        itemMoney: '18000'
      }]

      this.columns3 = [{
        key: 'accountName',
        align: 'center',
        title: '户名'
      }, {
        key: 'openAccountBank',
        align: 'center',
        title: '开户银行'
      }, {
        key: 'bankCardId',
        align: 'center',
        title: '银行卡号'
      }, {
        key: 'branchBankName',
        align: 'center',
        title: '支行名称'
      }, {
        key: 'thirdCustomId',
        align: 'center',
        title: '第三方客户号'
      }]

      this.data3 = [{
        accountName: '李兵强',
        openAccountBank: '中国建设银行',
        bankCardId: '6227004171150315789',
        branchBankName: '丈八六路支行',
        thirdCustomId: '3456878774154'
      }]
    }
    modifyGatherItem() {
      this.modifyGatherItemModal = true
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      this.changeGatherItemModal = true
    }
    addGatherItem() {
      this.changeGatherItemModal = false
    }
    deleteGatherItem() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除吗？',
        onOk: () => {
          this.changeGatherItemModal = false
        }
      })
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
      display: none!important;
    }
  }

</style>

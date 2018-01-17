<!--确认收款-->
<template>
  <section class="component confirm-gather">
    <i-form :label-width="110" label-position="left">
      <i-row style="background:#F5F5F5">
        <i-col :span="24" style="padding:6px;">
          <span>收款类型：</span><span style="margin-left:10px;">销售收款</span>
          <i-button style="float:right;color:#265ea2" type="text" @click="saleApplyInfo">销售申请详情</i-button>
        </i-col>
        <i-col :span="24" :pull="3" style="margin-top:10px;margin-left:10px">
          <i-form-item>
            <span>备注：</span>
            <i-input type="textarea" v-model="gatherModal.remarks" style="display:inline-block;width:80%;" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>附件</span>
    </div>

    <div class="invoiceContainer">
      <div v-for="item in invoiceList" :key="item.index" class="invoices">
        <div class="invoiceItem"></div>
        <div class="invoiceName">{{item.invoiceName}}</div>
      </div>
    </div>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款明细</span>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款方式</span>
    </div>

    <table border="1" width="840" class="gather_type_table" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2">
          <div style="display:inline-block;padding:0 10px;cursor:pointer" @click="addRow">
            <i-icon type="plus"></i-icon>
          </div>
        </td>
        <td bgcolor="#F2F2F2">
          <span>项目名称</span>
        </td>
        <td bgcolor="#F2F2F2">
          <span>收款项</span>
        </td>
        <td bgcolor="#F2F2F2" colspan="1">金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40">
        <td>
          <i-icon type="loop" style="color:#199ED8;font-size:16px;padding:0 10px;cursor:pointer"></i-icon>
        </td>
        <td>
          <i-select v-model="payType" placeholder="选择收款方式" style="display:inline-block;width:110px">
            <i-option label="汇付" value="汇付" key="汇付"></i-option>
            <i-option label="支付宝" value="支付宝" key="支付宝"></i-option>
            <i-option label="现金" value="现金" key="现金"></i-option>
          </i-select>
        </td>
        <td>
          <i-select v-model="payType" placeholder="选择收款项目" style="display:inline-block;width:110px">
            <i-option label="首付金额" value="首付金额" key="首付金额"></i-option>
            <i-option label="路桥费" value="路桥费" key="路桥费"></i-option>
            <i-option label="GPS费" value="GPS费" key="GPS费"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px"></i-input>
          <i-button class="blueButton" v-show="payType==='汇付'">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" style="margin-left:6px;cursor:pointer"></i-icon>
        </td>
      </tr>
    </table>

    <!--<i-table :columns3="columns3" :data3="data3"></i-table>-->
    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>账户信息</span>
    </div>
    <i-table :columns="columns2" :data="data2"></i-table>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>收款凭证</span>
    </div>

    <i-row style="margin-top:10px">
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
          @click="addAttachment">
          <Icon type="plus-circled" style="display:block;margin-top:53px;" size="40" color="#265ea2"></Icon>
          <div>点击添加附件</div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
      </i-col>
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;right:140px;">
        </div>
      </i-col>
    </i-row>

    <template>
      <i-modal title="订单详情" v-model="purchaseInfoModel" width="1000" class="purchaseInformation">
        <purchase-information :scrollTopHeight="scrollTopHeight"></purchase-information>
        <div slot="footer">
          <i-button style="background:#265ea2;color:#fff" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import DataBox from "~/components/common/data-box.vue";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";

  @Component({
    components: {
      ChangeCard,
      DataBox,
      PurchaseInformation
    }
  })
  export default class ConfirmGather extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private purchaseInfoModel: Boolean = false;
    private gatherModal: Object = {
      gatherType: '销售收款',
      remarks: ''
    }
    private invoiceList: Array < any > = []
    private payType = ''
    private scrollTopHeight = 0

    addAttachment() {}
    mounted() {
      let target = document.querySelector(".purchaseInformation .ivu-modal-body")
      if (target) {
        target.addEventListener('scroll', this.monitorScorll)
      }
    }
    monitorScorll() {
      let target = document.querySelector(".purchaseInformation .ivu-modal-body")
      if (target) {
        this.scrollTopHeight = target.scrollTop
        console.log(this.scrollTopHeight)
      }
    }
    created() {
      this.columns3 = [{
        align: "center",
        width: "60",
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  // this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "plus",
                  size: "20"
                }
              })
            ]
          );
        },
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (index === 1) {
            return h("Icon", {
              props: {
                type: "loop",
                size: "20"
              }
            })
          } else {
            return h("Icon", {
              props: {
                type: "trash-a",
                size: "20"
              }
            })
          }
        }
      }, {
        title: '项目名称',
        align: 'center',
        key: 'projectName',
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('Select', {
            props: {
              width: '100px',
              placeholder: '请选择收款方式'
            }
          }, [h('Option', {
            props: {
              label: '汇付',
              value: '汇付'
            }
          }), h('Option', {
            props: {
              label: '富友',
              value: '富友'
            }
          }), h('Option', {
            props: {
              label: '现金',
              value: '现金'
            }
          })])
        }
      }]
      this.data3 = [{
        // projectName: ''
      }]
      this.invoiceList = [{
        index: 1,
        invoiceName: '发票-1'
      }, {
        index: 2,
        invoiceName: '发票-2'
      }, {
        index: 3,
        invoiceName: '发票-3'
      }]

      this.columns1 = [{
        align: 'center',
        width: 60,
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  // this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "plus",
                  size: "20"
                }
              })
            ]
          );
        },
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (row.projectName !== '合计') {
            return h('Icon', {
              props: {
                type: 'trash-b',
                size: "20"
              }
            })
          }
        }
      }, {
        title: '项目名称',
        key: 'projectName',
        align: 'center'
      }, {
        title: '金额',
        key: 'money',
        align: 'center'
      }]

      this.data1 = [{
        projectName: '首付金额',
        money: '80000'
      }, {
        projectName: '首付月供',
        money: '10000'
      }, {
        projectName: '保证金',
        money: '8000'
      }, {
        projectName: '路桥费',
        money: '0'
      }, {
        projectName: '合计',
        money: '98000'
      }]

      this.columns2 = [{
        title: "户名",
        align: 'center',
        key: 'accountName'
      }, {
        title: "开户银行",
        align: 'center',
        key: 'accountBank'
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'bankCardId'
      }, {
        title: "支行名称",
        align: 'center',
        key: 'branchBankName'
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'thirdCustomerId'
      }]
      this.data2 = [{
        accountName: '胡开甲',
        accountBank: '中国建设银行',
        bankCardId: '6227004171150135894',
        branchBankName: '大雁塔分行',
        thirdCustomerId: '853654689213'
      }]
    }
    changeBankCard() {

    }
    addRow() {
      // let tr: any = document.createElement('tr');
      // let tb: any = document.getElementsByClassName('gather_type_table')[0]
      // let cellsNum = tb.rows[0].cells.length;
      // console.log(444, cellsNum)
      // for (let j = 0; j < cellsNum; j++) {
      //   let td = document.createElement('td');
      //   td.innerHTML = 'test';
      //   tr.appendChild(td);
      // }
      // tb.tBodies[0].appendChild(tr);
    }
    saleApplyInfo() {
      this.purchaseInfoModel = true
    }
  }

</script>

<style lang="less">
  .invoiceContainer {
    display: flex;
    justify-content: flex-start;
    .invoices {
      margin-top: 10px;
    }
    .invoiceItem {
      margin-left: 10px;
      width: 140px;
      height: 100px;
      border: 1px solid #dddddd;
      background-image: url('/static/images/common/invoice.png')
    }
    .invoiceName {
      text-align: center;
    }
  }

</style>

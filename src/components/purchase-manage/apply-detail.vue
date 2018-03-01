<!--添加新申请-->
<template>
  <section class="component apply-detail">
    <!--付款申请-->
    <i-row>
      <i-form :label-width="110" style="margin-top:20px;position:relative;right:20px;">
        <i-col :span="12">
          <i-form-item label="客户姓名">
            <i-input v-model="addNewApplyModal.name" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="付款类型">
            <i-input v-model="refundType" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="身份证号">
            <i-input v-model="addNewApplyModal.idCard" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="选择订单">
            <i-input v-model="orderNumber" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" v-model="remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <span class="title">付款明细</span>
      <data-box :columns="columns1" :data="payDetail"></data-box>
      <span class="title">账户信息</span>
      <data-box :columns="columns3" :data="accountDetail"></data-box>
      <span class="title">附件</span>
      <i-row>
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
            @click="addAttachment">
            <Icon type="plus-circled" style="display:block;margin-top:60px;" size="40"></Icon>
            <div>点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div class="demo-upload-list" v-for="(item, id) in fileList" :key="id">
            <img style="height:200px;width:200px;border:1px solid #C2C2C2;" :src="item.materialUrl">
            <div class="demo-upload-list-cover">
              <i-icon type="ios-trash-outline" @click.native="handleRemove(item)"></i-icon>
            </div>
          </div>
        </i-col>
      </i-row>
    </i-row>
    <!--提前结清申请-->
    <!--<i-row v-if="applyType==='提前结清申请'">
      
    </i-row>-->
    <!--提前收回申请-->
    <!--<i-row v-if="applyType==='提前收回申请'">
      
    </i-row>-->
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";
  @Component({

    components: {
      DataBox
    }
  })
  export default class ApplyDetail extends Vue {
    @Prop() orderType;
    addAttachmentShow: Boolean;

    private applyType: String = '销售收款申请'
    private payDetail: Array < Object > = [];
    private data1: Array < Object > = [];
    private columns1: any;
    private openColumnsConfig: Boolean = false
    private columns2: any;
    private data2: Array < Object > = [];
    private columns3: any;
    private accountDetail: Array < Object > = [];
    private fileList: Array < Object > = [];
    private addNewApplyModal: any = {
      name: '',
      idCard: ''
    };
    private refundList: Object = {};
    private refundType: String = '';
    private remark: String = '';
    private orderNumber: String = '';
    /**
     * 添加附件
     */
    addAttachment() {}
    /**
     *打开页面获取申请数据
     */
    getparent(val) {
      this.refundList = val
      this.addNewApplyModal = val.personal
      this.payDetail = val.itemList
      this.accountDetail = val.bankListk
      this.fileList = val.resourceList
      this.refundType = val.RefundApplication ? val.RefundApplication.refundType : ''
      this.remark = val.RefundApplication ? val.RefundApplication.remark : ''
      this.orderNumber = val.productOrder.orderNumber
    }
    getparentData(val, row) {
      console.log(val, row)
      this.orderNumber = val.orderNumber // 订单号
      val.collectMoneyItemModels.map(v => {
        v.refundAmount = v.itemMoney
        v.refundItem = v.itemLabel
      })
      this.addNewApplyModal.name = row.accountName // 客户姓名
      this.payDetail = val.collectMoneyItemModels // 付款明细
      this.addNewApplyModal.idCard = val.idCard // 证件号
      this.refundType = val.applicationType // 付款类型
      this.accountDetail = val.personalBank // 账户信息
      this.fileList = val.applicationPhaseUploadResources
    }
    getparentreceipt(val) {
      console.log(val)
      this.addNewApplyModal.name = val.accountName // 客户姓名
      this.refundType = val.applicationType // 付款类型
      //   this.accountDetail = val.personalBank // 账户信息
    }
    /**
     *删除附件
     */
    handleRemove(file) {
      console.log(file)
      this.fileList.splice(this.fileList.indexOf(file), 1);
    }
    created() {
      console.log(2)
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
        key: 'refundItem',
        align: 'center'
      }, {
        title: '金额',
        key: 'refundAmount',
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

      }]
      this.data2 = [{

      }]

      this.columns3 = [{
        title: "户名",
        align: 'center',
        key: 'personalName'
      }, {
        title: "开户银行",
        align: 'center',
        key: 'depositBank'
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'cardNumber'
      }, {
        title: "支行名称",
        align: 'center',
        key: 'depositBranch'
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'clientNumber'
      }]

    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
  }

</script>
<style lang="less" scope>
  .title {
    font-size: 14px;
    font-weight: bold;
  }

</style>

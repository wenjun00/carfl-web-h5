<!--添加新申请-->
<template>
  <section class="component add-apply">
    <!--销售收款申请-->
    <i-row>
      <i-form :label-width="110" :model="addNewApplyModal" :rules="applyRules" class="item-kehu-form">
        <i-col :span="12">
          <i-form-item label="客户姓名">
            <i-input v-model="addNewApplyModal.customerName" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="收款类型">
            <i-select v-model="addNewApplyModal.gatherType" disabled>
              <i-option label="销售收款" value="销售收款" key="销售收款"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="身份证号" prop="idCard">
            <i-input v-model="addNewApplyModal.idCard" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="选择订单">
            <i-select v-model="addNewApplyModal.chooseOrder" disabled>
              <i-option label="kb20171001" value="kb20171001" key="kb20171001"></i-option>
              <i-option label="kb20171002" value="kb20171002" key="kb20171002"></i-option>
              <i-option label="kb20171003" value="kb20171003" key="kb20171003"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" v-model="addNewApplyModal.remark" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <span class="title">收款明细</span>
      <data-box :columns="columns1" :data="data1"></data-box>
      <span class="title">账户信息</span>
      <bank-info :dataSet="data3"></bank-info>
      <span class="title">附件</span>
      <i-row>
        <i-col :span="12">
          <div class="item-fujian-div" @click="addAttachment">
            <Icon type="plus-circled" class="item-fujian-icon" size="40"></Icon>
            <div>点击添加附件</div>
            <span class="item-fujian-span">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div class="item-backgroud-div">

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
import {  Prop } from "vue-property-decorator";
import BankInfo from "~/components/base-data/bank-info.vue"

@Component({

  components: {
    DataBox,
    BankInfo
  }
})
export default class AddApply extends Vue {
  @Prop({
    // default: true
  })
  addAttachmentShow: Boolean;

  private applyType: String = '销售收款申请'
  private data1: Array<Object> = [];
  private columns1: any;
  private openColumnsConfig: Boolean = false
  private columns2: any;
  private data2: Array<Object> = [];
  private data3: Array<Object> = [];
  private addNewApplyModal: Object = {};
  private applyRules: any = {

  }
  /**
   * 添加附件
   */
  addAttachment() {
  }

  mounted() {
    // console.log(this.addAttachmentShow, 123123)
  }

  created() {
    this.applyRules = {
      idCard: [{
        required: true,
        message: '请输入证件号码',
        trigger: 'blur'
      },
      {
        validator: this.$validator.idCard,
        trigger: 'blur'
      }]
    }
    this.addNewApplyModal = {
      customerName: '李良琛',
      gatherType: '销售收款',
      idCard: '610303199111142416',
      chooseOrder: 'kb20171001',
      remark: ''
    }
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
    this.columns2 = [{}]
    this.data2 = [{}]

    this.data3 = [{
      accountName: '胡开甲',
      accountBank: '中国建设银行',
      bankCardId: '6227004171150135894',
      branchBankName: '大雁塔分行',
      thirdCustomerId: '853654689213'
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
<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: bold;
}

.component.add-apply {
  .item-kehu-form {
    margin-top: 20px;
    position: relative;
    right: 20px;
  }
  .item-fujian-div {
    height: 200px;
    width: 200px;
    border: 1px solid #c2c2c2;
    cursor: pointer;
    text-align: center;
    position: relative;
    left: 40px;
  }
  .item-fujian-icon {
    display: block;
    margin-top: 60px;
  }
  .item-fujian-span {
    color: gray;
  }
  .item-backgroud-div {
    height: 200px;
    width: 200px;
    border: 1px solid #c2c2c2;
    background: url("/static/images/common/invoice2.png");
    background-repeat: no-repeat;
    position: relative;
    right: 50px;
  }
}
</style>

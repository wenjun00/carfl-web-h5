<!--企业银行卡详情-->
<template>
  <section class="component company-bank-card">
    <i-row style="display:flex;justify-content:space-around">
      <i-col :span="10">
        <div style="width:100%;height:40px;border:1px solid black;line-height:40px;background:#F2F2F2">
          <span style="margin-left:6px;">建设银行</span>
          <div style="float:right">
          </div>
        </div>
        <div style="text-align:center;border-left:1px solid black;border-right:1px solid black;height:130px;">
          <div class="triangle-topright">
            <span style="position:absolute;bottom:22px;right:15px;-webkit-transform:rotate(-30deg);color:#fff;font-size:16px; ">默认</span>
          </div>
          <span style="margin-left:97px">5719******0829</span>
          <p>户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
          <p>省份：陕西</p><span>城市：西安</span>
          <p>开户行：招商银行</p>
          <p>支行名：招商银行西安支行</p>
        </div>
        <div style="border:1px solid black;height:40px;line-height:40px">
          <span style="margin-left:6px;">验证状态：</span><span style="color:green">通过</span>
          <span style="float:right;margin-right:6px;">绑卡日期：2017-12-01</span>
        </div>
      </i-col>
      <i-col :span="10">
        <div style="width:100%;height:40px;border:1px solid black;line-height:40px;background:#F2F2F2">
          <span style="margin-left:6px;">招商银行</span>
          <div style="float:right">
            <i-button class="blueButton" size="small" style="margin-right:4px;" @click="unbindBankCard">解绑</i-button>
          </div>
        </div>
        <div style="text-align:center;border-left:1px solid black;border-right:1px solid black;height:130px;">
          <span style="margin-left:97px">5719******0829</span>
          <p>户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
          <p>省份：陕西</p><span>城市：西安</span>
          <p>开户行：招商银行</p>
          <p>支行名：招商银行西安支行</p>
        </div>
        <div style="border:1px solid black;height:40px;line-height:40px">
          <span style="margin-left:6px;">验证状态：</span><span style="color:green">通过</span>
          <span style="float:right;margin-right:6px;">绑卡日期：2017-12-01</span>
        </div>
      </i-col>
    </i-row>
    <div style="text-align:center;margin-top:40px;">
      <i-button @click="cancel">取消</i-button>
      <i-button @click="addNewBankCard" class="blueButton" style="margin-left:60px;">新增银行卡</i-button>
    </div>

    <template>
      <i-modal title="解绑银行卡" width="480" v-model="unbindBankCardModal">
        <unbind-bank-card></unbind-bank-card>
        <div slot="footer">
          <i-button @click="unbindBankCardModal=false">取消</i-button>
          <i-button @click="unbindBankCardModal=false" class="blueButton">确认解绑</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="新增银行卡" v-model="addNewBankCardModal">
        <add-new-bank></add-new-bank>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import UnbindBankCard from "~/components/purchase-manage/unbind-bank-card.vue"
  import AddNewBank from "~/components/finance-manage/add-new-bank.vue"
  @Component({
    components: {
      ChangeCard,
      UnbindBankCard,
      AddNewBank
    }
  })
  export default class CompanyBankCard extends Vue {
    private unbindBankCardModal: Boolean = false
    private addNewBankCardModal: Boolean = false

    created() {

    }
    /**
     * 新增银行卡
     */
    addNewBankCard() {
      this.addNewBankCardModal = true
    }
    cancel() {
      this.$emit('close')
    }
    /**
     * 解绑银行卡
     */
    unbindBankCard() {
      this.unbindBankCardModal = true
    }
  }

</script>

<style lang="less">
  .changeCard {
    .ivu-modal-footer {
      display: none;
    }
  }

  .triangle-topright {
    width: 0;
    height: 0;
    border-top: 68px solid #8CCDF5;
    border-left: 68px solid transparent;
    position: absolute;
    right: 1px;
    top: 1px;
  }

</style>

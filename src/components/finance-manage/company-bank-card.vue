<!--企业银行卡详情-->
<template>
  <section class="component company-bank-card">
    <i-row class="modal-item">
      <i-col :span="10">
        <div class="modal-item-card">
          <span class="modal-item-title">建设银行</span>
          <div class="modal-item-box"></div>
        </div>
        <div class="modal-item-detail">
          <div class="triangle-topright">
            <span class="modal-item-default">默认</span>
          </div>
          <span class="modal-item-cardid">5719******0829</span>
          <p class="modal-item-p">户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
          <p class="modal-item-p">省份：陕西</p><span>城市：西安</span>
          <p class="modal-item-p">开户行：招商银行</p>
          <p class="modal-item-p">支行名：招商银行西安支行</p>
        </div>
        <div class="modal-item-yanzheng">
          <span class="modal-item-state">验证状态：</span>
          <span class="modal-item-tongguo">通过</span>
          <span class="modal-item-bind">绑卡日期：2017-12-01</span>
        </div>
      </i-col>

      <i-col :span="10">
        <div class="modal-item-card2">
          <span class="modal-item-title2">招商银行</span>
          <div class="modal-item-box2">
            <i-button class="modal-item-jiebang2 blueButton" size="small" @click="unbindBankCard">解绑</i-button>
          </div>
        </div>
        <div class="modal-item-detail2">
          <span class="modal-item-cardid2">5719******0829</span>
          <p>户名：开呗（上海）汽车租赁有限公司陕西分公司</p>
          <p>省份：陕西</p><span>城市：西安</span>
          <p>开户行：招商银行</p>
          <p>支行名：招商银行西安支行</p>
        </div>
        <div class="modal-item-yanzheng2">
          <span class="modal-item-state2">验证状态：</span><span style="color:green">通过</span>
          <span class="modal-item-bind2">绑卡日期：2017-12-01</span>
        </div>
      </i-col>
    </i-row>
    <div class="modal-item-add2">
      <i-button @click="cancel">取消</i-button>
      <i-button @click="addNewBankCard" class="modal-item-addbutton2 blueButton">新增银行卡</i-button>
    </div>

    <template>
      <i-modal title="解绑银行卡" width="480" v-model="unbindBankCardModal">
        <unbind-bank-card ref="unbind-bank-card"></unbind-bank-card>
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
    private model: any = {
      name: '招商',
      depositBank: '招商银行',
      cardNumber: '5719000340820829505',
      city: '西安',
      reservedPhoneNumber: '15555555555'
    }

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
      let unbind: any = this.$refs['unbind-bank-card']
      unbind.refresh(this.model)
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

  .component.company-bank-card {
    .modal-item {
      display: flex;
      justify-content: space-around;
    }
    .modal-item-card {
      width: 100%;
      height: 40px;
      border: 1px solid #d6d6d6;
      line-height: 40px;
      background: #F2F2F2;

    }
    .modal-item-title {
      margin-left: 6px;
    }
    .modal-item-box {
      float: right
    }
    .modal-item-detail {
      text-align: center;
      border-left: 1px solid #d6d6d6;
      border-right: 1px solid #d6d6d6;
      height: 130px;


    }
    .modal-item-default {
      position: absolute;
      bottom: 22px;
      right: 15px;
      -webkit-transform: rotate(-30deg);
      color: #fff;
      font-size: 16px;
    }
    .modal-item-cardid {
      margin-left: 97px;

    }
    .modal-item-p {
      color: #666
    }
    .modal-item-yanzheng {
      border: 1px solid #d6d6d6;
      height: 40px;
      line-height: 40px;
      background: #d6f9fc;
    }
    .modal-item-state {
      margin-left: 6px;
      color: #666;
    }
    .modal-item-tongguo {
      color: green
    }

    .modal-item-bind {
      float: right;
      margin-right: 6px;
      color: #666
    }

    .modal-item-card2 {
      width: 100%;
      height: 40px;
      border: 1px solid black;
      line-height: 40px;
      background: #F2F2F2;

    }
    .modal-item-title {
      margin-left: 6px;
    }
    .modal-item-box {
      float: right;
    }
    .modal-item-jiebang {
      margin-right: 4px;
    }
    .modal-item-detail2 {
      text-align: center;
      border-left: 1px solid black;
      border-right: 1px solid black;
      height: 130px;
    }
    .modal-item-cardid2{
      margin-left:97px
    }
    .modal-item-yanzheng2{
      border:1px solid black;height:40px;line-height:40px;

    }
    .modal-item-state2{
      margin-left:6px;
    }
    .modal-item-bind2{
      float:right;margin-right:6px;
    }
    .modal-item-add2{
      text-align:center;margin-top:40px;
    }
    .modal-item-addbutton2{
      margin-left:60px;
    }
    .modal-item-box2{
      float: right;
    }
    .modal-item-jiebang2{
      margin-right:4px;
    }
  }

</style>

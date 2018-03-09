<!--个人银行卡详情-->
<template>
  <section class="component bank-card-info">
    <div style="width:100%;height:40px;border:1px solid #ddd;line-height:40px;background:#F2F2F2">
      <span style="margin-left:6px;">{{model.depositBank}}</span>
      <div style="float:right">
        <i-button class="blueButton" size="small" style="margin-right:10px;" @click="changeBankCard">更换</i-button>
        <i-button class="blueButton" size="small" style="margin-right:4px;" @click="unbindBankCard">解绑</i-button>
      </div>
    </div>
    <div style="text-align:center;border-left:1px solid #ddd;border-right:1px solid #ddd;height:130px;line-height:25px">
      <span style="margin-left:97px;font-weight:700;line-height:40px">{{model.cardNumber}}</span>
      <p>户名：{{model.personalName}}</p>
      <span>城市：{{model.depositCity}}</span>
      <p>开户行：{{model.depositBank}} <span style="font-size:16px">|</span> 支行：{{model.depositBranch}}</p>
    </div>
    <div style="border:1px solid #ddd;height:40px;line-height:40px;background:#F1F9FD">
      <span style="margin-left:6px;">验证状态：</span><span style="color:green">{{$dict.getDictName(model.openAccountStatus)}}</span>
      <span style="float:right;margin-right:6px;">绑卡日期：2017-12-01</span>
    </div>

    <template>
      <i-modal title="换卡" v-model="dialog.change" width="480" class="changeCard">
        <change-card ref="change-card" @close="dialog.change = false,$emit('change')"></change-card>
        <div slot="footer">
          <i-button>取消</i-button>
          <i-button class="blueButton">确认解绑</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="解绑银行卡" width="480" v-model="dialog.unbind">
        <unbind-bank-card ref="unbind-bank-card"></unbind-bank-card>
        <div slot="footer">
          <i-button @click="dialog.unbind=false" class="defaultButton">取消</i-button>
          <i-button @click="unbindConfirm" class="blueButton">确认解绑</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import UnbindBankCard from "~/components/purchase-manage/unbind-bank-card.vue"
  import { ChargeBackService } from "~/services/manage-service/charge-back.service";
  import { Dependencies } from "~/core/decorator";

  @Component({
    components: {
      ChangeCard,
      UnbindBankCard
    }
  })
  export default class BankCardInfo extends Vue {
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    private dialog: any = {
      change: false,
      unbind: false
    }
    private model: any = {
      change: '',
      unbind: ''
    }
    private rowObj: any = {};
    refresh(row) {
      this.rowObj = row
      this.chargeBackService.getPersonalBank({ id: row.personalId, accountType: row.accountType }).subscribe(val => {
        this.model = val
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    changeBankCard() {
      let _change: any = this.$refs['change-card']
      _change.refresh(this.rowObj)
      this.dialog.change = true
    }
    /**
     * 解绑银行卡
     */
    unbindBankCard() {
      let _change: any = this.$refs['unbind-bank-card']
      _change.refresh(this.rowObj)
      this.dialog.unbind = true
    }
    /**
     * 确认解绑
     */
    unbindConfirm() {
      this.chargeBackService.getPersonalBank({ id: this.rowObj.personalId, accountType: this.rowObj.accountType }).subscribe(val => {
        this.$Message.success('解绑成功！')
        this.dialog.unbind = false
        this.$emit('change')
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
  }

</script>

<style lang="less">
  .changeCard {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>

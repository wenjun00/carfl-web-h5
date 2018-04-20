<!--换卡-->
<template>
  <section class="component change-card">
    <i-steps :current="current" class="item-margin-left40">
      <i-step title="解绑"></i-step>
      <i-step title="绑卡"></i-step>
    </i-steps>
    <i-form :label-width="110" class="item-margin-top20">
      <i-form-item label="账户类型">
        <i-select class="item-input-width160"  v-model="model.accountType" :disabled="current===0">
          <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="客户姓名">
        <i-input class="item-input-width160" :readonly="current===0" v-model="model.name"></i-input>
      </i-form-item>
      <i-form-item label="证件类型" v-if="current===2">
        <i-input class="item-input-width160" :readonly="current===0" v-model="model.certificateType"></i-input>
      </i-form-item>
      <i-form-item label="证件号码" v-if="current===2">
        <i-input class="item-input-width160" :readonly="current===0" v-model="model.certificateNumber"></i-input>
      </i-form-item>
      <i-form-item label="开户银行">
        <i-input class="item-input-width160" :readonly="current===0" v-model="model.depositBank"></i-input>
      </i-form-item>
      <i-form-item label="开户省市">
        <i-select class="item-input-width80" :disabled="current===0" v-model="model.accountType">
          <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
        </i-select>
        <i-select class="item-input-width80" :disabled="current===0" v-model="model.accountType">
          <i-option label="西安市" value="西安市" key="西安市"></i-option>
          <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
          <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
          <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
          <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
          <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
          <i-option label="延安市" value="延安市" key="延安市"></i-option>
          <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
          <i-option label="安康市" value="安康市" key="安康市"></i-option>
          <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="银行预留手机号" v-if="current===1">
        <i-input class="item-input-width160" v-model="model.reservedPhoneNumber"></i-input>
        <!--<i-button style="display:inline-block;margin-left:8px;" class="blueButton">发送验证码<span>60</span></i-button>-->
      </i-form-item>
      <!--<i-form-item label="验证码" v-if="current===0">
        <i-input style="width:160px;"></i-input>
      </i-form-item>-->
    </i-form>
    <div class="item-card-div">
      <i-button @click="cancelChangeCard" class="blueButton">取消</i-button>
      <i-button @click="confirmUnBindCard" v-if="current===0" class="blueButton">确认解绑</i-button>
      <i-button @click="confirmBindCard" v-if="current===1" class="blueButton">确认绑卡</i-button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { Dependencies } from "~/core/decorator";
  import { ChargeBackService } from "~/services/manage-service/charge-back.service";

  @Component({
    components: {}
  })
  export default class ChangeCard extends Vue {
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    private current: any = 0;
    private openChangeBankCard: Boolean = false;
    private model: any = {};
    private row: any = {};
    refresh(row) {
      this.current = 0
      this.row = row
      this.model = row
    }
    cancelChangeCard() {
      this.$Modal.remove()
      this.$emit('close')
    }
    /**
     * 确认解绑
     */
    confirmUnBindCard() {
      if (this.current === 1) {
        this.current = 0;
      } else {
        this.model = {}
        this.current += 1;
      }
    }
    /**
     * 确认绑卡
     */
    confirmBindCard() {
      this.model.smsCode = '666666'
      this.model.personalId = this.row.personalId
      this.chargeBackService.updatePersonalBank(this.model).subscribe(val => {
        this.$Message.success('操作成功！')
        this.$emit('close')
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
  }

</script>
<style lang="less" scoped>
.component.change-card{
  .item-margin-left40{
    margin-left: 40px;
  }
  .item-margin-top20{
    margin-top: 20px;
  }
  .item-input-width160{
    width:160px;
  }
  .item-input-width80{
    width:80px;
  }
  .item-card-div{
    text-align: center;
  }
}

</style>

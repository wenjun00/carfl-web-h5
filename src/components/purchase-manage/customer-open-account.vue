<!--客户开户-->
<template>
  <!--<section class="component customer-open-account">-->
  <i-row>
    <i-form :model="CustomerOpenAccountModel" class="form-window" :label-width="110">
      <i-col :span="12">
        <i-form-item label="开户渠道" prop="settleChannel">
          <i-select class="open-input" v-model="CustomerOpenAccountModel.settleChannel" placeholder="请选择开户渠道">
            <i-option v-for="{value,label} in $dict.getDictData('0419')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="账户类型" prop="accountType">
          <i-select class="open-input" v-model="CustomerOpenAccountModel.accountType" placeholder="请选择账户类型">
            <i-option v-for="{value,label} in $dict.getDictData('0436')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="客户姓名" prop="name">
          <i-input class="open-input" v-model="CustomerOpenAccountModel.name" readonly></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="客户手机号" prop="mobileMain">
          <i-input class="open-input" v-model="CustomerOpenAccountModel.mobileMain" readonly></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="身份证号码" prop="idCard">
          <i-input class="open-input" v-model="CustomerOpenAccountModel.idCard" readonly></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="开户银行" prop="depositBank">
          <i-select class="open-input" placeholder="请选择开户银行" v-model="CustomerOpenAccountModel.depositBank">
            <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="开户省份" prop="depositProvince" style="disably:inline-block">
          <i-select class="open-input" placeholder="选择省" v-model="CustomerOpenAccountModel.depositProvince" clearable>
            <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="开户城市" prop="depositCity">
          <i-select class="open-input" placeholder="选择市" v-model="CustomerOpenAccountModel.depositCity" :disabled="!CustomerOpenAccountModel.depositProvince"
            clearable>
            <i-option v-for="{value,label} in this.CustomerOpenAccountModel.depositProvince ? this.$city.getCityData({ level: 1, id: this.CustomerOpenAccountModel.depositProvince }) : []"
              :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="银行卡号" prop="cardNumber">
          <i-input class="open-input" v-model="CustomerOpenAccountModel.cardNumber"></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="银行预留手机号" prop="reservedPhoneNumber">
          <i-input class="open-input" v-model="CustomerOpenAccountModel.reservedPhoneNumber"></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="18">
        <i-form-item label="验证码" prop="qCode" style="disably:inline-block">
          <i-input class="open-input" v-model="qCode"></i-input>
          <i-button @click='sendQcode' class="blue-button">发送验证码
          </i-button>
        </i-form-item>
      </i-col>
    </i-form>
    <!--<div slot="footer">
      <i-button class="blue-button">确认并返回</i-button>
    </div>-->
  </i-row>
  <!--</section>-->
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from '~/core/decorator'
  import {
    PersonalService
  } from '~/services/manage-service/personal.service'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({

    components: {}
  })
  export default class CustomerOpenAccount extends Vue {
    @Dependencies(PersonalService) private personalService: PersonalService
    @Prop() row;

    private CustomerOpenAccountModel: any = {
      settleChannel: '', // 开户渠道
      accountType: '', // 账户类型
      name: '', // 客户姓名
      mobileMain: '', // 客户手机号
      idCard: '', // 身份证号码
      depositBank: '', // 开户银行
      depositProvince: '', // 开户省份
      depositCity: '', // 开户城市
      cardNumber: '', // 银行卡号
      reservedPhoneNumber: '', // 银行预留手机号
      qCode: '', // 验证码
    };
    private qCode: any = '';
    mounted() {
      if (this.row) {
        this.CustomerOpenAccountModel = Object.assign({}, this.row);
      }
    }
    /**
     * 发送验证码
     */
    sendQcode() {
      if (!this.CustomerOpenAccountModel.reservedPhoneNumber) {
        this.$Message.warning('请输入银行预留手机号！')
      } else {
        this.personalService.customerOpenAccountVerificationPhone({
          id: this.row.id,
          phone: this.CustomerOpenAccountModel.reservedPhoneNumber
        }).subscribe(
          data => {
            this.$Message.success('验证码发送成功！')
            let qCode: any = data
            this.qCode = qCode
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
      }
    }
    openaccountClick() {
      this.personalService.customerOpenAccount({
        rowData: this.CustomerOpenAccountModel,
        personalId: this.row.id
      }).subscribe(
        data => {
          this.$Message.success('开户成功！')
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
    }

  }

</script>
<style lang="less" scoped>
//   .component.customer-open-account {
  .form-window {
    position: relative;
    left: 30px;
    .open-input {
      width: 160px;
    }
    .select-pull-down {
      width: 80px;
    }
    .blue-button {
      background: #265ea2;
      color: #fff;
    }
  }

  //   }

</style>

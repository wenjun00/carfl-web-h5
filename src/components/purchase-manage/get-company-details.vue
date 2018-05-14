 <!--企业详情-->
<template>
  <section class="component get-company-details">
    <i-form>
      <!-- 基本信息 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">基本信息</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="企业名称" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="10">
          <i-form-item label="注册资本" :label-width="100">
            <i-input readonly></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="统一社会信用代码" :label-width="120">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="执照年检" :label-width="100">
            <i-radio>是</i-radio>
            <i-radio>否</i-radio>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="注册地址" :label-width="100">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="经营范围" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="网络通信开发" :label-width="100">
            <i-radio>Radio</i-radio>
            <i-radio>Radio2</i-radio>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="基本账户号" :label-width="100">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="基本账户开户行" :label-width="100">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="通讯地址" :label-width="100">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="第一联系人" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="手机号码" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="第二联系人" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="手机号码" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="法人姓名" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="国籍" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="证件类型" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="证件号码" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="户口" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="婚姻状况" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 财务数据 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">财务数据</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="数据年份" :label-width="100">
            <i-date-picker disabled type="date"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="10">
          <i-form-item label="资产总额" :label-width="100">
            <i-input readonly></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="固定资产" :label-width="100">
            <i-date-picker disabled type="date"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="10">
          <i-form-item label="流动资产" :label-width="100">
            <i-input readonly></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="审计状态" :label-width="100">
            <i-radio>已审计</i-radio>
            <i-radio>未审计</i-radio>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 银行账户 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">银行账户</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="银行账户" :label-width="100">
            <i-input readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="10">
          <i-form-item label="开户银行" :label-width="100">
            <i-select disabled>
              <!-- <i-option></i-option> -->
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="开户支行" :label-width="100">
            <i-input class="socialCredit " readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-col>
        <span class="addingBet">+添加银行卡</span>
      </i-col>
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">客户等级</a>
        </i-col>
      </i-row>
      <i-row type="flex">
        <i-col :span="16">
          <i-form-item label="客户等级" :label-width="100">
            <i-rate></i-rate>
          </i-form-item>
        </i-col>
      </i-row>

    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Dependencies } from '~/core/decorator'
import { FormatInputPathObject } from 'path'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import UploadVoucher from '~/components/common/upload-voucher.vue'
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  private WhetherNotShown: Boolean = false
  fold() {
    this.WhetherNotShown = !this.WhetherNotShown
  }
}
</script>



<style lang="less" scoped>
.component.get-company-details {
  .data-form {
    margin-top: 5px;
    .data-form-item {
      width: 7px;
      height: 25px;
      background: #1d4f88;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .information {
      font-size: 16px;
      color: black;
    }
  }
  .putAway {
    margin-left: 30px;
    font-size: 16px;
    color: #1d4f88;
    cursor: pointer;
  }
  .selectModels {
    cursor: pointer;
    color: #1d4f88;
  }
  .addingBet {
    margin-left: 28px;
    cursor: pointer;
    color: #1d4f88;
  }
}
</style>
<style lang="less">
.component.get-company-details {
  .mailingAddress.ivu-input-wrapper.ivu-input-type {
    width: 485px !important;
  }
  .socialCredit.ivu-input-wrapper.ivu-input-type {
    width: 91%;
  }
  .contacts {
    .ivu-select,
    .ivu-select-disabled,
    .ivu-select-single,
    .ivu-select-selection,
    .ivu-input-type,
    .ivu-input-wrapper {
      width: 160px !important;
    }
  }
  .ivu-form-item-content {
    width: 100% !important;
  }
  .ivu-rate {
    font-size: 40px;
  }
}
</style>

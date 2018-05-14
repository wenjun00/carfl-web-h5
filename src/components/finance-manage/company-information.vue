<!--企业信息-->
<template>
  <section class="component add-company">
    <i-form ref="open-company" :label-width="110" label-position="left" :model="addCompanyModel">
      <i-row>
        <i-col :span="24">
          <div>
            <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
            <span>企业信息</span>
          </div>
          <i-col :span="12">
            <i-form-item label="客户类型">
              <span>企业开户</span>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="营业执照注册号" prop="companyLicensenNmber">
              <i-input style="width:160px;" v-model="addCompanyModel.companyLicensenNmber" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业证照类型" prop="certificateType">
              <i-select style="width:160px;" v-model="addCompanyModel.certificateType" disabled>
                <i-option v-for="{value,label} in $dict.getDictData('0441')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="组织机构代码" prop="organizationCode">
              <i-input style="width:160px;" v-model="addCompanyModel.organizationCode" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业类型" prop="companyType">
              <i-select style="width:160px;" v-model="addCompanyModel.companyType" disabled>
                <i-option v-for="{value,label} in $dict.getDictData('0442')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="税务登记证号" prop="taxRegistration">
              <i-input style="width:160px;" v-model="addCompanyModel.taxRegistration" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业名称" prop="companyName">
              <i-input style="width:160px;" v-model="addCompanyModel.companyName" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="统一社会信用代码" prop="socialCreditCode">
              <i-input style="width:160px;" v-model="addCompanyModel.socialCreditCode" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="证照起始日期" prop="licenseBeginTime">
              <i-date-picker style="width:160px;" v-model="addCompanyModel.licenseBeginTime" readonly></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业经营地址" prop="busnessAddr">
              <i-input style="width:160px;" v-model="addCompanyModel.busnessAddr" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="证照结束日期" prop="licenseEndTime">
              <i-date-picker style="width:160px;" v-model="addCompanyModel.licenseEndTime" readonly></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业注册地址" prop="registAddr">
              <i-input style="width:160px;" v-model="addCompanyModel.registAddr" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业固定电话" prop="companyPhone">
              <i-input style="width:160px;" v-model="addCompanyModel.companyPhone" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="经营范围" prop="busnessScope">
              <i-input style="width:160px;" v-model="addCompanyModel.busnessScope" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="控股股东" prop="controllShareholder">
              <i-input style="width:160px;" v-model="addCompanyModel.controllShareholder" readonly></i-input>
            </i-form-item>
          </i-col>
        </i-col>
      </i-row>

      <i-row>

        <i-col :span="24">
          <div>
            <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
            <span>企业法人信息</span>
          </div>
          <i-col :span="12">
            <i-form-item label="法定代表人姓名" prop="legalman">
              <i-input style="width:160px;" v-model="addCompanyModel.legalman" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="法定代表人手机号码" prop="legpersonPhoneNumber">
              <i-input style="width:160px;" v-model="addCompanyModel.legpersonPhoneNumber" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="法人证件类型" prop="legpersonCertificate">
              <i-select style="width:160px;" v-model="addCompanyModel.legpersonCertificate" disabled>
                <i-option v-for="{value,label} in $dict.getDictData('0043')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="企业联系人姓名" prop="linkman">
              <i-input style="width:160px;" v-model="addCompanyModel.linkman" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="法人证件号码" prop="legpersonCertificateNumber">
              <i-input style="width:160px;" v-model="addCompanyModel.legpersonCertificateNumber" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="联系人手机号" prop="linkmanPhone">
              <i-input style="width:160px;" v-model="addCompanyModel.linkmanPhone" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="法人证件起始日期" prop="legpersonCertificateStime">
              <i-date-picker style="width:160px;" v-model="addCompanyModel.legpersonCertificateStime" readonly></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="联系人邮箱" prop="linkmanMail">
              <i-input style="width:160px;" v-model="addCompanyModel.linkmanMail" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="法人证件结束日期" prop="legpersonCertificateEtime">
              <i-date-picker style="width:160px;" v-model="addCompanyModel.legpersonCertificateEtime" readonly></i-date-picker>
            </i-form-item>
          </i-col>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <div>
            <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
            <span>开户信息（取现账户）</span>
          </div>
          <i-col :span="12">
            <i-form-item label="开户渠道">
              <i-select style="width:160px;" v-model="addCompanyModel.accountChannel" disabled>
                <i-option v-for="{value,label} in $dict.getDictData('0419')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行账户名" prop="accountName">
              <i-input style="width:160px;" v-model="addCompanyModel.accountName" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行支行名称" prop="branchName">
              <i-input style="width:160px;" v-model="addCompanyModel.branchName" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行" prop="depositBank">
              <i-input style="width:160px;" v-model="addCompanyModel.depositBank" readonly></i-input>
              <!--<i-select style="width:160px;" v-model="addCompanyModel.depositBank" :readonly="companyReadonly">
                <i-option label="建设银行" value="建设银行" key="建设银行"></i-option>
                <i-option label="招商银行" value="招商银行" key="招商银行"></i-option>
                <i-option label="工商银行" value="工商银行" key="工商银行"></i-option>
              </i-select>-->
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行账号" prop="bankCardNumber">
              <i-input style="width:160px;" v-model="addCompanyModel.bankCardNumber" readonly></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行省份" prop="accountProvince">
              <i-select style="width:160px;" placeholder="选择省" v-model="addCompanyModel.accountProvince" clearable disabled>
                <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="开户银行城市" prop="accountCity">
              <i-select style="width:160px;" placeholder="选择市" v-model="addCompanyModel.accountCity" :readonly="companyReadonly" :disabled="!addCompanyModel.accountProvince" clearable>
                <i-option v-for="{value,label} in this.addCompanyModel.accountProvince ? this.$city.getCityData({ level: 1, id: this.addCompanyModel.accountProvince}) : []" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>j

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from '~/core/decorator'
import { PersonalService } from '~/services/manage-service/personal.service'
import { Prop } from "vue-property-decorator";
import { CompanyAccountService } from "~/services/manage-service/company-account.service";

@Component({
  components: {}
})
export default class AddCompany extends Vue {
  @Dependencies(CompanyAccountService) private companyAccountService: CompanyAccountService;
  @Dependencies(PersonalService) private personalService: PersonalService
  @Prop() val; // 企业信息

  private companyReadonly: Boolean = false;
  private addCompanyModel: any = {
    companyLicensenNmber: '', // 营业执照注册号
    certificateType: '', // 企业证照类型
    organizationCode: '', // 组织机构代码
    companyType: '', // 企业类型
    taxRegistration: '', // 税务登记证号
    companyName: '', // 企业名称
    socialCreditCode: '', // 统一社会信用代码
    licenseBeginTime: '', // 证照起始日期
    busnessAddr: '', // 企业经营地址
    licenseEndTime: '', // 证照结束日期
    registAddr: '', // 企业注册地址
    busnessScope: '', // 经营范围
    companyPhone: '', // 企业固定电话
    controllShareholder: '', // 控股股东

    legalman: '', // 法人代表姓名
    legpersonPhoneNumber: '', // 法定代表人手机号码
    legpersonCertificate: '', // 法人证件类型
    linkman: '', // 企业联系人姓名
    legpersonCertificateNumber: '', // 法人证件号码
    linkmanPhone: '', // 联系人手机号
    legpersonCertificateStime: '', // 法人证件起始日期
    linkmanMail: '', // 联系人邮箱
    legpersonCertificateEtime: '', // 法人证件结束日期

    accountName: '', // 开户银行账户名
    branchName: '', // 开户银行支行姓名
    depositBank: '', // 开户银行
    bankCardNumber: '', // 开户银行账号
    accountProvince: '', // 开户银行省份
    accountCity: '', // 开户银行城市
  };
  mounted() {
    // 企业信息
    if (this.val) {
      this.companyReadonly = true
      this.addCompanyModel = Object.assign({}, this.val)
      this.TimeChange()
      // 日期格式转换
    }
  }
  // 日期格式转化
  TimeChange() {
    this.addCompanyModel.licenseBeginTime = this.$filter.dateFormat(this.addCompanyModel.licenseBeginTime,
      'yyyy-MM-dd')
    this.addCompanyModel.licenseEndTime = this.$filter.dateFormat(this.addCompanyModel.licenseEndTime,
      'yyyy-MM-dd')
    this.addCompanyModel.legpersonCertificateStime = this.$filter.dateFormat(this.addCompanyModel.legpersonCertificateStime,
      'yyyy-MM-dd')
    this.addCompanyModel.legpersonCertificateEtime = this.$filter.dateFormat(this.addCompanyModel.legpersonCertificateEtime,
      'yyyy-MM-dd')

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

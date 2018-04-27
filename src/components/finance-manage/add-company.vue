<!--客户开户-->
<template>
  <!--<section class="component add-company">-->
  <i-form ref="open-company" :rules="rules" :label-width="110" label-position="left" :model="addCompanyModel">
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
            <i-input style="width:160px;" v-model="addCompanyModel.companyLicensenNmber" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业证照类型" prop="certificateType">
            <i-select style="width:160px;" v-model="addCompanyModel.certificateType" :readonly="companyReadonly">
              <i-option v-for="{value,label} in $dict.getDictData('0441')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="组织机构代码" prop="organizationCode">
            <i-input style="width:160px;" v-model="addCompanyModel.organizationCode" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业类型" prop="companyType">
            <i-select style="width:160px;" v-model="addCompanyModel.companyType" :readonly="companyReadonly">
              <i-option v-for="{value,label} in $dict.getDictData('0442')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="税务登记证号" prop="taxRegistration">
            <i-input style="width:160px;" v-model="addCompanyModel.taxRegistration" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业名称" prop="companyName">
            <i-input style="width:160px;" v-model="addCompanyModel.companyName" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="统一社会信用代码" prop="socialCreditCode">
            <i-input style="width:160px;" v-model="addCompanyModel.socialCreditCode" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="证照起始日期" prop="licenseBeginTime">
            <i-date-picker style="width:160px;" v-model="addCompanyModel.licenseBeginTime" :readonly="companyReadonly"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业经营地址" prop="busnessAddr">
            <i-input style="width:160px;" v-model="addCompanyModel.busnessAddr" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="证照结束日期" prop="licenseEndTime">
            <i-date-picker style="width:160px;" v-model="addCompanyModel.licenseEndTime" :readonly="companyReadonly"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业注册地址" prop="registAddr">
            <i-input style="width:160px;" v-model="addCompanyModel.registAddr" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业固定电话" prop="companyPhone">
            <i-input style="width:160px;" v-model="addCompanyModel.companyPhone" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="经营范围" prop="busnessScope">
            <i-input style="width:160px;" v-model="addCompanyModel.busnessScope" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="控股股东" prop="controllShareholder">
            <i-input style="width:160px;" v-model="addCompanyModel.controllShareholder" :readonly="companyReadonly"></i-input>
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
            <i-input style="width:160px;" v-model="addCompanyModel.legalman" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="法定代表人手机号码" prop="legpersonPhoneNumber">
            <i-input style="width:160px;" v-model="addCompanyModel.legpersonPhoneNumber" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="法人证件类型" prop="legpersonCertificate">
            <i-select style="width:160px;" v-model="addCompanyModel.legpersonCertificate" :readonly="companyReadonly">
              <i-option v-for="{value,label} in $dict.getDictData('0043')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业联系人姓名" prop="linkman">
            <i-input style="width:160px;" v-model="addCompanyModel.linkman" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="法人证件号码" prop="legpersonCertificateNumber">
            <i-input style="width:160px;" v-model="addCompanyModel.legpersonCertificateNumber" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="联系人手机号" prop="linkmanPhone">
            <i-input style="width:160px;" v-model="addCompanyModel.linkmanPhone" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="法人证件起始日期" prop="legpersonCertificateStime">
            <i-date-picker style="width:160px;" v-model="addCompanyModel.legpersonCertificateStime" :readonly="companyReadonly"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="联系人邮箱" prop="linkmanMail">
            <i-input style="width:160px;" v-model="addCompanyModel.linkmanMail" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="法人证件结束日期" prop="legpersonCertificateEtime">
            <i-date-picker style="width:160px;" v-model="addCompanyModel.legpersonCertificateEtime" :readonly="companyReadonly"></i-date-picker>
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
            <i-select style="width:160px;" v-model="addCompanyModel.accountChannel" :readonly="companyReadonly">
              <i-option v-for="{value,label} in $dict.getDictData('0419')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行账户名" prop="accountName">
            <i-input style="width:160px;" v-model="addCompanyModel.accountName" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行支行名称" prop="branchName">
            <i-input style="width:160px;" v-model="addCompanyModel.branchName" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行" prop="depositBank">
            <!--<i-input style="width:160px;"></i-input>-->
            <i-select style="width:160px;" v-model="addCompanyModel.depositBank" :readonly="companyReadonly">
              <i-option label="建设银行" value="建设银行" key="建设银行"></i-option>
              <i-option label="招商银行" value="招商银行" key="招商银行"></i-option>
              <i-option label="工商银行" value="工商银行" key="工商银行"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行账号" prop="bankCardNumber">
            <i-input style="width:160px;" v-model="addCompanyModel.bankCardNumber" :readonly="companyReadonly"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行省份" prop="accountProvince">
            <i-select style="width:160px;" placeholder="选择省" v-model="addCompanyModel.accountProvince" clearable :readonly="companyReadonly">
              <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开户银行城市" prop="accountCity">
            <i-select style="width:160px;" placeholder="选择市" v-model="addCompanyModel.accountCity" :readonly="companyReadonly" :disabled="!addCompanyModel.accountProvince"
              clearable>
              <i-option v-for="{value,label} in this.addCompanyModel.accountProvince ? this.$city.getCityData({ level: 1, id: this.addCompanyModel.accountProvince}) : []"
                :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-col>
    </i-row>
  </i-form>
  <!--</section>-->
</template>j

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
  import {
    CompanyAccountService
  } from "~/services/manage-service/company-account.service";
  import {
    FilterService
  } from "~/utils/filter.service"

  @Component({

    components: {}
  })
  export default class AddCompany extends Vue {
    @Dependencies(CompanyAccountService) private companyAccountService: CompanyAccountService;
    @Dependencies(PersonalService) private personalService: PersonalService
    @Prop() row;
    @Prop() modifyData;
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
    private rules: any = {
    //   certificateType: [{
    //     type: "number",
    //     required: true,
    //     message: "请选择企业证照类型",
    //     trigger: "change"
    //   }],
    //   companyType: [{
    //     type: "number",
    //     required: true,
    //     message: "请选择企业类型",
    //     trigger: "change"
    //   }],
    //   companyName: [{
    //     required: true,
    //     message: "请输入企业名称",
    //     trigger: "blur"
    //   }],
    //   licenseBeginTime: [{
    //     required: true,
    //     message: "请选择证照起始日期",
    //     trigger: "change",
    //     type: "date"
    //   }],
    //   busnessAddr: [{
    //     required: true,
    //     message: "请输入企业经营地址",
    //     trigger: "blur"
    //   }],
    //   licenseEndTime: [{
    //     required: true,
    //     message: "请选择证照结束日期",
    //     trigger: "change",
    //     type: "date"
    //   }],
    //   registAddr: [{
    //     required: true,
    //     message: "请输入企业注册地址",
    //     trigger: "blur"
    //   }],
    //   companyPhone: [{
    //     required: true,
    //     message: "请输入企业固定电话",
    //     trigger: "blur",
    //     pattern: /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/
    //   }],
    //   busnessScope: [{
    //     required: true,
    //     message: "请输入企业经营范围",
    //     trigger: "blur"
    //   }],
    //   controllShareholder: [{
    //     required: true,
    //     message: "请输入控股股东",
    //     trigger: "blur"
    //   }],
    //   legalman: [{
    //     required: true,
    //     message: "请输入法定代表人姓名",
    //     trigger: "blur"
    //   }],
    //   legpersonPhoneNumber: [{
    //       required: true,
    //       message: "请输入法定代表人手机号码",
    //       trigger: "blur"
    //     },
    //     {
    //       validator: this.$validator.phoneNumber,
    //       trigger: "blur"
    //     }
    //   ],
    //   legpersonCertificate: [{
    //     required: true,
    //     message: "请输入法人证件类型",
    //     trigger: "blur"
    //   }],
    //   linkman: [{
    //     required: true,
    //     message: "请输入企业联系人姓名",
    //     trigger: "blur"
    //   }],
    //   legpersonCertificateNumber: [{
    //     required: true,
    //     message: "请输入法人证件号码",
    //     trigger: "blur"
    //   }],
    //   linkmanPhone: [{
    //       required: true,
    //       message: "请输入联系人手机号",
    //       trigger: "blur"
    //     },
    //     {
    //       validator: this.$validator.phoneNumber,
    //       trigger: "blur"
    //     }
    //   ],
    //   legpersonCertificateStime: [{
    //     required: true,
    //     message: "请输入法人证件起始日期",
    //     trigger: "change",
    //     type: "date"
    //   }],
    //   linkmanMail: [{
    //     required: true,
    //     message: "请输入联系人邮箱",
    //     trigger: "blur"
    //   }, {
    //     message: "请输入正确的邮箱",
    //     trigger: "blur",
    //     type: "email"
    //   }],
    //   legpersonCertificateEtime: [{
    //     required: true,
    //     message: "请输入法人证件结束日期",
    //     trigger: "change",
    //     type: "date"
    //   }],
    //   accountName: [{
    //     required: true,
    //     message: "请输入开户银行账户名",
    //     trigger: "blur"
    //   }],
    //   branchName: [{
    //     required: true,
    //     message: "请输入开户银行支行名称",
    //     trigger: "blur"
    //   }],
    //   depositBank: [{
    //     required: true,
    //     message: "请选择开户银行",
    //     trigger: "change",
    //     type: 'number'
    //   }],
    //   bankCardNumber: [{
    //     required: true,
    //     message: "请输入开户银行账号",
    //     trigger: "blur"
    //   }],
    //   accountProvince: [{
    //     required: true,
    //     message: "请选择开户银行省份",
    //     trigger: "change",
    //     type: 'number'
    //   }],
    //   accountCity: [{
    //     required: true,
    //     message: "请选择开户银行城市",
    //     trigger: "change",
    //     type: 'number'
    //   }]
    }
    mounted() {
      // 企业信息
      if (this.val) {
        this.companyReadonly = true
        this.addCompanyModel = Object.assign({}, this.val)
        this.TimeChange()
        // 日期格式转换
      }
      //   修改卡户
      if (this.modifyData) {
        this.addCompanyModel = Object.assign({}, this.modifyData)
        this.TimeChange()
      }
    }
    // 日期格式转化
    TimeChange() {
      this.addCompanyModel.licenseBeginTime = FilterService.dateFormat(this.addCompanyModel.licenseBeginTime,
        'yyyy-MM-dd')
      this.addCompanyModel.licenseEndTime = FilterService.dateFormat(this.addCompanyModel.licenseEndTime,
        'yyyy-MM-dd')
      this.addCompanyModel.legpersonCertificateStime = FilterService.dateFormat(this.addCompanyModel.legpersonCertificateStime,
        'yyyy-MM-dd')
      this.addCompanyModel.legpersonCertificateEtime = FilterService.dateFormat(this.addCompanyModel.legpersonCertificateEtime,
        'yyyy-MM-dd')

    }
    /**
     * 发送验证码
     */
    sendQcode() {

    }
    /**
     * 企业开户
     */
    openaccountClick() {
      let _opencompany: any = this.$refs['open-company']
      _opencompany.validate(valid => {
        if (!valid) return false;
        this.companyAccountService.companyOpenAccount(this.addCompanyModel).subscribe(
          data => {
            this.$Message.success('开户成功！')
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        );
      })
    }
    /**
     * 修改企业开户
     */
    modifyAccountClick() {
      this.companyAccountService.editAccount(this.addCompanyModel).subscribe(
        data => {
          this.$Message.success('修改成功！')
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

<!--新增客户详情-->
<template>
    <section class="component get-customer-details">
        <i-form :model="customerDetailsModel" ref="form-item" :label-width="90">
            <!-- 基本信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="客户姓名" >
                        <i-input v-model="customerDetailsModel.name"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="手机号码" >
                        <i-input v-model="customerDetailsModel.mobileMain"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="证件类型" >
                        <i-select v-model="customerDetailsModel.certificateType">
                            <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="证件号码" >
                        <i-input v-model="customerDetailsModel.certificateNumber"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="居住地址" >
                        <i-input v-model="customerDetailsModel.localHomeAddr"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 意向级别 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">意向级别</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <i-form-item label="意向级别" >
                        <i-rate allow-half v-model="customerDetailsModel.intentionalLevel"></i-rate>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 收起 展开 -->
            <i-row class="data-form">
                <i-col>
                    <i-button @click="fold" v-if="!WhetherNotShown" type="primary" icon="plus-round">展开更多</i-button>
                    <i-button @click="fold" v-else="WhetherNotShown" type="primary" icon="minus-round">收起</i-button>
                </i-col>
            </i-row>
            <span class="showContent" v-show="WhetherNotShown">
                <!-- 隐藏内容 -->
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="性别" >
                            <i-select v-model="customerDetailsModel.sex ">
                                <i-option v-for="{value,label} in $dict.getDictData('0001')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="出生日期" :label-width="90">
                            <i-date-picker v-model="customerDetailsModel.birthTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="民族" :label-width="90">
                            <i-input v-model="customerDetailsModel.nation"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="健康状况" :label-width="90">
                            <i-select v-model="customerDetailsModel.healthStatus">
                                <i-option v-for="{value,label} in $dict.getDictData('0453')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="居住状况" :label-width="90">
                            <i-select v-model="customerDetailsModel.homeStatus ">
                                <i-option v-for="{value,label} in $dict.getDictData('0454')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="婚姻状况" :label-width="90">
                            <i-select v-model="customerDetailsModel.marital ">
                                <i-option v-for="{value,label} in $dict.getDictData('0003')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="通讯地址" :label-width="90">
                            <i-input v-model="customerDetailsModel.messageAddr" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row class="data-form">
                    <!-- 押品登记 -->
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">押品登记</a>
                    </i-col>
                    <i-row type="flex" :gutter="110">
                        <i-col :span="24">
                            <i-form-item label="车辆型号" :label-width="90">
                                <span class="selectModels">选择车型</span>
                            </i-form-item>
                        </i-col>
                    </i-row>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="车牌号" :label-width="90">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="车架号" :label-width="90">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="上牌时间" :label-width="90">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="上牌地址" :label-width="90">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-col>
                    <span class="addingBet">+添加押品</span>
                </i-col>
                <!-- 相关联系人 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">相关联系人</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24" class="contacts">
                        <div v-for="i in customerDetailsModel.personalContacts">
                            <i-form-item :label="i.val" :label-width="90">
                                <i-input v-model="i.name"></i-input>
                                <i-select v-model="i.relation ">
                                    <i-option v-for="{value,label} in $dict.getDictData('0457')" :key="value" :label="label" :value="value"></i-option>
                                </i-select>
                                <i-input v-model="i.phone"></i-input>
                            </i-form-item>
                        </div>

                    </i-col>
                </i-row>

                <i-col>
                    <span @click="addingBet" class="addingBet">+添加联系人</span>
                </i-col>
                <!-- 职业信息 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">职业信息</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="所在单位" :label-width="90">
                            <i-input v-model="customerDetailsModel.companyName"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="单位性质" :label-width="90">
                            <i-select v-model="customerDetailsModel.companyNature ">
                                <i-option v-for="{value,label} in $dict.getDictData('0012')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input v-model="customerDetailsModel.companyAddressDetail" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="职业" :label-width="90">
                            <i-select v-model="customerDetailsModel.jobType ">
                                <i-option v-for="{value,label} in $dict.getDictData('0011')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="职务" :label-width="90">
                            <i-select v-model="customerDetailsModel.duty ">
                                <i-option v-for="{value,label} in $dict.getDictData('0458')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <!-- 收入情况 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">收入情况</a>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="个人月收入" :label-width="90">
                            <i-input v-model="customerDetailsModel.basicSalary"></i-input>
                            <span>元</span>
                        </i-form-item>
                    </i-col>

                    <i-col :span="10" class="familySize ">
                        <i-form-item label="家庭人数" :label-width="90">
                            <i-input v-model="customerDetailsModel.familyCount"></i-input>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">经营信息</a>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="经营单位" :label-width="90">
                            <i-input v-model="customerDetailsModel.companyhostName" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="经营规模" :label-width="90">
                            <i-input v-model="customerDetailsModel.employeesNumber"></i-input>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                    <i-col :span="10" class="familySize ">
                        <i-form-item label="所属行业" :label-width="90">
                            <i-select v-model="customerDetailsModel.industry  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0459')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="统一社会信用代码" :label-width="120">
                            <i-input v-model="customerDetailsModel.companyhostNumber" class="socialCredit "></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="基本户" :label-width="90">
                            <i-input v-model="customerDetailsModel.companyhostBasic"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select v-model="customerDetailsModel.companyhostBank   ">
                                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="注册时间" :label-width="90">
                            <i-date-picker v-model="customerDetailsModel.companyhostCreatTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="最新年检" :label-width="90">
                            <i-date-picker v-model="customerDetailsModel.companyhostCheckTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24">
                        <i-form-item label="注册资金" :label-width="90">
                            <i-input v-model="customerDetailsModel.registeredCapital"></i-input>
                            <span>万元</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input v-model="customerDetailsModel.companyhostAddr" class="mailingAddress"></i-input>
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
                        <i-form-item label="银行账号" :label-width="90">
                            <i-input v-model="customerDetailsModel.cardNumber"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select v-model="customerDetailsModel.depositBank  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="开户支行" :label-width="90">
                            <i-input v-model="customerDetailsModel.depositBranch" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="账户类型" :label-width="90">
                            <i-select v-model="customerDetailsModel.accountType  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0460')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="账号用途" :label-width="90">
                            <i-select v-model="customerDetailsModel.accountUse   ">
                                <i-option v-for="{value,label} in $dict.getDictData('0455')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
            </span>

        </i-form>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import { PersonalService } from '~/services/manage-service/personal.service'
import { Dependencies } from '~/core/decorator'
import UploadVoucher from '~/components/common/upload-voucher.vue'
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  @Dependencies(PersonalService) private personalService: PersonalService
  private WhetherNotShown: Boolean = false
  private linkmanNumber: any = 2 // 联系人值
  private customerDetailsModel = {
    name: '', // 姓名
    mobileMain: '', // 手机号
    certificateType: '', // 证件类型
    certificateNumber: '', // 证件号码
    localHomeAddr: '', // 居住地址
    intentionalLevel: 0, // 意向级别
    sex: '', // 性别
    birthTime: '', // 出身日期
    nation: '', // 民族
    healthStatus: '', // 健康状况
    homeStatus: '', // 居住状况
    marital: '', // 婚姻状况
    messageAddr: '', // 通讯地址
    personalContacts: [
      {
        val: '第一联系人',
        name: '',
        phone: '',
        relation: ''
      },
      {
        val: '第二联系人',
        name: '',
        phone: '',
        relation: ''
      }
    ],
    personalJob: {
      companyName: '', // 所在单位
      companyNature: '', // 单位性质
      companyAddressDetail: '', // 单位地址
      jobType: '', // 职业
      duty: '', // 职务
      basicSalary: '', // 收入情况
      familyCount: '', // 家庭人数
      companyhostName: '', // 经营单位
      employeesNumber: '', // 经营规模
      industry: '', // 所属行业
      companyhostNumber: '', // 信用代码
      companyhostBasic: '', // 基本户
      companyhostBank: '', // 经营公司开户银行
      companyhostCreatTime: '', // 注册时间
      companyhostCheckTime: '', // 最新年检
      registeredCapital: '', // 注册资金
      companyhostAddr: '' // 经营公司单位地址
    }, // 职业信息
    companyName: '', // 所在单位
    companyNature: '', // 单位性质
    companyAddressDetail: '', // 单位地址
    jobType: '', // 职业
    duty: '', // 职务
    basicSalary: '', // 收入情况
    familyCount: '', // 家庭人数
    companyhostName: '', // 经营单位
    employeesNumber: '', // 经营规模
    industry: '', // 所属行业
    companyhostNumber: '', // 信用代码
    companyhostBasic: '', // 基本户
    companyhostBank: '', // 经营公司开户银行
    companyhostCreatTime: '', // 注册时间
    companyhostCheckTime: '', // 最新年检
    registeredCapital: '', // 注册资金
    companyhostAddr: '', // 经营公司单位地址

    personalBank: {  //银行账户对象
      cardNumber: '', // 银行账户
      depositBank: '', // 开户银行
      depositBranch: '', // 开户支行
      accountType: '', // 账户类型
      accountUse: '' // 账号用途
    },
    cardNumber: '', // 银行账户
    depositBank: '', // 开户银行
    depositBranch: '', // 开户支行
    accountType: '', // 账户类型
    accountUse: '' // 账号用途
  }

  /**
   * 点击添加联系人
   */
  addingBet() {
    if (this.linkmanNumber < 6) {
      this.linkmanNumber++
      this.addLinkmanConent()
    } else {
      this.linkmanNumber = 5
      return
    }
  }
  addLinkmanConent() {
    if (this.linkmanNumber == 2) {
      return
    } else if (this.linkmanNumber == 3) {
      this.customerDetailsModel.personalContacts.push({
        val: '第三联系人',
        name: '',
        phone: '',
        relation: ''
      })
      return
    } else if (this.linkmanNumber == 4) {
      this.customerDetailsModel.personalContacts.push({
        val: '第四联系人',
        name: '',
        phone: '',
        relation: ''
      })
      return
    } else if (this.linkmanNumber == 5) {
      this.customerDetailsModel.personalContacts.push({
        val: '第五联系人',
        name: '',
        phone: '',
        relation: ''
      })
      return
    } else {
      this.$Message.error('温馨提示：最多只可以添加五名联系人！')
    }
  }
  /**
   * 点击保存
   */
  addClientSave() {
    this.customerDetailsModel.personalJob.companyName = this.customerDetailsModel.companyName
    this.customerDetailsModel.personalJob.companyNature = this.customerDetailsModel.companyNature
    this.customerDetailsModel.personalJob.companyAddressDetail = this.customerDetailsModel.companyAddressDetail
    this.customerDetailsModel.personalJob.jobType = this.customerDetailsModel.jobType
    this.customerDetailsModel.personalJob.duty = this.customerDetailsModel.duty
    this.customerDetailsModel.personalJob.basicSalary = this.customerDetailsModel.basicSalary
    this.customerDetailsModel.personalJob.familyCount = this.customerDetailsModel.familyCount
    this.customerDetailsModel.personalJob.companyhostName = this.customerDetailsModel.companyhostName
    this.customerDetailsModel.personalJob.employeesNumber = this.customerDetailsModel.employeesNumber
    this.customerDetailsModel.personalJob.industry = this.customerDetailsModel.industry
    this.customerDetailsModel.personalJob.companyhostNumber = this.customerDetailsModel.companyhostNumber
    this.customerDetailsModel.personalJob.companyhostBasic = this.customerDetailsModel.companyhostBasic
    this.customerDetailsModel.personalJob.companyhostBank = this.customerDetailsModel.companyhostBank
    this.customerDetailsModel.personalJob.companyhostCreatTime = this.customerDetailsModel.companyhostCreatTime
    this.customerDetailsModel.personalJob.companyhostCheckTime = this.customerDetailsModel.companyhostCheckTime
    this.customerDetailsModel.personalJob.registeredCapital = this.customerDetailsModel.registeredCapital
    this.customerDetailsModel.personalJob.companyhostAddr = this.customerDetailsModel.companyhostAddr
    this.customerDetailsModel.personalBank.cardNumber = this.customerDetailsModel.cardNumber
    this.customerDetailsModel.personalBank.depositBank = this.customerDetailsModel.depositBank
    this.customerDetailsModel.personalBank.depositBranch = this.customerDetailsModel.depositBranch
    this.customerDetailsModel.personalBank.accountType = this.customerDetailsModel.accountType
    this.customerDetailsModel.personalBank.accountUse = this.customerDetailsModel.accountUse

    delete this.customerDetailsModel.companyName
    delete this.customerDetailsModel.companyNature
    delete this.customerDetailsModel.companyAddressDetail
    delete this.customerDetailsModel.jobType
    delete this.customerDetailsModel.duty
    delete this.customerDetailsModel.basicSalary
    delete this.customerDetailsModel.familyCount
    delete this.customerDetailsModel.companyhostName
    delete this.customerDetailsModel.employeesNumber
    delete this.customerDetailsModel.industry
    delete this.customerDetailsModel.companyhostNumber
    delete this.customerDetailsModel.companyhostBasic
    delete this.customerDetailsModel.companyhostBank
    delete this.customerDetailsModel.companyhostCreatTime
    delete this.customerDetailsModel.companyhostCheckTime
    delete this.customerDetailsModel.registeredCapital
    delete this.customerDetailsModel.companyhostAddr
    delete this.customerDetailsModel.cardNumber
    delete this.customerDetailsModel.depositBank
    delete this.customerDetailsModel.depositBranch
    delete this.customerDetailsModel.accountType
    delete this.customerDetailsModel.accountUse

    console.log(this.customerDetailsModel)

    this.personalService.createCustomer(this.customerDetailsModel).subscribe(
      data => {
        this.$Message.success('保存成功！')
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }

  /**
   * 点击切换显示隐藏
   */
  fold() {
    this.WhetherNotShown = !this.WhetherNotShown
  }
}
</script>



<style lang="less" scoped>
.component.get-customer-details {
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
  .showContent {
    margin-top: 20px;
    display: block;
  }
}
</style>
<style lang="less">
.component.get-customer-details {
  .mailingAddress.ivu-input-wrapper.ivu-input-type {
    width: 485px !important;
  }
  .socialCredit.ivu-input-wrapper.ivu-input-type {
    width: 91%;
  }
  .contacts {
    .ivu-select,
    .ivu-select-,
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

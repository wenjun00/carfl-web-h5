<!--新增客户详情--> 
<template> 
    <section class="component get-customer-details">
        <i-form :rules="customerDetailsRule" :model="customerDetailsModel" ref="form-item" :label-width="90">
            <!-- 基本信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="客户姓名" prop="name">
                        <i-input :maxlength="7" placeholder="请输入客户姓名" v-model="customerDetailsModel.name"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="手机号码" prop="mobileMain">
                        <i-input placeholder="请输入手机号码" v-model="customerDetailsModel.mobileMain"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="证件类型" prop="certificateType">
                        <i-select placeholder="请选择证件类型" v-model="customerDetailsModel.certificateType">
                            <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item  label="证件号码" prop="certificateNumber">
                        <i-input placeholder="请输入证件号码" v-model="customerDetailsModel.certificateNumber"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="居住地址" prop="localHomeAddr">
                        <i-input placeholder="请输居住地址" v-model="customerDetailsModel.localHomeAddr"></i-input>
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
                    <i-form-item label="意向级别" prop="intentionalLevel">
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
                        <i-form-item label="性别" prop="sex">
                            <i-select placeholder="请选择性别" v-model="customerDetailsModel.sex ">
                                <i-option v-for="{value,label} in $dict.getDictData('0001')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item  label="出生日期" prop="birthTime">
                            <i-date-picker placeholder="请选择出生日期" v-model="customerDetailsModel.birthTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="民族" prop="nation">
                            <i-input placeholder="请填写民族" v-model="customerDetailsModel.nation"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="健康状况" prop="healthStatus">
                            <i-select placeholder="请选择健康状况" v-model="customerDetailsModel.healthStatus">
                                <i-option v-for="{value,label} in $dict.getDictData('0453')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="居住状况" prop="homeStatus">
                            <i-select placeholder="请选择居住地址" v-model="customerDetailsModel.homeStatus ">
                                <i-option v-for="{value,label} in $dict.getDictData('0454')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="婚姻状况" prop="marital">
                            <i-select placeholder="请选择婚姻状况" v-model="customerDetailsModel.marital ">
                                <i-option v-for="{value,label} in $dict.getDictData('0003')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="通讯地址" prop="messageAddr">
                            <i-input placeholder="请输入通讯地址" v-model="customerDetailsModel.messageAddr" class="mailingAddress"></i-input>
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
                            <i-form-item label="车辆型号">
                                <span class="selectModels" @click="selectModels">选择车型</span>
                            </i-form-item>
                        </i-col>
                    </i-row>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="车牌号" >
                            <i-input placeholder="请输入车牌号"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="车架号" >
                            <i-input placeholder="请输入车架号"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="上牌时间" >
                            <i-input placeholder="请输入上牌时间"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="上牌地址">
                            <i-input placeholder="请输入上牌地址"></i-input>
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
                            <i-form-item :label="i.val" >
                                <i-input placeholder="请输入姓名" v-model="i.name"></i-input>
                                <i-select v-model="i.relation " placeholder="请选择关系">
                                    <i-option v-for="{value,label} in $dict.getDictData('0457')" :key="value" :label="label" :value="value"></i-option>
                                </i-select>
                                <i-input placeholder="请输入手机号" v-model="i.phone"></i-input>
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
                        <i-form-item label="所在单位" prop="companyName">
                            <i-input placeholder="请输入所在单位" v-model="customerDetailsModel.companyName"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="单位性质" prop="companyNature">
                            <i-select placeholder="请选择单位性质" v-model="customerDetailsModel.companyNature ">
                                <i-option v-for="{value,label} in $dict.getDictData('0012')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="单位地址" prop="companyAddressDetail">
                            <i-input placeholder="请输单位地址" v-model="customerDetailsModel.companyAddressDetail" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="职业" prop="jobType">
                            <i-select placeholder="请选择职业" v-model="customerDetailsModel.jobType ">
                                <i-option v-for="{value,label} in $dict.getDictData('0011')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="职务" prop="duty">
                            <i-select placeholder="请选择职务" v-model="customerDetailsModel.duty ">
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
                        <i-form-item label="个人月收入" prop="basicSalary">
                             <i-input-number placeholder="请输入个人月收入" v-model="customerDetailsModel.basicSalary" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
                            <span>元</span>
                        </i-form-item>
                    </i-col>

                    <i-col :span="10" class="familySize ">
                        <i-form-item label="家庭人数" prop="familyCount">
                             <i-input-number placeholder="请输入家庭人数" v-model="customerDetailsModel.familyCount" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
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
                        <i-form-item label="经营单位" prop="companyhostName">
                            <i-input placeholder="请输入经营单位" v-model="customerDetailsModel.companyhostName" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="经营规模" prop="employeesNumber">
                            <i-input-number placeholder="请输入经营规模" v-model="customerDetailsModel.employeesNumber" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                    <i-col :span="10" class="familySize ">
                        <i-form-item label="所属行业" prop="industry">
                            <i-select placeholder="请选择所属行业" v-model="customerDetailsModel.industry  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0459')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="统一社会信用代码" prop="companyhostNumber" :label-width="120">
                            <i-input placeholder="请输入社会信用代码" v-model="customerDetailsModel.companyhostNumber" class="socialCredit "></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="基本户" prop="companyhostBasic">
                            <i-input placeholder="请输入基本户" v-model="customerDetailsModel.companyhostBasic"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" prop="companyhostBank">
                            <i-select placeholder="请输入开户银行" v-model="customerDetailsModel.companyhostBank   ">
                                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="注册时间" prop="companyhostCreatTime">
                            <i-date-picker placeholder="请输入注册时间" v-model="customerDetailsModel.companyhostCreatTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="最新年检" prop="companyhostCheckTime">
                            <i-date-picker placeholder="请输入最新年检" v-model="customerDetailsModel.companyhostCheckTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24">
                        <i-form-item label="注册资金" prop="registeredCapital">
                            <i-input-number placeholder="请输入注册资金" v-model="customerDetailsModel.registeredCapital" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
                            <span>万元</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="单位地址" prop="companyhostAddr">
                            <i-input placeholder="请输入单位地址" v-model="customerDetailsModel.companyhostAddr" class="mailingAddress"></i-input>
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
                        <i-form-item label="银行账号" prop="cardNumber">
                            <i-input-number placeholder="请输入银行账户" v-model="customerDetailsModel.cardNumber"> </i-input-number>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" prop="depositBank">
                            <i-select placeholder="请选择开户银行" v-model="customerDetailsModel.depositBank  ">
                                <i-option  v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="开户支行" prop="depositBranch">
                            <i-input placeholder="请输入开户支行" v-model="customerDetailsModel.depositBranch" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="账户类型" prop="accountType">
                            <i-select placeholder="请选择账户类型" v-model="customerDetailsModel.accountType  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0460')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="账号用途" prop="accountUse">
                            <i-select placeholder="请选择账号用途" v-model="customerDetailsModel.accountUse   ">
                                <i-option v-for="{value,label} in $dict.getDictData('0455')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
            </span>

        </i-form>
        <!-- 车型弹窗 -->
        <template>
            <i-modal width="780"  :transfer="false" v-model="vehicleModal" title="选择车型" class="add-vehicle-modal">
                <add-vehicle-modal ref="add-vehicle-modal"></add-vehicle-modal>
                <div slot="footer">
                    <i-button size="large" type="primary" @click="vehicleModal = false">选择</i-button>
                </div>
            </i-modal>
        </template>

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
import  AddVehicleModal from '~/components/customer-center/personal-center/add-vehicle-modal.vue'
@Component({
  components: {
    UploadVoucher,
    AddVehicleModal
  }
})
export default class addPeople extends Vue {
  @Dependencies(PersonalService) private personalService: PersonalService
  private WhetherNotShown: Boolean = false
  private vehicleModal: Boolean = false
  private linkmanNumber: any = 2 // 联系人值
  private customerDetailsModel = {
    name: '', // 姓名
    mobileMain: '', // 手机号
    certificateType: null, // 证件类型
    certificateNumber: '', // 证件号码
    localHomeAddr: '', // 居住地址
    intentionalLevel: 0, // 意向级别
    sex: null, // 性别
    birthTime: '', // 出身日期
    nation: '', // 民族
    healthStatus: null, // 健康状况
    homeStatus: null, // 居住状况
    marital: null, // 婚姻状况
    messageAddr: '', // 通讯地址
    personalContacts: [
      {
        val: '第一联系人',
        level: 1,
        name: '',
        phone: '',
        relation: ''
      },
      {
        val: '第二联系人',
        level: 2,
        name: '',
        phone: '',
        relation: ''
      }
    ],
    personalJob: {
      companyName: '', // 所在单位
      companyNature: null, // 单位性质
      companyAddressDetail: '', // 单位地址
      jobType: null, // 职业
      duty: null, // 职务
      basicSalary: null, // 收入情况
      familyCount: null, // 家庭人数
      companyhostName: '', // 经营单位
      employeesNumber: null, // 经营规模
      industry: null, // 所属行业
      companyhostNumber: '', // 信用代码
      companyhostBasic: '', // 基本户
      companyhostBank: null, // 经营公司开户银行
      companyhostCreatTime: '', // 注册时间
      companyhostCheckTime: '', // 最新年检
      registeredCapital: null, // 注册资金
      companyhostAddr: '' // 经营公司单位地址
    }, // 职业信息
    companyName: '', // 所在单位
    companyNature: null, // 单位性质
    companyAddressDetail: '', // 单位地址
    jobType: null, // 职业
    duty: null, // 职务
    basicSalary: null, // 收入情况
    familyCount: null, // 家庭人数
    companyhostName: '', // 经营单位
    employeesNumber: null, // 经营规模
    industry: null, // 所属行业
    companyhostNumber: '', // 信用代码
    companyhostBasic: '', // 基本户
    companyhostBank: null, // 经营公司开户银行
    companyhostCreatTime: '', // 注册时间
    companyhostCheckTime: '', // 最新年检
    registeredCapital: null, // 注册资金
    companyhostAddr: '', // 经营公司单位地址

    personalBank: {
      //银行账户对象
      cardNumber: null, // 银行账户
      depositBank: null, // 开户银行
      depositBranch: '', // 开户支行
      accountType: null, // 账户类型
      accountUse: null // 账号用途
    },
    cardNumber: null, // 银行账户
    depositBank: null, // 开户银行
    depositBranch: '', // 开户支行
    accountType: null, // 账户类型
    accountUse: null, // 账号用途
  }
  private customerDetailsRule: any = {
    name: [{ required: true, message: '请输入姓名', trigger: 'change', }],
    mobileMain:[
      {
        required: true,
        message: "请输入手机号",
        trigger: "change"
      },
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ],
    certificateNumber:[
      {
        required: true,
        message: "请输入证件号码",
        trigger: "blur"
      },
      {
        validator: this.$validator.idCard,
        trigger: "blur"
      }
    ]

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
        level: 3,
        name: '',
        phone: '',
        relation: ''
      })
      return
    } else if (this.linkmanNumber == 4) {
      this.customerDetailsModel.personalContacts.push({
        val: '第四联系人',
        level: 4,
        name: '',
        phone: '',
        relation: ''
      })
      return
    } else if (this.linkmanNumber == 5) {
      this.customerDetailsModel.personalContacts.push({
        val: '第五联系人',
        level: 5,
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
    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false

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
      for (
        let i = 0;
        i < this.customerDetailsModel.personalContacts.length;
        i++
      ) {
        delete this.customerDetailsModel.personalContacts[i].val
      }

      // console.log(this.customerDetailsModel)
      this.personalService.createCustomer(this.customerDetailsModel).subscribe(
        data => {
          this.$Message.success('保存成功！')
          this.$emit('close')
          this.$common.revert(this.customerDetailsModel)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
    })
  }

  /**
   * 清空表单
   */
  closeDetailsModal() {
    let closeDetailsModal: any = this.$refs['form-item']
    closeDetailsModal.resetFields()
    this.customerDetailsModel.personalContacts = [
      {
        val: '第一联系人',
        level: 1,
        name: '',
        phone: '',
        relation: ''
      },
      {
        val: '第二联系人',
        level: 2,
        name: '',
        phone: '',
        relation: ''
      }
    ]
  }
  /**
   * 点击选择车型
   */
  selectModels(){
      this.vehicleModal = true
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

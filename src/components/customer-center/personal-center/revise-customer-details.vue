<!--编辑客户详情-->
<template>
  <section class="component revise-customer-details">
    <i-form v-model="customerDetailsModel" :rules="customerDetailsRule" ref="form-item" :label-width="90">
      <!-- 基本信息 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">基本信息</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="客户姓名" porp="name">
            <i-input placeholder="请输入客户姓名" v-model="customerDetailsModel.name"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="手机号码" porp="mobileMain">
            <i-input placeholder="请输入手机号码" v-model="customerDetailsModel.mobileMain"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="证件类型">
            <i-select placeholder="请选择证件类型" v-model="customerDetailsModel.certificateType">
              <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
            </i-select>

          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="证件号码" prop="idCard">
            <i-input placeholder="请输入证件号码" v-model="customerDetailsModel.idCard"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="居住地址" :label-width="90">
            <i-input placeholder="请输入居住地址" v-model="customerDetailsModel.intentionHomeAddr"></i-input>
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
          <i-form-item label="意向级别" :label-width="90">
            <i-rate allow-half v-model="customerDetailsModel.intentionalLevel"></i-rate>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 收起 展开 -->
      <i-row class="data-form">
        <i-col>
          <i-button @click="fold" v-if="!WhetherNotShown" type="primary" icon="plus-round">展开更多</i-button>
          <i-button @click="fold" v-else type="primary" icon="minus-round">收起</i-button>
        </i-col>
      </i-row>
      <span class="showContent" v-show="WhetherNotShown">
        <!-- 隐藏内容 -->
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="性别" :label-width="90">
              <i-select placeholder="请选择性别" v-model="customerDetailsModel.sex ">
                <i-option v-for="{value,label} in $dict.getDictData('0001')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="出生日期" :label-width="90">
              <i-date-picker placeholder="请选择出生日期" v-model="customerDetailsModel.birthTime" type="date"></i-date-picker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="民族" :label-width="90">
              <i-input placeholder="请输入民族" v-model="customerDetailsModel.nation"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="健康状况" :label-width="90">
              <i-select placeholder="请选择健康状况" v-model="customerDetailsModel.healthStatus">
                <i-option v-for="{value,label} in $dict.getDictData('0453')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="居住状况" :label-width="90">
              <i-select placeholder="请选择居住状态" v-model="customerDetailsModel.homeStatus ">
                <i-option v-for="{value,label} in $dict.getDictData('0454')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="婚姻状况" :label-width="90">
              <i-select placeholder="请选择婚姻状况" v-model="customerDetailsModel.marital ">
                <i-option v-for="{value,label} in $dict.getDictData('0003')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="通讯地址" :label-width="90">
              <i-input placeholder="请输通讯地址" v-model="customerDetailsModel.messageAddr" class="mailingAddress"></i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <!-- 相关联系人 -->
        <i-row class="data-form">
          <i-col>
            <div class="data-form-item"></div>
            <a class="information">相关联系人</a>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="24" class="contacts">
            <div v-for="(i,index) in customerDetailsModel.personalContacts" :key="index">
              <i-form-item :label="i.attn" :label-width="90">
                <i-input v-model="i.name"></i-input>
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
        <i-row class="data-form">
          <i-col>
            <div class="data-form-item"></div>
            <a class="information">职业信息</a>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="所在单位" :label-width="90">
              <i-input placeholder="请输入所在单位" v-model="customerDetailsModel.personalJob.companyName"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="单位性质" :label-width="90">
              <i-select placeholder="请选择单位性质" v-model="customerDetailsModel.personalJob.companyNature ">
                <i-option v-for="{value,label} in $dict.getDictData('0012')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="单位地址" :label-width="90">
              <i-input placeholder="请输入单位地址" v-model="customerDetailsModel.personalJob.companyAddressDetail" class="mailingAddress"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="职业" :label-width="90">
              <i-select placeholder="请选择职业" v-model="customerDetailsModel.personalJob.jobType ">
                <i-option v-for="{value,label} in $dict.getDictData('0011')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="职务" :label-width="90">
              <i-select placeholder="请选择职务" v-model="customerDetailsModel.personalJob.duty ">
                <i-option v-for="{value,label} in $dict.getDictData('0458')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <!-- 收入请款 -->
        <i-row class="data-form">
          <i-col>
            <div class="data-form-item"></div>
            <a class="information">收入情况</a>
          </i-col>
        </i-row>
        <i-row type="flex">
          <i-col :span="10">
            <i-form-item label="个人月收入" :label-width="90">
              <i-input placeholder="请输入个人月收入" v-model="customerDetailsModel.personalJob.basicSalary"></i-input>
              <span>元</span>
            </i-form-item>
          </i-col>

          <i-col :span="10" class="familySize ">
            <i-form-item label="家庭人数" :label-width="90">
              <i-input placeholder="请输入家庭人数" v-model="customerDetailsModel.personalJob.familyCount"></i-input>
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
              <i-input placeholder="请输入经营单位" class="mailingAddress" v-model="customerDetailsModel.personalJob.companyhostName"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex">
          <i-col :span="10">
            <i-form-item label="经营规模" :label-width="90">
              <i-input placeholder="请输入经营规模" v-model="customerDetailsModel.personalJob.employeesNumber"></i-input>
              <span>人</span>
            </i-form-item>
          </i-col>
          <i-col :span="10" class="familySize ">
            <i-form-item label="所属行业" :label-width="90">
              <i-select placeholder="请选择所属行业" v-model="customerDetailsModel.personalJob.industry  ">
                <i-option v-for="{value,label} in $dict.getDictData('0459')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex">
          <i-col :span="16">
            <i-form-item label="统一社会信用代码" :label-width="120">
              <i-input placeholder="请输入社会信用代码" class="socialCredit" v-model="customerDetailsModel.personalJob.companyhostNumber"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="基本户" :label-width="90">
              <i-input placeholder="请输入基本户" v-model="customerDetailsModel.personalJob.companyhostBasic"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="开户银行" :label-width="90">
              <i-select placeholder="请选择开户银行" v-model="customerDetailsModel.personalJob.companyhostBank">
                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="8">
            <i-form-item label="注册时间" :label-width="90">
              <i-date-picker placeholder="请输入注册时间" v-model="customerDetailsModel.personalJob.companyhostCreatTime" type="date"></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="8">
            <i-form-item label="最新年检" :label-width="90">
              <i-date-picker placeholder="请输入最新年检" v-model="customerDetailsModel.personalJob.companyhostCheckTime" type="date"></i-date-picker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110">
          <i-col :span="24">
            <i-form-item label="注册资金" :label-width="90">
              <i-input placeholder="请输入注册资金" v-model="customerDetailsModel.personalJob.registeredCapital"></i-input>
              <span>万元</span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row type="flex">
          <i-col :span="16">
            <i-form-item label="单位地址" :label-width="90">
              <i-input placeholder="请输入单位地址" class="mailingAddress" v-model="customerDetailsModel.personalJob.companyhostAddr"></i-input>
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
import { Prop, Watch } from "vue-property-decorator";
import { FormatInputPathObject } from 'path'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import UploadVoucher from '~/components/common/upload-voucher.vue'
import { PersonalService } from '~/services/manage-service/personal.service'
import { Dependencies } from '~/core/decorator'
import { constants } from 'zlib'
import { setTimeout } from 'core-js/library/web/timers';
@Component({
  components: {
    UploadVoucher
  }
})
export default class ReviseCustomerDetails extends Vue {
  @Dependencies(PersonalService) private personalService: PersonalService
  private WhetherNotShown: Boolean = false
  private customerDetailsModel: any = {
    name: '',
    mobileMain: '',
    certificateType: '',
    idCard: '',
    intentionHomeAddr: '',
    intentionalLevel: 0,
    nation: '',
    messageAddr: '',
    sex: '',
    personalContacts: [],
    personalJob: {},
    personalBank: {}

  }
  private customerDetailsRule: any = {
    name: [{ required: false, message: '请输入姓名', trigger: 'change', }],
    mobileMain: [
      { required: false, message: "请输入手机号", trigger: "change" }, { validator: this.$validator.phoneNumber, trigger: "blur" }
    ],
    idCard: [
      {
        required: false,
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
   * 获取客户详情信息
   */
  getDetailsData(personalId) {
    this.personalService
      .getDetailPersonal({ personalDataId: personalId })
      .subscribe(
        data => {

          //   this.customerDetailsModel = data
          this.customerDetailsModel.id = data.id;
          this.customerDetailsModel.name = data.name;
          this.customerDetailsModel.mobileMain = data.mobileMain;
          this.customerDetailsModel.idCard = data.idCard;
          this.customerDetailsModel.intentionHomeAddr = data.intentionHomeAddr;
          this.customerDetailsModel.nation = data.nation;
          this.customerDetailsModel.messageAddr = data.messageAddr;
          this.customerDetailsModel.personalContacts = data.personalContacts
          this.customerDetailsModel.sex = !!data.sex ? Number(data.sex) : null;
          this.customerDetailsModel.certificateType = !!data.certificateType ? Number(data.certificateType) : null;
          this.customerDetailsModel.intentionalLevel = !!data.intentionalLevel ? Number(data.intentionalLevel) : 0;
          this.customerDetailsModel.birthTime = data.birthTime;
          this.customerDetailsModel.healthStatus = !!data.healthStatus ? Number(data.healthStatus) : null;
          this.customerDetailsModel.homeStatus = !!data.homeStatus ? Number(data.homeStatus) : null;
          this.customerDetailsModel.marital = !!data.marital ? Number(data.marital) : null;
          this.customerDetailsModel.personalJob = !!data.personalJob ? data.personalJob : {};
          this.customerDetailsModel.personalJob.companyNature = !!data.personalJob.companyNature ? Number(data.personalJob.companyNature) : null;
          this.customerDetailsModel.personalJob.jobType = !!data.personalJob.jobType ? Number(data.personalJob.jobType) : null;
          this.customerDetailsModel.personalJob.duty = !!data.personalJob.duty ? Number(data.personalJob.duty) : null;
          this.customerDetailsModel.personalJob.industry = !!data.personalJob.industry ? Number(data.personalJob.industry) : null;
          this.customerDetailsModel.personalJob.companyhostBank = !!data.personalJob.companyhostBank ? Number(data.personalJob.companyhostBank) : null;
          this.customerDetailsModel.personalJob.companyhostCreatTime = !!data.personalJob.companyhostCreatTime ? data.personalJob.companyhostCreatTime : null;
          this.customerDetailsModel.personalJob.companyhostCheckTime = !!data.personalJob.companyhostCheckTime ? data.personalJob.companyhostCheckTime : null;
          this.customerDetailsModel.personalBank = !!data.personalBank ? data.personalBank : {};
          // this.customerDetailsModel.personalBank.depositBank = !!data.personalBank.depositBank ? Number(data.personalBank.depositBank) : null;
          // this.customerDetailsModel.personalBank.accountType = !!data.personalBank.accountType ? Number(data.personalBank.accountType) : null;
          // this.customerDetailsModel.personalBank.accountUse = !!data.personalBank.accountUse ? Number(data.personalBank.accountUse) : null;
          // this.customerDetailsModel.personalJob.basicSalary = !!data.personalJob.basicSalary ? Number(data.personalJob.basicSalary) : null;
          for (let i of this.customerDetailsModel.personalContacts) {
            if (i.level == 1) {
              i.attn = '第一联系人'
            } else if (i.level == 2) {
              i.attn = '第二联系人'
            } else if (i.level == 3) {
              i.attn = '第三联系人'
            } else if (i.level == 4) {
              i.attn = '第四联系人'
            } else if (i.level == 5) {
              i.attn = '第五联系人'
            }
          }
          // console.log(this.customerDetailsModel.personalContacts)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 编辑保存 
   */
  reviseConfirmData() {
    if (this.customerDetailsModel.name == null || this.customerDetailsModel.name == '') {
      this.$Message.error('请填写姓名')
      return
    }

    if (!!this.customerDetailsModel.mobileMain) {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      if (!reg.test(this.customerDetailsModel.mobileMain)) {
        this.$Message.error('请填写正确的手机号码')
        return
      }
    } else {
      this.$Message.error('请填写手机号码')
      return
    }

    if (!!this.customerDetailsModel.idCard) {
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;
      if (!reg.test(this.customerDetailsModel.idCard)) {
        this.$Message.error('请填写正确的身份号码')
        return
      }
    } else {
      this.$Message.error('请填写身份号码')
      return
    }
    for(let leg in this.customerDetailsModel.personalContacts){
      delete this.customerDetailsModel.personalContacts[leg].attn
    }

    // console.log(this.customerDetailsModel.personalContacts)
    // return
    this.personalService.updateCustomer(this.customerDetailsModel).subscribe(
      data => {
        this.$Message.success('修改成功！')
        this.$emit('closeTwo')
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )

  }
  /**
  * 点击添加联系人
  */
  addingBet() {
    console.log(this.customerDetailsModel.personalContacts.length)
    if (this.customerDetailsModel.personalContacts.length < 5) {
      let leg =  this.customerDetailsModel.personalContacts.length+1
      if(leg == 3){
        this.customerDetailsModel.personalContacts.push({
        attn: '第三联系人',
        level: `${leg}`,
        name: '',
        phone: '',
        relation: ''
      })
      }else if(leg == 4){
        this.customerDetailsModel.personalContacts.push({
        attn: '第四联系人',
        level: `${leg}`,
        name: '',
        phone: '',
        relation: ''
      })
      }else{
         this.customerDetailsModel.personalContacts.push({
        attn: '第五联系人',
        level: `${leg}`,
        name: '',
        phone: '',
        relation: ''
      })
      }
      

      console.log(this.customerDetailsModel.personalContacts)
    } else {
      this.$Message.error('温馨提示：最多只可以添加五名联系人！')
      return
    }
  }
  // addLinkmanConent() {
   
  //     this.customerDetailsModel.personalContacts.push({
  //       attn: '联系人',
  //       level: 5,
  //       name: '',
  //       phone: '',
  //       relation: ''
  //     })
    
  // }

  fold() {
    this.WhetherNotShown = !this.WhetherNotShown
  }


}
</script>



<style lang="less" scoped>
.component.revise-customer-details {
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
.component.revise-customer-details {
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
  .ivu-input,
  .ivu-input-,
  .ivu-select-selection {
    background: white;
    color: #495060;
  }
}
</style>

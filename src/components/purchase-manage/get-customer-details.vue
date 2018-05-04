<!--客户详情-->
<template> 
    <section class="component get-customer-details">
        <i-form v-model="customerDetailsModel" :label-width="90">
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
                        <i-input readonly v-model="customerDetailsModel.name"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="手机号码">
                        <i-input readonly v-model="customerDetailsModel.mobileMain"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="证件类型">
                        <i-select readonly v-model="customerDetailsModel.certificateType" disabled>
                            <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>

                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="证件号码">
                        <i-input readonly v-model="customerDetailsModel.certificateNumber"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="居住地址">
                        <i-input readonly v-model="customerDetailsModel.localHomeAddr"></i-input>
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
                    <i-form-item label="意向级别">
                        <i-rate disabled allow-half v-model="customerDetailsModel.intentionalLevel"></i-rate>
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
                        <i-form-item label="性别">
                            <i-select disabled v-model="customerDetailsModel.sex ">
                                <i-option v-for="{value,label} in $dict.getDictData('0001')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="出生日期">
                            <i-date-picker disabled v-model="customerDetailsModel.birthTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="民族">
                            <i-input readonly v-model="customerDetailsModel.nation"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="健康状况">
                            <i-select disabled v-model="customerDetailsModel.healthStatus">
                                <i-option v-for="{value,label} in $dict.getDictData('0453')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="居住状况">
                            <i-select disabled v-model="customerDetailsModel.homeStatus ">
                                <i-option v-for="{value,label} in $dict.getDictData('0454')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="婚姻状况">
                            <i-select disabled v-model="customerDetailsModel.marital ">
                                <i-option v-for="{value,label} in $dict.getDictData('0003')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="通讯地址">
                            <i-input v-model="customerDetailsModel.messageAddr" class="mailingAddress" readonly></i-input>
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
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="车架号" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="上牌时间" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="上牌地址" :label-width="90">
                            <i-input readonly></i-input>
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
                            <i-form-item label="联系人">
                                <i-input readonly v-model="i.name"></i-input>
                                <i-select disabled v-model="i.relation ">
                                    <i-option v-for="{value,label} in $dict.getDictData('0457')" :key="value" :label="label" :value="value"></i-option>
                                </i-select>
                                <i-input readonly placeholder="请输入手机号" v-model="i.phone"></i-input>
                            </i-form-item>
                        </div>

                    </i-col>
                </i-row>
                <!-- <i-col>
                    <span class="addingBet">+添加联系人</span>
                </i-col> -->
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
                            <i-input readonly v-model="customerDetailsModel.personalJob.companyName"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="单位性质" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalJob.companyNature ">
                                <i-option v-for="{value,label} in $dict.getDictData('0012')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalJob.companyAddressDetail" class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="职业" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalJob.jobType ">
                                <i-option v-for="{value,label} in $dict.getDictData('0011')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="职务" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalJob.duty ">
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
                            <i-input readonly v-model="customerDetailsModel.personalJob.basicSalary"></i-input>
                            <span>元</span>
                        </i-form-item>
                    </i-col>

                    <i-col :span="10" class="familySize ">
                        <i-form-item label="家庭人数" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalJob.familyCount"></i-input>
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
                            <i-input class="mailingAddress" readonly v-model="customerDetailsModel.personalJob.companyhostName"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="经营规模" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalJob.employeesNumber"></i-input>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                    <i-col :span="10" class="familySize ">
                        <i-form-item label="所属行业" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalJob.industry  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0459')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="统一社会信用代码" :label-width="120">
                            <i-input class="socialCredit" v-model="customerDetailsModel.personalJob.companyhostNumber" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="基本户" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalJob.companyhostBasic"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalJob.companyhostBank">
                                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="注册时间" :label-width="90">
                            <i-date-picker readonly v-model="customerDetailsModel.personalJob.companyhostCreatTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="最新年检" :label-width="90">
                            <i-date-picker readonly v-model="customerDetailsModel.personalJob.companyhostCheckTime" type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24">
                        <i-form-item label="注册资金" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalJob.registeredCapital"></i-input>
                            <span>万元</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input class="mailingAddress" v-model="customerDetailsModel.personalJob.companyhostAddr" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <!-- 银行账户 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">基本信息</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="银行账号" :label-width="90">
                            <i-input readonly v-model="customerDetailsModel.personalBank.cardNumber"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select v-model="customerDetailsModel.personalBank.depositBank  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0456')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="开户支行" :label-width="90">
                            <i-input class="mailingAddress" readonly v-model="customerDetailsModel.personalBank.depositBranch"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="账户类型" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalBank.accountType  ">
                                <i-option v-for="{value,label} in $dict.getDictData('0460')" :key="value" :label="label" :value="value"></i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="账号用途" :label-width="90">
                            <i-select disabled v-model="customerDetailsModel.personalBank.accountUse   ">
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
import { Prop } from 'vue-property-decorator'
import { FormatInputPathObject } from 'path'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import UploadVoucher from '~/components/common/upload-voucher.vue'
import { PersonalService } from '~/services/manage-service/personal.service'
import { Dependencies } from '~/core/decorator'
import { constants } from 'zlib'
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  @Dependencies(PersonalService) private personalService: PersonalService
  private WhetherNotShown: Boolean = false
  private customerDetailsModel: any = {
      personalJob:{},
      personalBank:{}
  }

  /**
   * 获取客户详情信息
   */
  getDetailsData(personalId) {
    this.personalService
      .getDetailPersonal({ personalDataId: personalId })
      .subscribe(
        data => {
          this.customerDetailsModel = data
          this.customerDetailsModel.certificateType = !!this.customerDetailsModel.certificateType ?Number(this.customerDetailsModel.certificateType):null;
          this.customerDetailsModel.intentionalLevel =!!this.customerDetailsModel.intentionalLevel ?Number(this.customerDetailsModel.intentionalLevel):0;
          this.customerDetailsModel.sex = !!this.customerDetailsModel.sex?Number(this.customerDetailsModel.sex):null ;
          this.customerDetailsModel.birthTime = !!data.birthTime ? FilterService.dateFormat(data.birthTime,'yyyy-MM-dd'):'';
          this.customerDetailsModel.healthStatus = !!this.customerDetailsModel.healthStatus ?Number(this.customerDetailsModel.healthStatus):null;
          this.customerDetailsModel.homeStatus = !!this.customerDetailsModel.homeStatus ? Number(this.customerDetailsModel.homeStatus):null;
          this.customerDetailsModel.marital = !!this.customerDetailsModel.marital ? Number(this.customerDetailsModel.marital) :null;
          this.customerDetailsModel.personalJob =!!this.customerDetailsModel.personalJob ?this.customerDetailsModel.personalJob:{} ;
          this.customerDetailsModel.personalJob.companyNature = !!this.customerDetailsModel.personalJob.companyNature ? Number(this.customerDetailsModel.personalJob.companyNature):null;
          this.customerDetailsModel.personalJob.jobType = !!this.customerDetailsModel.personalJob.jobType ?Number(this.customerDetailsModel.personalJob.jobType):null;
          this.customerDetailsModel.personalJob.duty =  !!this.customerDetailsModel.personalJob.duty? Number(this.customerDetailsModel.personalJob.duty):null;
          this.customerDetailsModel.personalJob.industry = !!this.customerDetailsModel.personalJob.industry ? Number(this.customerDetailsModel.personalJob.industry):null;
          this.customerDetailsModel.personalJob.companyhostBank = !!this.customerDetailsModel.personalJob.companyhostBank ? Number(this.customerDetailsModel.personalJob.companyhostBank):null;
          this.customerDetailsModel.personalJob.companyhostCreatTime =!!data.personalJob.companyhostCreatTime?FilterService.dateFormat(data.personalJob.companyhostCreatTime,'yyyy-MM-dd'):'';
          this.customerDetailsModel.personalJob.companyhostCheckTime =!!data.personalJob.companyhostCheckTime?FilterService.dateFormat(data.personalJob.companyhostCheckTime,'yyyy-MM-dd'):'';
          this.customerDetailsModel.personalBank = !!this.customerDetailsModel.personalBank? this.customerDetailsModel.personalBank:{};
          this.customerDetailsModel.personalBank.depositBank = !!this.customerDetailsModel.personalBank.depositBank ? Number(this.customerDetailsModel.personalBank.depositBank):null;
          this.customerDetailsModel.personalBank.accountType = !!this.customerDetailsModel.personalBank.accountType ? Number(this.customerDetailsModel.personalBank.accountType):null;
          this.customerDetailsModel.personalBank.accountUse = !!this.customerDetailsModel.personalBank.accountUse ? Number(this.customerDetailsModel.personalBank.accountUse):null;
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

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
  .ivu-input, 
  .ivu-input-disabled,
  .ivu-select-selection {
    background: white;
    color: #495060;
  }
}
</style>

<!--客户资料-->
<template>
  <section class="component customer-materials">
    <i-col span="24" style="line-height:30px" class="form-title">个人信息</i-col>
    <i-form :rules="rules" ref="job-form" :model="customerMaterialsForm" :label-width="110" label-position="left" style="position:relative;left:16px;margin-top:10px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">基础信息</span>
      </div>
      <i-row>
        <i-col span="12">
          <i-form-item label="姓名" prop="name">
            <i-input type="text" placeholder="请输入姓名" v-model="customerMaterialsForm.name">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="性别" prop="sex">
            <i-select v-model="customerMaterialsForm.sex">
              <i-option label="男" :value="1"></i-option>
              <i-option label="女" :value="2"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="出生日期" prop="birthTime">
            <i-date-picker type="date" placeholder="选择出生日期" v-model="customerMaterialsForm.birthTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="微信号码" prop="wechat">
            <i-input type="text" placeholder="请输入微信号码" v-model="customerMaterialsForm.wechat">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="手机号码（主）" prop="mobileMain">
            <i-input type="text" placeholder="请输入手机号码（主）" v-model="customerMaterialsForm.mobileMain">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="手机号码（次）" prop="mobileMinor">
            <i-input type="text" placeholder="可不填" v-model="customerMaterialsForm.mobileMinor">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="教育程度" prop="education">
            <i-select v-model="customerMaterialsForm.education">
              <i-option label="博士及以上" :value="3"></i-option>
              <i-option label="硕士" :value="4"></i-option>
              <i-option label="本科" :value="5"></i-option>
              <i-option label="大专" :value="6"></i-option>
              <i-option label="高中" :value="7"></i-option>
              <i-option label="中专/技校" :value="8"></i-option>
              <i-option label="初中及以下" :value="9"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="毕业院校" prop="school">
            <i-input type="text" placeholder="请输入毕业院校" v-model="customerMaterialsForm.school">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="婚姻状况" prop="marital">
            <i-radio-group v-model="customerMaterialsForm.marital">
              <i-radio :label="10" :value="10">未婚</i-radio>
              <i-radio :label="11" :value="11">已婚</i-radio>
              <i-radio :label="12" :value="12">离婚</i-radio>
              <i-radio :label="13" :value="13">丧偶</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
      </i-row>
      <!--</i-form>-->

      <!--单位信息 End-->
      <!--收入信息 Start-->

      <!--<i-col span="24" style="line-height:30px;background:#ddd">身份证信息</i-col>-->
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">身份证信息</span>
      </div>
      <!--<i-form :label-width="110">-->
      <i-row>
        <i-col span="12">
          <i-form-item label="身份证号码" prop="idCard">
            <i-input type="text" placeholder="请输入身份证号码" v-model="customerMaterialsForm.idCard">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="发证机关" prop="issuer">
            <i-input type="text" placeholder="请输入发证机关" v-model="customerMaterialsForm.issuer">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="身份证地址" prop="idCardAddressDetail">
            <i-row>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="省" v-model="customerMaterialsForm.province">
                  <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="市" v-model="customerMaterialsForm.city">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.province ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.province }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="区" v-model="customerMaterialsForm.idCardAddress">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.city ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.city }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="请具体到门牌号" v-model="customerMaterialsForm.idCardAddressDetail">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="身份证有效期">
            <i-row>
              <i-checkbox label="长期" :value="14" :checked.sync="single" @on-change="ValidityPeriodChange">长期</i-checkbox>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="有效期截止日期" v-model="customerMaterialsForm.idCardValidityPeriodType" v-if="ValidityPeriodValue">
              </i-input>
              <i-input type="text" placeholder="有效期截止日期" v-model="customerMaterialsForm.idCardValidityPeriodSection" v-else>
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
      </i-row>
      <!--</i-form>-->

      <!--<i-col span="24" style="line-height:30px;background:#ddd">居住信息</i-col>-->
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">居住信息</span>
      </div>
      <!--<i-form :label-width="110">-->
      <i-row>
        <i-col span="12">
          <i-form-item label="现居住地址" prop="localHomeAddrDetail">
            <i-row>
              <i-checkbox label="身份证地址" :value="14" :checked.sync="checked" @on-change="idCardChange">身份证地址</i-checkbox>
            </i-row>
            <i-row>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="省" v-model="customerMaterialsForm.province1">
                  <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="市" v-model="customerMaterialsForm.city1">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.province1 ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.province1 }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="区" v-model="customerMaterialsForm.localHomeAddr">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.city1 ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.city1 }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="请具体到门牌号" v-model="customerMaterialsForm.localHomeAddrDetail">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="居住地址家庭座机" prop="localHomePhone">
            <i-input type="text" placeholder="请输入居住地址家庭座机" v-model="customerMaterialsForm.localHomePhone">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="本市生活时长" prop="cityLiveTime">
            <i-input type="text" placeholder="请输入本市生活时长" v-model="customerMaterialsForm.cityLiveTime">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="现居住地生活时长" prop="localLiveTime">
            <i-input type="text" placeholder="请输入现居住地生活时长" v-model="customerMaterialsForm.localLiveTime">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="现居住地房产归属" prop="localLiveHouseOwner">
            <i-row>
              <i-select v-model="customerMaterialsForm.localLiveHouseOwner" clearable>
                <i-option label="本人名下" :value="16"></i-option>
                <i-option label="配偶名下" :value="17"></i-option>
                <i-option label="子女名下" :value="18"></i-option>
                <i-option label="父母名下" :value="19"></i-option>
                <i-option label="亲属名下" :value="20"></i-option>
                <i-option label="公司宿舍" :value="21"></i-option>
                <i-option label="租房" :value="22"></i-option>
                <i-option label="商品房" :value="23"></i-option>
                <i-option label="拆迁安置房" :value="24"></i-option>
                <i-option label="宅基地" :value="25"></i-option>
                <i-option label="其他" :value="26"></i-option>
              </i-select>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="每月租金" v-model="customerMaterialsForm.localLiveHouseMoney">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="本市自有房产状况及归属" prop="cityOwnhouseCondition">
            <i-row>
              <i-select v-model="customerMaterialsForm.cityOwnhouseCondition" clearable>
                <i-option label="商品房" :value="23"></i-option>
                <i-option label="拆迁安置房" :value="24"></i-option>
                <i-option label="宅基地" :value="25"></i-option>
                <i-option label="其他" :value="26"></i-option>
              </i-select>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="其他" v-model="customerMaterialsForm.cityOwnhouseOther">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="电费账号" prop="electricityAccount">
            <i-input type="text" placeholder="可不填" v-model="customerMaterialsForm.electricityAccount">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="电费密码" prop="electricityPassword">
            <i-input type="text" placeholder="可不填" v-model="customerMaterialsForm.electricityPassword">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="本市房产地址" prop="cityOwnhouseAddressDetail">
            <i-row>
              <!--<i-checkbox-group v-model="customerMaterialsForm.cityAddressValue" @on-change="cityAddressChange">-->
              <!--<i-checkbox :label="29" :value="29">身份证地址</i-checkbox>
              <i-checkbox :label="30" :value="30">现居住地址</i-checkbox>-->
              <i-checkbox label="身份证地址" :value="29" :checked.sync="checked" @on-change="cityidcardChange">身份证地址</i-checkbox>
              <i-checkbox label="现居住地址" :value="30" @on-change="liveChange">现居住地址</i-checkbox>
              <!--</i-checkbox-group>-->
            </i-row>
            <i-row>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="省" v-model="customerMaterialsForm.province2">
                  <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="市" v-model="customerMaterialsForm.city2">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.province2 ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.province2 }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
              <i-col :span="3">
                <i-select style="width: 80px;" placeholder="区" v-model="customerMaterialsForm.cityOwnhouseAddress">
                  <i-option v-for="{value,label} in this.customerMaterialsForm.city2 ? this.$city.getCityData({ level: 1, id: this.customerMaterialsForm.city2 }) : []"
                    :key="value" :label="label" :value="value"></i-option>
                </i-select>
              </i-col>
            </i-row>
            <i-row>
              <i-input type="text" placeholder="请具体到门牌号" v-model="customerMaterialsForm.cityOwnhouseAddressDetail">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
      </i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">勘察请求</span>
      </div>
      <span>是否接受现场勘察</span>
      <i-radio-group v-model="customerMaterialsForm.houseProspecting">
        <i-radio :label="29" :value="29">是</i-radio>
        <i-radio :label="30" :value="30">否</i-radio>
      </i-radio-group>
    </i-form>

    <!--<i-col span="24" style="line-height:30px;background:#ddd">勘察请求</i-col>-->
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  @Component({})
  export default class CustomerMaterials extends Vue {
    private single: Boolean = false;
    private checked: Boolean = false;
    private cityValue: Boolean = false;
    private liveValue: Boolean = false;
    private ValidityPeriodValue: Boolean = false;
    private customerMaterialsForm: any = {
      name: '', // 姓名
      sex: '', // 性别
      birthTime: '', // 出生日期
      wechat: '', // 微信号码
      mobileMain: '', // 手机号码（主）
      mobileMinor: '', // 手机号码（次）
      education: '', // 教育程度
      school: '', // 毕业院校
      marital: '', // 婚姻状况
      idCard: '', // 身份证号
      issuer: '', // 发证机关
      idCardAddressDetail: '', // 身份证地址
      localHomeAddrDetail: '', // 现居住地址
      localHomePhone: '', // 居住地家庭座机
      cityLiveTime: '', // 本市生活时长
      cityOwnhouseAddressDetail: '', // 现居住地生活时长
      houseProspecting: '', // 是否接受现场勘查
      idCardValidityPeriodType: '', // 身份证有效期（长期）
      idCardValidityPeriodSection: '', // 身份证有效期（非长期）
      province: '', // 省
      city: '', // 市
      province1: '', // 省
      city1: '', // 市
      province2: '', // 省
      city2: '', // 市
      localLiveHouseOwner: '', // 现居住地房产归属
      cityOwnhouseCondition: '', // 本市子属房产状况
      cityOwnhouseOther: '', // 本市子属房产状况(其他)
      electricityAccount: '', // 电费账号
      electricityPassword: '', // 电费密码
      localLiveHouseMoney: '', // 每月租金
      idCardAddress: '',
      localHomeAddr: '',
      cityOwnhouseAddress: '',
    }
    private rules: any = {
      name: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur',
      }],
      sex: [{
        required: true,
        message: '请选择性别',
        trigger: 'change',
        type: 'number'
      }],
      //   birthTime: [{
      //     required: true,
      //     message: '请选择出生日期',
      //     trigger: 'change',
      //     type: 'date'
      //   }],
      mobileMain: [{
        required: true,
        message: '请输入手机号码',
        trigger: 'blur',
      }],
      education: [{
        required: true,
        message: '请选择教育程度',
        trigger: 'change',
        type: 'number'
      }],
      school: [{
        required: true,
        message: '请输入毕业院校',
        trigger: 'blur',
      }],
      marital: [{
        required: true,
        message: '请选择婚姻状况',
        trigger: 'change',
        type: 'number'
      }]
    }
    @Prop()
    disabled: Boolean;
    Reverse(data) {
      this.customerMaterialsForm = data.personal
    }
    getinfo(customerModel) {
      this.customerMaterialsForm = customerModel
    }
    idCardChange(value) {
      if (value) {
        this.customerMaterialsForm.province1 = this.customerMaterialsForm.province
        this.customerMaterialsForm.city1 = this.customerMaterialsForm.city
        this.customerMaterialsForm.localHomeAddr = this.customerMaterialsForm.idCardAddress
        this.customerMaterialsForm.localHomeAddrDetail = this.customerMaterialsForm.idCardAddressDetail
      } else {
        this.customerMaterialsForm.province1 = ''
        this.customerMaterialsForm.city1 = ''
        this.customerMaterialsForm.localHomeAddr = ''
        this.customerMaterialsForm.localHomeAddrDetail = ''
      }
    }
    reset() {
      this.customerMaterialsForm.province2 = ''
      this.customerMaterialsForm.city2 = ''
      this.customerMaterialsForm.cityOwnhouseAddress = ''
      this.customerMaterialsForm.cityOwnhouseAddressDetail = ''
    }
    cityidcardChange(value) {
      this.cityValue = value
      this.liveValue = false
      if (value) {
        this.customerMaterialsForm.province2 = this.customerMaterialsForm.province
        this.customerMaterialsForm.city2 = this.customerMaterialsForm.city
        this.customerMaterialsForm.cityOwnhouseAddress = this.customerMaterialsForm.idCardAddress
        this.customerMaterialsForm.cityOwnhouseAddressDetail = this.customerMaterialsForm.idCardAddressDetail
      } else {
        this.reset()
      }
    }
    liveChange(value) {
      this.liveValue = value
      this.cityValue = false
      if (value) {
        this.customerMaterialsForm.province2 = this.customerMaterialsForm.province1
        this.customerMaterialsForm.city2 = this.customerMaterialsForm.city1
        this.customerMaterialsForm.cityOwnhouseAddress = this.customerMaterialsForm.localHomeAddr
        this.customerMaterialsForm.cityOwnhouseAddressDetail = this.customerMaterialsForm.localHomeAddrDetail
      } else {
        this.reset()
      }
    }
    ValidityPeriodChange(value) {
      this.ValidityPeriodValue = value
    }
    mounted() {}
  }

</script>

<style lang="less" scope>
  .customer-materials {
    .ivu-select-selection {
      width: 100%!important;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>

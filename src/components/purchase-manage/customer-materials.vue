<!--客户资料-->
<template>
  <section class="component customer-materials">
    <i-form ref="customer-form" :rules="customerRules" :model="customerModel" :label-width="110" label-position="left" class="item-xinxi-form">
      <!-- 基础信息-start -->
      <i-card title="基础信息">
        <i-row>
          <i-col span="12">
            <i-form-item label="姓名" prop="name">
              <i-input type="text" placeholder="请输入姓名" v-model="customerModel.name">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="性别" prop="sex">
              <i-select v-model="customerModel.sex">
                <i-option label="男" :value="1"></i-option>
                <i-option label="女" :value="2"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="出生日期" prop="birthTime">
              <i-date-picker type="date" placeholder="选择出生日期" v-model="customerModel.birthTime"></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="微信号码" prop="wechat">
              <i-input type="text" placeholder="请输入微信号码" v-model="customerModel.wechat">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="手机号码（主）" prop="mobileMain">
              <i-input type="text" placeholder="请输入手机号码（主）" v-model="customerModel.mobileMain">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="手机号码（次）" prop="mobileMinor">
              <i-input type="text" placeholder="可不填" v-model="customerModel.mobileMinor">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="教育程度" prop="education">
              <i-select v-model="customerModel.education">
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
          <i-col span="12">
            <i-form-item label="毕业院校" prop="school">
              <i-input type="text" placeholder="请输入毕业院校" v-model="customerModel.school">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="婚姻状况" prop="marital">
              <i-radio-group v-model="customerModel.marital">
                <i-radio :label="10" :value="10">未婚</i-radio>
                <i-radio :label="11" :value="11">已婚</i-radio>
                <i-radio :label="12" :value="12">离婚</i-radio>
                <i-radio :label="13" :value="13">丧偶</i-radio>
              </i-radio-group>
            </i-form-item>
          </i-col>
        </i-row>
      </i-card>
      <!-- 基础信息-end -->

      <!-- 身份证信息-start -->
      <i-card title="身份证信息">
        <i-row>
          <i-col span="12">
            <i-form-item label="身份证号码" prop="idCard">
              <i-input type="text" placeholder="请输入身份证号码" v-model="customerModel.idCard">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="发证机关" prop="issuer">
              <i-input type="text" placeholder="请输入发证机关" v-model="customerModel.issuer">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="身份证地址" prop="idCardAddressDetail">
              <i-row type="flex" :gutter="16">
                <i-col>
                  <i-select class="city-select" placeholder="省" v-model="customerModel.province">
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="市" v-model="customerModel.city">
                    <i-option v-for="{value,label} in this.customerModel.province ? this.$city.getCityData({ level: 1, id: this.customerModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="区" v-model="customerModel.idCardAddress">
                    <i-option v-for="{value,label} in this.customerModel.city ? this.$city.getCityData({ level: 1, id: this.customerModel.city }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-input type="text" placeholder="请具体到门牌号" v-model="customerModel.idCardAddressDetail">
                  </i-input>
                </i-col>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="身份证有效期" prop="idCardValidityPeriodSection">
              <i-row type="flex">
                <i-col>
                  <i-checkbox label="长期" v-model="idCardvalidity" :value="14" @on-change="ValidityPeriodChange">长期</i-checkbox>
                </i-col>
                <i-col>
                  <i-date-picker v-bind:style="{'display': idCardvalidity ? 'none' : 'inline'}" type="date" placeholder="有效期截止日期" v-model="customerModel.idCardValidityPeriodSection" :readonly="customerModel.idCardValidityPeriodType===14">
                  </i-date-picker>
                </i-col>
              </i-row>
            </i-form-item>
          </i-col>
        </i-row>
      </i-card>
      <!-- 身份证信息-end -->

      <!-- 居住信息-start -->
      <i-card title="居住信息">
        <i-row>
          <i-col>
            <i-form-item label="现居住地址" prop="localHomeAddrDetail">
              <i-row type="flex" :gutter="16">
                <i-col>
                  <i-checkbox v-model="idCardads" label="身份证地址" :value="14" @on-change="idCardChange">身份证地址</i-checkbox>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="省" v-model="customerModel.province1">
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="市" v-model="customerModel.city1">
                    <i-option v-for="{value,label} in this.customerModel.province1 ? this.$city.getCityData({ level: 1, id: this.customerModel.province1 }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="区" v-model="customerModel.localHomeAddr">
                    <i-option v-for="{value,label} in this.customerModel.city1 ? this.$city.getCityData({ level: 1, id: this.customerModel.city1 }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-input type="text" placeholder="请具体到门牌号" v-model="customerModel.localHomeAddrDetail">
                  </i-input>
                </i-col>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="居住地址家庭座机" prop="localHomePhone">
              <i-input type="text" placeholder="请输入居住地址家庭座机" v-model="customerModel.localHomePhone">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="本市生活时长" prop="cityLiveTime">
              <i-input type="text" placeholder="请输入本市生活时长" v-model="customerModel.cityLiveTime">
              </i-input>
              <span class="item-nian-span">年</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="现居住地生活时长" prop="localLiveTime">
              <i-input type="text" placeholder="请输入现居住地生活时长" v-model="customerModel.localLiveTime">
              </i-input>
              <span class="item-nian-span">年</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="现居住地房产归属" prop="localLiveHouseOwner">
              <i-select v-model="customerModel.localLiveHouseOwner" clearable>
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
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item prop="localLiveHouseMoney" label="每月租金">
              <i-input-number v-model="customerModel.localLiveHouseMoney" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
              <span class="item-nian-span">元</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row>
              <i-col span="12">
                <i-form-item label="本市自有房产状况及归属" prop="cityOwnhouseCondition">
                  <i-select v-model="customerModel.cityOwnhouseCondition" clearable>
                    <i-option label="商品房" :value="23"></i-option>
                    <i-option label="拆迁安置房" :value="24"></i-option>
                    <i-option label="宅基地" :value="25"></i-option>
                    <i-option label="其他" :value="26"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="cityOwnhouseOther" v-if="customerModel.cityOwnhouseCondition===26">
                  <i-input type="text" placeholder="其他" v-model="customerModel.cityOwnhouseOther">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-form-item label="电费账号" prop="electricityAccount">
              <i-input type="text" placeholder="可不填" v-model="customerModel.electricityAccount">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="电费密码" prop="electricityPassword">
              <i-input type="text" placeholder="可不填" v-model="customerModel.electricityPassword">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="24">
            <i-form-item label="本市房产地址" prop="cityOwnhouseAddressDetail">
              <i-row type="flex" :gutter="16">
                <i-col>
                  <i-radio-group v-model="idcardOwn" @on-change="cityidcardChange">
                    <i-radio :label="29" :value="29">身份证地址</i-radio>
                    <i-radio :label="30" :value="30">现居住地址</i-radio>
                  </i-radio-group>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="省" v-model="customerModel.province2">
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="市" v-model="customerModel.city2">
                    <i-option v-for="{value,label} in this.customerModel.province2 ? this.$city.getCityData({ level: 1, id: this.customerModel.province2 }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="区" v-model="customerModel.cityOwnhouseAddress">
                    <i-option v-for="{value,label} in this.customerModel.city2 ? this.$city.getCityData({ level: 1, id: this.customerModel.city2 }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-input type="text" placeholder="请具体到门牌号" v-model="customerModel.cityOwnhouseAddressDetail">
                  </i-input>
                </i-col>
              </i-row>
            </i-form-item>
          </i-col>
        </i-row>
      </i-card>
      <!--居住信息-end-->

      <!--勘察请求-start-->
      <i-card title="勘察请求">
        <i-row>
          <i-col>
            <i-form-item label="是否接受现场勘察">
              <i-radio-group v-model="customerModel.houseProspecting">
                <i-radio :label="29" :value="29">是</i-radio>
                <i-radio :label="30" :value="30">否</i-radio>
              </i-radio-group>
            </i-form-item>
          </i-col>
        </i-row>
      </i-card>
      <!--勘察请求-end-->
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CityService } from "~/utils/city.service";
import { FilterService } from "~/utils/filter.service";
import { Prop } from "vue-property-decorator";
import { FormatInputPathObject } from "path";
import { Form } from "iview";

@Component({})
export default class CustomerMaterials extends Vue {
  private ValidityPeriodValue: Boolean = false;
  private idCardads: Boolean = false;
  private idcardOwn: any = "";
  private liveads: Boolean = false;
  private idCardvalidity: Boolean = false;

  /**
   * 客户信息数据
   */
  public customerModel: any = {
    // 基础信息-start
    name: "", // 姓名
    sex: "", // 性别
    birthTime: "", // 出生日期
    wechat: "", // 微信号码
    mobileMain: "", // 手机号码（主）
    mobileMinor: "", // 手机号码（次）
    education: "", // 教育程度
    school: "", // 毕业院校
    marital: "", // 婚姻状况
    // 基础信息-end

    // 身份证信息-start
    idCard: "", // 身份证号
    issuer: "", // 发证机关
    idCardAddressDetail: "", // 身份证地址
    localHomeAddrDetail: "", // 现居住地址
    localHomePhone: "", // 居住地家庭座机
    cityLiveTime: "", // 本市生活时长
    cityOwnhouseAddressDetail: "", // 现居住地生活时长
    houseProspecting: "", // 是否接受现场勘查
    idCardValidityPeriodType: 15, // 身份证有效期（长期）
    idCardValidityPeriodSection: "", // 身份证有效期（非长期）
    province: "", // 省
    city: "", // 市
    province1: "", // 省
    city1: "", // 市
    province2: "", // 省
    city2: "", // 市
    localLiveHouseOwner: "", // 现居住地房产归属
    cityOwnhouseCondition: "", // 本市子属房产状况
    cityOwnhouseOther: "", // 本市子属房产状况(其他)
    electricityAccount: "", // 电费账号
    electricityPassword: "", // 电费密码
    localLiveHouseMoney: 0, // 每月租金
    idCardAddress: "", // 身份证地址（区）
    localHomeAddr: "", // 先居住地址（区）
    cityOwnhouseAddress: "" // 本市房产地址（区）
  };

  private customerRules: any = {
    name: [
      {
        required: true,
        message: "请输入姓名",
        trigger: "blur"
      }
    ],
    sex: [
      {
        required: true,
        message: "请选择性别",
        trigger: "change",
        type: "number"
      }
    ],
    cityLiveTime: [
      {
        pattern: /^[0-9]{1,2}$/g,
        message: "请输入1~2位整数",
        trigger: "blur"
      }
    ],
    localLiveTime: [
      {
        pattern: /^[0-9]{1,2}$/g,
        message: "请输入1~2位整数",
        trigger: "blur"
      }
    ],
    birthTime: [
      {
        required: true,
        message: "请选择出生日期",
        trigger: "change",
        type: "date"
      }
    ],
    mobileMain: [
      {
        required: true,
        message: "请输入客户电话",
        trigger: "blur"
      },
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ],
    mobileMinor: [
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ],
    localHomePhone: [
      {
        pattern: /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/,
        message: "请输入正确的座机号",
        trigger: "blur"
      }
    ],
    education: [
      {
        required: true,
        message: "请选择教育程度",
        trigger: "change",
        type: "number"
      }
    ],
    idCard: [
      {
        required: true,
        message: "请输入证件号码",
        trigger: "blur"
      },
      {
        validator: this.$validator.idCard,
        trigger: "blur"
      }
    ],
    idCardAddressDetail: [
      {
        required: true,
        message: "请输入身份证地址",
        trigger: "blur"
      }
    ],
    localLiveHouseMoney: [
      {
        pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    localHomeAddrDetail: [
      {
        required: true,
        message: "请输入现居住地址",
        trigger: "blur"
      }
    ],
    marital: [
      {
        required: true,
        message: "请选择婚姻状况",
        trigger: "change",
        type: "number"
      }
    ],
    cityOwnhouseAddressDetail: [
      {
        required: true,
        message: "请输入本市房产地址",
        trigger: "blur"
      }
    ]
  };

  revert(data) {
    this.$common.revert(this.customerModel, data.personal);
  }

  Reverse(data) {
    //   身份证地址回显
    data.personal.birthTime = FilterService.dateFormat(
      data.personal.birthTime,
      "yyyy-MM-dd"
    );
    if (data.personal.localHomeAddr === data.personal.idCardAddress) {
      this.idCardads = true;
    }
    if (data.personal.cityOwnhouseAddress === data.personal.idCardAddress) {
      this.idcardOwn = 29;
    }
    if (data.personal.cityOwnhouseAddress === data.personal.localHomeAddr) {
      this.idcardOwn = 30;
    }
    if (!this.customerModel.idCardValidityPeriodSection) {
      this.idCardvalidity = true;
    }
    data.personal.idCardAddress = Number(data.personal.idCardAddress);
    data.personal.city = CityService.getCityParent(
      Number(data.personal.idCardAddress)
    )[1];
    data.personal.province = CityService.getCityParent(
      Number(data.personal.idCardAddress)
    )[0];
    // 现居住地址
    data.personal.localHomeAddr = Number(data.personal.localHomeAddr);
    data.personal.city1 = CityService.getCityParent(
      Number(data.personal.localHomeAddr)
    )[1];
    data.personal.province1 = CityService.getCityParent(
      Number(data.personal.localHomeAddr)
    )[0];
    // 本市房产地址
    data.personal.cityOwnhouseAddress = Number(
      data.personal.cityOwnhouseAddress
    );
    data.personal.city2 = CityService.getCityParent(
      Number(data.personal.cityOwnhouseAddress)
    )[1];
    data.personal.province2 = CityService.getCityParent(
      Number(data.personal.cityOwnhouseAddress)
    )[0];
    this.customerModel = data.personal;
    this.customerModel.id = data.personalId || null;
    delete data.personalId;
  }

  idCardChange(value) {
    this.customerModel.province1 = value ? this.customerModel.province : "";
    this.customerModel.city1 = value ? this.customerModel.city : "";
    this.customerModel.localHomeAddr = value
      ? this.customerModel.idCardAddress
      : "";
    this.customerModel.localHomeAddrDetail = value
      ? this.customerModel.idCardAddressDetail
      : "";

    let customerForm = this.$refs["customer-form"] as Form;
    customerForm.validateField("localHomeAddrDetail");
  }

  reset() {
    this.customerModel.province2 = "";
    this.customerModel.city2 = "";
    this.customerModel.cityOwnhouseAddress = "";
    this.customerModel.cityOwnhouseAddressDetail = "";
  }

  cityidcardChange(value) {
    this.idcardOwn = value;
    if (value === 29) {
      this.customerModel.province2 = this.customerModel.province;
      this.customerModel.city2 = this.customerModel.city;
      this.customerModel.cityOwnhouseAddress = this.customerModel.idCardAddress;
      this.customerModel.cityOwnhouseAddressDetail = this.customerModel.idCardAddressDetail;
      this.customerModel = JSON.parse(JSON.stringify(this.customerModel));
    } else if (value === 30) {
      this.customerModel.province2 = this.customerModel.province1;
      this.customerModel.city2 = this.customerModel.city1;
      this.customerModel.cityOwnhouseAddress = this.customerModel.localHomeAddr;
      this.customerModel.cityOwnhouseAddressDetail = this.customerModel.localHomeAddrDetail;
      this.customerModel = JSON.parse(JSON.stringify(this.customerModel));
    } else {
      this.reset();
    }
  }

  ValidityPeriodChange(value) {
    if (value) {
      this.customerModel.idCardValidityPeriodType = 14;
      this.customerModel = JSON.parse(JSON.stringify(this.customerModel));
    } else {
      this.customerModel.idCardValidityPeriodType = 15;
      this.customerModel = JSON.parse(JSON.stringify(this.customerModel));
    }
    this.ValidityPeriodValue = value;
  }

  /**
   * 验证数据
   */
  async validate() {
    let customerForm = this.$refs["customer-form"] as Form;

    // 基础验证
    let result = await customerForm
      .validate()
      .then(valid => {
        return valid;
      })
      .catch(() => {});

    return result;
  }

  mounted() {}
}
</script>

<style lang="less" scoped>
.component.customer-materials {
  .ivu-select-selection {
    width: 100% !important;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
}
</style>
<style lang="less">
.component.customer-materials {
  .ivu-select {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }

    &.city-select {
      width: 100px !important;
      .ivu-select-selection {
        width: 100px !important;
      }
    }
  }
}
</style>

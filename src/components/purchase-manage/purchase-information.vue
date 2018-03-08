<template>
  <div class="component purchase-information row">
    <!--选购信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="xuangouxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">选购信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top:10px;width:760px">
        <data-grid-item label="申请省份：" :span="3">{{orderInfo.province?$city.getCityName(orderInfo.province):''}}</data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{orderInfo.city?$city.getCityName(orderInfo.city):''}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{orderInfo.company?orderInfo.company.companyChinaname:''}}</data-grid-item>
        <data-grid-item label="融资租赁用途" :span="3">{{orderInfo.financingUse}} </data-grid-item>
        <data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fee">
            <i-checkbox :label="369" :value="369" disabled>保险费</i-checkbox>
            <i-checkbox :label="370" :value="370" disabled>购置费</i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="意向融资金额" :span="3">{{orderInfo.intentionFinancingAmount}}</data-grid-item>
        <data-grid-item label="租金支付" :span="3">{{orderInfo.rentPayable}}</data-grid-item>
        <data-grid-item label="意向期限" :span="3">{{orderInfo.intentionPeriods}}</data-grid-item>
        <data-grid-item label="意向首付比例" :span="3">{{orderInfo.intentionPaymentRatio}}</data-grid-item>
      </data-grid>
    </i-row>
    <!-- 车辆信息 -->
    <i-row style="margin-top:20px;display:block" v-if="carOrderInfo.length">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="cheliangxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">车辆信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top:10px;width:760px" v-for="item in carOrderInfo" :key="item.id">
        <data-grid-item label="车辆型号" :span="4">{{item.modelName?item.modelName:''}}</data-grid-item>
        <data-grid-item label="上牌地区" :span="4">{{item.registrationArea?item.registrationArea:''}}</data-grid-item>
        <data-grid-item label="车身颜色" :span="4">{{item.vehicleColour?item.vehicleColour:''}}</data-grid-item>
        <data-grid-item label="购车排量" :span="4">{{item.vehicleEmissions?item.vehicleEmissions:''}}</data-grid-item>
        <data-grid-item label="购车配置" :span="4">{{item.vehicleConfiguration?item.vehicleConfiguration:''}}</data-grid-item>
        <data-grid-item label="车辆牌照" :span="4">{{item.carLicence?item.carLicence:''}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="chanpinxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">产品信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td bgColor="#F5F5F5">产品系列</td>
          <td>{{orderInfo.productSeries?orderInfo.productSeries.name:''}}</td>
          <td bgColor="#F5F5F5">产品名称</td>
          <td>{{orderInfo.product?orderInfo.product.name:''}}</td>
          <td bgColor="#F5F5F5">产品期数</td>
          <td>{{orderInfo.periods}}</td>
          <td bgColor="#F5F5F5">产品利率</td>
          <td>{{orderInfo.productRate}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">还款方式</td>
          <td>{{$dict.getDictName(orderInfo.payWay)}}</td>
          <td bgColor="#F5F5F5">融资总额</td>
          <td>{{orderInfo.financingAmount}}</td>
          <td bgColor="#F5F5F5">月供金额</td>
          <td>{{orderInfo.monthlySupply}}</td>
          <td bgColor="#F5F5F5">首付金额</td>
          <td>{{orderInfo.initialPayment}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">保证金金额</td>
          <td>{{orderInfo.depositCash}}</td>
          <td bgColor="#F5F5F5">尾付金额</td>
          <td>{{orderInfo.finalCash}}</td>
          <td bgColor="#F5F5F5">管理费</td>
          <td>{{orderInfo.manageCost}}</td>
          <td bgColor="#F5F5F5">保险费</td>
          <td>{{orderInfo.insuranceExpenses}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">购置税</td>
          <td>{{orderInfo.purchaseTax}}</td>
          <td bgColor="#F5F5F5">上牌费</td>
          <td>{{orderInfo.installLicenseFee}}</td>
          <td bgColor="#F5F5F5">GPS</td>
          <td>{{orderInfo.gpsFee}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">备注</td>
          <td colspan="7">{{orderInfo.remark}}</td>
        </tr>
      </table>
    </i-row>
    <!--个人资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="gerenziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">个人资料</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td bgColor="#F5F5F5">姓名</td>
          <td>{{orderInfo.personal?orderInfo.personal.name:''}}</td>
          <td bgColor="#F5F5F5">性别</td>
          <td>{{orderInfo.personal?$dict.getDictName(orderInfo.personal.sex):''}}</td>
          <td bgColor="#F5F5F5">出生日期</td>
          <td>{{personal.birthTime|dateFormat('yyyy-MM-dd')}}</td>
          <td bgColor="#F5F5F5">微信号</td>
          <td>{{orderInfo.personal?orderInfo.personal.wechat:''}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">手机号码(主)</td>
          <td>{{orderInfo.personal?orderInfo.personal.mobileMain:''}}</td>
          <td bgColor="#F5F5F5">手机号码(次)</td>
          <td>{{orderInfo.personal?orderInfo.personal.mobileMinor:''}}</td>
          <td bgColor="#F5F5F5">身份证号</td>
          <td>{{orderInfo.personal?orderInfo.personal.idCard:''}}</td>
          <td bgColor="#F5F5F5">婚属状况</td>
          <td colspan="5">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.marital):''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">身份证有效期</td>
          <td colspan="2">{{orderInfo.personal?orderInfo.personal.idCardValidityPeriodSection:''}}</td>
          <td bgColor="#F5F5F5">发证机关</td>
          <td colspan="4">{{orderInfo.personal?orderInfo.personal.issuer:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">身份证地址</td>
          <td colspan="6">{{orderInfo.personal?orderInfo.personal.idCardAddress:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">现居住地址</td>
          <td colspan="6">{{orderInfo.personal?orderInfo.personal.localHomeAddr:''}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5" colspan="2">居住地址家庭座机</td>
          <td>{{orderInfo.personal?orderInfo.personal.localHomePhone:''}}</td>
          <td bgColor="#F5F5F5">本市生活时长</td>
          <td>{{orderInfo.personal?orderInfo.personal.cityLiveTime:''}}</td>
          <td bgColor="#F5F5F5" colspan="2">现居住地生活时常</td>
          <td>{{orderInfo.personal?orderInfo.personal.localLiveTime:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">现居住地房产归属</td>
          <td colspan="6">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.localLiveHouseOwner):''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">本市自有房产状况归属</td>
          <td colspan="2">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.cityOwnhouseCondition):''}}</td>
          <td bgColor="#F5F5F5">电费账号</td>
          <td>{{orderInfo.personal?orderInfo.personal.electricityAccount:''}}</td>
          <td bgColor="#F5F5F5">电费密码</td>
          <td>{{orderInfo.personal?orderInfo.personal.electricityPassword:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">本市房产地址</td>
          <td colspan="6">{{orderInfo.personal?orderInfo.personal.cityOwnhouseAddressDetail:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">教育程度</td>
          <td>{{orderInfo.personal?$dict.getDictName(orderInfo.personal.education):''}}</td>
          <td bgColor="#F5F5F5">毕业院校</td>
          <td>{{orderInfo.personal?orderInfo.personal.school:''}}</td>
          <td bgColor="#F5F5F5">是否接受现场勘查</td>
          <td colspan="2">
            <i-radio-group v-model="personal.houseProspecting">
              <i-radio :label="0" :value="0" :key="0" disabled>是</i-radio>
              <i-radio :label="1" :value="1" :key="1" disabled>否</i-radio>
            </i-radio-group>
          </td>
        </tr>
      </table>
    </i-row>
    <!--职业信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="zhiyexinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">职业信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td bgColor="#F5F5F5">单位名称</td>
          <td>{{personalJobInfo.companyName}}</td>
          <td bgColor="#F5F5F5">部门</td>
          <td>{{personalJobInfo.department}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">单位性质</td>
          <td>{{$dict.getDictName(personalJobInfo.companyNature)}}</td>
          <td bgColor="#F5F5F5">职务</td>
          <td>{{personalJobInfo.duty}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">职级</td>
          <td>{{$dict.getDictName(personalJobInfo.rank)}}</td>
          <td bgColor="#F5F5F5">单位地址</td>
          <td>{{personalJobInfo.companyAddress}}</td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">单位固定电话</td>
          <td>{{personalJobInfo.companyPhone}}</td>
          <td bgColor="#F5F5F5">何时进入公司</td>
          <td>{{personalJobInfo.accessCompanyTime|dateFormat('yyyy-MM-dd')}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">基本月薪(元)</td>
          <td>{{personalJobInfo.basicSalary}}</td>
          <td bgColor="#F5F5F5">每月发薪日(元)</td>
          <td>{{personalJobInfo.payDay}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">发薪方式</td>
          <td>{{personalJobInfo.payWay}}</td>
          <td bgColor="#F5F5F5">年收入(万元)</td>
          <td>{{personalJobInfo.yearlySalaries}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">每月其他收入(元)</td>
          <td>{{personalJobInfo.monthOtherIncome}}</td>
          <td bgColor="#F5F5F5">其他收入来源</td>
          <td>{{personalJobInfo.otherIncomeSource}}</td>
        </tr>
      </table>
    </i-row>
    <!--联系人信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="lianxirenxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">联系人信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td bgColor="#F5F5F5">姓名</td>
          <td bgColor="#F5F5F5">与本人关系</td>
          <td bgColor="#F5F5F5">联系方式</td>
          <td bgColor="#F5F5F5">单位名称</td>
          <td bgColor="#F5F5F5">家庭住址</td>
        </tr>
        <tr v-for="item in immediateContacts" :key="item.id">
          <td>{{item.name?item.name:''}}</td>
          <td>{{item.relation?$dict.getDictName(item.relation):''}}</td>
          <td>{{item.relation?item.phone:''}}</td>
          <td>{{item.employer?item.employer:''}}</td>
          <td>{{item.address?item.address:''}}</td>
        </tr>
        <tr>
          <td colspan="5">其他联系人（提示：必填3个其他联系人）</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">姓名</td>
          <td bgColor="#F5F5F5">与本人关系</td>
          <td bgColor="#F5F5F5">联系方式</td>
          <td bgColor="#F5F5F5">单位名称</td>
          <td bgColor="#F5F5F5">家庭住址</td>
        </tr>
        <tr v-for="item in otherContactsInfo" :key="item.id">
          <td>{{item.name?item.name:''}}</td>
          <td>{{item.relation?$dict.getDictName(item.relation):''}}</td>
          <td>{{item.relation?item.phone:''}}</td>
          <td>{{item.employer?item.employer:''}}</td>
          <td>{{item.address?item.address:''}}</td>
        </tr>
      </table>
    </i-row>
    <!--客户来源-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="kehulaiyuan" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">客户来源</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td bgColor="#F5F5F5">通过宣传</td>
          <td colspan="4">
            <!-- <span>{{personalResourcePublicity.resourceContent?personalResourcePublicity.resourceContent:''}}</span> -->
            <i-checkbox-group v-model="byAdvertise">
              <i-checkbox v-for="{value,label} in $dict.getDictData('0018')" :key="value" :label="value" :value="value" disabled>{{label}}</i-checkbox>
            </i-checkbox-group>
          </td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">通过介绍</td>
          <td>
            <span>同行姓名：</span>
            <span>{{personalResourceIntroduce.peerName}}</span>
            <span>同行公司：</span>
            <span>{{personalResourceIntroduce.peerCompany}}</span>
            <span>同行联系方式：</span>
            <span>{{personalResourceIntroduce.peerPhone}}</span>
          </td>
        </tr>
      </table>
    </i-row>

    <!--素材资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <a name="sucaiziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">素材资料</a>
      </div>
      <i-row style="margin-top:10px">
        <i-col :span="12">
          <img v-for="item in materialInfo" :key="item.id" style="height:200px;width:200px;border:1px solid #C2C2C2;" :src="item.materialUrl">
        </i-col>
      </i-row>
    </i-row>
    <div style="position:absolute;top:122px;right:153px ">
      <div style="width: 65px;height: 260px;display: flex;align-items: center;flex-wrap: wrap; position: absolute;top: 10px;left: 30px; ">
        <a href="#xuangouxinxi " class="quick-link " :class="{color:getClassName.a1} ">选购信息</a>
        <a href="#cheliangxinxi " class="quick-link " :class="{color:getClassName.a2} ">车辆信息</a>
        <a href="#chanpinxinxi " class="quick-link " :class="{color:getClassName.a3} ">产品信息</a>
        <a href="#gerenziliao " class="quick-link " :class="{color:getClassName.a4} ">个人资料</a>
        <a href="#zhiyexinxi " class="quick-link " :class="{color:getClassName.a5} ">职业信息</a>
        <a href="#lianxirenxinxi " class="quick-link " :class="{color:getClassName.a6} ">联系人信息</a>
        <a href="#kehulaiyuan " class="quick-link " :class="{color:getClassName.a7} ">客户来源</a>
        <a href="#sucaiziliao " class="quick-link " :class="{color:getClassName.a8} ">素材资料</a>
      </div>
    </div>
    <!--<Slider v-model="sliderStep " :step="1 " show-stops :min="2 " :max="7 " style="transform: rotate(90deg);position: absolute;top: 242px;right: 15px;width:280px "></Slider>-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Dependencies } from "~/core/decorator";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class PurchaseInformation extends Vue {
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;
  private fee: Array<any> = [];
  private single: Boolean = false;
  private sliderStep: Number;
  private c = {
    a1: false,
    a2: false,
    a3: false,
    a4: false,
    a5: false,
    a6: false,
    a7: false,
    a8: false
  };
  private orderInfo: any = {};
  private personal: any = {}; // 个人资料
  private productSeries: any = {}; // 产品系列
  private contactsInfo: any = {}; // 联系人信息
  private immediateContacts: any = {}; // 直系联系人信息
  private otherContactsInfo: any = {}; // 其他联系人信息
  private carOrderInfo: any = []; // 选购车辆
  private personalJobInfo: any = {}; // 职业信息
  private personalResourcePublicity: any = {}; // 客户来源相关信息
  private personalResourceIntroduce: any = {}; // 客户来源介绍相关信息
  private materialInfo: Array<any> = []; // 素材资料相关信息
  private byAdvertise: Array<any> = []; // 客户来源通过宣传

  @Prop({
    default: 0
  })
  scrollTopHeight: Number;

  get getClassName() {
    this.c.a1 = this.scrollTopHeight >= 0 && this.scrollTopHeight < 170;
    this.c.a2 = this.scrollTopHeight >= 170 && this.scrollTopHeight < 350;
    this.c.a3 = this.scrollTopHeight >= 350 && this.scrollTopHeight < 707;
    this.c.a4 = this.scrollTopHeight >= 707 && this.scrollTopHeight < 1034;
    this.c.a5 = this.scrollTopHeight >= 1034 && this.scrollTopHeight < 1386;
    this.c.a6 = this.scrollTopHeight >= 1386 && this.scrollTopHeight < 1407;
    this.c.a7 = this.scrollTopHeight >= 1407 && this.scrollTopHeight < 1507;
    this.c.a8 = this.scrollTopHeight >= 1507;
    return this.c;
  }

  activated() {
    document
      .getElementsByClassName("purchase-information")[0]
      .addEventListener("scroll", this.handleScroll);
  }
  handleScroll() {}
  created() {
    this.sliderStep = 2;
  }
  getMaterialUrl(item) {
    let url = item.materialUrl;
    return {
      "background-image": `url("/static/images/common/invoice2.png")`
    };
  }
  /**
   * 获取弹窗内所有订单信息
   */
  getOrderDetail(row) {
    this.productOrderService
      .findOrderInfoByOrderNumber({
        orderNumber: row.orderNumber
      })
      .subscribe(data => {
        let allData = JSON.stringify(data);
        this.orderInfo = JSON.parse(allData);
        this.personal = this.orderInfo.personal; // 个人资料
        if (this.orderInfo.orderServices) {
          this.fee = this.orderInfo.orderServices.map(v => v.service);
        }
        this.personalJobInfo = this.personal.personalJob || {}; // 职业信息
        this.carOrderInfo = this.orderInfo.orderCars || {}; // 选购车辆
        if (this.orderInfo.personal.personalContacts) {
          this.contactsInfo = this.orderInfo.personal.personalContacts; // 联系人信息
        }
        if (this.personal.personalResourcePublicity) {
          this.personalResourcePublicity = this.personal.personalResourcePublicity; // 客户来源相关信息
        }
        if (this.personal.personalResourceIntroduce) {
          this.personalResourceIntroduce = this.personal.personalResourceIntroduce; // 客户来源介绍
        }
        // 客户来源通过宣传
        if (this.personal.personalResourcePublicity) {
          this.byAdvertise = this.personal.personalResourcePublicity.map(
            v => v.resourceType
          );
        }
        if (this.personal.personalDatas) {
          this.materialInfo = this.personal.personalDatas; // 素材相关信息
        }
        // console.log(this.orderInfo.personalJob, 1234)
        this.immediateContacts = this.contactsInfo.filter(
          v => v.relation === 56 || v.relation === 57 || v.relation === 58
        );

        // console.log(this.immediateContacts, 8987)
        this.otherContactsInfo = this.contactsInfo.filter(
          v =>
            v.relation === 59 ||
            v.relation === 60 ||
            v.relation === 61 ||
            v.relation === 62
        );
      });
  }
}
</script>

<style scoped>
.color {
  color: #333333 !important;
}

td {
  font-size: 14px;
  padding: 5px;
}

.quick-link {
  color: #999999;
}

.quick-link:active {
  color: #333333;
}

.material {
  height: 200px;
  width: 200px;
  border: 1px solid #c2c2c2;
  /*background-image: url('/static/images/common/invoice2.png');*/
  background-repeat: no-repeat;
  position: relative;
  left: 0px;
}
</style>

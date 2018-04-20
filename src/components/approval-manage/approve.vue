<template>
  <div class="component approve row">
    <!--选购信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <!-- <span>选购信息</span> -->
        <a name="xuangouxinxi" class="xinxi">选购信息</a>
      </div>
      <data-grid class="data-form-grid" :labelWidth="100" labelAlign="left" contentAlign="left">
        <data-grid-item label="申请省份：" :span="3">{{orderInfo.province?$city.getCityName(orderInfo.province):''}}
        </data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{orderInfo.city?$city.getCityName(orderInfo.city):''}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{orderInfo.company?orderInfo.company.companyChinaname:''}}
        </data-grid-item>
        <data-grid-item label="融资租赁用途" :span="3">{{orderInfo.financingUse}}</data-grid-item>
        <data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fee">
            <i-checkbox v-for="{value,label} in $dict.getDictData('0307')" :key="value" :label="value" :value="value"
                        disabled>{{label}}
            </i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="意向融资金额" :span="3">{{orderInfo.intentionFinancingAmount}}</data-grid-item>
        <data-grid-item label="租金支付" :span="3">{{$dict.getDictName(orderInfo.rentPayable)}}</data-grid-item>
        <data-grid-item label="意向期限" :span="3">{{
          orderInfo.intentionPeriods?$dict.getDictName(Number(orderInfo.intentionPeriods)):''}}
        </data-grid-item>
        <data-grid-item label="意向首付比例" :span="3">
          {{orderInfo.intentionPaymentRatio?orderInfo.intentionPaymentRatio+'%':''}}
        </data-grid-item>
      </data-grid>
    </i-row>
    <!--车辆信息-->
    <i-row class="cheliangxinxi" v-if="carOrderInfo.length">
      <div>
        <div class="data-form-item"></div>
        <a name="cheliangxinxi" class="xinxi">车辆信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left"
                 class="data-form-grid" v-for="item in carOrderInfo" :key="item.id">
        <data-grid-item label="车辆型号" :span="4">{{item.modelName?item.modelName:''}}</data-grid-item>
        <data-grid-item label="上牌地区" :span="4">{{item.registrationArea?item.registrationArea:''}}</data-grid-item>
        <data-grid-item label="车身颜色" :span="4">{{item.vehicleColour?item.vehicleColour:''}}</data-grid-item>
        <data-grid-item label="购车排量" :span="4">{{item.vehicleEmissions?item.vehicleEmissions:''}}</data-grid-item>
        <data-grid-item label="购车配置" :span="4">{{item.vehicleConfiguration?item.vehicleConfiguration:''}}
        </data-grid-item>
        <data-grid-item label="车辆牌照" :span="4">{{item.carLicence?item.carLicence:''}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="chanpinxinxi" class="xinxi">产品信息</a>
      </div>
      <table border="1" width="760" class="data-form-table">
        <tr>
          <td bgColor="#F5F5F5">产品系列</td>
          <td>{{orderInfo.productSeries?orderInfo.productSeries.name:''}}</td>
          <td bgColor="#F5F5F5">产品名称</td>
          <td>{{orderInfo.product?orderInfo.product.name:''}}</td>
          <td bgColor="#F5F5F5">产品期数</td>
          <td>{{!!orderInfo.periods ? $dict.getDictName(orderInfo.periods):0}}</td>
          <td bgColor="#F5F5F5">产品利率</td>
          <td>{{!!orderInfo.productRate? orderInfo.productRate+'%':0}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">还款方式</td>
          <td>{{$dict.getDictName(orderInfo.payWay)}}</td>
          <td bgColor="#F5F5F5">融资总额</td>
          <td>{{!!orderInfo.financingAmount?orderInfo.financingAmount:0}}</td>
          <td bgColor="#F5F5F5">月供金额</td>
          <td>{{ !!orderInfo.monthlySupply ?orderInfo.monthlySupply:0}}</td>
          <td bgColor="#F5F5F5">首付金额</td>
          <td>{{!!orderInfo.initialPayment?orderInfo.initialPayment:0}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">保证金金额</td>
          <td>{{!!orderInfo.depositCash?orderInfo.depositCash:0}}</td>
          <td bgColor="#F5F5F5">尾付金额</td>
          <td>{{!!orderInfo.finalCash ? orderInfo.finalCash:0}}</td>
          <td bgColor="#F5F5F5">管理费</td>
          <td>{{!!orderInfo.manageCost?orderInfo.manageCost:0}}</td>
          <td bgColor="#F5F5F5">保险费</td>
          <td>{{!!orderInfo.insuranceExpenses ?orderInfo.insuranceExpenses:0}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">购置税</td>
          <td>{{!!orderInfo.purchaseTax ?orderInfo.purchaseTax:0}}</td>
          <td bgColor="#F5F5F5">上牌费</td>
          <td>{{!!orderInfo.installLicenseFee?orderInfo.installLicenseFee:0}}</td>
          <td bgColor="#F5F5F5">GPS费</td>
          <td>{{!!orderInfo.gpsFee?orderInfo.gpsFee:0}}</td>
          <td bgColor="#F5F5F5">其他费用</td>
          <td>{{!!orderInfo.otherFee?orderInfo.otherFee:0}}</td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">车辆参考总价</td>
          <td>{{!!orderInfo.vehicleAmount?orderInfo.vehicleAmount:0}}</td>
          <td bgColor="#F5F5F5">备注</td>
          <td colspan="7">{{orderInfo.remark}}</td>
        </tr>
      </table>
    </i-row>
    <!--个人资料-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="gerenziliao" class="xinxi">个人资料</a>
      </div>
      <table border="1" width="760" class="data-form-table">
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
          <td colspan="2">{{orderInfo.personal?(orderInfo.personal.idCardValidityPeriodType!==null ?
            orderInfo.personal.idCardValidityPeriodType :orderInfo.personal.idCardValidityPeriodSection):''}}
          </td>

          <td bgColor="#F5F5F5">发证机关</td>
          <td colspan="4">{{orderInfo.personal?orderInfo.personal.issuer:''}}</td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">身份证地址</td>
          <td colspan="6" v-if="orderInfo.personal&&orderInfo.personal.idCardAddress">
            <!--{{orderInfo.personal?$city.getCityName($city.getCityParent(parseInt(orderInfo.personal.idCardAddress))[0]):''}}
            {{orderInfo.personal?$city.getCityName($city.getCityParent(parseInt(orderInfo.personal.idCardAddress))[1]):''}}
            {{orderInfo.personal?$city.getCityName(parseInt(orderInfo.personal.idCardAddress)):''}}-->
            {{orderInfo.personal?orderInfo.personal.idCardAddressDetail:''}}
          </td>
          <td v-else colspan="6"></td>
        </tr>
        <tr>
          <td colspan="2" bgColor="#F5F5F5">现居住地址</td>
          <td v-if="orderInfo.personal&&orderInfo.personal.localHomeAddr" colspan="6">
            <!--{{orderInfo.personal?$city.getCityName($city.getCityParent(parseInt(orderInfo.personal.localHomeAddr))[0]):''}}
            {{orderInfo.personal?$city.getCityName($city.getCityParent(parseInt(orderInfo.personal.localHomeAddr))[1]):''}}
            {{orderInfo.personal?$city.getCityName(parseInt(orderInfo.personal.localHomeAddr)):''}}-->
            {{orderInfo.personal?orderInfo.personal.localHomeAddrDetail:''}}
          </td>
          <td v-else colspan="6"></td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5" colspan="2">居住地址家庭座机</td>
          <td>{{orderInfo.personal?orderInfo.personal.localHomePhone:''}}</td>
          <td bgColor="#F5F5F5">本市生活时长</td>
          <td>{{orderInfo.personal?orderInfo.personal.cityLiveTime:''}}</td>
          <td bgColor="#F5F5F5" colspan="2">现居住地生活时长</td>
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
              <i-radio :label="29" :value="29" :key="29" disabled>是</i-radio>
              <i-radio :label="30" :value="30" :key="30" disabled>否</i-radio>
            </i-radio-group>
          </td>
        </tr>
      </table>
    </i-row>
    <!--职业信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="zhiyexinxi" class="xinxi" >职业信息</a>
      </div>
      <table border="1" width="760" class="data-form-table">
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
          <td>{{personalJobInfo.companyAddressDetail}}</td>
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
          <td bgColor="#F5F5F5">每月发薪日</td>
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
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="lianxirenxinxi" class="xinxi">联系人信息</a>
      </div>
      <table border="1" width="760" class="data-form-table">
        <tr>
          <td bgColor="#F5F5F5">姓名</td>
          <td bgColor="#F5F5F5">与本人关系</td>
          <td bgColor="#F5F5F5">联系方式</td>
          <td bgColor="#F5F5F5">单位名称</td>
          <td bgColor="#F5F5F5">家庭住址</td>
        </tr>
        <tr v-if="!immediateContacts.length">
          <td :colspan="5">
            <div class="wushuju">暂无数据</div>
          </td>
        </tr>
        <tr v-for="item in immediateContacts" :key="item.id" v-else>
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
        <tr v-if="!otherContactsInfo.length">
          <td :colspan="5">
            <div class="wushuju">暂无数据</div>
          </td>
        </tr>
        <tr v-for="item in otherContactsInfo" :key="item.id" v-else>
          <td>{{item.name?item.name:''}}</td>
          <td>{{item.relation?$dict.getDictName(item.relation):''}}</td>
          <td>{{item.relation?item.phone:''}}</td>
          <td>{{item.employer?item.employer:''}}</td>
          <td>{{item.address?item.address:''}}</td>
        </tr>
      </table>
    </i-row>
    <!--客户来源-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="kehulaiyuan" class="xinxi" >客户来源</a>
      </div>
      <table border="1" width="760" class="data-form-table">
        <tr>
          <td bgColor="#F5F5F5">通过宣传</td>
          <td colspan="4">
            <!-- <span>{{personalResourcePublicity.resourceContent?personalResourcePublicity.resourceContent:''}}</span> -->
            <i-checkbox-group v-model="byAdvertise">
              <i-checkbox v-for="{value,label} in $dict.getDictData('0018')" :key="value" :label="value" :value="value"
                          disabled>{{label}}
              </i-checkbox>
            </i-checkbox-group>
          </td>
        </tr>
        <tr>
          <td bgColor="#F5F5F5">通过介绍</td>
          <td v-if="personalResourceIntroduce.resourceType===81">
            <span>同行姓名：</span>
            <span>{{personalResourceIntroduce.peerName}}</span>
            <span class="td-span">同行公司：</span>
            <span>{{personalResourceIntroduce.peerCompany}}</span>
            <span class="td-span">同行联系方式：</span>
            <span>{{personalResourceIntroduce.peerPhone}}</span>
          </td>
          <td v-else-if="personalResourceIntroduce.resourceType===82">
            <span>客户姓名：</span>
            <span>{{personalResourceIntroduce.customerName}}</span>
            <span class="td-span">联系方式：</span>
            <span>{{personalResourceIntroduce.customerPhone}}</span>
            <span class="td-span">在我司是否成功购车：</span>
            <span>{{personalResourceIntroduce.isBuyCar===0?'是':'否'}}</span>
          </td>
          <td v-else-if="personalResourceIntroduce.resourceType===83">
            <span>机构名称：</span>
            <span>{{personalResourceIntroduce.organizationNames}}</span>
            <span class="td-span">推荐人：</span>
            <span>{{personalResourceIntroduce.referrer}}</span>
          </td>
          <td v-else>
            <span></span>
          </td>
        </tr>
      </table>
    </i-row>

    <!--素材资料-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="sucaiziliao" class="xinxi">素材资料</a>
      </div>
      <i-row class="td-span">
        <i-col :span="24">
          <div class="outFalg" v-for="item in materialInfoImg" :key="item.id" v-if="materialInfoImg.length > 0">
            <img :src="item.materialUrl" class="imgFlag">
            <div class="blackFlag">
              <i-button type="text" icon="arrow-down-a" @click="download(item)" class="buttonFlag"></i-button>
            </div>
          </div>
        </i-col>
      </i-row>
      <i-row class="td-span">
        <i-col :span="24">
          <i-button type="text" v-for="item in materialInfoOther" :key="item.id"
                    class="td-span font" v-text="item.uploadName" @click="upLoadFile(item)"
                    v-if="materialInfoOther.length > 0"></i-button>
        </i-col>
      </i-row>
    </i-row>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {DataGrid, DataGridItem} from "@zct1989/vue-component";
  import {ProductOrderService} from "~/services/manage-service/product-order.service";
  import {Prop} from "vue-property-decorator";
  import {Action} from "vuex-class";
  import {Dependencies} from "~/core/decorator";
  import {CommonService} from "~/utils/common.service";

  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class Approve extends Vue {
    @Dependencies(ProductOrderService)
    private productOrderService: ProductOrderService;
    private fee: Array<any> = [];
    private fruit: Array<String> = ["购置费"];
    private single: Boolean = false;
    private orderInfo: any = {};
    private personal: any = {}; // 个人资料
    private productSeries: any = {}; // 产品系列
    private contactsInfo: any = {}; // 联系人信息
    private immediateContacts: Array<any> = []; // 直系联系人信息
    private otherContactsInfo: any = {}; // 其他联系人信息
    private carOrderInfo: any = {}; // 选购车辆
    private personalJobInfo: any = {}; // 职业信息
    private personalResourcePublicity: any = {}; // 客户来源相关信息
    private personalResourceIntroduce: any = {}; // 客户来源介绍相关信息
    private materialInfoImg: any = []; // 素材资料相关图片信息
    private materialInfoOther: any = [];//素材资料相关其他信息
    private byAdvertise: Array<any> = []; // 客户来源通过宣传
    private ImgArray: Array<any> = [];
    private OtherArray: Array<any> = [];
    private NewArray: Array<any> = [];
    @Prop() person;
    @Action select;

    /**
     * 获取弹窗内所有订单信息
     */
    getOrderDetail(row) {
      this.productOrderService
        .findOrderInfoByOrderNumber({
          orderNumber: row.orderNumber
        })
        .subscribe(
          data => {
            let allData = JSON.stringify(data);
            this.orderInfo = JSON.parse(allData);
            this.personal = this.orderInfo.personal; // 个人资料
            if (this.personal.personalJob) {
              this.personalJobInfo = this.personal.personalJob; // 职业信息
            }
            if (this.orderInfo.orderServices) {
              this.fee = this.orderInfo.orderServices.map(v => v.service);
            }
            this.contactsInfo = this.orderInfo.personal.personalContacts; // 联系人信息
            this.carOrderInfo = this.orderInfo.orderCars; // 选购车辆
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
            this.personal.personalDatas.forEach((value) => {
              this.NewArray.push(value.uploadName)
            })
            for (let i in this.NewArray) {
              if (this.NewArray[i].search('jpg' || 'png' || 'JPG' || 'PNG') !== -1) {
                this.ImgArray.push(this.NewArray[i])
              } else {
                this.OtherArray.push(this.NewArray[i])
              }
            }
            this.materialInfoImg = this.personal.personalDatas.filter(x => this.ImgArray.includes(x.uploadName))
            this.materialInfoOther = this.personal.personalDatas.filter(x => this.OtherArray.includes(x.uploadName))
            this.immediateContacts = this.contactsInfo.filter(
              v => v.relation === 56 || v.relation === 57 || v.relation === 58
            );

            this.otherContactsInfo = this.contactsInfo.filter(
              v =>
                v.relation === 59 ||
                v.relation === 60 ||
                v.relation === 61 ||
                v.relation === 62
            );
          },
          ({msg}) => {
            this.$Message.error(msg);
          }
        );
    }

    /**
     * 从审批页面获取复审终审通过所需的数据
     */
    getApproveData() {
      let approveData: any = {};
      approveData.financingAmount = this.orderInfo.financingAmount; // 融资金额1
      approveData.initialPayment = this.orderInfo.initialPayment; // 首付金额1
      approveData.depositCash = this.orderInfo.depositCash; // 保证金额1
      approveData.finalCash = this.orderInfo.finalCash; // 尾付金额1
      approveData.manageCost = this.orderInfo.manageCost; // 管理费金额
      approveData.insuranceExpenses = this.orderInfo.insuranceExpenses; // 保险费
      approveData.gpsFee = this.orderInfo.gpsFee; // GPS费
      approveData.installLicenseFee = this.orderInfo.installLicenseFee; // 上牌费
      approveData.purchaseTax = this.orderInfo.purchaseTax; // 购置税
      approveData.remark = this.orderInfo.remark; // 备注
      approveData.vehicleAmount = this.orderInfo.vehicleAmount; // 车辆参考总价1
      approveData.paymentScale = this.orderInfo.paymentScale; // 首付比例1
      approveData.depositPercent = this.orderInfo.depositPercent; // 保证金比例1
      approveData.finalPayment = this.orderInfo.finalPayment; // 尾付本金1
      approveData.periods = this.orderInfo.periods; // 融资期数
      approveData.monthlySupply = this.orderInfo.monthlySupply; // 月供金额
      approveData.productRate = this.orderInfo.productRate; // 月利率
      approveData.payWay = this.orderInfo.payWay; // 还款方式
      approveData.otherFee = this.orderInfo.otherFee; // 其他费用
      approveData.manageCostPercent = this.orderInfo.manageCostPercent; // 管理费率
      approveData.id = this.orderInfo.id; // 管理费率1
      return approveData;
    }

    upLoadFile(item) {
      CommonService.downloadFile(item.materialUrl, "资料文件下载");
    }

    download(item) {
      CommonService.downloadFile(item.materialUrl, "资料图片下载");
    }
  }
</script>

<style lang="less" scoped>

  .approve {
    td {
      font-size: 14px;
      padding: 5px;
    }
  }

  .outFalg {
    height: 200px;
    width: 200px;
    margin-left: 10px;
    position: relative;
    border: 1px solid #C2C2C2;
    float: left;
  }

  .imgFlag {
    height: 100%;
    width: 100%;
  }

  .blackFlag {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 30px;
    background: aquamarine;
    opacity: .4;
    display: none;
  }

  .outFalg:hover .blackFlag {
    display: block;
  }

  .buttonFlag {
    position: absolute;
    top: -5px;
    left: 150px;
    display: block;
    font-size: 20px;
  }

  .data-form {
    margin-top: 20px;
  }

  .data-form-item {
    width: 7px;
    height: 20px;
    background: #265EA2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }

  .xinxi {
    color: #333333;
    cursor: auto;
    font-size: 16px;
    font-family: MicrosoftYaHei
  }

  .data-form-grid {
    margin-top: 10px;
    width: 760px;
    font-size: 14px
  }

  .cheliangxinxi {
    margin-top: 20px;
    display: block
  }

  .data-form-table {
    margin-top: 10px;
    border: 1px solid #DCDDE0
  }
  .wushuju{
    text-align:center
  }
  .td-span{
    margin-left:10px
  }
  .font{
    font-size: 16px;
  }
</style>

<template>
  <section class="component approve row">
    <!--选购信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <!-- <span>选购信息</span> -->
        <a name="xuangouxinxi" class="xinxi">申请信息</a>
      </div>
      <data-grid class="data-form-grid" :labelWidth="110" labelAlign="right" contentAlign="left">
        <data-grid-item label="申请省份：" :span="3">{{orderInfo.province?$city.getCityName(orderInfo.province):''}}
        </data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{orderInfo.city?$city.getCityName(orderInfo.city):''}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{orderInfo.company?orderInfo.company.companyChinaname:''}}
        </data-grid-item>
        <data-grid-item label="抵押贷款用途" :span="3">{{orderInfo.financingUse}}</data-grid-item>
        <!--<data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fee">
            <i-checkbox v-for="{value,label} in $dict.getDictData('0307')" :key="value" :label="value" :value="value" disabled>{{label}}
            </i-checkbox>
          </i-checkbox-group>
        </data-grid-item>-->
        <data-grid-item label="意向贷款金额" :span="3">{{orderInfo.intentionFinancingAmount}}</data-grid-item>
        <!--<data-grid-item label="租金支付" :span="3">{{$dict.getDictName(orderInfo.rentPayable)}}</data-grid-item>-->
        <data-grid-item label="意向期限" :span="6">{{ orderInfo.intentionPeriods?$dict.getDictName(Number(orderInfo.intentionPeriods)):''}}
        </data-grid-item>
        <!--<data-grid-item label="意向首付比例" :span="3">
          {{orderInfo.intentionPaymentRatio?orderInfo.intentionPaymentRatio+'%':''}}
        </data-grid-item>-->
      </data-grid>
    </i-row>
    <!--车辆信息-->
    <i-row class="cheliangxinxi" v-if="carOrderInfo.length">
      <div>
        <div class="data-form-item"></div>
        <a name="cheliangxinxi" class="xinxi">押品信息</a>
      </div>
      <data-grid :labelWidth="110" labelAlign="right" contentAlign="left" class="data-form-grid" v-for="item in carOrderInfo" :key="item.id">
        <data-grid-item label="车辆型号" :span="6">{{item.modelName?item.modelName:''}}</data-grid-item>
        <!--<data-grid-item label="上牌地区" :span="4">{{item.registrationArea?item.registrationArea:''}}</data-grid-item>-->
        <data-grid-item label="车身颜色" :span="6">{{item.vehicleColour?item.vehicleColour:''}}</data-grid-item>
        <data-grid-item label="购车排量" :span="6">{{item.vehicleEmissions?item.vehicleEmissions:''}}</data-grid-item>
        <!--<data-grid-item label="购车配置" :span="4">{{item.vehicleConfiguration?item.vehicleConfiguration:''}}
        </data-grid-item>-->
        <data-grid-item label="车辆牌照" :span="6">{{item.carLicence?item.carLicence:''}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="chanpinxinxi" class="xinxi">产品信息</a>
      </div>
      <data-grid :labelWidth="110" labelAlign="right" contentAlign="left" class="data-form-grid">
        <data-grid-item label="产品系列" :span="3">{{orderInfo.productSeries?orderInfo.productSeries.name:''}}</data-grid-item>
        <data-grid-item label="产品名称" :span="3">{{orderInfo.product?orderInfo.product.name:''}}</data-grid-item>
        <data-grid-item label="产品期数" :span="3">{{!!orderInfo.periods ? $dict.getDictName(orderInfo.periods):0}}</data-grid-item>
        <data-grid-item label="产品利率" :span="3">{{!!orderInfo.productRate | decimalToPrecent}}</data-grid-item>

        <data-grid-item label="还款方式" :span="3">{{$dict.getDictName(orderInfo.payWay)}}</data-grid-item>
        <data-grid-item label="贷款总额" :span="3">{{!!orderInfo.financingAmount?orderInfo.financingAmount:0}}</data-grid-item>
        <data-grid-item label="月供金额" :span="3">{{!!orderInfo.monthlySupply ?orderInfo.monthlySupply:0}}</data-grid-item>
        <!--<data-grid-item label="首付金额" :span="3">{{!!orderInfo.initialPayment?orderInfo.initialPayment:0}}</data-grid-item>-->

        <!--<data-grid-item label="保证金金额" :span="3">{{!!orderInfo.depositCash?orderInfo.depositCash:0}}</data-grid-item>-->
        <!--<data-grid-item label="尾付金额" :span="3">{{!!orderInfo.finalCash ? orderInfo.finalCash:0}}</data-grid-item>-->
        <data-grid-item label="管理费" :span="3">{{!!orderInfo.manageCost?orderInfo.manageCost:0}}</data-grid-item>
        <!--<data-grid-item label="保险费" :span="3">{{!!orderInfo.insuranceExpenses ?orderInfo.insuranceExpenses:0}}</data-grid-item>-->

        <!--<data-grid-item label="购置税" :span="3">{{!!orderInfo.purchaseTax ?orderInfo.purchaseTax:0}}</data-grid-item>-->
        <!--<data-grid-item label="上牌费" :span="3">{{!!orderInfo.installLicenseFee?orderInfo.installLicenseFee:0}}</data-grid-item>-->
        <data-grid-item label="GPS费" :span="3">{{!!orderInfo.gpsFee?orderInfo.gpsFee:0}}</data-grid-item>
        <data-grid-item label="其他费用" :span="3">{{!!orderInfo.otherFee?orderInfo.otherFee:0}}</data-grid-item>

        <data-grid-item label="抵押贷款估价" :span="6">{{!!orderInfo.vehicleAmount?orderInfo.vehicleAmount:0}}</data-grid-item>
        <!--<data-grid-item label="备注" :span="9">{{orderInfo.remark}}</data-grid-item>-->
      </data-grid>
    </i-row>
    <!--个人资料-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="gerenziliao" class="xinxi">个人资料</a>
      </div>
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left" class="data-form-grid">
        <data-grid-item label="姓名" :span="3">{{orderInfo.personal?orderInfo.personal.name:''}}</data-grid-item>
        <data-grid-item label="性别" :span="3">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.sex):''}}</data-grid-item>
        <data-grid-item label="出生日期" :span="3">{{personal.birthTime|dateFormat('yyyy-MM-dd')}}</data-grid-item>
        <data-grid-item label="微信号" :span="3">{{orderInfo.personal?orderInfo.personal.wechat:''}}</data-grid-item>

        <data-grid-item label="手机号码(主)" :span="3">{{orderInfo.personal?orderInfo.personal.mobileMain:''}}</data-grid-item>
        <data-grid-item label="手机号码(次)" :span="3">{{orderInfo.personal?orderInfo.personal.mobileMinor:''}}</data-grid-item>
        <data-grid-item label="身份证有效期" :span="3">{{orderInfo.personal?(orderInfo.personal.idCardValidityPeriodType!==null ? orderInfo.personal.idCardValidityPeriodType :orderInfo.personal.idCardValidityPeriodSection):''}}
        </data-grid-item>
        <data-grid-item label="婚属状况" :span="3">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.marital):''}}</data-grid-item>

        <data-grid-item label="身份证号" :span="6">{{orderInfo.personal?orderInfo.personal.idCard:''}}</data-grid-item>

        <data-grid-item label="发证机关" :span="6">{{orderInfo.personal?orderInfo.personal.issuer:''}}</data-grid-item>

        <data-grid-item label="身份证地址" :span="12">{{orderInfo.personal?(orderInfo.personal.idCardAddressDetail?orderInfo.personal.idCardAddressDetail:''):''}}</data-grid-item>

        <data-grid-item label="现居住地址" :span="12">{{orderInfo.personal?(orderInfo.personal.localHomeAddrDetail?orderInfo.personal.localHomeAddrDetail:''):''}}</data-grid-item>

        <data-grid-item label="居住地址家庭座机" :span="6">{{orderInfo.personal?orderInfo.personal.localHomePhone:''}}</data-grid-item>
        <data-grid-item label="本市生活时长" :span="3">{{orderInfo.personal?orderInfo.personal.cityLiveTime:''}}</data-grid-item>
        <data-grid-item label="现居住地生活时长" :span="3">{{orderInfo.personal?orderInfo.personal.localLiveTime:''}}</data-grid-item>

        <data-grid-item label="现居住地房产归属" :span="12">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.localLiveHouseOwner):''}}</data-grid-item>

        <data-grid-item label="本市自有房产状况归属" :span="6">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.cityOwnhouseCondition):''}}</data-grid-item>
        <data-grid-item label="电费账号" :span="3">{{orderInfo.personal?orderInfo.personal.electricityAccount:''}}</data-grid-item>
        <data-grid-item label="电费密码" :span="3">{{orderInfo.personal?orderInfo.personal.electricityPassword:''}}</data-grid-item>

        <data-grid-item label="本市房产地址" :span="12">{{orderInfo.personal?orderInfo.personal.cityOwnhouseAddressDetail:''}}</data-grid-item>

        <data-grid-item label="教育程度" :span="4">{{orderInfo.personal?$dict.getDictName(orderInfo.personal.education):''}}</data-grid-item>
        <data-grid-item label="毕业院校" :span="4">{{orderInfo.personal?orderInfo.personal.school:''}}</data-grid-item>
        <data-grid-item label="是否接受现场勘查" :span="4">
          <i-radio-group v-model="personal.houseProspecting">
            <i-radio :label="29" :value="29" :key="29" disabled>是</i-radio>
            <i-radio :label="30" :value="30" :key="30" disabled>否</i-radio>
          </i-radio-group>
        </data-grid-item>
      </data-grid>
    </i-row>
    <!--职业信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="zhiyexinxi" class="xinxi">职业信息</a>
      </div>
      <data-grid :labelWidth="110" labelAlign="right" contentAlign="left" class="data-form-grid">
        <data-grid-item label="单位名称" :span="6">{{personalJobInfo.companyName}}</data-grid-item>
        <data-grid-item label="部门" :span="6">{{personalJobInfo.department}}</data-grid-item>

        <data-grid-item label="单位性质" :span="6">{{$dict.getDictName(personalJobInfo.companyNature)}}</data-grid-item>
        <data-grid-item label="职务" :span="6">{{personalJobInfo.duty}}</data-grid-item>

        <data-grid-item label="职级" :span="6">{{$dict.getDictName(personalJobInfo.rank)}}</data-grid-item>
        <data-grid-item label="单位地址" :span="6">{{personalJobInfo.companyAddressDetail}}</data-grid-item>

        <data-grid-item label="单位固定电话" :span="6">{{personalJobInfo.companyPhone}}</data-grid-item>
        <data-grid-item label="何时进入公司" :span="6">{{personalJobInfo.accessCompanyTime|dateFormat('yyyy-MM-dd')}}</data-grid-item>

        <data-grid-item label="基本月薪(元)" :span="6">{{personalJobInfo.basicSalary}}</data-grid-item>
        <data-grid-item label="每月发薪日" :span="6">{{personalJobInfo.payDay}}</data-grid-item>

        <data-grid-item label="发薪方式" :span="6">{{personalJobInfo.payWay}}</data-grid-item>
        <data-grid-item label="年收入(万元)" :span="6">{{personalJobInfo.yearlySalaries}}</data-grid-item>

        <data-grid-item label="每月其他收入(元)" :span="6">{{personalJobInfo.monthOtherIncome}}</data-grid-item>
        <data-grid-item label="其他收入来源" :span="6">{{personalJobInfo.otherIncomeSource}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--联系人信息-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="lianxirenxinxi" class="xinxi">联系人信息</a>
      </div>
      <i-table :width="1000" highlight-row ref="databox1" :columns="immediateColumns" :data="immediateContacts"></i-table>
      <span>其他联系人（提示：必填3个其他联系人）</span>
      <i-table :width="1000" highlight-row ref="databox2" :columns="otherColumns" :data="otherContactsInfo"></i-table>
    </i-row>
    <!--客户来源-->
    <i-row class="data-form">
      <div>
        <div class="data-form-item"></div>
        <a name="kehulaiyuan" class="xinxi">客户来源</a>
      </div>
      <data-grid :labelWidth="110" labelAlign="right" contentAlign="left" class="data-form-grid">
        <data-grid-item label="通过宣传" :span="12">
          <i-checkbox-group v-model="byAdvertise">
            <i-checkbox v-for="{value,label} in $dict.getDictData('0018')" :key="value" :label="value" :value="value" disabled>{{label}}
            </i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="通过介绍" :span="12">
          <div v-if="personalResourceIntroduce.resourceType===81">
            <span>同行姓名：</span>
            <span>{{personalResourceIntroduce.peerName}}</span>
            <span class="td-span">同行公司：</span>
            <span>{{personalResourceIntroduce.peerCompany}}</span>
            <span class="td-span">同行联系方式：</span>
            <span>{{personalResourceIntroduce.peerPhone}}</span>
          </div>
          <div v-else-if="personalResourceIntroduce.resourceType===82">
            <span>客户姓名：</span>
            <span>{{personalResourceIntroduce.customerName}}</span>
            <span class="td-span">联系方式：</span>
            <span>{{personalResourceIntroduce.customerPhone}}</span>
            <span class="td-span">在我司是否成功购车：</span>
            <span>{{personalResourceIntroduce.isBuyCar===0?'是':'否'}}</span>
          </div>
          <div v-else-if="personalResourceIntroduce.resourceType===83">
            <span>机构名称：</span>
            <span>{{personalResourceIntroduce.organizationNames}}</span>
            <span class="td-span">推荐人：</span>
            <span>{{personalResourceIntroduce.referrer}}</span>
          </div>
        </data-grid-item>
      </data-grid>
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
              <i-button type="text" icon="eye" @click="preview(item)" class="buttonFlagOne"></i-button>
              <i-button type="text" icon="arrow-down-a" @click="download(item)" class="buttonFlag"></i-button>
            </div>
          </div>
        </i-col>
      </i-row>
      <i-row class="td-span">
        <i-col :span="24">
          <i-button type="text" v-for="item in materialInfoOther" :key="item.id" class="td-span font" v-text="item.uploadName" @click="upLoadFile(item)" v-if="materialInfoOther.length > 0"></i-button>
        </i-col>
      </i-row>
    </i-row>
    <template>
      <i-modal title="预览" v-model="previewModel" :width="800" class-name="no-footer" :transfer="false">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  DataGrid,
  DataGridItem
} from "@zct1989/vue-component";
import {
  ProductOrderService
} from "~/services/manage-service/product-order.service";
import {
  Prop
} from "vue-property-decorator";
import {
  Action
} from "vuex-class";
import {
  Dependencies
} from "~/core/decorator";
import {
  CommonService
} from "~/utils/common.service";

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
  private immediateContacts: any = []; // 直系联系人信息
  private otherContactsInfo: any = []; // 其他联系人信息
  private carOrderInfo: any = {}; // 选购车辆
  private personalJobInfo: any = {}; // 职业信息
  private personalResourcePublicity: any = {}; // 客户来源相关信息
  private personalResourceIntroduce: any = {}; // 客户来源介绍相关信息
  private materialInfoImg: any = []; // 素材资料相关图片信息
  private materialInfoOther: any = []; //素材资料相关其他信息
  private byAdvertise: Array<any> = []; // 客户来源通过宣传
  private ImgArray: Array<any> = [];
  private OtherArray: Array<any> = [];
  private NewArray: Array<any> = [];
  private previewModel: Boolean = false;
  private immediateColumns: any;
  private otherColumns: any;
  private url: any = ''
  @Prop() person;
  @Action select;

  created() {
    this.immediateColumns = [{
      title: '姓名',
      key: 'name',
      align: 'center'
    },
    {
      title: '与本人关系',
      key: 'relation',
      align: 'center',
      render: (h, {
              row,
        column,
        index
            }) => {
        return h('span', {}, this.$dict.getDictName(row.relation))
      }
    },
    {
      title: '联系方式',
      key: 'phone',
      align: 'center'
    },
    {
      title: '单位名称',
      key: 'employer',
      align: 'center'
    },
    {
      title: '家庭住址',
      key: 'address',
      align: 'center'
    }
    ],
      this.otherColumns = [{
        title: '姓名',
        key: 'name',
        align: 'center'
      },
      {
        title: '与本人关系',
        key: 'relation',
        align: 'center',
        render: (h, {
              row,
          column,
          index
            }) => {
          return h('span', {}, this.$dict.getDictName(row.relation))
        }
      },
      {
        title: '联系方式',
        key: 'phone',
        align: 'center'
      },
      {
        title: '单位名称',
        key: 'employer',
        align: 'center'
      },
      {
        title: '家庭住址',
        key: 'address',
        align: 'center'
      }
      ]
  }

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
      ({
            msg
          }) => {
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
  /**
   * 预览
   */
  preview(file) {
    // if (file.type === 'jpg' || file.type === 'png' || file.type === "JPG" || file.type === 'PNG') {
    this.url = file.materialUrl
    this.previewModel = true
    // } else {
    //   window.open(file.materialUrl)
    // }
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
  border: 1px solid #c2c2c2;
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
  opacity: 0.4;
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

.buttonFlagOne {
  position: absolute;
  top: -5px;
  left: 120px;
  display: block;
  font-size: 20px;
}

.data-form {
  margin-top: 20px;
}

.data-form-item {
  width: 7px;
  height: 20px;
  background: #265ea2;
  display: inline-block;
  margin-right: 6px;
  position: relative;
  top: 4px;
}

.xinxi {
  color: #333333;
  cursor: auto;
  font-size: 16px;
  font-family: MicrosoftYaHei;
}

.data-form-grid {
  margin-top: 10px;
  width: 1000px;
  font-size: 14px;
  .td-span {
    margin-left: 50px;
  }
}

.cheliangxinxi {
  margin-top: 20px;
  display: block;
}

.data-form-table {
  margin-top: 10px;
  border: 1px solid #dcdde0;
}

.wushuju {
  text-align: center;
}

.td-span {
  margin-left: 10px;
}

.font {
  font-size: 16px;
}
</style>

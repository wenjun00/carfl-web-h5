<template>
  <div class="component purchase-information">
    <!--选购信息-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="xuangouxinxi" class="data-d-content">申请信息</a>
      </div>
      <data-grid class="data-d-item" :labelWidth="100" labelAlign="right" contentAlign="left">
        <data-grid-item label="申请省份：" :span="3">{{$city.getCityName(orderInfo.province)}}</data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{$city.getCityName(orderInfo.city)}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{(orderInfo.company || {}).companyChinaname}}</data-grid-item>
        <data-grid-item label="抵押贷款用途" :span="3">{{orderInfo.financingUse}} </data-grid-item>
        <data-grid-item label="意向贷款金额" :span="3">{{orderInfo.intentionFinancingAmount | toThousands}}</data-grid-item>
        <data-grid-item label="意向期限" :span="6">{{ orderInfo.intentionPeriods | dictConvert}}</data-grid-item>
      </data-grid>
    </i-row>
    <!-- 车辆信息 -->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="cheliangxinxi" class="data-d-content">押品信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="right" contentAlign="left" class="data-d-item" v-for="item in carOrderInfo" :key="item.id">
        <data-grid-item label="车辆型号" :span="6">{{item.modelName}}</data-grid-item>
        <data-grid-item label="车身颜色" :span="6">{{item.carColor}}</data-grid-item>
        <data-grid-item label="车辆排量" :span="6">{{item.carEmissions}}</data-grid-item>
        <data-grid-item label="车辆牌照" :span="6">{{item.carLicence}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="chanpinxinxi" class="data-d-content">产品信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="right" contentAlign="left" class="data-d-item">
        <data-grid-item label="产品系列" :span="3">{{(orderInfo.productSeries || {}).name}}</data-grid-item>
        <data-grid-item label="产品名称" :span="3">{{(orderInfo.product || {}).name}}</data-grid-item>
        <data-grid-item label="产品期数" :span="3">{{orderInfo.periods | dictConvert}}</data-grid-item>
        <data-grid-item label="产品利率" :span="3">{{orderInfo.productRate | decimalToPrecent}}</data-grid-item>
        <data-grid-item label="还款方式" :span="3">{{orderInfo.payWay | dictConvert}}</data-grid-item>
        <data-grid-item label="贷款总额" :span="3">{{orderInfo.financingAmount | toThousands}}</data-grid-item>
        <data-grid-item label="月供金额" :span="3">{{orderInfo.monthlySupply | toThousands}}</data-grid-item>
        <data-grid-item label="管理费" :span="3">{{orderInfo.manageCost | toThousands}}</data-grid-item>
        <data-grid-item label="GPS费" :span="3">{{orderInfo.gpsFee | toThousands}}</data-grid-item>
        <data-grid-item label="其他费用" :span="3">{{orderInfo.otherFee | toThousands}}</data-grid-item>
        <data-grid-item label="抵押贷款估价" :span="6">{{!!orderInfo.orderCars?(orderInfo.orderCars.reduce((t,c) =>t+c.carAmount,0)):''}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--个人资料-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="gerenziliao" class="data-d-content">个人资料</a>
      </div>
      <data-grid :labelWidth="105" labelAlign="right" contentAlign="left" class="data-d-item">
        <data-grid-item label="姓名" :span="3">{{personal.name}}</data-grid-item>
        <data-grid-item label="性别" :span="3">{{personal.sex | dictConvert}}</data-grid-item>
        <data-grid-item label="出生日期" :span="3">{{personal.birthTime|dateFormat('yyyy-MM-dd')}}</data-grid-item>
        <data-grid-item label="微信号" :span="3">{{personal.wechat}}</data-grid-item>
        <data-grid-item label="手机号码(主)" :span="3">{{personal.mobileMain}}</data-grid-item>
        <data-grid-item label="手机号码(次)" :span="3">{{personal.mobileMinor}}</data-grid-item>
        <data-grid-item label="身份证有效期" :span="3">{{personal.idCardValidityPeriodType ? $filter.dictConvert(personal.idCardValidityPeriodType) :personal.idCardValidityPeriodSection}}
        </data-grid-item>
        <data-grid-item label="婚属状况" :span="3">{{personal.marital | dictConvert}}</data-grid-item>
        <data-grid-item label="身份证号" :span="6">{{personal.idCard}}</data-grid-item>
        <data-grid-item label="发证机关" :span="6">{{personal.issuer}}</data-grid-item>
        <data-grid-item label="身份证地址" :span="12">
          {{$city.getCityName(personal.province)}} {{$city.getCityName(personal.city)}} {{$city.getCityName(personal.idCardAddress)}} {{personal.idCardAddressDetail}}
        </data-grid-item>
        <data-grid-item label="现居住地址" :span="12">
          {{$city.getCityName(personal.province1)}} {{$city.getCityName(personal.city1)}} {{$city.getCityName(personal.localHomeAddr)}} {{personal.localHomeAddrDetail}}
        </data-grid-item>
        <data-grid-item label="居住地址家庭座机" :span="6">{{personal.localHomePhone}}</data-grid-item>
        <data-grid-item label="本市生活时长" :span="3">{{personal.cityLiveTime}}</data-grid-item>
        <data-grid-item label="现居住地生活时长" :span="3">{{personal.localLiveTime}}</data-grid-item>
        <data-grid-item label="现居住地房产归属" :span="12">{{personal.localLiveHouseOwner | dictConvert}}</data-grid-item>
        <data-grid-item label="本市自有房产状况归属" :span="6">{{personal.cityOwnhouseCondition | dictConvert}}</data-grid-item>
        <data-grid-item label="电费账号" :span="3">{{personal.electricityAccount}}</data-grid-item>
        <data-grid-item label="电费密码" :span="3">{{personal.electricityPassword}}</data-grid-item>
        <data-grid-item label="本市房产地址" :span="12">
          {{$city.getCityName(personal.province2)}} {{$city.getCityName(personal.city2)}} {{$city.getCityName(personal.cityOwnhouseAddress)}} {{personal.cityOwnhouseAddressDetail}}
        </data-grid-item>
        <data-grid-item label="教育程度" :span="4">{{personal.education | dictConvert}}</data-grid-item>
        <data-grid-item label="毕业院校" :span="4">{{personal.school}}</data-grid-item>
        <data-grid-item label="是否接受现场勘查" :span="4">
          <i-radio-group v-model="personal.houseProspecting">
            <i-radio :label="29" :value="29" :key="29" disabled>是</i-radio>
            <i-radio :label="30" :value="30" :key="30" disabled>否</i-radio>
          </i-radio-group>
        </data-grid-item>
      </data-grid>
    </i-row>
    <!--职业信息-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="zhiyexinxi" class="data-d-content">职业信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="right" contentAlign="left" class="data-d-item">
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
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="lianxirenxinxi" class="data-d-content">联系人信息</a>
      </div>
      <i-table :width="1000" highlight-row ref="databox1" :columns="immediateColumns" :data="immediateContacts"></i-table>
      <span>其他联系人（提示：必填3个其他联系人）</span>
      <i-table :width="1000" highlight-row ref="databox2" :columns="otherColumns" :data="otherContactsInfo"></i-table>
    </i-row>
    <!--客户来源-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="kehulaiyuan" class="data-d-content">客户来源</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="right" contentAlign="left" class="data-d-item">
        <data-grid-item label="通过宣传" :span="12">
          <i-checkbox-group v-model="byAdvertise">
            <i-checkbox v-for="{value,label} in $dict.getDictData('0018')" :key="value" :label="value" :value="value" disabled>{{label}}</i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="通过介绍" :span="12">
          <div v-if="personalResourceIntroduce.resourceType===81">
            <span>同行姓名：</span>
            <span>{{personalResourceIntroduce.peerName}}</span>
            <span class="data-d-table-span">同行公司：</span>
            <span>{{personalResourceIntroduce.peerCompany}}</span>
            <span class="data-d-table-span">同行联系方式：</span>
            <span>{{personalResourceIntroduce.peerPhone}}</span>
          </div>
          <div v-else-if="personalResourceIntroduce.resourceType===82">
            <span>客户姓名：</span>
            <span>{{personalResourceIntroduce.customerName}}</span>
            <span class="data-d-table-span">联系方式：</span>
            <span>{{personalResourceIntroduce.customerPhone}}</span>
            <span class="data-d-table-span">在我司是否成功购车：</span>
            <span>{{personalResourceIntroduce.isBuyCar===0?'是':'否'}}</span>
          </div>
          <div v-else-if="personalResourceIntroduce.resourceType===83">
            <span>机构名称：</span>
            <span>{{personalResourceIntroduce.organizationNames}}</span>
            <span class="data-d-table-span">推荐人：</span>
            <span>{{personalResourceIntroduce.referrer}}</span>
          </div>
        </data-grid-item>
      </data-grid>
    </i-row>

    <!--素材资料-->
    <i-row class="data-d">
      <div>
        <div class="data-d-icon"></div>
        <a name="sucaiziliao" class="data-d-content">素材资料</a>
      </div>
      <i-row class="data-d-row">
        <i-col :span="24">
          <div class="outFalg" v-for="item in materialInfoImg" :key="item.id" v-if="materialInfoImg.length ">
            <img :src="item.materialUrl" class="imgFlag">
            <div class="blackFlag">
              <i-button type="text" icon="eye" @click="preview(item)" class="buttonFlagOne"></i-button>
              <i-button type="text" icon="arrow-down-a" @click="download(item)" class="buttonFlag"></i-button>
            </div>
          </div>
        </i-col>
      </i-row>
      <i-row class="data-d-row">
        <i-col :span="24">
          <i-button type="text" v-for="item in materialInfoOther" :key="item.id" class="row-button" v-text="item.uploadName" @click="upLoadFile(item)" v-if="materialInfoOther.length"></i-button>
        </i-col>
      </i-row>
    </i-row>
    <div class="right-title">
      <div class="right-title-item">
        <a href="#xuangouxinxi " class="quick-link " :class="{color:getClassName.a1}">选购信息</a>
        <a href="#cheliangxinxi " v-if="carOrderInfo.length" class="quick-link " :class="{color:getClassName.a2}">车辆信息</a>
        <a href="#chanpinxinxi " class="quick-link " :class="{color:getClassName.a3}">产品信息</a>
        <a href="#gerenziliao " class="quick-link " :class="{color:getClassName.a4}">个人资料</a>
        <a href="#zhiyexinxi " class="quick-link " :class="{color:getClassName.a5} ">职业信息</a>
        <a href="#lianxirenxinxi " class="quick-link " :class="{color:getClassName.a6} ">联系人信息</a>
        <a href="#kehulaiyuan " class="quick-link " :class="{color:getClassName.a7} ">客户来源</a>
        <a href="#sucaiziliao " class="quick-link " :class="{color:getClassName.a8} ">素材资料</a>
      </div>
    </div>
    <template>
      <i-modal title="预览" v-model="previewModel" :width="800" class-name="no-footer" :transfer="false">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>
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
import { CommonService } from "~/utils/common.service";

const IMAGE_TYPE = ['jpg', 'png', 'JPG', 'PNG'];

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
  private immediateContacts: any = []; // 直系联系人信息
  private otherContactsInfo: any = []; // 其他联系人信息
  private carOrderInfo: any = []; // 选购车辆
  private personalJobInfo: any = {}; // 职业信息
  private personalResourcePublicity: any = {}; // 客户来源相关信息
  private personalResourceIntroduce: any = {}; // 客户来源介绍相关信息
  private byAdvertise: Array<any> = []; // 客户来源通过宣传
  private materialInfoImg: any = []; // 素材资料相关图片信息
  private materialInfoOther: any = []; //素材资料相关其他信息
  private previewModel: Boolean = false;
  private url: any = '';
  private immediateColumns: any;
  private otherColumns: any;

  @Prop({
    default: 0
  })
  scrollTopHeight: Number;

  @Prop({
    type: String
  })
  orderNumber

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

  created() {
    this.sliderStep = 2;
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

  mounted() {
    // document.getElementsByClassName("purchase-information")[0].addEventListener("scroll", this.handleScroll);
    this.getOrderDetail()
  }
  handleScroll() {
    // let target = document.getElementsByClassName("purchase-information")[0].scrollTop
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
  getOrderDetail() {
    this.productOrderService
      .findOrderInfoByOrderNumber({
        orderNumber: this.orderNumber
      })
      .subscribe(data => {
        let allData = JSON.stringify(data);
        this.orderInfo = JSON.parse(allData);
        this.personal = this.orderInfo.personal || {}; // 个人资料
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

        this.personal.personalDatas.forEach((value) => {
          let fileType: string = value.uploadName.split('.').pop()
          if (IMAGE_TYPE.includes(fileType)) {
            this.materialInfoImg.push(value)
          } else {
            this.materialInfoOther.push(value)
          }
        })

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
      });
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
.component.purchase-information {
  .data-d {
    margin-top: 20px;
    width: 900px;
    .data-d-icon {
      width: 7px;
      height: 20px;
      background: #265ea2;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .data-d-content {
      color: #333333;
      cursor: auto;
      font-size: 16px;
      font-family: MicrosoftYaHei;
    }
    .data-d-item {
      margin-top: 10px;
      width: 1000px;
      .data-d-table-span {
        margin-left: 50px;
      }
    }
    .data-d-table {
      margin-top: 10px;
      border: 1px solid #dcdde0;
      .data-d-table-span {
        margin-left: 10px;
      }
    }
    .data-d-row {
      margin-top: 10px;
      .row-button {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
  .right-title {
    position: absolute;
    top: 122px;
    right: 153px;
    .right-title-item {
      width: 65px;
      height: 260px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      top: 10px;
      left: 30px;
    }
  }
}

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
/*.quick-link:visited{
  color: #333333;
}*/

.material {
  height: 200px;
  width: 200px;
  border: 1px solid #c2c2c2;
  /*background-image: url('/static/images/common/invoice2.png');*/
  background-repeat: no-repeat;
  position: relative;
  left: 0px;
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
</style>

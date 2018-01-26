<template>
  <div class="component purchase-information row">
    <!--选购信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="xuangouxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">选购信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top:10px;width:760px">
        <data-grid-item label="申请省份：" :span="3">{{orderInfo.province}}</data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{orderInfo.city}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{}}</data-grid-item>
        <data-grid-item label="融资租赁用途" :span="3">{{orderInfo.financingUse}} </data-grid-item>
        <data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fruit">
            <i-checkbox label="保险费"></i-checkbox>
            <i-checkbox label="购置费"></i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="意向融资金额" :span="3">{{orderInfo.intentionFinancingAmount}}</data-grid-item>
        <data-grid-item label="租金支付" :span="3">{{orderInfo.rentPayable}}</data-grid-item>
        <data-grid-item label="意向期限" :span="3">{{orderInfo.intentionPeriods}}</data-grid-item>
        <data-grid-item label="意向首付比例" :span="3">{{orderInfo.intentionPaymentRatio}}</data-grid-item>
        <data-grid-item label="车辆型号" :span="6">{{orderInfo.vehicleModels}}</data-grid-item>
        <data-grid-item label="上牌地区" :span="3">{{orderInfo.registrationArea}}</data-grid-item>
        <data-grid-item label="车身颜色" :span="3">{{orderInfo.vehicleColour}}</data-grid-item>
        <data-grid-item label="购车排量" :span="4">{{orderInfo.vehicleEmissions}}</data-grid-item>
        <data-grid-item label="购车配置" :span="4">{{orderInfo.vehicleConfiguration}}</data-grid-item>
        <data-grid-item label="车辆牌照" :span="4">{{orderInfo.vehicleLicence}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="chanpinxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">产品信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>产品系列</td>
          <td>{{orderInfo.productSeries.name}}</td>
          <td>产品名称</td>
          <td>{{orderInfo.product.name}}</td>
          <td>产品期数</td>
          <td>{{}}</td>
          <td>产品利率</td>
          <td>{{orderInfo.productRate}}</td>
        </tr>
        <tr>
          <td>还款方式</td>
          <td>{{orderInfo.payWay}}</td>
          <td>融资总额</td>
          <td>{{orderInfo.financingAmount}}</td>
          <td>月供金额</td>
          <td>{{orderInfo.monthlySupply}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>首付金额</td>
          <td>{{orderInfo.initialPayment}}</td>
          <td>保证金金额</td>
          <td>{{orderInfo.depositCash}}</td>
          <td>尾付金额</td>
          <td>{{orderInfo.finalCash}}</td>
          <td>管理费</td>
          <td>{{orderInfo.manageCost}}</td>
        </tr>
        <tr>
          <td>保险费</td>
          <td>{{orderInfo.insuranceExpenses}}</td>
          <td>购置税</td>
          <td>{{orderInfo.purchaseTax}}</td>
          <td>上牌费</td>
          <td>{{orderInfo.installLicenseFee}}</td>
          <td>GPS</td>
          <td>{{orderInfo.gpsFee}}</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="7">{{}}</td>
        </tr>
      </table>
    </i-row>
    <!--个人资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="gerenziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">个人资料</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>姓名</td>
          <td>{{orderInfo.personal.name}}</td>
          <td>性别</td>
          <td>{{orderInfo.personal.sex}}</td>
          <td>出生日期</td>
          <td>{{orderInfo.personal.birthTime}}</td>
          <td>微信号码</td>
          <td>{{orderInfo.personal.wechat}}</td>
        </tr>
        <tr>
          <td>手机号码(主)</td>
          <td>{{orderInfo.personal.mobileMain}}</td>
          <td>手机号码(次)</td>
          <td>{{orderInfo.personal.mobileMinor}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>身份证号码</td>
          <td>{{orderInfo.personal.idCard}}</td>
          <td>婚属状况</td>
          <td colspan="5">{{orderInfo.personal.marital}}</td>
        </tr>
        <tr>
          <td>身份证有效期</td>
          <td colspan="3">{{orderInfo.personal.idCardValidityPeriodSection}}</td>
          <td>发证机关</td>
          <td colspan="3">{{orderInfo.personal.issuer}}</td>
        </tr>
        <tr>
          <td>身份证地址</td>
          <td colspan="7">{{orderInfo.personal.idCardAddress}}</td>
        </tr>
        <tr>
          <td>现居住地址</td>
          <td colspan="7">{{orderInfo.personal.localHomeAddr}}</td>
        </tr>
        <tr>
          <td>居住地址家庭座机</td>
          <td>{{orderInfo.personal.localHomePhone}}</td>
          <td>本市生活时长</td>
          <td>{{orderInfo.personal.cityLiveTime}}</td>
          <td>现居住地生活时常</td>
          <td colspan="3">{{orderInfo.personal.localLiveTime}}</td>
        </tr>
        <tr>
          <td>现居住地房产归属</td>
          <td colspan="7">{{orderInfo.personal.localLiveHouseOwner}}</td>
        </tr>
        <tr>
          <td>本市自有房产状况及归属</td>
          <td colspan="3">{{orderInfo.personal.cityOwnhouseCondition}}</td>
          <td>电费账号</td>
          <td>{{orderInfo.personal.electricityAccount}}</td>
          <td>电费密码</td>
          <td>{{orderInfo.personal.electricityPassword}}</td>
        </tr>
        <tr>
          <td>本市房产地址</td>
          <td colspan="7">{{orderInfo.cityOwnhouseAddress}}</td>
        </tr>
        <tr>
          <td>教育程度</td>
          <td colspan="2">{{orderInfo.personal.education}}</td>
          <td>毕业院校</td>
          <td colspan="2">{{orderInfo.personal.school}}</td>
          <td>是否接受现场勘查</td>
          <td>
            <i-radio :checked.sync="single">{{orderInfo.personal.houseProspecting}}</i-radio>
          </td>
        </tr>
      </table>
    </i-row>
    <i-row>

    </i-row>

    <!--职业信息-->
    <i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="zhiyexinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">职业信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>单位名称</td>
          <td>{{}}</td>
          <td>部门</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>单位性质</td>
          <td>{{orderInfo.companyName}}</td>
          <td>职务</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>职级</td>
          <td colspan="8">{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>单位地址</td>
          <td colspan="8">{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>单位固定电话</td>
          <td>{{orderInfo.companyName}}</td>
          <td>何时进入公司</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>基本月薪(元)</td>
          <td>{{orderInfo.companyName}}</td>
          <td>每月发薪日(元)</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>发薪方式</td>
          <td>{{orderInfo.companyName}}</td>
          <td>年收入(万元)</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
        <tr>
          <td>每月其他收入(元)</td>
          <td>{{orderInfo.companyName}}</td>
          <td>其他收入来源</td>
          <td>{{orderInfo.companyName}}</td>
        </tr>
      </table>
    </i-row>
    <!--联系人信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="lianxirenxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">联系人信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>姓名</td>
          <td>与本人关系</td>
          <td>联系方式</td>
          <td>单位名称</td>
          <td>家庭住址</td>
        </tr>
        <tr v-for="item in contactsInfo" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.relation}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{item.address}}</td>
        </tr>
        <!--<tr>
          <td></td>
          <td>父母</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>子女</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>-->
        <tr>
          <td colspan="5">其他联系人（提示：必填3个其他联系人）</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>与本人关系</td>
          <td>联系方式</td>
          <td>单位名称</td>
          <td>家庭住址</td>
        </tr>
        <tr>
          <td></td>
          <td>配偶</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>父母</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>子女</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </i-row>
    <!--客户来源-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="kehulaiyuan" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">客户来源</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>通过宣传</td>
          <td colspan="4">
            <i-radio value="true">其他</i-radio>
          </td>
        </tr>
        <tr>
          <td>通过介绍</td>
          <td>
            <i-radio>同行推荐</i-radio>
            <span>同行姓名：</span>
            <input type="text" style="border:0px;border-bottom:1px ;">
          </td>
        </tr>
      </table>
    </i-row>

    <!--素材资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="sucaiziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">素材资料</a>
      </div>
      <i-row style="margin-top:10px">
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;">
            <Icon type="plus-circled" style="display:block;margin-top:53px;" size="40" color="#265ea2"></Icon>
            <div style="font-weight:bold">点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;left:72px;">
          </div>
        </i-col>
      </i-row>
    </i-row>
    <div style="position:absolute;top:122px;right:153px">
      <!--<div style="width:2px;height:280px;background-color:#dddddd">
      </div>-->
      <div style="width: 65px;height: 260px;display: flex;align-items: center;flex-wrap: wrap; position: absolute;top: 10px;left: 30px;">
        <a href="#xuangouxinxi" class="quick-link" :class="{color:getClassName.a1}">选购信息</a>
        <a href="#chanpinxinxi" class="quick-link" :class="{color:getClassName.a2}">产品信息</a>
        <a href="#gerenziliao" class="quick-link" :class="{color:getClassName.a3}">个人资料</a>
        <a href="#zhiyexinxi" class="quick-link" :class="{color:getClassName.a4}">职业信息</a>
        <a href="#lianxirenxinxi" class="quick-link" :class="{color:getClassName.a5}">联系人信息</a>
        <a href="#kehulaiyuan" class="quick-link" :class="{color:getClassName.a6}">客户来源</a>
        <a href="#sucaiziliao" class="quick-link" :class="{color:getClassName.a7}">素材资料</a>
      </div>
    </div>
    <!--<Slider v-model="sliderStep" :step="1" show-stops :min="2" :max="7" style="transform: rotate(90deg);position: absolute;top: 242px;right: 15px;width:280px"></Slider>-->
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Action
  } from "vuex-class";
  import {
    ProductOrderService
  } from "~/services/manage-service/product.order.service";
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class PurchaseInformation extends Vue {
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
    private fruit: Array < String > = ['购置费'];
    private single: Boolean = false;
    private sliderStep: Number;
    private c = {
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false,
      a7: false
    }
    private orderInfo: any = {}
    private contactsInfo: any = {}
    @Prop({
      default: 0
    })
    scrollTopHeight: Number;

    get getClassName() {
      this.c.a1 = this.scrollTopHeight >= 0 && this.scrollTopHeight < 170
      this.c.a2 = this.scrollTopHeight >= 170 && this.scrollTopHeight < 350
      this.c.a3 = this.scrollTopHeight >= 350 && this.scrollTopHeight < 707
      this.c.a4 = this.scrollTopHeight >= 707 && this.scrollTopHeight < 1034
      this.c.a5 = this.scrollTopHeight >= 1034 && this.scrollTopHeight < 1386
      this.c.a6 = this.scrollTopHeight >= 1386 && this.scrollTopHeight < 1407
      this.c.a7 = this.scrollTopHeight >= 1407
      return this.c
    }

    activated() {
      document.getElementsByClassName('purchase-information')[0].addEventListener('scroll', this.handleScroll)
    }
    handleScroll() {}
    created() {
      this.sliderStep = 2
    }
    /**
     * 获取弹窗内所有订单信息
     */
    getOrderDetail(row) {
      this.productOrderService.findOrderInfoByOrderNumber({
        orderNumber: row.orderNumber
      }).subscribe(val => {
        this.contactsInfo = JSON.stringify(val)
        console.log(8989, this.contactsInfo)
        this.orderInfo = val.object
        // this.contactsInfo = val.object.personalContacts
      })
    }
  }

</script>

<style scoped>
  .color {
    color: #333333!important;
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

</style>

<template>
  <div class="component approve row">
    <!--选购信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <!-- <span>选购信息</span> -->
        <a name="xuangouxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">选购信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top:10px;width:760px">
        <data-grid-item label="申请省份：" :span="3">{{orderInfo.province?$city.getCityName(orderInfo.province):''}}</data-grid-item>
        <data-grid-item label="申请城市：" :span="3">{{orderInfo.city?$city.getCityName(orderInfo.city):''}}</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">{{orderInfo.company?orderInfo.company.companyChinaname:''}}</data-grid-item>
        <data-grid-item label="融资租赁用途" :span="3">{{orderInfo.financingUse}} </data-grid-item>
        <data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fee">
            <!-- <i-checkbox :label="369" :value="369" disabled>保险费</i-checkbox>
            <i-checkbox :label="370" :value="370" disabled>购置费</i-checkbox> -->
            <i-checkbox :value="368" :label="368" disabled>无</i-checkbox>
            <i-checkbox :value="369" :label="369" disabled>购置税</i-checkbox>
            <i-checkbox :value="370" :label="370" disabled>保险费</i-checkbox>
            <i-checkbox :value="371" :label="371" disabled>上牌费</i-checkbox>
            <i-checkbox :value="372" :label="372" disabled>路桥费</i-checkbox>
            <i-checkbox :value="373" :label="373" disabled>首期租金</i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="意向融资金额" :span="3">{{orderInfo.intentionFinancingAmount}}</data-grid-item>
        <data-grid-item label="租金支付" :span="3">{{orderInfo.rentPayable}}</data-grid-item>
        <data-grid-item label="意向期限" :span="3">{{orderInfo.intentionPeriods}}</data-grid-item>
        <data-grid-item label="意向首付比例" :span="3">{{orderInfo.intentionPaymentRatio}}</data-grid-item>
      </data-grid>
    </i-row>
    <!--车辆信息-->
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
          <td bgColor="#F5F5F5">保证金额</td>
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
        <tr v-if="!immediateContacts.length">
          <td :colspan="5">
            <div style="text-align:center">暂无数据</div>
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
            <div style="text-align:center">暂无数据</div>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";
import { Dependencies } from "~/core/decorator";
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
  private materialInfo: any = {}; // 素材资料相关信息
  private byAdvertise: Array<any> = []; // 客户来源通过宣传
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
          this.personalJobInfo = this.personal.personalJob; // 职业信息
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
          this.materialInfo = this.personal.personalDatas; // 素材相关信息
          this.immediateContacts = this.contactsInfo.filter(
            v => v.relation === 56 || v.relation === 57 || v.relation === 58
          );

          console.log(this.immediateContacts, 18987);
          this.otherContactsInfo = this.contactsInfo.filter(
            v =>
              v.relation === 59 ||
              v.relation === 60 ||
              v.relation === 61 ||
              v.relation === 62
          );
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 从审批页面获取复审终审通过所需的数据
   */
  getApproveData() {
    let approveData: any = {};
    approveData.intentionFinancingAmount = this.orderInfo.intentionFinancingAmount; // 融资金额
    approveData.initialPayment = this.orderInfo.initialPayment; // 首付金额
    approveData.depositCash = this.orderInfo.depositCash; // 保证金额
    approveData.finalCash = this.orderInfo.finalCash; // 尾付金额
    approveData.manageCost = this.orderInfo.manageCost; // 管理费金额
    approveData.insuranceExpenses = this.orderInfo.insuranceExpenses; // 保险费
    approveData.gpsFee = this.orderInfo.gpsFee; // GPS费
    approveData.installLicenseFee = this.orderInfo.installLicenseFee; // 上牌费
    approveData.purchaseTax = this.orderInfo.purchaseTax; // 购置税
    approveData.remark = this.orderInfo.remark; // 备注
    return approveData;
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
</style>

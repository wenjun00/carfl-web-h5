<!-- 车辆详情分期方案-->
<template>
  <section class="page details-scheme">
    <!-- 分期方案 -->
    <van-cell-group>
      <van-cell>
        <template slot="title">
          <img class="someIcon" height="17px" :src="images" alt="">
          <span class="van-cell-text basicParameter">分期方案</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="area">
      <van-row>
        <van-col class="payment">首付</van-col>
      </van-row>
      <van-row class="small">
        <van-col v-for="(item,index) in carPeriodsOne" :key="index" :span="6">
          <span :class="{'active':index ==checkindex }" class="downPayment" @click="paymentOne(item.firstPayment,index)">{{item.firstPayment}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="payment">期数</van-col>
      </van-row>
      <van-row class="small">
        <van-col v-for="(item,index) in carPeriodsTwo" :key="index" :span="6">
          <span :class="{'active':index ==checkindexTwo }" class="downPayment" @click="paymentTwo(item.planType,index)">{{$dict.getDictName(item.planType)}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="payment">月供详情</van-col>
      </van-row>
      <van-row class="monthly" v-show="carPeriodsThree.length > 0">
        <van-col span="12" v-show="(carPeriodsThree[0] || {}).firstYearMonthrent">
          第一年月供:
          <span class="colred">{{ (carPeriodsThree[0] || {}).firstYearMonthrent | toThousands}}</span>元
        </van-col>
        <van-col span="12" v-show="(carPeriodsThree[0] || {}).secondYearMonthrent">
          第二年月供:
          <span class="colred">{{ (carPeriodsThree[0] || {}).secondYearMonthrent | toThousands}}</span>元
        </van-col>
        <van-col span="12" v-show="(carPeriodsThree[0] || {}).thirdYearMonthrent">
          第三年月供:
          <span class="colred">{{ (carPeriodsThree[0] || {}).thirdYearMonthrent | toThousands}}</span>元
        </van-col>
        <van-col span="12" v-show="(carPeriodsThree[0] || {}).fourthYearMonthrent">
          第四年月供:
          <span class="colred">{{ (carPeriodsThree[0] || {}).fourthYearMonthrent | toThousands}}</span>元
        </van-col>
        <van-col span="12" v-show="(carPeriodsThree[0] || {}).fifthYearMonthrent">
          第五年月供:
          <span class="colred">{{ (carPeriodsThree[0] || {}).fifthYearMonthrent | toThousands}}</span>元
        </van-col>
      </van-row>
    </div>
    <!-- 基本参数 -->
    <van-collapse v-model="activeNames">
      <van-collapse-item name="2">
        <div slot="title">基本参数
          <span style="float: right;">详细配置</span>
        </div>
        <van-cell-group class="dropDown" v-for="(item,index) in paramList" :key="index">
          <van-cell :title="item.name" :value="item.value" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <div class="carDetails">
      <van-cell-group>
        <van-cell title="车身结构" :value="basicEquipment.carStructure" />
        <van-cell title="上/宽/高(mm)" :value="basicEquipment.carSize" />
        <van-cell title="发动机" :value="basicEquipment.carEmissions" />
        <van-cell title="驱动方式" :value="basicEquipment.drivingMode" />
        <van-cell title="燃料形式" :value="basicEquipment.fuel" />
        <van-cell title="综合油耗(L/100km)" :value="basicEquipment.fuelConsumption" />
        <van-cell title="车辆配色" :value="basicEquipment.carColour" />
      </van-cell-group>
    </div>
    <!-- 空行 -->
    <div class="break-line"></div>
    <!-- 车型亮点 -->
    <van-cell-group class="magin10">
      <van-cell>
        <template slot="title">
          <img class="someIcon" height="17px" :src="images" alt="">
          <span class="van-cell-text basicParameter">车型亮点</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-row>
      <carImgShow v-for="(item,index) of carColumns" :key="index" :carColumn="item"></carImgShow>
    </van-row>
    <div class="carGoHome">
      <!-- 四步提车回家 -->
      <van-cell-group class="magin10">
        <van-cell>
          <template slot="title">
            <img class="someIcon" height="15px" :src="images" alt="">
            <span class="van-cell-text basicParameter">四步提车回家</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-row>
        <div class="appointmentImmediately">
          <img height="65px" src="/static/images/common/phone.png" alt="">
          <div class="appointmentDescribe">
            <div class="appointmentHend">立即预约</div>
            <span class="appointmentSpan">选好意向车型后,洋葱好车直营店客户经理将在24小时之内为你提供1对1服务</span>
          </div>
        </div>
      </van-row>
      <van-row>
        <div class="appointmentImmediately">
          <img height="65px" src="/static/images/common/agreement.png" alt="">
          <div class="appointmentDescribe">
            <div class="appointmentHend">签订协议</div>
            <span class="appointmentSpan">选择合适的购车方案,通过征信审核后签订购车协议</span>
          </div>
        </div>
      </van-row>
      <van-row>
        <div class="appointmentImmediately">
          <img height="65px" src="/static/images/common/cost.png" alt="">
          <div class="appointmentDescribe">
            <div class="appointmentHend">支付费用</div>
            <span class="appointmentSpan">支付首付,第一期月供,违章保证金</span>
          </div>
        </div>
      </van-row>
      <van-row>
        <div class="appointmentImmediately">
          <img height="65px" src="/static/images/common/vehicle.png" alt="">
          <div class="appointmentDescribe">
            <div class="appointmentHend">到店提车</div>
            <span class="appointmentSpan">免费办理保险与上牌手续后,客户经理将联系您到附近直营店提车</span>
          </div>
        </div>
      </van-row>
      <!-- 空行 -->
      <div class="break-line"></div>
      <!-- 购买须知 -->
      <van-cell-group class="magin10">
        <van-cell>
          <template slot="title">
            <img class="someIcon" height="15px" :src="images" alt="">
            <span class="van-cell-text basicParameter">购买须知</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">购车资料</van-col>
        <van-col class="noticeEnd" span="16">洋葱汽车由各大汽车品牌厂商供应,车源品质有保障</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">车源保障</van-col>
        <van-col class="noticeEnd" span="16">二代身份证、驾驶证、征信报告</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">车辆归属</van-col>
        <van-col class="noticeEnd" span="16">用车期间,车辆以及车牌所有权归属洋葱汽车;结清全部费用后即办理车辆过户</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">额外费用</van-col>
        <van-col class="noticeEnd" span="16">除违章保证金无需支付额外费用</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">随车保险</van-col>
        <van-col class="noticeEnd" span="16">洋葱汽车帮您办理好保险</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">上牌</van-col>
        <van-col class="noticeEnd" span="16">洋葱汽车负责办理车辆上牌,您无需到场,无需支付额外费用</van-col>
      </van-row>
      <van-row class="purchaseNotes">
        <van-col class="noticeHeand" span="8">还款</van-col>
        <van-col class="noticeEnd" span="16">购车后通过绑定的银行卡按时还款</van-col>
      </van-row>
      <!-- 空行 -->
      <div class="break-line"></div>

      <div>
        <van-button @click="skipNextStep" size="large">下一步</van-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Collapse, CollapseItem } from 'vant';
import { carManagementService } from "~/services/manage-service/car-management.service";
import { ProductService } from "~/services/manage-service/product.service";
import { Dependencies } from "~/core/decorator";
import { Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import carImgShow from "~/components/detail/car-img-show.vue";

@Component({
  components: {
    carImgShow
  }
})
export default class detailsScheme extends Vue {
  @Dependencies(carManagementService) private carManagementService: carManagementService;
  @Dependencies(ProductService) private productService: ProductService;

  /**
   * 车辆ID 必需属性
   */
  @Prop({
    required: true,
  }) carId

  @Mutation carDetailTwo
  @Mutation carDetails
  private showDetails: boolean = false
  private activeNames: any = ['1']
  private paramList: any = []   // 车辆详情配置
  private basicEquipment: any = [] // 车辆基本配置
  private carImg: any = []      // 车辆图片
  private carName: any = []
  private carInfo: any = []      // 汽车详情
  private carPeriodsOne: any = []    // 还款期数1
  private carPeriodsTwo: any = []    //还款期数2、
  private carPeriodsThree: any = []  // 还款期数3
  private carIntoA: any = {}   // 进件需要用的数据
  private checkindex: any = null    // 首付点击获取calss 
  private checkindexTwo: any = null  // 期数点击当前获取class
  private aaaList: any = ['/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png', '/static/images/common/car.png']


  private images = '/static/images/common/headerLabel.png'

  private carColumns = []

  /**
   * 获取车辆详细配置 
   */
  getCarDetails() {
    this.carManagementService.getCarParamList(this.carId).subscribe(
      data => {
        this.paramList = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
  * 获取车辆基本配置
  */
  getBasicEquipment() {
    this.carManagementService.getCarDetail(this.carId).subscribe(
      data => {
        this.basicEquipment = data
        this.carInfo = {
          brandName: data.brandName,
          interiorColor: data.interiorColor,
          modelName: data.modelName,
          seriesName: data.seriesName,
          vehicleColor: data.carColour,
        }
      },
      err => this.$toast(err.msg)
    )
  }

  /**
  * 获取车辆图片 （栏目信息）
  */
  getCarColumnImg() {
    this.carManagementService.getCarColumnCollectModel(this.carId).subscribe(
      data => this.carColumns = data.columnList,
      err => this.$toast(err.msg)
    )
  }
  /**
  * 获取车辆首付 期数1
  */
  getCarPeriods() {

    this.productService.getCarProductResultModelList({ carId: this.carId }).subscribe(
      data => {
        this.carPeriodsOne = data
      },
      err => this.$toast(err.msg)
    )
  }
  /***
   * 还款期数 期数2
   */
  paymentOne(val, index) {
    this.checkindex = index
    let a = {
      carId: this.carId,
      firstPayment: val
    }
    this.productService.getCarProductResultModelList(a).subscribe(
      data => {
        this.carPeriodsTwo = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
   * 点击期数 期数3
   */
  paymentTwo(val, index) {
    this.checkindexTwo = index
    let a = {
      carId: this.carId,
      planType: val
    }
    this.productService.getCarProductResultModelList(a).subscribe(
      data => {
        this.carPeriodsThree = data
        this.carIntoA = {
          productResultId: data[0].resultId,
          productId: data[0].relationId,
          initialPayment: data[0].firstPayment,
          finalCash: data[0].endPayment,
          financingAmount: data[0].firstYearPrincipal,
          monthlySupply: data[0].firstYearMonthrent,
          periods: data[0].planType,
        }
        console.log(data, '进件需要用的')
      },
      err => this.$toast(err.msg)
    )
  }
  /***
    * 点击下一步
    */
  skipNextStep() {
    if (!!this.carIntoA.productResultId) {

      this.carDetails(this.carInfo)
      this.carDetailTwo(this.carIntoA)
      this.$router.push('/upload-id-photo-first')
    } else {
      this.$toast('请先选择车辆首付、期数')
    }

  }

  mounted() {
    this.getCarDetails()
    this.getBasicEquipment()
    this.getCarColumnImg()
    this.getCarPeriods()
  }


}
</script>

<style lang="less" scoped>
.page.details-scheme {
  .active {
    color: #fcdf2b;
    border-color: #fcdf2b !important;
  }
  .carGoHome {
    .purchaseNotes {
      padding: 0px 25px;
      font-size: 13px;
      font-weight: 600;
      margin: 10px 0px 10px 0px;
      height: 45px;
      .noticeHeand {
        color: #333;
      }
      .noticeEnd {
        color: #666;
      }
    }
    .basicParameter {
      line-height: 30px !important;
      font-weight: 600 !important;
    }
    .someIcon {
      position: relative;
      top: 3px;
    }
    .magin10 {
      margin-bottom: 10px;
    }
    .appointmentImmediately {
      display: flex;
      justify-content: space-around;
      height: 80px;
      .appointmentDescribe {
        width: 60%;
        .appointmentHend {
          font-size: 14px;
          font-weight: 600;
          height: 22px;
        }
        .appointmentSpan {
          font-size: 12px;
        }
      }
    }
  }
  .colred {
    color: red;
  }
  .downPayment {
    text-align: center;
    border: 1px solid gray;
    padding: 5px 2px;
    box-sizing: border-box;
    display: inline-block;
    min-width: 50px;
    margin: 5px;
  }
  .mar10 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  .imgCenter {
    text-align: center;
  }
  .magin10 {
    margin-bottom: 10px;
  }
  .advantage {
    display: flex;
    justify-content: space-between;
    .carLeft,
    .carRight {
      width: 48%;
      font-size: 13px;
      text-align: center;
      color: gray;
      margin-bottom: 10px;
    }
  }
  .payment {
    font-weight: 600;
    font-size: 13px;
    margin: 10px 0;
  }
  .paymentTwo {
    margin: 10px 0;
    font-size: 13px;
    font-weight: 600;
  }
  .periods {
    display: inline-block;
    width: 69px;
    height: 28px;
    border: 1px solid grey;
    text-align: center;
    line-height: 28px;
    font-size: 13px;
  }
  .monthly {
    font-size: 13px;
  }
  .area {
    background-color: #fafbfa;
    width: 90%;
    margin: 0 auto;
    padding-left: 20px;
    color: gray;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .basicParameter {
    line-height: 30px !important;
    font-weight: 600 !important;
  }
  .someIcon {
    position: relative;
    top: 3px;
  }
  .carLightspot {
    width: 85%;
    margin: 0 auto;
    .absut {
      position: relative;
    }
    .van-hairline--surround.van-tag {
      position: absolute;
      bottom: 10px;
      left: 5px;
      background: #2d2e30;
      font-size: 12px;
    }
  }
}
</style>
<style lang="less">
.page.details-scheme {
  .dropDown {
    padding-left: 13px;
    font-weight: 600;
    font-size: 13px;
    .van-cell__title {
      color: grey;
    }
    .van-cell__value {
      color: #666666;
    }
  }
  .van-collapse-item__content {
    padding: 2px 0px 2px 0px;
  }
  .van-cell.van-cell--clickable.van-hairline {
    display: flex;
    align-items: center;
  }
  .van-cell__value {
    color: grey;
  }
  .headSwitch {
    .van-tab__pane {
      // margin: 10px 22px;
    }
    .van-tab,
    .van-tabs__nav--card {
      border: none;
    }
    .van-tabs__nav.van-tabs__nav--card {
      position: relative;
      right: 20px;
    }
    .van-tab {
      .van-ellipsis {
        border: 1px solid grey;
        color: gray;
        font-size: 13px;
      }
    }
    .van-tab--active {
      background: white;
      color: #ffd753;
    }
    .van-tab.van-tab--active {
      .van-ellipsis {
        border: 1px solid #ffd753;
        color: #ffd753;
      }
    }
  }
  .carDetails {
    .van-cell-group.van-hairline--top-bottom {
      padding-left: 13px;
    }
    .van-cell__title {
      color: grey;
      font-weight: 600;
      font-size: 13px;
    }
    .van-cell__value {
      color: #666666;
      font-weight: 600;
      font-size: 13px;
    }
  }
}
</style>

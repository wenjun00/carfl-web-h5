<!-- 车辆详情分期方案-->
<template>
  <section class="page detailsScheme">
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
      <van-row class="headSwitch">
        <van-tabs type="card">
          <van-tab v-for="(item,index) in byStages" :key="index" :title="item.label">
            <van-row>
              <van-col class="paymentTwo">期数</van-col>
            </van-row>
            <span class="periods"> {{ item.val }}</span>
          </van-tab>
        </van-tabs>
      </van-row>
      <van-row>
        <van-col class="payment">月供详情</van-col>
      </van-row>
      <van-row class="monthly">
        <van-col>第一月供:
          <span>3263.55</span>元 第二月供:
          <span>3254.66</span>元
        </van-col>
      </van-row>
      <van-row class="monthly">
        <van-col> 第一月供:
          <span>3263.55</span>元 第二月供:
          <span>3254.66</span>元
        </van-col>
      </van-row>
    </div>
    <!-- 基本参数 -->

    <van-collapse v-model="activeNames">
      <van-collapse-item name="2">
        <div slot="title">基本参数
          <span style="float: right;">详细配置</span>
        </div>
        <van-cell-group class="dropDown" v-for="(item,index) in detailsList" :key="index">
          <van-cell :title="item.name" :value="item.value" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <div class="carDetails">
      <van-cell-group>
        <van-cell title="车身结构" :value="basicEquipment.carStructure" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="上/宽/高(mm)" :value="basicEquipment.carSize" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="发动机" :value="basicEquipment.carEmissions" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="驱动方式" :value="basicEquipment.drivingMode" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="燃料形式" :value="basicEquipment.fuel" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="综合油耗(L/100km)" :value="basicEquipment.fuelConsumption" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="车辆配色" :value="basicEquipment.carColour" />
      </van-cell-group>
    </div>
    <!-- 空行 -->
    <van-cell-group class="nullString"></van-cell-group>
    <!-- 车型亮点 -->
    <van-cell-group class="magin10">
      <van-cell>
        <template slot="title">
          <img class="someIcon" height="17px" :src="images" alt="">
          <span class="van-cell-text basicParameter">车型亮点</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-row class="imgCenter" v-for="(item,index) in carImg" :key="index">
      <van-col class="mar10" span="24">{{item.name}}</van-col>
      <van-col span="12" v-for="(itemTwo,indexTwo) in item.materialList" :key="indexTwo"><img width="90%" :src="itemTwo.url" alt=""></van-col>
      <van-col class="mar10" span="24">{{item.introduce}}</van-col>
    </van-row>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Collapse, CollapseItem } from 'vant';
import { carManagementService } from "~/services/manage-service/carManagement.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {}
})
export default class detailsScheme extends Vue {
  @Dependencies(carManagementService) private carManagementService: carManagementService;
  private showDetails: boolean = false
  private activeNames: any = ['1']
  private detailsList: any = []   // 车辆详情配置
  private basicEquipment: any = [] // 车辆基本配置
  private carImg: any = []      // 车辆图片
  private carName: any = []


  private images = '/static/images/common/headerLabel.png'
  private byStages = [{
    val: '24期数',
    label: '0.91'
  }, {
    val: '36期数',
    label: '1.36'
  }, {
    val: '48期数',
    label: '1.82'
  }, {
    val: '60期数',
    label: '2.27'
  }]

  /**
   * 获取车辆详细配置 
   */
  getCarDetails() {
    this.carManagementService.getCarParamList({ carId: 8 }).subscribe(
      data => {
        this.detailsList = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
  * 获取车辆基本配置
  */
  getBasicEquipment() {
    this.carManagementService.getCarDetail({ carId: 8 }).subscribe(
      data => {
        this.basicEquipment = data
      },
      err => this.$toast(err.msg)
    )
  }

  /**
  * 获取车辆图片 （栏目信息）
  */
  getCarColumnImg() {
    this.carManagementService.getCarColumnCollectModel({ carId: 8 }).subscribe(
      data => {
        // this.basicEquipment = data
        console.log(data, '车型亮点')
        // this.carName = data
        this.carImg = data.columnList
      },
      err => this.$toast(err.msg)
    )
  }


  mounted() {
    this.getCarDetails()
    this.getBasicEquipment()
    this.getCarColumnImg()
  }


}
</script>

<style lang="less" scoped>
.page.detailsScheme {
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
  .nullString {
    height: 15px;
    background: #f5f6f5;
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
.page.detailsScheme {
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

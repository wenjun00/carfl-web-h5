<!-- 车辆详情分期方案-->
<template>
  <section class="page carGoHome">
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
    <van-cell-group class="nullString"></van-cell-group>
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
    <van-cell-group class="nullString"></van-cell-group>
    <van-row class="subscribe">
      <van-col span="20">
        <van-button class="but" size="large">下一步</van-button>
      </van-col>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {}
})
export default class carGoHome extends Vue {
  private images = '/static/images/common/headerLabel.png'

}
</script>

<style lang="less" scoped>
.page.carGoHome {
  .subscribe {
    display: flex;
    justify-content: center;
    .but {
      background: #ffdb00;
      border-radius: 25px;
      font-size: 15px;
      font-weight: 600;
      margin: 10px 0px 10px 0px;
    }
  }
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
  .nullString {
    height: 15px;
    background: #f5f6f5;
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
</style>

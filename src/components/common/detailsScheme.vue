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
    <van-cell-group>
      <van-cell value="详细配置" is-link>
        <template slot="title">
          <img class="someIcon" height="17px" :src="images" alt="">
          <span class="van-cell-text basicParameter">基本参数</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="carDetails">
      <van-cell-group>
        <van-cell title="车身结构" value="5门5座SUV" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="上/宽/高(mm)" value="4415/1819/1625" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="发动机" value="1.4T 165马力 L4" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="变速箱" value="7档双离合" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="驱动方式" value="前置前驱" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="燃料形式" value="汽油" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="综合油耗(L/100km)" value="7.3" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="车辆配色" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="级别" value="紧凑型SUV" />
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
    <!-- 四大优势 -->
    <div class="carLightspot">
      <img width="100%" src="/static/images/common/car1.png" alt="">
      <van-row>
        <img width="100%" src="/static/images/common/car2.png" alt="">
      </van-row>
      <div class="advantage">
        <div class="carLeft">
          <img width="100%" src="/static/images/common/car.png" alt="">
          <span>霸气前脸设计</span>
        </div>
        <div class="carRight">
          <img width="100%" src="/static/images/common/car1.png" alt="">
          <span>流线型大灯</span>
        </div>
      </div>
      <div class="advantage">
        <div class="carLeft">
          <img width="100%" src="/static/images/common/car1.png" alt="">
          <span>霸气前脸设计</span>
        </div>
        <div class="carRight">
          <img width="100%" src="/static/images/common/car.png" alt="">
          <span>流线型大灯</span>
        </div>
      </div>
    </div>
    <!-- 细节设计 -->
    <div class="carLightspot">
      <van-row>
        <img width="100%" src="/static/images/common/car3.png" alt="">
      </van-row>
      <div class="absut magin10">
        <img width="100%" src="/static/images/common/car1.png" alt="">
        <van-tag>豪华宽敞中控1</van-tag>
      </div>
      <div class="advantage ">
        <div class="carLeft absut">
          <img width="100%" src="/static/images/common/car1.png" alt="">
          <van-tag>豪华宽敞中控2</van-tag>
        </div>
        <div class="carRight absut">
          <img width="100%" src="/static/images/common/car1.png" alt="">
          <van-tag>豪华宽敞中控3</van-tag>
        </div>
      </div>
      <div class="absut magin10">
        <img width="100%" src="/static/images/common/car1.png" alt="">
        <van-tag>豪华宽敞中控4</van-tag>
      </div>

    </div>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {}
})
export default class detailsScheme extends Vue {
  private images = '/static/images/common/headerLabel.png'
  private byStages = [{
    val: '24期数',
    label: '0.91'
  }, {
    val: '36期数',
    label: '1.36'
  }, {
    val: '48期数',
    label:'1.82'
  }, {
    val: '60期数',
    label: '2.27'
  }]

  mounted(){
    // let scrollTop = document.documentElement.scrollTop || window.pageYOffset
    // scrollTop = 0
 
    // document.documentElement.scrollTop = 0
    // window.scrollTo(0,0);
  }


}
</script>

<style lang="less" scoped>
.page.detailsScheme {
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

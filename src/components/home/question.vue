<template >
  <section class="component question">
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="item of dataSet" :key="item.id">
        <div slot="title">
          <van-row>
            <van-col :span="3">
              <div class="question-title-icon">问</div>
            </van-col>
            <van-col :span="21">
              <div class="question-title-content">{{item.title}}</div>
            </van-col>
          </van-row>
        </div>
        <p class="question-content">{{item.content}}</p>
      </van-collapse-item>
    </van-collapse>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component({})
export default class Question extends Vue {

  // 当前激活的面板
  private activeNames = []

  private dataSet = [
    {
      id: 1,
      title: "在洋葱汽车买车有哪些优势?",
      content: "透明费用，流程渐变，还包购置税送保险。商场直接提供车源品牌保障，现有直营店近百家，遍布全国，超低购车门槛，审核简单，急速通道，首付 + 首期月供 + 押金（结清后退还押金）即可提车。"
    },
    {
      id: 2,
      title: "洋葱汽车购车流程是怎么样的?",
      content: "首先在线预约，选好意向车型后预约，洋葱骑车直营店，客户经理将在24小时内为您提供1对1服务，然后签约购车，选择合适的购车方案，收履约保证金，通过风控征信审核后签订购车协议。第三步支付费用，支付首付，第一期月供，违章保证金。最后到店提车，客户经理将联系您到附近的直营店提车"
    },
    {
      id: 3,
      title: "需要准备哪些材料?",
      content: "二代身份证、驾驶证、征信报告。"
    },
    {
      id: 4,
      title: "其他疑问谁能解答?",
      content: "关注 '云南洋葱汽车科技有限公司' 微信公众号"
    },
  ]

}
</script>

<style lang="less" scoped>
.question {
  &-title {
    .center() {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      height: 30px;
    }

    &-icon {
      color: white;
      background-color: #ffdb00;
      width: 30px;
      border-radius: 5px;
      .center();
    }
    &-content {
      font-weight: bold;
      .center();
    }
  }
  &-content {
    font-size: 0.9rem;
    text-align: left;
    text-indent: 1rem;
  }
}
</style>



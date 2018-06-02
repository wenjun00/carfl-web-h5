<template >
  <section class="component question">
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="item of dataSet" :key="item.id">
        <div slot="title">
          <van-row>
            <van-col :span="3">
              <img src="/static/images/home/question-ico.png">
            </van-col>
            <van-col :span="21" class="question-title">
              {{item.title}}
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
      title: "在洋葱汽车买车有哪些优势",
      content: "balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势"
    },
    {
      id: 2,
      title: "在洋葱汽车买车有哪些优势",
      content: "balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势"
    },
    {
      id: 3,
      title: "在洋葱汽车买车有哪些优势",
      content: "balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势"
    },
    {
      id: 4,
      title: "在洋葱汽车买车有哪些优势",
      content: "balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势"
    },
    {
      id: 5,
      title: "在洋葱汽车买车有哪些优势",
      content: "balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势balabala在洋葱汽车买车有哪些优势"
    }
  ]

}
</script>

<style lang="less" scoped>
.question {
  &-title {
    font-weight: bold;
  }
  &-content {
    font-size: 0.9rem;
    text-align: left;
    text-indent: 1rem;
  }
}
</style>



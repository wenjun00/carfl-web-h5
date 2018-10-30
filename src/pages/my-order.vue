<template>
  <section class="page my-order">

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {
  }
})
export default class MyOrder extends Vue {
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.my-order {
  &-no {
    margin-top: 20%;
    text-align: center;
  }
  &-title {
    height: 44px;
    line-height: 44px;
    .van-col {
      padding-left: 15px;
    }
  }
  &-month-pay {
    font-size: 0.8rem;
    color: gray;
    .van-col {
      padding-left: 15px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>


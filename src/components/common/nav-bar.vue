<!--导航页面-->
<template>
  <section class="component nav-bar">
    <van-popup v-model="showNavBar " position="right" @click-overlay="onNavItemClick(false)">
      <van-cell-group>
        <van-cell title="首页" to="/home" clickable @click="onNavItemClick" />
        <van-cell title="买新车" clickable @click="toBuyCarList" />
      </van-cell-group>
      <div class="van-hairline--bottom"></div>
      <van-cell-group v-if="!!userData">
        <van-cell title="我的订单" to="/my-order" clickable @click="onNavItemClick" />
        <van-cell title="月供还款" to="/payment-record" clickable @click="onNavItemClick" />
      </van-cell-group>
      <div class="van-hairline--bottom"></div>
      <van-cell-group >
        <van-cell title="常见问题" to="/FAQ" clickable @click="onNavItemClick" />
        <van-cell title="了解洋葱汽车" to="/know-onion-car" clickable @click="onNavItemClick" />
        <van-cell v-if="!!userData" title="退出" to="/" clickable @click="quit" />
        <van-cell v-else title="登陆" to="/login" clickable @click="onNavItemClick" />
      </van-cell-group>
    </van-popup>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Model, Emit } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";

@Component({})
export default class NavBar extends Vue {
  @State userData
  // 点击买新车
  toBuyCarList() {
    this.$router.push({
      name: 'BuyCarList',
      params: {
        brandId: '-1'
      }
    })
    this.onNavItemClick()
  }
  // 洋葱点击退出
  quit() {
    this.onNavItemClick()
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.location.reload()
  }

  /**
   * 因为popup 的 v-model 绑定的当前model/属性  
   * 所以这里需要使用计算器获取
  */
  get showNavBar() {
    return this.show
  }

  /**
   * 这里使用属性计算器 设置
   * 提交一个事件来使父组件改变model/属性的值
   */
  set showNavBar(val) {
    this.onNavItemClick(val)
  }

  @Model('change') show: boolean;

  @Emit('change')
  onNavItemClick(val = !this.show) { }

}
</script>

<style lang="less" scoped>
.nav-bar {
  text-align: left;
  .van-popup {
    &--right {
      height: 100%;
      margin-top: 45px;
      width: 60%;
    }
  }
}
</style>

<style lang="less">
.nav-bar {
  .van-modal {
    /*控制上面导航栏也展示出来 再加1像素*/
    margin-top: 46px;
  }
  .van-cell {
    position: initial;
  }
}
</style>


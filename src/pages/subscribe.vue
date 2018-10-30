<template >
  <section class="page subscribe">
    <p class="title">输入车辆信息</p>
    <van-cell-group>
      <van-field v-model="model.car" required disabled icon="arrow" placeholder="请选择车辆" @click-icon="carClick"/>
      <van-field v-model="model.name" required disabled icon="arrow" placeholder="请选择所在地" @click-icon="$toast('question')"/>
      <van-field v-model="model.huo" required disabled icon="arrow" placeholder="首次上牌时间" @click-icon="$toast('question')"/>
      <van-field v-model="model.gujia" center required placeholder="请输入行驶公里">
        <p slot="button" size="small"text>万公里</p>
      </van-field>
    </van-cell-group>
    <van-button type="primary" class="nextStepSty" bottom-action @click="addAffirm">获取估价</van-button>
    <!--#3799E3-->
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {}

})
export default class Subscribe extends Vue {
  private model:any = {
    car:'',
    name:'',
    huo:'',
    gujia:''
  }
  mounted() {

  }
  private addAffirm(){
    this.$router.push('/hot-loading')
  }
  private carClick(){
    this.$router.push('/buy-car-list')
  }

}
</script>
<style lang="less">
.page.subscribe {
  .title {
    color: #3799E3;
    font-size: 18px;
    margin-left: 15px;
    margin-top:20px;
  }
  .nextStepSty {
    margin-top: 40px;
    color: white!important;
    background: #3799E3!important;
  }
}
</style>



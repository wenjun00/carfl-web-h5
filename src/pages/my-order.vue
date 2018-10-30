<template>
  <section class="page my-order">
    <div style="width:100%;heght:400px;padding:10px;font-size:14px">
      <div style="display:flex;justify-content: space-between;">
        <p>2018款</p>
        <p>奥迪A3</p>
        <p style="margin-right:20px">30周年是东京核辐射的积分函数的</p>
      </div>
      <div style="font-size:12px;color:rgb(125,125,125);display:flex;justify-content: space-between;">
        <span>陕西 西安</span> |
        <span>2018年1月</span> |
        <span>5万公里</span> |
        <span>指导价44.59万元</span>
      </div>
      <div style="width:100%;margin-top:20px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index3.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况优秀</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">无任何事故，全程4S店保养</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">14.32</span><span style="display:inline-block;margin-left:12px">万元</span></p>
        </div>
      </div>
      <div style="width:100%;margin-top:10px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index1.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况良好</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">有过轻微刮蹭，定期修理店保养</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">15.42</span><span style="display:inline-block;margin-left:12px">万元</span></p>
        </div>
      </div>
      <div style="width:100%;margin-top:10px">
        <div style="width:100%;height:150px;position:relative">
          <img src="/static/images/common/index2.png" style="width:100%;height:100%"/>
          <p style="position:absolute;top:-10px;right:30px;z-index:999;font-size:26px;color:white">车况一般</p>
          <p style="position:absolute;top:45px;right:30px;z-index:999;font-size:12px;color:white">有过较大事故，出保额在5000元以上</p>
          <p style="position:absolute;top:80px;right:30px;z-index:999;color:white"><span style="font-size:24px">11.62</span><span style="display:inline-block;margin-left:12px">万元</span></p>
        </div>
      </div>
      <div style="display:flex;justify-content: center">
        <p style="font-size:14px"><b style="color:orange">营运车辆</b>，具体车况不同，对价格会有较大影响哦</p>
      </div>
    </div>

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
.page.my-order {
  padding:0px 17px 5px 5px;
}
</style>


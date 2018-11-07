<template >
  <section class="page hot-loading">
    <img  src="/static/images/common/wexinload.png" class="homeSize">
    <div class="fixed">
      <img src="../assets/img/wxgif.gif" style="width:60%">
    </div>
    <div class="fontbottom">
      <p class="fontSize">小旺正在为您分析数据...</p>
    </div>
    <div class="bottom">
      <div class="container">
        <div id="bar" style="width:1%;"></div>
      </div>
    </div>
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
  export default class HotLoading extends Vue {
    mounted() {
      let bar = document.getElementById("bar");
      let process = setInterval(()=>{
        bar.style.width = parseInt(bar.style.width) + 1 + "%";
        if (bar.style.width == "100%") {
          this.$router.push('/my-order')
          clearInterval(process);
          return;
        }
      },30);
    }
  }
</script>
<!--<style lang="less" scoped>-->
  <!--.page.hot-loading {-->
    <!--height: calc(~ '100vh - 46px') !important;-->
    <!--overflow: hidden !important;-->
  <!--}-->
<!--</style>-->
<style lang="less" scoped>
  .page.hot-loading {
    width:100%;
    height:100%;
    .fontbottom{
      width:100%;
      height: 20px;
      display: flex;
      justify-content: center;
      .fontSize{
        font-size: 14px;
        color: rgb(218,218,218);
        position: fixed;
        bottom:35px;
      }
    }
    .homeSize{
      width:100%;
      height: 100%;
    }
    .fixed{
      z-index: 999;
      position: fixed;
      top:20%;
      left:15%
    }
    .bottom{
      width:100%;
      height: 20px;
      display: flex;
      justify-content: center;
    }
    .container{
      position: fixed;
      bottom: 20px;
      width:70%;
      background: rgb(218,218,218);
      border-radius: 10px;
      height:20px;
    }
    #bar{
      background:#009AFC;
      border-radius: 10px;
      position: absolute;
      top:0px;
      left: 0px;
      height:100%;
    }

  }
</style>



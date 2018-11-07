<template>
  <section class="page home">
    <div style="width: 100%;height: 100%;">
      <img  src="/static/images/common/wehome.png" class="homeSize" @click="aaa">
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action, Getter } from "vuex-class";
@Component({
  components: {}
})
export default class Home extends Vue {
  @Action clearUserLoginData
  private aaa(){
    this.clearUserLoginData()
    this.$router.push('/subscribe')
  }
}
</script>
<style lang="less" scoped>
  .page.home {
    background: #92caf5!important;
    /*height: calc(~ '100vh - 46px') !important;*/
    /*overflow: hidden !important;*/
    .homeSize{
      height:100%;
      width:100%;
    }
  }
</style>



<template>
  <section class="page home">
    <img  src="/static/images/common/wehome.png" class="homeSize" @click="aaa">
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {}
})
export default class Home extends Vue {

  private aaa(){
    this.$router.push('/subscribe')
  }
}
</script>
<style lang="less" scoped>
  .page.home {
    height: calc(~ '100vh - 46px') !important;
    overflow: hidden !important;
    .homeSize{
      height:100%;
      width:100%;
    }
  }
</style>



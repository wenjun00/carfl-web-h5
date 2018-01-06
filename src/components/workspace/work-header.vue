<template>
<div class="component work-header row between-span middle-span">
  <div class="logo">
    <img src="assets/image/common/logo.png" width="200"></img>
  </div>
  <work-menu class="col-span"></work-menu>
  <div class="row">
    <work-theme></work-theme>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";
import WorkMenu from "~/components/workspace/work-menu.vue";
import WorkTheme from '~/components/workspace/work-theme.vue'
@Component({
  components:{
    WorkMenu,
    WorkTheme
  }
})
export default class WorkHeader extends Vue {
  @Prop() person;
  @Action select;
}
</script>

<style scoped>
.work-header{
  flex-basis:60px;
  height:60px;
  min-height:60px;
}

.logo{
  padding:10px;
}
</style>

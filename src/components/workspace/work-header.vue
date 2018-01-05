<template>
<div class="component work-header row between-span middle-span" style="color:white">
  <div>这是一个催收系统</div>
  <div class="row end-span middle-span">
      <work-user></work-user>
      <work-message></work-message>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Prop } from "vue-property-decorator";
// import { Action } from "vuex-class";
import WorkUser from "~/components/workspace/work-user.vue"
import WorkMessage from "~/components/workspace/work-message.vue"
@Component({
  components:{
    WorkUser,
    WorkMessage
  }
})
export default class WorkHeader extends Vue {
  // @Prop() person;
  // @Action select;
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

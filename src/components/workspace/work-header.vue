<template>
<div class="component work-header row between-span middle-span">

</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Prop } from "vue-property-decorator";
// import { Action } from "vuex-class";
import WorkMenu from "~/components/workspace/work-menu.vue"

@Component({
  components:{
    WorkMenu
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

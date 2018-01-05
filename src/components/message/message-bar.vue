<template>
  <section class="component message-bar">
    <div class="item-bar" @click="selectChange('message-list')">
       <svg-icon iconClass="xiaoxi" iconSize="30"></svg-icon>
    </div>
    <div class="item-bar" @click="selectChange('message-tree')">
      <svg-icon iconClass="kehu" iconSize="30"></svg-icon>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";
import { Watch, Prop, Emit ,Model} from "vue-property-decorator";
import SvgIcon from "~/components/common/svg-icon.vue";

@Component({
  components: {
    SvgIcon
  }
})
export default class MessageBar extends Vue {
   @Model('change') selected: string
   @Emit("change")
   selectChange(selected) {}
}
</script>

<style lang="less" scoped>
  .message-bar.component{
    width:50px;
    height:100%;

    .item-bar{
      width:50px;
      height:50px;
      line-height:50px;
      text-align:center;
    }
  }
</style>

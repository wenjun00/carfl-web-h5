<template>
  <section class="component work-message">
    <svg-icon iconClass="zengjia" @click=""></svg-icon>
    <el-dialog :visible.sync="dialog.messageBox">
      <message-box></message-box>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";
import MessageBox from "~/components/message/message-box.vue"
import SvgIcon from "~/components/common/svg-icon.vue";
const ModuleState = namespace('workspace', State)
const ModuleMutation = namespace('workspace', Mutation)

@Component({
  components: {
    MessageBox,
    SvgIcon
  }
})
export default class WorkMessage extends Vue {
  private dialog = {
    messageBox:false
  }
}
</script>

<style scoped>

</style>

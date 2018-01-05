<template>
  <section class="component message-box row no-warp">
    <message-bar v-model="selectedBar"></message-bar>
    <div class="row no-warp" v-show="selectedBar=='message-tree'">
        <message-list></message-list>
        <message-chat></message-chat>
    </div>
    <div class="row no-warp"  v-show="selectedBar=='message-user'">
        <message-tree></message-tree>
        <message-user></message-user>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";
import MessageUser from "~/components/message/message-user.vue"
import MessageList from "~/components/message/message-list.vue"
import MessageChat from "~/components/message/message-chat.vue"
import MessageBar from "~/components/message/message-bar.vue"
import MessageTree from "~/components/message/message-tree.vue"
@Component({
  components: {
    MessageUser,
    MessageChat,
    MessageBar,
    MessageList,
    MessageTree
  }
})
export default class MessageBox extends Vue {
private selectedBar = "message-user"
}
</script>

<style lang="less" scoped>
  .message-box.component{
    height:500px;
  }
</style>

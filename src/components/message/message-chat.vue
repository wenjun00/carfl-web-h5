<template>
  <section class="component message-chat">
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";

@Component({
  components: {}
})
export default class MessageChat extends Vue {

}
</script>

<style lang="less" scoped>
  .message-chat.component{
  }
</style>

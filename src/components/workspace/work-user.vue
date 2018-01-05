<template>
  <section class="component work-user">
    <span>{{userData.username}}</span>
    <router-link to="/">注销</router-link>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";

@Component({
  components: {}
})
export default class WorkUser extends Vue {
  @State userData
}
</script>

<style lang="less" scoped>
  .work-user.component{
    *{
      padding:10px;
      color:white;
    }
  }
</style>

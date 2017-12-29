<template>
  <section class="page user-manage">
    UserManage
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";

  @Layout('workspace')
  @Component({
    components: {}
  })
  export default class UserManage extends Vue {}

</script>

<style>


</style>

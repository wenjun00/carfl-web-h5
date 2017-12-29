<template>
  <section class="page organization-manage">
    OrganizationManage
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
  export default class OrganizationManage extends Vue {}

</script>

<style>


</style>

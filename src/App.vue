<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>

<style lang="less">
@import "./assets/styles/layout.less";
@import "./assets/styles/default.less";
@import "./assets/styles/common.less";
@import "normalize-css/normalize.css";
</style>

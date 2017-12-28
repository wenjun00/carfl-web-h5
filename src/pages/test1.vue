<template>
  <div>
    test1
    <button @click="$router.push('test2')">go test2</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Layout } from "../core/decorator";

@Layout('workspace')
@Component({
  components: {}
})
export default class Test1 extends Vue {}
</script>

<style>

</style>

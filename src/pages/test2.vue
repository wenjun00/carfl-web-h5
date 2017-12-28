<template>
  <div>
    test2
    <button @click="$router.push('test1')">go test2</button>
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
export default class Test2 extends Vue {

}
</script>

<style>
</style>

<template>
  <section class="page home-page theme-default">
    this is a test{{ttt}}
    <input></input>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
})
export default class Test2 extends Vue {
  constructor() {
    super();
  }
  @Prop()
  ttt:String;

  created() {
  }
  destroyed() {
  }
}
</script>

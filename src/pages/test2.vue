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
    console.log(1);
  }
  @Prop()
  ttt:String;

  created() {
    console.log("bbb");
  }
  destroyed() {
    console.log("ccc");
  }
}
</script>

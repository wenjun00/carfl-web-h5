<template>
  <section class="tree component">
    <ul>
      <tree-node :node.sync="node"></tree-node>
    </ul>
  </section>
</template>
<script lang="ts">
  import TreeNode from '~/components/common/TreeNode.vue'
  import Component from "vue-class-component";
  import Vue from "vue";
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      TreeNode
    }
  })

  export default class Tree extends Vue {
    @Prop()
    node: Array < any > ;
    // props: ['node']
  }

</script>
<style scoped>
  ul {
    padding: 0;
  }

</style>

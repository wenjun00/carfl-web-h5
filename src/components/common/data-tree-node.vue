<template>
  <section class="component data-tree-node">
    <div :style="getSubTreeStyle()">
      <div :style="{backgroundColor:selected?'lightblue':''}">
        <span @click="onExpand" v-if="!isLeaf" :class="{expanded:expanded}">
          <Icon v-show="!this.expanded" type="arrow-right-b"></Icon>
          <Icon v-show="this.expanded" type="arrow-down-b"></Icon>
        </span>
        <span v-if="showCheckbox">
          <i-checkbox v-model="checked"></i-checkbox>
        </span>
        <a @click="onSelect">{{data[propsObject.title]}}</a>
      </div>
      <div v-show="expanded" class="sub-node" v-if="data.children">
        <data-tree-node v-for="node in data.children" :key="node.id" :data="node"></data-tree-node>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DataTree from "~/components/common/data-tree.vue";

@Component({})
export default class DataTreeNode extends Vue {
  @Prop({
    required: true
  })
  data;

  public expanded = true;
  public checked = false;
  public selected = false;

  get propsObject() {
    return this.root.propsObject;
  }

  get showCheckbox() {
    return this.root.showCheckbox;
  }

  created() {
    this.expanded = !this.isLeaf;
  }

  get isLeaf(){
    return !(this.data.children&&this.data.children.length)
  }

  getSubTreeStyle() {
    return {
      marginLeft: this.isLeaf? "2em" : "1.5em",
      marginTop: "3px"
    };
  }

  /**
   * 节点展开处理
   */
  onExpand() {
    this.expanded = !this.expanded;
  }

  /**
   * 节点选择处理
   */
  onSelect() {
      this.selected = true
      this.root.selected = this
  }

  /**
   * 获取当前根节点
   */
  get root() {
    var parent = this.$parent;
    // 向上寻找根节点元素
    while (parent && parent.$options && parent.$options.name !== "DataTree") {
      parent = parent.$parent;
    }
    return parent as DataTree;
  }

  public setCheck(value){
    this.checked = value
  }

  mounted(){
    this.root.registerNode(this,this.data)
  }


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.component.data-tree-node {
  text-align: left;
  padding: 1px;
}
</style>

<template>
  <section class="component data-box">
    <div class="table">
      <el-table ref="table" :data="data" :stripe="stripe" @selection-change="onSelectionChange">
        <el-table-column v-if="selectionList" type="selection" width="80">
        </el-table-column>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <slot name="columns"></slot>
      </el-table>
    </div>
    <div v-if="page&&data&&data.length>0" class="page row end-span">
      <el-pagination size="small" :layout="page.layout" :total="page.total" :current-page.sync="page.pageIndex" :page-size="page.pageSize" @size-change="pageSizeChange" @current-change="pageIndexChange"></el-pagination>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";
import { Table } from "element-ui";

@Component({
  components: {}
})
export default class DataBox extends Vue {
  @Prop({ required: true })
  data: Array<any>;
  @Prop({ default: true })
  stripe: boolean;
  @Prop() page: PageService;
  @Prop() selectionList:any;
  @Emit("onPageChange")
  pageConfigChange(page) {}
  @Emit("update:selectionList")
  updateSelectionList(list) {}

  public table: any;

  /**
   * 组件初始化
   */
  created() {
    this.table = <any>this.$refs["table"];
  }

  /**
   * 监听绑定数据变化
   */
  @Watch("data")
  onDataChanged(newVal: string, oldVal: string) {}

  // @Watch("selectionList")
  // onSelectionChanged(newVal: Array<any>, oldVal: Array<any>) {
  //   let table =  <any>this.$refs["table"]
  //    console.log(table.selection)
  //   if(table.selection.length === 0){
  //     console.log(table.selection)
  //   }
  // }

  /**
   * 页码数量变化回调
   */
  pageSizeChange(value) {
    this.page.pageIndex = 1
    this.page.pageSize = value;
    this.pageConfigChange(this.page);
  }

  /**
   * 页码位置变化回调
   */
  pageIndexChange(value) {
    this.page.pageIndex = value;
    this.pageConfigChange(this.page);
  }

  onSelectionChange(list){
    if(this.selectionList){
      this.updateSelectionList(list)
    }
  }

  clearSelection(){
    this.table.clearSelection();
  }
}
</script>

<style lang="less" scoped>
.data-box {
  & > * {
    padding: 10px;
  }
}
</style>

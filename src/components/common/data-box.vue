<template>
  <div class="component data-box">
    <div class="table">
      <i-table ref="table" :columns="columns" :data="data" :stripe="stripe" :highlight-row="highlightRow" @on-row-click="rowClick" :width="width" :height="height" @on-current-change="currentChange" @on-selection-change="currentSelect" size="small"></i-table>
    </div>
    <div class="row end-span" :style="{'width':`${width}px`}">
      <i-page class="pagination" size="small" show-total show-sizer :show-elevator="page.showElevator" :current.sync="page.pageIndex" :total="page.total" :page-size.sync="page.pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange"></i-page>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";
import { Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class WorkHeader extends Vue {
  @Prop({
    required: true
  })
  columns: Array<any>;
  @Prop({
    required: true
  })
  data: Array<any>;
  @Prop({
    default: true
  })
  stripe: boolean;
  @Prop({
    default: false
  })
  highlightRow: boolean;
  @Prop({
    default: () => new PageService()
  })
  page: PageService;
  @Prop({
    // default: 530
  })
  height: Number;
  @Emit("onPageChange")
  pageConfigChange(page) {}
  @Emit("rowClick")
  getRowByClick(row) {}
  @Emit("currentChange") // 行单击高亮后change事件
  getRowInfo(currentRow, oldRow) {}

  @Prop() width: Number;
  // @Prop({default:500})
  // height:Number;

  public table;
  private multipleSelection;
  mounted() {
    this.table = this.$refs["table"];
  }
  /**
   * 监听绑定数据变化
   */
  @Watch("data")
  onDataChanged(newVal: string, oldVal: string) {}

  pageChange(value) {
    // this.page.pageIndex = 1;
    // this.page.pageSize = 1;
    this.pageConfigChange(this.page);
  }

  pageSizeChange(value) {
    this.page.pageIndex = 1;
    this.page.pageSize = value;
    this.pageConfigChange(this.page);
  }

  rowClick(row) {
    this.getRowByClick(row);
  }
  currentChange(currentRow, oldRow) {
    this.getRowInfo(currentRow, oldRow);
  }
  currentSelect(selection) {
    this.multipleSelection = selection;
  }
  exportDatabox() {
    this.table = this.$refs["table"];
    this.table.exportCsv({
      filename: "客户开户"
    });
  }
  getCurrentSelection() {
    return this.multipleSelection;
  }
}
</script>

<style lang="less" scoped>
.data-box {
  & > * {
    padding: 10px;
  }
}

.pagination {
  .ivu-select,
  .ivu-select-single .ivu-select-selection {
    width: 78px;
  }
}
</style>

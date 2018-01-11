<template>
  <div class="component data-box">
    <div class="table">
      <i-table ref="table" :columns="columns" :data="data" :stripe="stripe" :highlight-row="highlightRow" @on-row-click="rowClick"
        :width="width" @on-current-change="currentChange"></i-table>
    </div>
    <div class="row end-span" :style="{'width':`${width}px`}">
      <i-page class="pagination" size="small" show-total show-sizer :show-elevator="page.showElevator" :total="page.total" @on-change="pageChange"
        @on-page-size-change="pageChange"></i-page>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop,
    Emit
  } from "vue-property-decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Watch
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class WorkHeader extends Vue {
    @Prop({
      required: true
    })
    columns: Array < any > ;
    @Prop({
      required: true
    })
    data: Array < any > ;
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
    @Emit("pageChange")
    pageConfigChange(page) {}
    @Emit("rowClick")
    getRowByClick(row) {}
    @Emit("currentChange") // 行单击高亮后change事件
    getRowInfo(currentRow, oldRow) {}
    @Prop()
    width: Number;
    // @Prop({default:500})
    // height:Number;

    public table;

    mounted() {
      this.table = this.$refs["table"];
    }
    /**
     * 监听绑定数据变化
     */
    @Watch("data")
    onDataChanged(newVal: string, oldVal: string) {
      this.page.total = newVal.length
    }

    pageChange() {
      console.log(333)
      this.pageConfigChange(this.page);
    }
    rowClick(row) {
      this.getRowByClick(row)
    }
    currentChange(currentRow, oldRow) {
      this.getRowInfo(currentRow, oldRow)
    }
    exportDatabox() {
      this.table = this.$refs["table"]
      this.table.exportCsv({
        filename: '客户开户'
      })
    }
  }

</script>

<style lang="less" scoped>
  .data-box {
    &>* {
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

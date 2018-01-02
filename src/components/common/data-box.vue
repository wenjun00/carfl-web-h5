<template>
  <div class="component data-box">
    <div class="table">
      <el-table ref="table" :data="data" :stripe="stripe">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <slot name="columns"></slot>
      </el-table>
    </div>
    <div v-if="data&&data.length>0" class="page row end-span">
      <el-pagination size="small" :layout="page.layout" :total="page.total" :current-page.sync="page.pageIndex" :page-size="page.pageSize" @size-change="pageSizeChange" @current-change="pageIndexChange"></el-pagination>
    </div>
  </div>
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
export default class WorkHeader extends Vue {
  @Prop({ required: true })
  data: Array<any>;
  @Prop({ default: true })
  stripe: boolean;
  @Prop() page: PageService;
  @Emit("onPageChange")
  pageConfigChange(page) {}

  public table: Table;

  created() {
    this.table = <Table>this.$refs["table"];
  }
  /**
   * 监听绑定数据变化
   */
  @Watch("data")
  onDataChanged(newVal: string, oldVal: string) {}

  pageSizeChange(value) {
    this.page.pageIndex = 1
    this.page.pageSize = value;
    this.pageConfigChange(this.page);
  }

  pageIndexChange(value) {
    this.page.pageIndex = value;
    this.pageConfigChange(this.page);
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

<template>
  <div class="component data-box">
    <div class="table">
      <el-table ref="table" :data="data" :stripe="stripe">
        <slot name="table-columns"></slot>
      </el-table>
    </div>
    <div class="page row end-span">
      <el-pagination size="small" layout="total, sizes, prev, pager, next, jumper" :total="page.total" @on-change="pageChange" @on-page-size-change="pageChange"></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";

@Component({
  components: {}
})
export default class WorkHeader extends Vue {
  @Prop({ required: true })
  columns: Array<any>;
  @Prop({ required: true })
  data: Array<any>;
  @Prop({ default: true })
  stripe: boolean;
  @Prop({ default: () => new PageService() })
  page: PageService;
  @Emit("pageChange")
  pageConfigChange(page) {}

  public table;

  mounted() {
    this.table = this.$refs["table"];
  }
  /**
   * 监听绑定数据变化
   */
  @Watch("data")
  onDataChanged(newVal: string, oldVal: string) {
    this.page.total = newVal.length;
  }

  pageChange() {
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

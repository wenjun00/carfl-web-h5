<template>
  <section class="component data-box">
    <div class="table">
      <i-table ref="table" :columns="tableColumns" :data="data" stripe :highlight-row="highlightRow" @on-row-click="rowClick" :width="width" :height="height" @on-current-change="currentChange" @on-selection-change="currentSelect" size="small"></i-table>
    </div>
    <div class="row end-span" :style="{'width':`${width}px`}">
      <i-page class="pagination" size="small" show-total show-sizer :show-elevator="page.showElevator" :current.sync="page.pageIndex" :total="page.total" :page-size.sync="page.pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange"></i-page>
    </div>

    <template class="dialog">
      <i-modal title="列配置" v-model="dialog.dataBoxConfig" @on-ok="updateConfig">
        <data-box-config ref="data-box-config" v-model="dialog.dataBoxConfig" :id="id" v-if="filterColumns" :dataColumns="columns" :configColumns="filterColumns" @close="dialog.dataBoxConfig=false"></data-box-config>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";
import { Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { UserService } from "~/services/manage-service/user.service";
import DataBoxConfig from "~/components/common/data-box-config.vue";

@Component({
  components: {
    DataBoxConfig
  }
})
export default class DataBox extends Vue {
  @Dependencies(UserService) userService: UserService;

  // 列配置数据
  @Prop({
    required: true,
    default: () => []
  })
  columns: Array<any>;

  // 数据配置
  @Prop({
    required: true
  })
  data: Array<any>;

  // 开启高亮行
  @Prop({
    default: false
  })
  highlightRow: boolean;

  // 分页服务
  @Prop({
    default: () => new PageService()
  })
  page: PageService;

  // 表格高度
  @Prop({
    type: [Boolean, Number],
    default: 528
  })
  height: Number;

  // tableID
  @Prop({
    default: Number
  })
  id;

  // 分页更新事件
  @Emit("onPageChange")
  pageConfigChange(page) {}

  // 单行点击事件
  @Emit("rowClick")
  getRowByClick(row) {}

  // 当前选择行改变事件
  @Emit("currentChange")
  getRowInfo(currentRow, oldRow) {}

  @Prop() width: Number;

  private dialog = {
    dataBoxConfig: false
  };

  public table; // table对象
  private multipleSelection; // 多选数据
  private filterColumns: Array<any> | null = null;
  private tableColumns: Array<any> | null = [];

  /**
   * 添加默认显示列
   */
  addDefaultColumns(columns) {
    return [
      {
        align: "center",
        width: 90,
        key: "index",
        type: "index",
        renderHeader: (h, { column, index }) => {
          return h(
            "div",
            {
              on: {
                click: () => {
                  this.dialog.dataBoxConfig = true;
                }
              },
              style: {
                cursor: "pointer"
              }
            },
            [
              h("Icon", {
                props: {
                  type: "gear-b",
                  size: "20"
                }
              })
            ]
          );
        }
      },
      ...columns
    ];
  }

  /**
   * 获取表格带显示列
   */
  getTableColumns() {
    // 带显示列
    let columnList;

    if (!this.filterColumns) {
      // 空滤项为空时返回所有列
      columnList = this.columns;
    } else {
      // 按返回的过滤列进行过滤
      let filterKeys = this.filterColumns
        .filter(x => x.isCheck)
        .map(x => x.resoCode);

      columnList = this.columns
        .map(x => {
          let target = (<any[]>this.filterColumns).find(
            item => item.resoCode === x.key
          );
          if (target) {
            x.sort = target.sort;
          } else {
            x.sort = -1;
          }

          return x;
        })
        .sort((x: any, y: any) => x.sort - y.sort)
        .filter(
          (x: any) => !x.editable || (x.editable && filterKeys.includes(x.key))
        );
    }

    this.tableColumns = this.addDefaultColumns(columnList);
  }

  /**
   * 获取过滤列
   */
  getFilterColumns() {
    this.userService.findListboxByUserIdAndResoPid(this.id).subscribe(
      data => {
        this.filterColumns = data;
        this.getTableColumns();
      },
      () => {
        this.filterColumns = null;
        this.getTableColumns();
      }
    );
  }

  updateConfig() {
    let dataBoxConfig: any = this.$refs["data-box-config"];
    dataBoxConfig.submit(() => {
      this.getFilterColumns();
    });
  }

  /**
   * 监听绑定数据变化
   */
  // @Watch("data")
  // onDataChanged(newVal: string, oldVal: string) {}

  /**
   * 通知分页数据更新
   */
  pageChange(value) {
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

  /**
   * 导出数据
   */
  exportDatabox() {
    this.table.exportCsv({
      filename: "客户开户"
    });
  }

  getCurrentSelection() {
    return this.multipleSelection;
  }

  mounted() {
    this.table = this.$refs["table"];
    this.getFilterColumns();
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

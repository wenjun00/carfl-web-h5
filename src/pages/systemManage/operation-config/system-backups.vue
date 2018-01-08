<!--系统备份-->
<template>
  <section class="page system-backups">
    <i-row>
      <div class="form-title">系统备份</div>
      <i-button style="margin-left:10px;" class="blueButton" @click="addNewBackups">新增备份</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="editSysParamsModal" title="修改系统参数">
        <modify-system-params></modify-system-params>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Layout
  } from "~/core/decorator";
  import ModifySystemParams from "~/components/system-manage/modify-system-params.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      ModifySystemParams
    }
  })
  export default class SystemBackups extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private columns2: any;
    private treeColumns: any;
    private data1: Array < Object > = [];
    private treeData: Array < Object > = [];
    private treeDatabox: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = '';
    private openColumnsConfig: Boolean = false
    private openOneKeyToConnect: Boolean = false
    private editSysParamsModal: Boolean = false

    private checkRadio: String = ""
    activated() {}
    created() {
      this.columns1 = [{
          align: 'center',
          type: 'index',
          title: '序号',
          width: 60
        },
        {
          title: "操作",
          width: 220,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Message.info('恢复备份成功！')
                    }
                  }
                },
                "恢复数据"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.data1.forEach((x, i) => {
                            if (i === index) {
                              this.data1.splice(i, 1)
                            }
                          })
                        }
                      })
                    }
                  }
                },
                "删除备份"
              )
            ]);
          }
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center'
        },
        {
          title: '备份时间',
          key: 'backupTime',
          align: 'center'
        },
        {
          title: '备份方式',
          key: 'backupWay',
          align: 'center'
        }
      ]

      this.data1 = [{
        operator: 'liujia',
        backupTime: '2018-01-08 14:23:23',
        backupWay: '手动备份'
      }]

    }
    addNewBackups() {
      this.$Message.info('新增备份成功！')
      this.data1 = [{
        operator: 'liujia',
        backupTime: '2018-01-08 14:23:23',
        backupWay: '手动备份'
      }, {
        operator: 'liujia',
        backupTime: '2018-01-08 14:23:23',
        backupWay: '手动备份'
      }]
    }
    /**
     * 确定
     */
    confirm() {

    }
  }

</script>

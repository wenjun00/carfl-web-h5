<!--查询模版管理-->
<template>
  <section class="page query-template-manage">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">查询模版管理</span>
      <i-select style="margin-left:10px;width:10%;">
        <i-option v-for="{value,label} in $dict.getDictData('0428')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-button class="blueButton" style="margin-left:10px;" @click="query">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import { Dependencies } from "~/core/decorator";
  import { TemplateService } from "~/services/manage-service/template.service";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class QueryTemplateManage extends Page {
    @Dependencies(TemplateService) private templateService: TemplateService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private model: any = {};
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    query() {
      this.templateService.selectTemplate(this.model, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.query()
      this.columns1 = [
        {
          title: "操作",
          align: 'center',
          fixed: 'left',
          width: 150,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '查看'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？',
                      onOk: () => {
                        this.templateService.deleteTemplate({ templateId: row.id }).subscribe(data => {
                          this.$Message.success('删除成功！')
                          this.pageService.reset()
                          this.query()
                        }, ({ msg }) => {
                          this.$Message.error(msg)
                        })
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        },
        {
          title: "模版类型",
          key: "templateType",
          align: 'center',
          render: (h, { row, column, index }) => {
            return h("span", {}, this.$dict.getDictName(row.templateType));
          }
        },
        {
          title: "模版名称",
          key: "templateName",
          align: 'center'
        },
        {
          title: "创建人",
          key: "operator",
          align: 'center'
        }
      ]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
    }
  }

</script>

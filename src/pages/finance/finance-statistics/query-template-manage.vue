<!--导出模板管理-->
<template>
  <section class="page query-template-manage">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">导出模板管理</span>
      <i-select style="margin-left:10px;width:10%;" v-model="model.templateType" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0428')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-button class="blueButton" style="margin-left:10px;" @click="query">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" :page="pageService"></data-box>
    <template>
      <i-modal v-model="dialog.check" title="模板详情" width="900" :transfer="false">
        <section class="component check-template-detail">
          <div style="font-size:16px;line-height:20px"><svg-icon iconClass="daochu"></svg-icon><span style="margin-left:5px">收款信息</span></div>
          <div style="padding:10px 20px">
            <i-checkbox-group v-model="detailArr">
              <i-checkbox :label="v" :key="i" disabled v-for="(v, i) in detailAllArr"></Checkbox>
            </i-checkbox-group>
          </div>
        </section>
        <div slot="footer">
        </div>
      </i-modal>
    </template>
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
    private model: any = {
      templateType: ''
    };
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private dialog: any = {
      check: false
    };
    private detailAllArr: any = [];
    private detailArr: any = [];
    
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
                },
                on: {
                  click: () => {
                    this.dialog.check = true
                    this.templateService.getTemplateMessage({ id: row.id }).subscribe(data => {
                      this.detailAllArr = data.all || []
                      this.detailArr = data.part || []
                    }, ({ msg }) => {
                      this.$Message.error(msg)
                    })
                  }
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

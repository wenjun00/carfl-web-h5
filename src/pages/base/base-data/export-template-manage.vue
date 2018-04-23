<template>
    <section class="page customer-fodder-maintain">
        <page-header title="导出模板管理" hiddenPrint hiddenExport></page-header>
        <i-row>
            <!--<i-button class="blueButton" style="margin-left:10px" @click="resetSeach">重置</i-button>-->
            <i-row class="data-form">
                <i-col span="4">
                    <div class="data-form-item">
                        <div class="data-form-item-icon"></div>
                        <span>模版类型</span>
                    </div>
                    <div class="data-form-list">
                        <div class="data-form-list-template" v-for="{value,label} in $dict.getDictData('0428')" :key="value" :label="label" :value="value" :class="{'maintainCss':value===checkId}" @click="checkMaintain(value)">
                            <span>{{label}}</span>
                        </div>
                    </div>
                </i-col>
                <i-col class="command" span="19" offset="1">
                    <data-form hidden-date-search :model="personalModel" :page="pageService" @on-search="search">
                        <template slot="input">
                            <i-form-item prop="name" label="模块功能">
                                <i-input v-model="personalModel.name" placeholder="请输入模版、页面、功能名称查询"></i-input>
                            </i-form-item>
                        </template>
                        <template slot="button">
                            <i-button class="blueButton" @click="materialModelOne" v-if="addMater === true">新增模版</i-button>
                        </template>
                    </data-form>
                    <data-box :id="474" :columns="columns" :data="data1" @onPageChange="search" :page="pageService"></data-box>
                </i-col>
            </i-row>
        </i-row>
        <template>
            <i-modal title="新增模版" v-model="materialModel">
                <AddManageExport @close="closeMaterial" ref="add-manage"></AddManageExport>
                <div slot="footer">
                    <i-button class="Ghost" @click="cancelAddMaterial">取消</i-button>
                    <i-button class="blueButton" @click="newAdd">保存</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import SvgIcon from '~/components/common/svg-icon.vue'
import AddMaterial from '~/components/base-data/add-material.vue'
import EditMaterial from '~/components/base-data/edit-material.vue'
import AddManageExport from '~/components/base-data/add-manage-export.vue'
import { Form } from 'iview'
import { Dependencies } from '~/core/decorator'
import { DataDictService } from '~/services/manage-service/data-dict.service'
import { PersonalMaterialService } from '~/services/manage-service/personal-material.service'
import { PageService } from '~/utils/page.service'
import { TemplateService } from '~/services/manage-service/template.service'
import { Layout } from '~/core/decorator'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    AddMaterial,
    EditMaterial,
    AddManageExport
  }
})
export default class CustomerFodderMaintain extends Page {
  @Dependencies(DataDictService) private dataDictService: DataDictService
  @Dependencies(PersonalMaterialService)
  private personalMaterialService: PersonalMaterialService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(TemplateService) private templateService: TemplateService
  private columns: any
  private data1: Array<Object> = []
  private checkId: any = ''
  private item: any
  private personalModel: any = {}
  private materialModel: Boolean = false
  private editMaterialModel: Boolean = false
  private MaterialTypeModel: Boolean = false
  private editId: Number = 0
  private config: any = {}
  private itemData: any = {}
  private addMater: Boolean = false
  private templateType: String = ''

  created() {
    this.personalModel = {
      type: 376,
      name: ''
    }
    this.columns = [
      {
        title: '操作',
        align: 'center',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, column, index }) => {
          return h('div', [
            h(
              'i-button',
              {
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
                      content: '您确定要删除吗？',
                      onOk: () => {
                        this.delectMaintain(row)
                      }
                    })
                  }
                }
              },
              '删除'
            )
          ])
        }
      },
      {
        title: '模版名称',
        key: 'templateName',
        align: 'center',
        editable: true,
        minWidth: this.$common.getColumnWidth(8)
      },
      {
        title: '创建人',
        key: 'operator',
        align: 'center',
        editable: true,
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }
  checkMaintain(value) {
    console.log(value)
    console.log('测试点击事件')
    this.templateType = value
    this.addMater = true
    this.checkId = value
    this.templateService
      .selectTemplate(
        {
          templateType: this.checkId
        },
        this.pageService
      )
      .subscribe(
        data => {
          this.data1 = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  search() {}
  closeMaterial() {
    this.materialModel = false
    this.checkMaintain(this.checkId)
  }
  cancelAddMaterial() {
    this.materialModel = false
  }
  newAdd() {
    let _addManage: any = this.$refs['add-manage']
    _addManage.saveButton(this.checkId)
  }
  materialModelOne(templateType) {
    // console.log(this.templateType)
    if (this.templateType == '1153') {
      this.materialModel = true
      let _addManage: any = this.$refs['add-manage']
      _addManage.start()
    }

  }
  /**
   * 删除客户素材
   */
  delectMaintain(row) {
    this.templateService
      .deleteTemplate({
        templateId: row.id
      })
      .subscribe(
        val => {
          this.$Message.success('删除成功！')
          this.checkMaintain(this.checkId)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
}
</script>

<style lang="less" scoped>
.page.customer-fodder-maintain {
  .data-form {
    margin-top: 10px;
    .data-form-item {
      width: 250px;
      height: 30px;
      border: 1px solid #dddd;
      line-height: 30px;
      font-size: 16px;
      background-color: #f8f8f9;
      .data-form-item-icon {
        width: 4px;
        height: 15px;
        background: rgb(38, 94, 162);
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
    }
    .command {
      .command-item {
        width: 20%;
        margin-left: 10px;
      }
    }
    .data-form-list {
      width: 250px;
      height: 538px;
      border: 1px solid #dddd;
      border-top: 0;
      overflow: auto;
      .data-form-list-template {
        cursor: pointer;
        width: 100%;
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        position: relative;
        margin: auto;
      }
    }
  }
  .maintainCss {
    background: #e4f4fa;
  }
}
</style>

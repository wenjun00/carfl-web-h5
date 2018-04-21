<!--审批原因管理-->
<template>
    <section class="page approval-reason-manage">
        <page-header title="审批原因管理" hiddenPrint hiddenExport>
            <!-- <command-button label="导入" icon="daoru" @click="enterInto"></command-button>
      <command-button label="模板下载" icon="xiazai" @click="downloadTemplate"></command-button> -->
        </page-header>
        <data-form hidden-date-search :model="appReasonModel" :page="pageService" @on-search="seach">
            <template slot="input">
                <i-form-item prop="type" label="类型">
                    <i-select placeholder="全部" v-model="appReasonModel.type" clearable @on-change="selectType">
                        <i-option label="退回" :value="374" :key="374"></i-option>
                        <i-option label="拒绝" :value="375" :key="375"></i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="first" label="一级">
                    <i-select placeholder="全部" v-model="appReasonModel.first" clearable @on-change="firstSelect">
                        <i-option :label="item" :value="item" :key="item" v-for="item in firstOption">
                            <div :title="item">{{ item|subString(10)}}</div>
                        </i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="second" label="二级">
                    <i-select placeholder="全部" v-model="appReasonModel.second" clearable @on-change="secondSelect">
                        <i-option :label="item" :value="item" :key="item" v-for="item in secondOption">
                            <div :title="item">{{ item|subString(10)}}</div>
                        </i-option>
                    </i-select>
                </i-form-item>
                <i-form-item prop="CRC" label="CRC编码">
                    <i-input v-model="appReasonModel.CRC"></i-input>
                </i-form-item>
                <i-form-item prop="detail" label="详细内容">
                    <i-input v-model="appReasonModel.detail"></i-input>
                </i-form-item>
            </template>
        </data-form>
        <data-box :id="109" :columns="columns" :data="AppRoveReasonList" @onPageChange="seach" :page="pageService"></data-box>
        <div class="submitBar">
            <i-row type="flex" align="middle" style="padding:10px">
                <i-col :span="24" style="text-align:right;">
                    <i-button class="highButton" @click="addapprovalReasonBtn">新增审批原因</i-button>
                </i-col>
            </i-row>
        </div>
        <template>
            <i-modal title="新增审批原因" v-model="approvalReasonModel">
                <add-approval-reason ref="add-approval-reason" @close="closeApproval"></add-approval-reason>
                <div slot="footer">
                    <i-button class="Ghost" @click="cancelApprovalreason">取消</i-button>
                    <i-button class="blueButton" @click="submitApprovalReason">新增</i-button>
                </div>
            </i-modal>
        </template>
        <template>
            <i-modal title="编辑审批原因" v-model="editApprovalReasonModel">
                <edit-approval-reason ref="edit-approval-reason" @close="closeEditApproval" :AppRoveReasonList="AppRoveReasonList"></edit-approval-reason>
                <div slot="footer">
                    <i-button class="Ghost" @click="editcancel">取消</i-button>
                    <i-button class="blueButton" @click="editApproval">保存并退出</i-button>
                </div>
            </i-modal>
        </template>
        <template>
            <i-modal title="审批原因导入" v-model="enterIntoReasonModel" :transfer="false">
                <enter-approval-reason ref="enter-approval-reason" @close="closeEnterApproval"></enter-approval-reason>
                <div slot="footer">
                    <i-button class="Ghost" @click="entercancel">取消</i-button>
                    <i-button class="blueButton" @click="enterApproval">导入</i-button>
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
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import AddApprovalReason from '~/components/base-data/add-approval-reason.vue'
import EditApprovalReason from '~/components/base-data/edit-approval-reason.vue'
import EnterApprovalReason from '~/components/base-data/enter-approval-reason.vue'
import { ApproveReasonService } from '~/services/manage-service/approve-reason.service'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { CommonService } from '~/utils/common.service'
@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    AddApprovalReason,
    EditApprovalReason,
    EnterApprovalReason
  }
})
export default class ApprovalReasonManage extends Page {
  @Dependencies(ApproveReasonService)
  private approveReasonService: ApproveReasonService
  @Dependencies(PageService) private pageService: PageService
  private columns: any
  private columns2: any
  private appReasonModel: any = {}
  private data2: Array<any> = []
  private searchOptions: Boolean = false
  private isDisabled: Boolean = true
  private fileDataOpen: Boolean = false
  private AppRoveReasonList: Array<any> = []
  private approvalReasonModel: Boolean = false
  private editApprovalReasonModel: Boolean = false
  private enterIntoReasonModel: Boolean = false
  private userData: any = {}
  private firstOption: any = []
  private secondOption: any = []

  created() {
    this.seach()
    this.columns = [
      {
        align: 'center',
        title: '操作',
        minWidth: 170,
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
                    this.showEditApproval(row)
                  }
                }
              },
              '编辑'
            ),
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
                      content: '确定删除吗？',
                      onOk: () => {
                        this.deleteApproval(row)
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
        title: '类型',
        key: 'type',
        align: 'center',
        editable: true,
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.type))
        }
      },
      {
        title: '一级',
        key: 'first',
        align: 'center',
        editable: true
      },
      {
        title: '二级',
        key: 'second',
        align: 'center',
        editable: true
      },
      {
        title: 'CRC编码',
        key: 'crc',
        align: 'center',
        editable: true
      },
      {
        title: '详细内容',
        key: 'detail',
        align: 'center',
        editable: true
      },
      {
        title: '创建人',
        key: 'operator',
        align: 'center',
        editable: true
      },
      {
        title: '创建时间',
        key: 'operatorTime',
        align: 'center',
        editable: true,
        render: (h, { row, columns, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      }
    ]
    this.AppRoveReasonList = []
    this.appReasonModel = {
      first: '',
      second: '',
      CRC: '',
      detail: '',
      type: ''
    }
  }
  /**
   * 取消导入审批原因
   */
  entercancel() {
    this.enterIntoReasonModel = false
  }
  /**
   * 确定导入审批原因
   */
  enterApproval() {}

  /**
   * 取消编辑
   */
  editcancel() {
    this.editApprovalReasonModel = false
    let _editapprovalreason: any = this.$refs['edit-approval-reason']
    _editapprovalreason.reset()
  }
  /**
   * 取消
   */
  cancelApprovalreason() {
    this.approvalReasonModel = false
    let _addapprovalreason: any = this.$refs['add-approval-reason']
    _addapprovalreason.reset()
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  exportMonthReport() {}

  /**
   * selectChange
   */
  changeOption(val) {
    if (val) {
      this.isDisabled = false
    } else {
      this.isDisabled = true
    }
  }
  /**
   * 文件选择按钮点击
   */
  checkFile() {
    this.fileDataOpen = true
  }
  /**@augments
   * 分页查询审批原因
   */
  seach() {
    this.approveReasonService
      .getAllApproveReason(this.appReasonModel, this.pageService)
      .subscribe(
        data => {
          this.AppRoveReasonList = data
          this.AppRoveReasonList.map(v => {
            // if (v.type === 374) {
            //   v.type = '退回';
            // } else {
            //   v.type = '拒绝';
            // }
          })
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**\
   * 新增审批原因 按钮
   */
  addapprovalReasonBtn() {
    this.approvalReasonModel = true
  }
  /**
   * 新增审批原因 新增按钮
   */
  submitApprovalReason() {
    let openApproval: any = this.$refs['add-approval-reason']
    openApproval.validFun()
  }
  /**
   * 新增审批原因成功 关闭窗口
   */
  closeApproval() {
    this.approvalReasonModel = false
    this.seach() //刷新
  }
  /**
   * 获取创建人信息
   */
  mounted() {
    this.userData = this.$store.state.userData
  }
  /**
   * 删除审批原因管理
   */
  deleteApproval(row) {
    this.approveReasonService
      .deleteApproveReason({
        id: row.id
      })
      .subscribe(
        val => {
          this.$Message.success('删除成功！')
          this.seach() //刷新
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 编辑审批原因管理
   */
  showEditApproval(row) {
    this.editApprovalReasonModel = true
    let openApproval: any = this.$refs['edit-approval-reason']
    openApproval.rowParms(row)
  }
  editApproval() {
    let openApproval: any = this.$refs['edit-approval-reason']
    openApproval.validFun()
  }
  /**
   * 编辑审批原因成功 关闭窗口
   */
  closeEditApproval() {
    this.editApprovalReasonModel = false
    this.seach() //刷新
  }
  /**
   * 审批原因导入成功 关闭窗口
   */
  closeEnterApproval() {
    this.enterIntoReasonModel = false
    this.seach() //刷新
  }
  /**
   * 模板下载
   */
  downloadTemplate() {
    this.approveReasonService.downloadApproveReasonTemplate().subscribe(
      data => {
        CommonService.downloadFile(data, '模版下载')
      },
      msg => {
        this.$Message.error(msg)
      }
    )
  }
  /**
   * 导入审批原因
   */
  enterInto() {
    this.enterIntoReasonModel = true
  }
  /**
   * 重置搜索
   */
  resetSeach() {
    this.appReasonModel = {
      first: '',
      second: '',
      CRC: '',
      detail: '',
      type: ''
    }
  }
  /**
   * 选择类型 查询一级二级的select
   */
  selectType(val) {
    this.appReasonModel.type = val
    this.appReasonModel.first = ''
    this.appReasonModel.second = ''
    this.approveReasonService
      .getApproveReasonByCondition(this.appReasonModel)
      .subscribe(val => {
        console.log(val)
        let optionArray = val.map(v => v.first)
        let set1 = new Set(optionArray)
        this.firstOption = Array.from(set1)
      })
  }
  firstSelect(val) {
    this.appReasonModel.type = this.appReasonModel.type
    this.appReasonModel.first = val
    this.appReasonModel.second = ''
    if (val) {
      this.approveReasonService
        .getApproveReasonByCondition(this.appReasonModel)
        .subscribe(val => {
          let secondArray = val.map(v => v.second)
          let set2 = new Set(secondArray)
          this.secondOption = Array.from(set2)
        })
    }
  }
  secondSelect(val) {
    this.appReasonModel.type = this.appReasonModel.type
    this.appReasonModel.first = this.appReasonModel.first
    this.appReasonModel.second = val
  }
}
</script>
<style lang="less" scoped>


</style>

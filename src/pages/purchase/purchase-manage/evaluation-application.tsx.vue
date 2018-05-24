<!--评估申请-->
<template>
  <section class="page evaluation-application">
    <page-header title="评估申请" hidden-print hidden-export>
      <command-button label="新建申请" @click="newApplication"></command-button>
    </page-header>
    <data-form :model="applicationModel" @on-search="getApplicationList">
      <template slot="input">
        <i-form-item prop="carParams" label="品牌型号">
          <i-input placeholder="请输入品牌、系列" v-model="applicationModel.carParams"></i-input>
        </i-form-item>
        <i-form-item prop="carNo" label="车牌号码">
          <i-input placeholder="请输入车牌号码" v-model="applicationModel.carNo"></i-input>
        </i-form-item>
        <i-form-item prop="ownerName" label="客户姓名">
          <i-input placeholder="请输入客户姓名" v-model="applicationModel.ownerName"></i-input>
        </i-form-item>
        <i-form-item prop="isSubmit">
          <i-checkbox v-model="whetherInclude">包含已提交</i-checkbox>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="applicationColumns" :data="dataSet" :page="pageService" @onPageChange="getApplicationList"></data-box>

    <template>
      <i-modal width="680" v-model="applicationModal" title="查看详情" class="apply-for-application">
        <apply-for-application ref="apply-for-application"></apply-for-application>
        <div slot="footer">
          <i-button size="large" type="ghost" @click="applicationModal=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="detailsModal" title="查看评估" width="780">
        <add-collateral-details ref="add-collateral-details"></add-collateral-details>
        <div slot="footer">
          <i-button @click="canselDetails">取消</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="newModal" title="新建申请" width="780">
        <new-application ref="new-application" @close="close"></new-application>
        <div slot="footer">
          <i-button type="primary" size="large" @click="selectStep" v-if="selectButton">选择</i-button>
          <i-button type="ghost" size="large" @click="advanceStep" v-if="!selectButton">上一步</i-button>
          <!--<i-button type="primary" size="large" @click="saveStep" v-if="!selectButton">保存草稿</i-button>-->
          <i-button type="primary" size="large" @click="commitApplication" v-if="!selectButton">提交申请</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>
<script lang="tsx">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { Button } from 'iview'
import { AssessMentApplyService } from '~/services/manage-service/assess-ment-apply.service'
import ApplyForApplication from '~/components/purchase-manage/apply-for-application.vue'
import { Modal } from 'iview'
import AddCollateralDetails from '~/components/purchase-manage/add-collateral-details.vue'
import NewApplication from '~/components/purchase-manage/new-application.vue'

@Layout('workspace')
@Component({
  components: {
    ApplyForApplication,
    AddCollateralDetails,
    NewApplication
  }
})
export default class EvaluationApplication extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentApplyService)
  private assessMentApplyService: AssessMentApplyService
  private applicationModal: Boolean = false
  private whetherInclude: Boolean = true;
  private dataSet: Array<any> = []
  private detailsModal: Boolean = false
  private newModal: Boolean = false
  private selectButton: Boolean = true
  private assessmentStatus: any = '' //传给后台的案件状态

  private brand: any = '' //子组件传的品牌ID
  private serice: any = ''//子组件传的系列ID
  private car: any = '' //子组件传的型号ID


  private applicationModel: any = {
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    ownerName: '', // 客户姓名
    isSubmit: '0' // 包含提交
  }
  private assessmentNo: String = '' // 车辆详情号
  private applicationColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(4),
      render: (h, { row }) => {
        // 1187 (待提交), 1189(待領取), 1190(待评估), 1191(已评估)
        return (
          <div>
            <i-button type="text"
              v-show={row.assessmentStatus === 1187 || row.assessmentStatus === 1192}
              onClick={() => this.editList(row)}
            >
              编辑
            </i-button>
            <i-button type="text"
              v-show={row.assessmentStatus === 1187}
              onClick={() => {
                this.$Modal.confirm({
                  title: '提示',
                  content: '您确定是否删除？',
                  onOk: () => {
                    this.deleteRow(row);
                  },
                });
              }}
            >
              删除
            </i-button>
            <i-button
              v-show={[1189, 1190, 1191].includes(row.assessmentStatus)}
              type="text"
              onClick={() => this.getDetailsList(row)}
            >
              详情
            </i-button>
            <i-button type="text"
              v-show={row.assessmentStatus === 1189}
              onClick={() => this.getWithdrawRow(row)}
            >
              撤回
            </i-button>
          </div>
        )
      }
    },
    {
      title: '评估编号',
      editable: true,
      key: 'assessmentNo',
      minWidth: this.$common.getColumnWidth(6),
      align: 'center'
    },
    {
      title: '状态',
      editable: true,
      key: 'assessmentStatus',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center',
      render: (h, { row }) => {
        return h('span', {}, this.$dict.getDictName(row.assessmentStatus))
      }
    },
    {
      title: '品牌',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'brandName',
      align: 'center'
    },
    {
      title: '系列',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'seriesName',
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'carName',
      align: 'center'
    },
    {
      title: '颜色',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'carColor',
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'carNo',
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      key: 'frameNo',
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      key: 'engineNo',
      align: 'center'
    },
    {
      title: '客户姓名',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'ownerName',
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'ownPhone',
      align: 'center'
    },
    {
      title: '申请人',
      editable: true,
      key: 'applicant',
      minWidth: this.$common.getColumnWidth(4),
      align: 'center'
    },
    {
      title: '申请时间',
      editable: true,
      sortable: true,
      minWidth: this.$common.getColumnWidth(4),
      key: 'applyTime',
      align: 'center',
      render: (h, { row }) => {
        return h('span', this.$filter.dateFormat(row.applyTime, 'yyyy-MM-dd'))
      }
    },
    {
      title: '评估人',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'assessmentPerson',
      align: 'center'
    }
  ]

  /**
   *评估申请订单查询
   */
  getApplicationList() {
    this.applicationModel.isSubmit = this.whetherInclude ? '1' : '0'
    this.assessMentApplyService
      .orderSearch(this.applicationModel, this.pageService)
      .subscribe(
        data => {
          this.dataSet = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 评估申请查看详情
   */
  getDetailsList(row) {
    if (row.assessmentStatus == 1191) {
      this.$dialog.show({
        title: '查看申请',
        footer: true,
        isView: true,
        width: 800,
        render: h => h(AddCollateralDetails, { props: { assessmentNo: row.assessmentNo } })
      })
    } else {
      this.applicationModal = true
      let applyForApplication = this.$refs['apply-for-application'] as ApplyForApplication
      applyForApplication.getApplicationDetail(row)
    }
  }
  /**
    * 评估申请删除
    */
  deleteRow(row) {
    this.assessMentApplyService.deleteOrderInfoByOrderId({ id: row.orderId })
      .subscribe(data => {
        this.$Message.success("删除成功");
        this.getApplicationList()
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
  /**
   * 评估申请撤回
   */
  getWithdrawRow(row) {
    this.$Modal.confirm({
      title: '提示',
      content: '是否确定撤回评估申请？撤回后可重新编辑并提交。',
      onOk: () => {
        this.assessMentApplyService.withdrawStatus({ orderId: row.orderId, status: row.assessmentStatus })
          .subscribe(data => {
            this.$Message.success("撤回申请成功");
            this.getApplicationList()
          }, ({ msg }) => {
            this.$Message.error(msg)
          })      }
    })
  }
  /**
   * 新建申请
   */
  newApplication() {
    this.newModal = true
    let newApplication = this.$refs['new-application'] as NewApplication
    newApplication.carTree()
  }
  /**
   * 新建申请选择下一步
   */
  selectStep() {
    let newApplication = this.$refs['new-application'] as NewApplication
    
    this.brand = newApplication.fatherId
    this.serice = newApplication.SerciseId
    this.car = newApplication.CarId

    if (!!this.brand && !!this.serice && !!this.car) {
      this.selectButton = false
      newApplication.lastStep()
    } else {
      this.$Message.warning("请选择品牌、车系、车型!")
      return
    }

  }
  /**
   * 选择上一步
   */
  advanceStep() {
    this.selectButton = true
    let newApplication = this.$refs['new-application'] as NewApplication
    newApplication.backStep()
  }
  /**
   * 提交申请
   */
  commitApplication() {
    this.assessmentStatus = 1188
    let newApplication = this.$refs['new-application'] as NewApplication
    newApplication.submission(this.assessmentStatus)
  }
  /**
   * 编辑
   */
  editList(row) {
    this.newModal = true
    let newApplication = this.$refs['new-application'] as NewApplication
    newApplication.editProject(row)
  }

  /**
   *  保存草稿
   */
  saveStep() {
    this.assessmentStatus = 1187
    let newApplication = this.$refs['new-application'] as NewApplication
    newApplication.submission(this.assessmentStatus)
  }

  mounted() {
    this.getApplicationList()
  }
  canselDetails() {
    this.detailsModal = false
  }
  activated() {
    this.getApplicationList()
  }
  close() {
    this.newModal = false
    this.selectButton = true
    this.getApplicationList()
  }
}
</script>

<style lang="less" scoped>
.page.evaluation-application {
}
</style>
<style lang="less" scoped>
.apply-for-application {
  .ivu-modal-footer {
    text-align: center;
  }
}
</style>

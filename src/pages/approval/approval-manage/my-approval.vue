<!--我的审核-->
<template>
  <section class="page my-approval">
    <page-header title="我的审核"></page-header>
    <data-form date-prop="timeSearch" :model="myOrderModel" @on-search="getMyOrderList" :page="pageService" hidden-reset>
      <template slot="input">
        <i-form-item prop="personalInfo">
          <i-input v-model="myOrderModel.personalInfo" placeholder="请录入客户姓名\证件号码\手机号查询"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="myOrderModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        <i-form-item prop="province" label="省市：">
          <i-select placeholder="选择省" v-model="myOrderModel.province" clearable>
            <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="city">
          <i-select placeholder="选择市" v-model="myOrderModel.city" clearable :disabled="!myOrderModel.province">
            <i-option v-for="{value,label} in this.myOrderModel.province ? this.$city.getCityData({ level: 1, id: this.myOrderModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="productType" label="产品名称:">
          <i-input v-model="myOrderModel.productType"></i-input>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="280" :columns="columns1" :data="myOrderList" @onPageChange="getMyOrderList" :page="pageService"></data-box>
    <!--Modal-->
    <template>
      <i-modal class="modal" v-model="approveModal" title="审批" :width="1030">
        <approve ref="approve"></approve>
        <div slot="footer">
          <i-button class="left-button" @click="backToResource">退回资源池</i-button>
          <div class="cutline"></div>
          <i-button class="left-button" @click="submitToGray">灰名单</i-button>
          <i-button class="left-button" @click="submitToblack">黑名单</i-button>
          <i-button class="left-button" @click="submitToInternal">
            提交内审
          </i-button>
          <div class="cutline"></div>
          <i-button class="right-button" size="large" @click="rejectOrder">拒绝
          </i-button>
          <i-button class="right-button" size="large" @click="rebackClick">退件
          </i-button>
          <i-button class="right-button" size="large" @click="pass">
            通过
          </i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="灰名单" v-model="grayListModal">
        <i-form>
          <i-form-item label="详细原因">
            <i-input type="textarea" v-model="grayModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddGray">取消</i-button>
          <i-button @click="confirmAddGray" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="提交内审" v-model="submitToInternalModal">
        <i-form>
          <i-form-item label="详细原因">
            <i-input type="textarea" v-model="internalModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddInternal">取消</i-button>
          <i-button @click="confirmAddInternal" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal :title="rejectOrBlackFlag?'拒绝':'黑名单'" v-model="blackListModal">
        <i-form>
          <i-form-item v-if="rejectOrBlackFlag">
            <i-select placeholder="请选择结果" class="modal-result" v-model="approvalRecordModel.result" @on-change="changeSelectOne">
              <i-option label="拒绝" :value="375" :key="375"></i-option>
            </i-select>
            <i-select placeholder="一级原因" class="modal-reason" v-model="approvalRecordModel.first">
              <i-option v-for="item in refuseReason" :key="item.first" :label="item.first" :value="item.first">
                <div :title="item.first">{{ item.first|subString}}</div>
              </i-option>
            </i-select>
            <i-select placeholder="二级原因" class="modal-reason" v-model="approvalRecordModel.second" @on-change="changeSelectTwo">
              <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second">
                <div :title="item.second">{{ item.second|subString}}</div>
              </i-option>
            </i-select>
            <i-select placeholder="全部拒单细节" class="modal-detail" v-model="approvalRecordModel.approveReasonId">
              <i-option v-for="item in refuseDetail" :key="item.id" :label="item.detail" :value="item.id">
                <div :title="item.detail">{{ item.detail|subString}}</div>
              </i-option>
            </i-select>
          </i-form-item>
          <i-form-item>
            <i-input type="textarea" v-model="approvalRecordModel.remark" placeholder="请录入详细原因（非必填，限制1000字以内）" :maxlength="1000"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddBlack">取消</i-button>
          <i-button @click="confirmAddBlackOrIntenal" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="退回申请" v-model="rebackModal" @on-ok="approveModal=false">
        <i-form>
          <i-form-item>
            <i-select placeholder="请选择结果" class="modal-result" v-model="approvalRecordModel.result" @on-change="changeSelectOne">
              <i-option label="退件" :value="374" :key="374"></i-option>
            </i-select>
            <i-select placeholder="全部拒单原因" class="modal-reason" v-model="approvalRecordModel.second" @on-change="changeSelectTwo">
              <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second"></i-option>
            </i-select>
            <i-select placeholder="全部拒单细节" class="modal-detail" v-model="approvalRecordModel.approveReasonId">
              <i-option v-for="item in refuseDetail" :key="item.id" :label="item.detail" :value="item.id"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item>
            <i-input type="textarea" v-model="approvalRecordModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelBackToComing">取消</i-button>
          <i-button @click="confirmBackToComing" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!-- 面审通过 -->
    <template>
      <i-modal title="审批通过" v-model="approvePassedModal" @on-ok="approveModal=false">
        <i-form>
          <i-form-item label="备注说明">
            <i-input type="textarea" v-model="facePassModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="facePassCancel">取消</i-button>
          <i-button @click="facePassConfirm" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--复审终审-->
    <template>
      <i-modal title="审批通过" v-model="secendLastApproval" :width="800">
        <second-last-approve ref="second-last" @close="closeAndRefresh"></second-last-approve>
        <div slot="footer">
          <i-button @click="secendLastApprovalPassCancel">取消</i-button>
          <i-button @click="secendLastApprovalPassConfirm" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--合规通过-->
    <template>
      <i-modal title="审批通过" v-model="meetConditionApproval" @on-visible-change="closeApproval">
        <i-form :label-width="100">
          <i-row>
            <i-col>
              <i-form-item label="合同生效开始日">
                <i-date-picker v-model="passModel.contractDate" placeholder="请选择日期范围"></i-date-picker>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col>
              <i-form-item label="备注">
                <i-input type="textarea" :rows="4" v-model="passModel.remark"></i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
        <div slot="footer">
          <i-button @click="meetConditionPassCancel">取消</i-button>
          <i-button @click="meetConditionPassConfirm" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import DataBox from '~/components/common/data-box.vue'
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import Approve from '~/components/approval-manage/approve.vue'
import SecondLastApprove from '~/components/approval-manage/second-last-approve.vue' // 复审终审通过
import { ApprovalService } from '~/services/manage-service/approval.service'
import { PageService } from '~/utils/page.service'
import { CityService } from '~/utils/city.service'
import { ApproveReasonService } from '~/services/manage-service/approve-reason.service'
import SvgIcon from '~/components/common/svg-icon.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    Approve,
    SecondLastApprove,
    SvgIcon
  }
})
export default class MyApproval extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ApproveReasonService)
  private approveReasonService: ApproveReasonService

  private columns1: any
  private myOrderList: Array<Object> = []
  private orderModal: Boolean = false
  private searchOptions: Boolean = false
  private approveModal: Boolean = false
  private submitToInternalModal: Boolean = false
  private blackListModal: Boolean = false
  private grayListModal: Boolean = false
  private rejectModal: Boolean = false
  private rebackModal: Boolean = false
  private approvePassedModal: Boolean = false
  private secendLastApproval: Boolean = false // 复审终审通过弹窗
  private meetConditionApproval: Boolean = false // 合规通过弹窗
  private approveStatue: number = 0
  private compactEffect: String = '当月'
  private approvalOrderId: number = 0
  private rejectOrBlackFlag: Boolean = false

  private getPasspple: any = ''
  private passModel: any = {
    remark: '',
    orderId: '',
    contractDate: ''
    // effectiveType: 1160
  }
  private myOrderModel: any = {
    startTime: '',
    endTime: '',
    province: '',
    city: '',
    personalInfo: '',
    timeSearch: '',
    productType: '',
    dateRange: []
  }
  // 灰名单
  private grayModel: any = {
    remark: '',
    orderId: '',
    operateType: 1
  }
  // 黑名单
  private approvalRecordModel: any = {
    result: '',
    type: '',
    first: '',
    second: '',
    approveReasonId: '',
    remark: '',
    operateType: 2
  }
  // 内审
  private internalModel: any = {
    remark: '',
    operateType: 0
  }
  // 面审通过model
  private facePassModel: any = {
    remark: ''
  }
  private refuseReason: Array<Object> = [] // 拒单原因
  private refuseDetail: Array<Object> = [] // 拒单细节
  created() {
    this.columns1 = [{
      title: '操作',
      minWidth: this.$common.getColumnWidth(4),
      fixed: 'left',
      align: 'center',
      render: (h, {
        row,
        column,
        index
      }) => {
        return h('div', [
          h(
            'i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
              on: {
                click: () => {
                  this.approveClick(row)
                }
              }
            },
            '审核'
          )
        ])
      }
    },
    {
      key: 'orderLink',
      align: 'center',
      editable: true,
      title: '环节',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, {
        row,
        columns,
        index
      }) => {
        if (row.riskStatus) {
          return h('div', [
            h('span', {}, this.$dict.getDictName(row.orderLink)),
            h(
              'Tooltip', {
                class: {
                  'auto-warp': true
                },
                props: {
                  content: row.riskRemark
                }
              }, [
                h('svg-icon', {
                  props: {
                    iconClass: this.getIconClass(row)
                  },
                  style: {
                    color: this.getIconColor(row),
                    fontSize: '26px',
                    position: 'relative',
                    top: '6px'
                  }
                })
              ]
            )
          ])
        } else {
          return h('div', [
            h('span', {}, this.$dict.getDictName(row.orderLink))
          ])
        }
      }
    },
    {
      title: '订单状态',
      align: 'center',
      editable: true,
      key: 'orderStatus',
      minWidth: this.$common.getColumnWidth(2),
      render: (h, {
        row,
        columns,
        index
      }) => {
        return h('span', {}, this.$dict.getDictName(row.orderStatus))
      }
    },
    {
      title: '订单编号',
      key: 'orderNumber',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      align: 'center',
      render: (h, {
        row,
        columns,
        index
      }) => {
        return h(
          'i-button', {
            props: {
              type: 'text'
            },
            on: {
              click: () => {
                this.$dialog.show({
                  title: '订单详情',
                  footer: true,
                  width: 1200,
                  isView: true,
                  render: h => h(PurchaseInformation, { props: { orderNumber: row.orderNumber } })
                })
              }
            }
          },
          row.orderNumber
        )
      }
    },
    {
      align: 'center',
      title: '订单创建时间',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      key: 'createTime',
      render: (h, {
        row,
        column,
        index
      }) => {
        return h(
          'span',
          this.$filter.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
        )
      }
    },
    {
      align: 'center',
      title: '领取时间',
      editable: true,
      key: 'receiveDate',
      minWidth: this.$common.getColumnWidth(6),
      render: (h, {
        row,
        column,
        index
      }) => {
        return h(
          'span',
          this.$filter.dateFormat(row.receiveDate, 'yyyy-MM-dd hh:mm:ss')
        )
      }
    },
    {
      align: 'center',
      title: '处理时间',
      editable: true,
      minWidth: this.$common.getColumnWidth(6),
      key: 'approvalDate',
      render: (h, {
        row,
        column,
        index
      }) => {
        return h(
          'span',
          this.$filter.dateFormat(row.approvalDate, 'yyyy-MM-dd hh:mm:ss')
        )
      }
    },
    {
      align: 'center',
      title: '省份',
      editable: true,
      key: 'province',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, {
        row,
        column,
        index
      }) => {
        return h('span', CityService.getCityName(row.province))
      }
    },
    {
      align: 'center',
      title: '城市',
      editable: true,
      key: 'city',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, {
        row,
        column,
        index
      }) => {
        return h('span', CityService.getCityName(row.city))
      }
    },
    {
      align: 'center',
      title: '订单类型',
      editable: true,
      key: 'orderType',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, {
        row,
        columns,
        index
      }) => {
        return h('span', {}, this.$dict.getDictName(row.orderType))
      }
    },
    {
      align: 'center',
      editable: true,
      title: '产品名称',
      key: 'productName',
      minWidth: this.$common.getColumnWidth(3),
    },
    {
      align: 'center',
      editable: true,
      title: '客户姓名',
      key: 'personalName',
      minWidth: this.$common.getColumnWidth(3),
    },
    {
      align: 'center',
      editable: true,
      title: '证件号码',
      minWidth: this.$common.getColumnWidth(6),
      key: 'idCard'
    },
    {
      align: 'center',
      editable: true,
      title: '手机号',
      minWidth: this.$common.getColumnWidth(4),
      key: 'mobileMain'
    }
    ]
  }
  /**
   * 退件
   */
  rebackClick() {
    this.reset()
    this.rebackModal = true
  }

  closeAndRefresh() {
    this.secendLastApproval = false
    this.approveModal = false
    this.getMyOrderList()
  }



  /**
   * 获取Icon类
   */
  getIconClass(row) {
    if (row.riskStatus === 345) {
      return 'heimingdan'
    } else if (row.riskStatus === 346) {
      return 'huimingdan'
    } else if (row.riskStatus === 347) {
      return 'neishen'
    }
  }

  /**
   * 获取Icon颜色
   */
  getIconColor(row) {
    if (row.riskStatus === 345) {
      return '#666666'
    } else if (row.riskStatus === 346) {
      return '#B6B6B6'
    } else if (row.riskStatus === 347) {
      return '#F9435D'
    }
  }

  /**
   * 面审通过取消
   */
  facePassCancel() {
    this.approvePassedModal = false
    this.facePassModel.remark = ''
  }

  /**
   * 面审通过确定
   */
  facePassConfirm() {
    this.approvalService
      .passApproval({
        orderId: this.approvalOrderId,
        remark: this.facePassModel.remark
      })
      .subscribe(
        data => {
          this.$Message.success('操作成功！')
          this.approvePassedModal = false
          this.facePassModel.remark = ''
          this.approveModal = false
          this.getMyOrderList()
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 复审终审通过取消
   */
  secendLastApprovalPassCancel() {
    this.secendLastApproval = false
  }

  /**
   * 复审终审通过确定
   */
  secendLastApprovalPassConfirm() {
    let _secondLast: any = this.$refs['second-last']
    _secondLast.confirmPass()
    this.getMyOrderList()
  }

  /**
   * 合规通过取消  meetConditionPassCancel
   */
  meetConditionPassCancel() {
    this.meetConditionApproval = false
  }
  closeApproval() {
    this.passModel.remark = ''
    this.passModel.contractDate = ''
    // this.passModel.effectiveType = 1160
  }

  /**
   * 合规通过确定
   */
  meetConditionPassConfirm() {
    this.passModel.contractDate = this.$filter.dateFormat(
      this.passModel.contractDate,
      'yyyy-MM-dd'
    )
    this.passModel.orderId = this.approvalOrderId
    this.approvalService.passApproval(this.passModel).subscribe(
      data => {
        this.$Message.success('操作成功！')
        this.meetConditionApproval = false
        this.approveModal = false
        this.getMyOrderList()
        this.passModel.remark = ''
        this.passModel.contractDate = ''
        // this.passModel.effectiveType = 1160
      },
      ({
        msg
      }) => {
        this.$Message.error(msg)
      }
    )
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  changeSelectOne(val) {
    this.approvalRecordModel.approveReasonId = ''
    this.approvalRecordModel.second = ''
    this.approvalRecordModel.type = val
    this.approveReasonService
      .getApproveReasonByCondition(this.approvalRecordModel)
      .subscribe(
        data => {
          this.refuseReason = data
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
  }

  changeSelectTwo(val) {
    this.approvalRecordModel.second = val
    this.approvalRecordModel.approveReasonId = ''
    this.approveReasonService
      .getApproveReasonByCondition(this.approvalRecordModel)
      .subscribe(
        data => {
          this.refuseDetail = data
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
  }
  reset() {
    this.approvalRecordModel.remark = ''
    this.approvalRecordModel.approveReasonId = ''
    this.approvalRecordModel.second = ''
    this.approvalRecordModel.result = ''
    this.approvalRecordModel.first = ''
  }

  /**
   * 取消退件
   */
  cancelBackToComing() {
    this.rebackModal = false
    this.reset()
  }

  /**
   * 确定退件
   */
  confirmBackToComing() {
    this.approvalRecordModel.orderId = this.approvalOrderId
    if (this.approvalRecordModel.approveReasonId) {
      this.approvalService.goBackInComing(this.approvalRecordModel).subscribe(
        val => {
          this.$Message.success('退件成功！')
          this.cancelBackToComing()
          this.getMyOrderList()
          this.approveModal = false
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
    } else {
      this.$Message.error('拒单原因和拒单细节必须选择！')
    }
  }

  /**
   * 取消放入灰名单
   */
  cancelAddGray() {
    this.grayListModal = false
    this.grayModel.remark = ''
  }

  /**
   * 确定放入灰名单
   */
  confirmAddGray() {
    this.grayModel.orderId = this.approvalOrderId
    this.approvalService
      .submitInternalAuditOrGreyList(this.grayModel)
      .subscribe(
        val => {
          this.$Message.success('提交灰名单成功！')
          this.grayModel.remark = ''
          this.grayListModal = false
          // this.approveModal = false;
          this.getMyOrderList()
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 确认提交内审
   */
  confirmAddInternal() {
    this.internalModel.orderId = this.approvalOrderId
    this.approvalService
      .submitInternalAuditOrGreyList(this.internalModel)
      .subscribe(
        val => {
          this.$Message.success('提交内审成功！')
          this.internalModel.remark = ''
          // this.approveModal = false;
          this.submitToInternalModal = false
          this.getMyOrderList()
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 取消提交内审
   */
  cancelAddInternal() {
    this.submitToInternalModal = false
    this.internalModel.remark = ''
  }

  /**
   * 取消加入黑名单
   */
  cancelAddBlack() {
    this.approvalRecordModel.second = ''
    this.approvalRecordModel.approveReasonId = ''
    this.approvalRecordModel.remark = ''
    this.blackListModal = false
  }

  /**
   * 确定加入黑名单或者拒绝
   */
  confirmAddBlackOrIntenal() {
    this.approvalRecordModel.orderId = this.approvalOrderId
    if (this.rejectOrBlackFlag) {
      if (!this.approvalRecordModel.approveReasonId) {
        this.$Message.error('拒单原因和拒单细节必须选择！')
        return
      }
      this.approvalRecordModel.operateType = 3
      this.approvalService
        .submitBlackListOrRefuse(this.approvalRecordModel)
        .subscribe(
          val => {
            this.$Message.success('提交拒单成功！')
            this.blackListModal = false
            this.approveModal = false
            this.cancelAddBlack()
            this.getMyOrderList()
            this.approvalRecordModel.remark = ''
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    } else {
      this.approvalRecordModel.operateType = 2
      delete this.approvalRecordModel.approveReasonId
      this.approvalService
        .submitBlackListOrRefuse(this.approvalRecordModel)
        .subscribe(
          val => {
            this.$Message.success('提交黑名单成功！')
            this.blackListModal = false
            this.approveModal = false
            this.cancelAddBlack()
            this.getMyOrderList()
            this.approvalRecordModel.remark = ''
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
  }

  backToResource() {
    this.$Modal.confirm({
      title: '退回资源池',
      content: '确定停止并放弃审核此订单？',
      onOk: () => {
        this.approvalService
          .goBackResourcePool({
            orderId: this.approvalOrderId
          })
          .subscribe(
            val => {
              this.$Message.success('退回资源池成功！')
              this.approveModal = false
              this.getMyOrderList()
            },
            ({
              msg
            }) => {
              this.$Message.error(msg)
            }
          )
      }
    })
  }

  /**
   * 通过
   */
  pass() {
    if (this.approveStatue === 332) {
      this.approvePassedModal = true
    } else if (this.approveStatue === 333 || this.approveStatue === 334) {
      // 从approve组件里获取数据【pageData】传递给复审终审通过组件
      let _approve: any = this.$refs['approve']
      let pageData = _approve.getApproveData()
      this.secendLastApproval = true
      let _secondLast: any = this.$refs['second-last']
      _secondLast.getPassData(pageData)
    } else if (this.approveStatue === 337) {
      this.meetConditionApproval = true
      // 从approve组件里获取数据【pageData】传递给复审终审通过组件
      let _approve: any = this.$refs['approve']
      let pageData = _approve.getApproveData()
    }
  }

  rejectOrder() {
    this.reset()
    this.blackListModal = true
    this.rejectOrBlackFlag = true // 拒绝或者黑名单判断标识
  }

  /**
   * 提交黑名单
   */
  submitToblack() {
    this.blackListModal = true
    this.rejectOrBlackFlag = false // 拒绝或者黑名单判断标识
  }

  /**
   * 提交内审
   */
  submitToInternal() {
    this.submitToInternalModal = true
  }

  submitToGray() {
    this.grayListModal = true
  }

  /**
   * 审核
   */
  approveClick(row) {
    this.approveModal = true
    this.approveStatue = row.orderLink
    let _approve: any = this.$refs['approve']
    _approve.getOrderDetail(row)
    this.approvalOrderId = row.orderId //拿到审核的orderId
  }

  getMyOrderList() {
    this.approvalService
      .getMyApprovalOrder(this.myOrderModel, this.pageService)
      .subscribe(
        data => this.myOrderList = data,
        err => this.$Message.error(err)
      )
  }

  timeRangeChange(val) {
    let startTime, endTime
    startTime = new Date(val[0])
    endTime = new Date(val[1])
    this.myOrderModel.startTime = startTime
    this.myOrderModel.endTime = endTime
    this.myOrderModel.timeSearch = ''
  }

  getTimeSearch(val) {
    this.myOrderModel.startTime = ''
    this.myOrderModel.endTime = ''
    this.myOrderModel.timeSearch = val
    this.getMyOrderList()
    this.myOrderModel.timeSearch = ''
  }

  activated() {
    this.getMyOrderList()
  }

  mounted() {
    this.getMyOrderList()
  }
}

</script>

<style lang="less" scoped>
.page.my-approval {
  .seek-day {
    margin-top: 10px;
  }
  .open-search {
    color: #265ea2;
  }
  .command {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    .command-item {
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
      span {
        font-size: 12px;
      }
      &.dayin {
        font-size: 18px;
      }
      &.daochu {
        font-size: 16px;
      }
    }
  }
  .data-form {
    margin-top: 6px;
    position: relative;
    right: 10px;
    .data-form-item {
      &.search-input {
        display: inline-block;
        width: 14%;
        margin-left: 20px;
        min-width: 230px;
      }
      &.date .province-city .product-type .serch-button {
        margin-left: 10px;
      }
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.select {
        &.province {
          width: 100px;
          margin-left: 10px;
        }
        &.city {
          width: 100px;
          margin-left: 10px;
        }
        &.product-type {
          width: 120px;
        }
      }
    }
  }
  .bigButtonErr {
    height: 46px;
    width: 80px;
    background: #265ea2;
    color: #fff;
  }
  .bigButtonDefault {
    height: 46px;
    width: 80px;
    background: #265ea2;
    color: #fff;
  }
  .ivu-modal-body {
    height: 600px;
    overflow: auto;
  }
}

.cutline {
  height: 32px;
  background-color: #dddddd;
  width: 1px;
  display: inline-block;
  margin: 0 10px;
  position: relative;
  top: 10px;
}

.left-button {
  background: #e7ebee;
  color: #666666;
}

.right-button {
  background: #265ea2;
  color: #fff;
}

.modal-result {
  width: 20%;
}

.modal-reason {
  margin-left: 20px;
  width: 20%;
  display: inline-block;
}

.modal-detail {
  margin-left: 20px;
  width: 25%;
  display: inline-block;
}
</style>

<!--订单交接-->
<template>
    <section class="page order-transfer">
        <page-header title="订单交接"></page-header>
        <data-form date-prop="timeSearch" :model="ordertransferModel" :page="pageService" @on-search="refreshData" hidden-reset>
            <template slot="input">
                <i-form-item label="订单时间" prop="dateRange">
                    <i-date-picker v-model="ordertransferModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-form-item>
                <i-form-item prop="orderInfo">
                    <i-input v-model="ordertransferModel.orderInfo" @on-change="orderInfochange" placeholder="请输入客户姓名/证件号码/联系号码/订单所属人查询"></i-input>
                </i-form-item>
            </template>
            <template slot="button">
                <i-button @click="oneKeyToConnect">一键交接</i-button>

            </template>
        </data-form>
        <!--列表-->
        <data-box ref="databox" :id="192" :columns="columns1" :data="ordertransferDataSet" @onPageChange="refreshData" :page="pageService" style="z-index:100"></data-box>
        <!--一键交接-->
        <div class="submit-bar">
            <i-row class="submit-bar-padding" type="flex" align="middle">
                <i-col :span="8" push="1">
                    <!--<span>申请人：{{applyPerson}}</span>-->
                </i-col>
                <i-col :span="10" pull="4">
                    <!--<span>申请时间：{{applyTime}}</span>-->
                </i-col>
                <!-- <i-col class="submit-bar-text" :span="6">
                    <i-button @click="oneKeyToConnect" class="highButton">一键交接</i-button>
                </i-col> -->
            </i-row>
        </div>
        <!--Model-->
        <!--一键交接弹框-->
        <template>
            <i-modal class="views-handover" v-model="openOneKeyToConnect" title="一键交接" :width="800" @on-visible-change="onKey">
                <i-row class="views-handover-margin">
                    <i-input class="views-handover-input" placeholder="请输入关键字搜索"></i-input>
                    <i-button class="views-handover-button">搜索</i-button>
                </i-row>
                <i-row>
                    <!--树-->
                    <i-col :span="6">
                        <!--<i-tree show-checkbox :data="treeData"></i-tree>-->
                        <organize-tree :dataList="dataList" @change="organizetreeChange"></organize-tree>
                    </i-col>
                    <!--表格-->
                    <i-col :span="18">
                        <RadioGroup v-model="checkRadio">
                            <i-table highlight-row @on-current-change="currenttrablerowdata" ref="databox1" :columns="treeColumns" :data="userList"></i-table>
                        </RadioGroup>
                    </i-col>
                </i-row>
                <div slot="footer">
                    <i-button class="blueButton" @click="orderconfirm">确认并返回</i-button>
                </div>
            </i-modal>
        </template>

        <!--转交记录-->
        <template>
            <i-modal title="转交记录" v-model="transferRecordModal" class-name="no-footer">
                <transfer-record ref="transfer" :customerName="customerName" :orderId="orderNumber"></transfer-record>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import DataBox from '~/components/common/data-box.vue'
import { PageService } from '~/utils/page.service'
import { Dependencies } from '~/core/decorator'
import { OrderService } from '~/services/business-service/order.service'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Layout } from '~/core/decorator'
import TransferRecord from '~/components/purchase-manage/transfer-record.vue'

import { ProductOrderService } from '~/services/manage-service/product-order.service'
import { FilterService } from '~/utils/filter.service'
import { ManageService } from '~/services/manage-service/manage.service'
import OrganizeTree from '~/components/common/organize-tree.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    TransferRecord,
    OrganizeTree
  }
})
export default class OrderTransfer extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService
  @Dependencies(ManageService) private manageService: ManageService
  private columns1: any
  private columns2: any
  private treeColumns: any
  private ordertransferDataSet: Array<Object> = []
  private treeData: Array<Object> = []
  private treeDatabox: Array<Object> = []
  private data2: Array<Object> = []
  private dataList: Array<any> = []
  private userList: Array<any> = []
  private searchOptions: Boolean = false
  private ordertransferModel: any = {
    orderInfo: '', // 请输入客户姓名/证件号码/联系号码/订单所属人查询
    startTime: '', // 起始日期
    endTime: '', // 终止日期
    timeSearch: '',
    dateRange: []
  }
  private applyPerson: String = '' // 申请人
  private applyTime: String = '' // 申请时间
  private openColumnsConfig: Boolean = false
  private openOneKeyToConnect: Boolean = false
  private transferRecordModal: Boolean = false
  private checkRadio: String = ''
  private customerName: String = ''
  private orderId: String = ''
  private userListModel: any = {
    deptId: 1
  }
  private mulipleSelection: any = []
  private currentRowuserId: any = null
  private orderNumber: any = ''

  activated() {}
  created() {
    this.applyPerson = this.$store.state.userData.username
    let time = new Date()
    this.applyTime =
      time.getFullYear() +
      '-' +
      (time.getMonth() + 1) +
      '-' +
      time.getDate() +
      ' ' +
      time.getHours() +
      ':' +
      time.getMinutes() +
      ':' +
      time.getSeconds()
    this.refreshData()
    this.getTree()
    this.treeData = [
      {
        title: '开呗管理',
        expand: true,
        children: [
          {
            title: '管理办公室'
          },
          {
            title: '财务二中心'
          }
        ]
      },
      {
        title: '营销中心',
        expand: true,
        children: [
          {
            title: '地推管理部',
            expand: true,
            children: [
              {
                title: '西安营业部'
              },
              {
                title: '宝鸡营业部'
              },
              {
                title: '咸阳营业部'
              },
              {
                title: '渭南营业部'
              },
              {
                title: '铜川营业部'
              }
            ]
          },
          {
            title: '网络营销部'
          },
          {
            title: '渠道销售部'
          }
        ]
      }
    ]
    this.treeColumns = [
      {
        align: 'center',
        title: '选择',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => {
          return h('Radio', {
            props: {
              label: row.workId
            }
          })
        }
      },
      {
        align: 'center',
        key: 'userUsername',
        title: '用户名',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: 'center',
        key: 'userRealname',
        title: '姓名',
        minWidth: this.$common.getColumnWidth(6)
      }
    ]
    this.columns1 = [
      {
        type: 'selection',
        width: 40,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '操作',
        align: 'center',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, columns, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.transferRecord(row)
                  this.transferRecordModal = true
                }
              },
              style: {
                color: '#265EA2'
              }
            },
            '转交记录'
          )
        }
      },
      {
        title: '订单编号',
        editable: true,
        key: 'orderNumber',
        align: 'center',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        title: '制单人',
        editable: true,
        key: 'recorderName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        title: '所属部门',
        editable: true,
        key: 'deptName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        title: '转交人',
        editable: true,
        key: 'transferName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '订单创建时间',
        editable: true,
        key: 'createTime',
        align: 'center',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, columns, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        title: '客户姓名',
        editable: true,
        key: 'personalName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '证件号码',
        key: 'idCard',
        editable: true,
        align: 'center',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        title: '联系号码',
        editable: true,
        key: 'mobileMain',
        align: 'center',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        title: '产品名称',
        editable: true,
        key: 'productName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        title: '产品期数',
        editable: true,
        key: 'periods',
        align: 'center',
        minWidth: this.$common.getColumnWidth(1),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.periods))
        }
      },
      {
        title: '环节',
        editable: true,
        key: 'orderLink',
        align: 'center',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderLink))
        }
      },
      {
        title: '审批状态',
        editable: true,
        key: 'orderStatus',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      }
    ]
    this.columns2 = [
      {
        title: '序号',
        type: 'index',
        minWidth: 80,
        align: 'center'
      },
      {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      },
      {
        type: 'selection',
        minWidth: 80,
        align: 'center'
      }
    ]
    this.data2 = [
      {
        columnsName: '订单编号'
      },
      {
        columnsName: '订单所属人'
      },
      {
        columnsName: '所属部门'
      },
      {
        columnsName: '转交人'
      },
      {
        columnsName: '订单创建时间'
      },
      {
        columnsName: '客户姓名'
      },
      {
        columnsName: '证件号码'
      },
      {
        columnsName: '产品名称'
      },
      {
        columnsName: '产品期数'
      },
      {
        columnsName: '环节'
      },
      {
        columnsName: '审批状态'
      }
    ]
    //   this.orderService.getOrderConnect().subscribe(({
    //     val
    //   }) => {
    //     this.data1 = val
    //   })

    // this.orderService.getTreeDatabox().subscribe(({
    //   val
    // }) => {
    //   this.treeDatabox = val
    // })
    this.treeDatabox = [
      {
        workId: '001',
        personalName: '张三丰'
      },
      {
        workId: '002',
        personalName: '张四丰'
      }
    ]
  }
  refreshData() {
    console.log(this.ordertransferModel)
    this.productOrderService
      .getOrderHandover(this.ordertransferModel, this.pageService)
      .subscribe(
        data => (this.ordertransferDataSet = data),
        err => this.$Message.error(err)
      )
  }
  currenttrablerowdata(currentRow, oldCurrentRow) {
    this.currentRowuserId = currentRow.id
  }
  /**
   * 获取机构数
   */
  getTree() {
    this.manageService.getAllDepartment().subscribe(val => {
      // this.deptObject = val.object[0]
      this.dataList = val
    })
  }
  /**
   * 根据机构树获取用户
   */
  organizetreeChange(value) {
    this.userListModel.deptId = value.id
    this.manageService
      .getUsersByDeptPage(this.userListModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   *根据日月年查询
   */
  getOrderInfoByTime(val) {
    this.ordertransferModel.startTime = ''
    this.ordertransferModel.endTime = ''
    this.ordertransferModel.orderInfo = ''
    this.ordertransferModel.timeSearch = val
    this.refreshData()
  }
  /**
   * 清空timeSearch
   */
  startTimeChange(val) {
    //   this.ordertransferModel.startTime = FilterService.dateFormat(this.ordertransferModel.startTime)
    this.ordertransferModel.timeSearch = ''
  }
  endTimeChange(val) {
    //   this.ordertransferModel.endTime = FilterService.dateFormat(this.ordertransferModel.endTime)
    this.ordertransferModel.timeSearch = ''
  }
  orderInfochange() {
    this.ordertransferModel.timeSearch = ''
  }
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  /**
   * 订单交接
   */
  oneKeyToConnect() {
    this.mulipleSelection = this.$refs['databox']
    this.mulipleSelection = this.mulipleSelection.getCurrentSelection()
    // console.log(this.mulipleSelection)
    if (!this.mulipleSelection) {
      this.$Message.error('请选择要交接的订单！')
    } else {
      this.getTree()
      ;(this.userList = []), (this.openOneKeyToConnect = true)
    }
  }
  /**
   * 订单交接（确定并返回）
   */
  onKey(val) {}
  orderconfirm() {
    let mulipledata = this.mulipleSelection.map(v => {
      return v.orderId
    })
    let orderconfirmData: any = {
      orderIds: mulipledata,
      userId: this.currentRowuserId
    }
    // this.productOrderService.orderTransfer(orderconfirmData).subscribe(
    //   data => {
    //     this.$Message.success('交接成功!')
    //     this.openOneKeyToConnect = false
    //   },
    //   ({
    //     msg
    //   }) => {
    //     this.$Message.error(msg)
    //   }
    // )
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }
  /**
   * 多选
   */
  multipleSelect(selection) {}
  /**
   * 确定
   */
  confirm() {}
  transferRecord(row) {
    this.customerName = row.personalName
    this.orderId = row.orderId
    this.orderNumber = row.orderNumber
    let _transfer: any = this.$refs['transfer']
    _transfer.refreshData(row.orderId)
  }
}
</script>

<style lang="less" scoped>
.page.order-transfer {
  .seek-day {
    margin-top: 10px;
  }
  .submit-bar {
    z-index: 200;
    .submit-bar-padding {
      padding: 14px;
    }
    .submit-bar-text {
      text-align: right;
    }
  }
}
</style>

<style lang="less">
.page.order-transfer {
  .views-handover {
    .views-handover-margin {
      margin-bottom:10px .views-handover-input {
        width: 60%;
        display: inline-block;
        margin-left: 10px;
      }
      .views-handover-button {
        margin-left: 10px;
        background: #265ea2;
        color: #fff;
      }
    }
  }
  .transfer-record {
    .ivu-modal-footer {
      display: none !important;
    }
  }
}
</style>

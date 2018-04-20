<!--订单查询-->
<template>
    <section class="page approval-order-query">
        <page-header title="订单查询"></page-header>
        <data-form date-prop="timeSearch" :model="approvalModel" @on-search="getAllOrderList" :page="pageService" hidden-reset>
            <template slot="input">
                <i-form-item prop="personalInfo">
                    <i-input placeholder="请录入客户姓名\证件号码\手机号查询" v-model="approvalModel.personalInfo"></i-input>
                </i-form-item>
                <i-form-item prop="startTime" label="日期：">
                    <i-date-picker v-model="approvalModel.startTime" placeholder="起始日期"></i-date-picker> ~
                </i-form-item>
                <i-form-item prop="endTime">
                    <i-date-picker v-model="approvalModel.endTime" placeholder="终止日期"></i-date-picker>
                </i-form-item>
            </template>
        </data-form>
        <data-box :id="322" :columns="columns1" :data="allOrderList" @onPageChange="getAllOrderList" :page="pageService" ref="databox"></data-box>

        <template>
            <i-modal @on-visible-change="visibleChange" title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
                <purchase-information :scrollTopHeight="scrollTopHeight" ref="purchase-info"></purchase-information>
                <div slot="footer">
                    <i-button class="bluebutton" @click="purchaseInfoModal=false">返回</i-button>
                </div>
            </i-modal>
        </template>

    </section>
</template>

<script lang="ts">
import DataBox from '~/components/common/data-box.vue'
import Page from '~/core/page'
import Component from 'vue-class-component'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import SvgIcon from '~/components/common/svg-icon.vue'
import { ApprovalService } from '~/services/manage-service/approval.service'
import { PageService } from '~/utils/page.service'
import { CityService } from '~/utils/city.service'
import { FilterService } from '~/utils/filter.service'
import { CommonService } from '~/utils/common.service'
import { ProductOrderService } from '~/services/manage-service/product-order.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    PurchaseInformation,
    SvgIcon
  }
})
export default class ApprovalOrderQuery extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService
  private columns1: any
  private allOrderList: Array<Object> = []
  private orderModal: Boolean = false
  private searchOptions: Boolean = false
  private purchaseInfoModal: Boolean = false
  private scrollTopHeight = 0
  private approvalModel: any = {
    timeSearch: '',
    startTime: '',
    endTime: '',
    personalInfo: ''
  }

  mounted() {
    this.getAllOrderList()
  }

  created() {
    this.columns1 = [
      {
        type: 'selection',
        fixed: 'left',
        width: 60,
        align: 'center'
      },
      {
        title: '操作',
        width: 100,
        fixed: 'left',
        align: 'center',
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
                    // this.purchaseInfoModal = true;
                    this.checkOrderInfo(row)
                  }
                }
              },
              '查看'
            )
          ])
        }
      },
      {
        key: 'orderLink',
        align: 'center',
        editable: true,
        title: '环节',
        render: (h, { row, columns, index }) => {
          if (row.riskStatus) {
            return h('div', [
              h('span', {}, this.$dict.getDictName(row.orderLink)),
              h(
                'Tooltip',
                {
                  props: {
                    content: row.riskRemark
                  }
                },
                [
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
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      },
      {
        align: 'center',
        title: '订单创建时间',
        editable: true,
        key: 'createTime',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        title: '订单编号',
        key: 'orderNumber',
        editable: true,
        align: 'center',
        render: (h, { row, columns, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.purchaseInfoModal = true;
                  this.checkOrderInfo(row)
                }
              }
            },
            row.orderNumber
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '客户姓名',
        key: 'personalName'
      },
      {
        align: 'center',
        editable: true,
        title: '证件号',
        key: 'idCard'
      },
      {
        align: 'center',
        editable: true,
        title: '手机号',
        key: 'mobileMain'
      },
      {
        align: 'center',
        editable: true,
        title: '订单类型',
        key: 'orderType',
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderType))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单归属公司',
        key: 'orderCompany'
      },
      {
        align: 'center',
        editable: true,
        title: '归属部门',
        key: 'orderDept'
      },
      {
        align: 'center',
        editable: true,
        title: '制单人',
        key: 'recorder'
      }
    ]
  }

  visibleChange() {
    let target = document.querySelector('.purchaseInformation .ivu-modal-body')
    if (target) {
      target.addEventListener('scroll', this.monitorScorll)
    }
  }

  monitorScorll() {
    let target = document.querySelector('.purchaseInformation .ivu-modal-body')
    if (target) {
      this.scrollTopHeight = target.scrollTop
    }
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  /**
   * 导出订单查询列表
   */
  exportOrderQueryList() {
    let databox: any = this.$refs['databox']
    let multipleSelection = databox.getCurrentSelection()
    if (multipleSelection && multipleSelection.length) {
      let ids = multipleSelection.map(v => v.orderId)
      this.productOrderService
        .exportProductList({
          ids: ids
        })
        .subscribe(
          data => {
            CommonService.downloadFile(data.url, '订单查询')
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    } else {
      this.$Message.info('请先选择订单再导出！')
    }
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
   * 领取
   */
  getOrder(row) {
    this.orderModal = true
  }

  checkOrderInfo(row) {
    this.purchaseInfoModal = true
    let _purchaseInfo: any = this.$refs['purchase-info']
    _purchaseInfo.getOrderDetail(row)
  }

  getAllOrderList() {
    this.approvalModel.startTime = FilterService.dateFormat(
      this.approvalModel.startTime,
      'yyyy-MM-dd'
    )
    this.approvalModel.endTime = FilterService.dateFormat(
      this.approvalModel.endTime,
      'yyyy-MM-dd'
    )
    this.approvalService
      .approvalOrderSearch(this.approvalModel, this.pageService)
      .subscribe(
        data => {
          this.allOrderList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  getTimeSearch(val) {
    this.approvalModel.startTime = ''
    this.approvalModel.endTime = ''
    this.approvalModel.personalInfo = ''
    this.approvalModel.timeSearch = val
    this.getAllOrderList()
    this.approvalModel.timeSearch = ''
  }
}
</script>

<style lang="less" scoped>
.page.approval-order-query {
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
      &.date {
        margin-left: 10px;
      }
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.search-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

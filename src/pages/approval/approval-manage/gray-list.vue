<!--灰名单-->
<template>
  <section class="page gray-list">
    <page-header title="灰名单"></page-header>
    <data-form date-prop="timeSearch" :model="approvalModel" @on-search="getGrayList" :page="pageService" hidden-reset>
      <template slot="input">
        <i-form-item prop="personalInfo">
          <i-input placeholder="请录入客户姓名\证件号码\手机号查询" v-model="approvalModel.personalInfo"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="approvalModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        <i-form-item prop="province" label="省市：">
          <i-select placeholder="选择省" v-model="approvalModel.province" clearable>
            <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="city">
          <i-select placeholder="选择市" v-model="approvalModel.city" :disabled="!approvalModel.province" clearable>
            <i-option v-for="{value,label} in this.approvalModel.province ? this.$city.getCityData({ level: 1, id: this.approvalModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="productType" label="产品名称：">
          <i-input v-model="approvalModel.productType"></i-input>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="304" :columns="columns1" :data="grayList" @onPageChange="getGrayList" :page="pageService"></data-box>

    <template>
      <i-modal title="订单详情" :width="1200" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
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
import SvgIcon from '~/components/common/svg-icon.vue'
import { ApprovalService } from '~/services/manage-service/approval.service'
import { PageService } from '~/utils/page.service'
import { CityService } from '~/utils/city.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    PurchaseInformation,
    SvgIcon
  }
})
export default class GrayList extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private grayList: Array<Object> = []
  private orderModal: Boolean = false
  private searchOptions: Boolean = false
  private purchaseInfoModal: Boolean = false
  private approvalModel: any = {
    riskStatus: 1,
    timeSearch: '',
    personalInfo: '',
    province: '',
    city: '',
    startTime: '',
    endTime: '',
    productType: '',
    dateRange: []
  }

  mounted() {
    this.getGrayList()
  }
  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(5),
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
                    this.purchaseInfoModal = true
                    this.checkOrderInfo(row)
                  }
                }
              },
              '查看'
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
                      content: '确定移出此订单吗？',
                      onOk: () => {
                        this.moveOut(row)
                      }
                    })
                  }
                }
              },
              '移出'
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
        editable: true,
        align: 'center',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      },
      {
        title: '订单编号',
        key: 'orderNumber',
        editable: true,
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
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
        title: '订单创建时间',
        editable: true,
        key: 'createTime',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '进入资源池时间',
        key: 'intoPoolDate',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.intoPoolDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '省份',
        key: 'province',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', CityService.getCityName(row.province))
        }
      },
      {
        align: 'center',
        title: '城市',
        editable: true,
        key: 'city',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', CityService.getCityName(row.city))
        }
      },
      {
        align: 'center',
        title: '订单类型',
        editable: true,
        key: 'orderType',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderType))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '产品名称',
        key: 'productName',
        minWidth: this.$common.getColumnWidth(4),
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
        title: '证件号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        align: 'center',
        editable: true,
        title: '手机号',
        key: 'mobileMain',
        minWidth: this.$common.getColumnWidth(5),
      }
    ]
  }
  checkOrderInfo(row) {
    this.purchaseInfoModal = true
    let _purchaseInfo: any = this.$refs['purchase-info']
    _purchaseInfo.getOrderDetail(row)
  }
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  /**
   * 领取
   */
  getOrder(row) {
    this.orderModal = true
  }

  getGrayList() {
    this.approvalService
      .approvalOrderSearch(this.approvalModel, this.pageService)
      .subscribe(
      data => this.grayList = data,
      err => this.$Message.error(err)
      )
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
  getTimeSearch(val) {
    this.approvalModel.startTime = ''
    this.approvalModel.endTime = ''
    this.approvalModel.city = ''
    this.approvalModel.province = ''
    this.approvalModel.endTime = ''
    this.approvalModel.productType = ''
    this.approvalModel.personalInfo = ''
    this.approvalModel.timeSearch = val
    this.getGrayList()
    this.approvalModel.timeSearch = ''
  }
  moveOut(row) {
    this.approvalService
      .removeRiskStatus({
        orderIds: row.orderId,
        isBlack: false
      })
      .subscribe(
      val => {
        this.$Message.success('移出成功')
        this.getGrayList()
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }
}
</script>

<style lang="less" scoped>
.page.gray-list {
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
          width: 80px;
          margin-left: 10px;
        }
        &.city {
          width: 80px;
          margin-left: 10px;
        }
        &.product-type {
          width: 10%;
        }
      }
    }
  }
}
</style>

<!--审批资源池-->
<template>
  <section class="page approval-resource-pool">
    <page-header title="审核资源池"></page-header>
    <data-form date-prop="timeSearch" :model="resourcePoolModel" @on-search="getApprovalListByCondition"
               :page="pageService" hidden-reset>
      <template slot="input">
        <i-form-item prop="personalInfo">
          <i-input v-model="resourcePoolModel.personalInfo" placeholder="请录入客户姓名\证件号码\手机号查询"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="resourcePoolModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        <i-form-item prop="province" label="省市：">
          <i-select placeholder="选择省" v-model="resourcePoolModel.province" clearable>
            <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label"
                      :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="city">
          <i-select placeholder="选择市" v-model="resourcePoolModel.city" :disabled="!resourcePoolModel.province" clearable>
            <i-option
              v-for="{value,label} in this.resourcePoolModel.province ? this.$city.getCityData({ level: 1, id: this.resourcePoolModel.province }) : []"
              :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="orderType" label="订单类型">
          <i-select placeholder="订单类型" v-model="resourcePoolModel.orderType" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0301')" :key="value" :label="label"
                      :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="235" :columns="columns1" :data="resourcePoolList" @onPageChange="getApprovalListByCondition"
              ref="databox" :page="pageService"></data-box>

    <!--Modal-->
    <template>
      <i-modal title="订单领取" v-model="orderModal" width="300">
        <span>确定将所选订单领取到我的审核？</span>
        <div slot="footer">
          <i-button @click="orderModal=false">取消</i-button>
          <i-button @click="confirmGetOrder" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--Model-->

    <template>
      <i-modal title="订单详情" width="1000" id="orderDetail" v-model="purchaseInformationModal" class="purchaseInformation"
               @on-visible-change="visibleChange">
        <purchase-information :scrollTopHeight="scrollTopHeight" ref="purchase-info"></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInformationModal=false">返回</i-button>
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
  import {ApprovalService} from '~/services/manage-service/approval.service'
  import {Tooltip} from 'iview'
  import {Dependencies} from '~/core/decorator'
  import {Layout} from '~/core/decorator'
  import {Mutation} from 'vuex-class'
  import {PageService} from '~/utils/page.service'
  import {FilterService} from '~/utils/filter.service'
  import {CityService} from '~/utils/city.service'

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class ApprovalResourcePool extends Page {
    @Dependencies(ApprovalService) private approvalService: ApprovalService
    @Dependencies(PageService) private pageService: PageService
    private columns1: any
    private resourcePoolList: Array<Object> = []
    private orderModal: Boolean = false
    private searchOptions: Boolean = false
    private purchaseInformationModal: Boolean = false
    private scrollTopHeight = 0
    private val: Date
    private resourcePoolModel: any = {
      startTime: '',
      endTime: '',
      province: '',
      city: '',
      personalInfo: '',
      timeSearch: '',
      orderType: '',
      dateRange: []
    }
    private getOrderModel: any
    private endDisabeldOptions: any = {
      disabledDate(date) {
      }
    }
    @Mutation('openPage') openPage

    mounted() {
      this.getApprovalListByCondition()
    }

    activated() {
      this.getApprovalListByCondition()
    }

    created() {
      this.getOrderModel = {
        userId: '',
        orderIds: []
      }
      this.columns1 = [
        {
          title: '操作',
          align: 'center',
          fixed: 'left',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {row, column, index}) => {
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
                      this.getOrder(row)
                    }
                  }
                },
                '领取'
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
          render: (h, {row, columns, index}) => {
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
          title: '订单编号',
          key: 'orderNumber',
          align: 'center',
          editable: true,
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {row, column, index}) => {
            if (row && row.orderNumber) {
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
            } else if (!row) {
              return h('span', {}, '')
            }
          }
        },
        {
          align: 'center',
          title: '订单创建时间',
          editable: true,
          key: 'createTime',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {row, column, index}) => {
            return h(
              'span',
              FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        },
        {
          align: 'center',
          title: '进入资源池时间',
          editable: true,
          key: 'intoPoolDate',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {row, column, index}) => {
            return h(
              'span',
              FilterService.dateFormat(row.intoPoolDate, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        },
        {
          align: 'center',
          editable: true,
          title: '省份',
          key: 'province',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {row, column, index}) => {
            return h('span', CityService.getCityName(row.province))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '城市',
          key: 'city',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {row, column, index}) => {
            return h('span', CityService.getCityName(row.city))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '订单类型',
          key: 'orderType',
          minWidth: this.$common.getColumnWidth(4),
          render: (h, {row, column, index}) => {
            return h('span', {}, this.$dict.getDictName(row.orderType))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '产品名称',
          key: 'productName',
          minWidth: this.$common.getColumnWidth(5),
        },
        {
          align: 'center',
          editable: true,
          title: '客户姓名',
          key: 'personalName',
          minWidth: this.$common.getColumnWidth(4),
        },
        {
          align: 'center',
          editable: true,
          title: '证件号码',
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

    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true
      this.getOrderModel.orderIds = row.orderId
      this.getOrderModel.userId = this.$store.state.userData.id
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

    confirmGetOrder() {
      this.approvalService.batchReceiveApproval(this.getOrderModel).subscribe(
        data => {
          this.$Message.success('领取成功！')
          this.getApprovalListByCondition()
        },
        ({msg}) => {
          this.$Message.error(msg)
        }
      )
      this.orderModal = false
    }

    /**
     * 获取审核资源池列表
     */
    getApprovalListByCondition() {
      this.approvalService
        .auditResourcePool(this.resourcePoolModel, this.pageService)
        .subscribe(
          data => this.resourcePoolList = data,
          err => this.$Message.error(err)
        )
    }

    getTimeSearch(val) {
      this.resourcePoolModel.startTime = ''
      this.resourcePoolModel.endTime = ''
      this.resourcePoolModel.city = ''
      this.resourcePoolModel.province = ''
      this.resourcePoolModel.personalInfo = ''
      this.resourcePoolModel.orderType = ''
      this.resourcePoolModel.timeSearch = val
      this.getApprovalListByCondition()
      this.resourcePoolModel.timeSearch = ''
    }

    openSearch() {
      this.searchOptions = !this.searchOptions
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

    timeRangeChange(val) {
      let startTime, endTime
      startTime = new Date(val[0])
      endTime = new Date(val[1])
      this.resourcePoolModel.startTime = startTime
      this.resourcePoolModel.endTime = endTime
    }

    //   clearTime() {}
    checkOrderInfo(row) {
      this.purchaseInformationModal = true
      let _purchaseInfo: any = this.$refs['purchase-info']
      _purchaseInfo.getOrderDetail(row)
    }
  }
</script>

<style lang="less" scoped>
  .page.approval-resource-pool {
    .open-search {
      color: #265ea2;
    }
    .seek-day {
      margin-top: 10px;
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
      position: relative;
      right: 10px;
      .data-form-item {
        &.searchinput {
          display: inline-block;
          width: 14%;
          min-width: 230px;
          margin-left: 20px;
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
            width: 120px;
          }
        }
        &.search-button {
          margin-left: 10px;
        }
      }
    }
  }
</style>

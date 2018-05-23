<!--面审资源池-->
<template>
  <section class="page face-approval">
    <page-header title="面审"></page-header>
    <data-form date-prop="timeSearch" :model="resourcePoolModel" @on-search="getFaceApprovalList" :page="pageService">
      <template slot="input">
        <!-- <i-form-item prop="personalInfo">
          <i-input placeholder="请录入客户姓名\证件号码\手机号查询" v-model="resourcePoolModel.personalInfo"></i-input>
        </i-form-item> -->
        <i-form-item prop="personalName" label="客户姓名：">
          <i-input v-model="resourcePoolModel.personalName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号：">
          <i-input v-model="resourcePoolModel.orderNumber" placeholder="请输入订单编码"></i-input>
        </i-form-item>
        <i-form-item prop="tel" label="手机号码：">
          <i-input v-model="resourcePoolModel.tel" placeholder="请输入手机号码"></i-input>
        </i-form-item>
        <i-form-item prop="orderLink" label="环节">
          <i-select placeholder="请选择环节" disabled v-model="resourcePoolModel.orderLink" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0303')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="resourcePoolModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        <i-form-item prop="province" label="省市：">
          <i-select placeholder="选择省" v-model="resourcePoolModel.province" clearable>
            <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="city">
          <i-select placeholder="选择市" v-model="resourcePoolModel.city" :disabled="!resourcePoolModel.province" clearable>
            <i-option v-for="{value,label} in this.resourcePoolModel.province ? this.$city.getCityData({ level: 1, id: this.resourcePoolModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <!-- <i-form-item prop="productType" label="产品名称">
          <i-input v-model="resourcePoolModel.productType"></i-input>
        </i-form-item> -->
        <i-form-item prop="productType" label="产品类型">
          <i-select placeholder="产品类型" v-model="resourcePoolModel.productType" clearable>
            <!-- <i-option v-for="{value,label} in $dict.getDictData('0301')" :key="value" :label="label" :value="value"></i-option> -->
          </i-select>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="244" :columns="columns1" :data="faceList" @onPageChange="getFaceApprovalList" :page="pageService"></data-box>
    <!--Modal-->
    <template>
      <i-modal title="订单领取" v-model="orderModal" :width="300">
        <span>确定将所选订单领取到我的审核？</span>
        <div slot="footer">
          <i-button @click="orderModal=false">取消</i-button>
          <i-button @click="confirmGetOrder" class="blueButton">确定</i-button>
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
import { PageService } from '~/utils/page.service'
import { CityService } from '~/utils/city.service'
import { ApprovalService } from '~/services/manage-service/approval.service'
import SvgIcon from '~/components/common/svg-icon.vue'
import { CommonService } from '~/utils/common.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class FaceApproval extends Page {
  @Dependencies(ApprovalService) private approvalService: ApprovalService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private faceList: Array<Object> = []
  private orderModal: Boolean = false
  private searchOptions: Boolean = false
  private resourcePoolModel: any = {
    personalName: '',    // 客户姓名
    orderNumber: '',     // 订单编号
    tel: '',             // 手机号码
    orderLink: 332,
    startTime: '',
    endTime: '',
    province: '',
    city: '',
    personalInfo: '',
    timeSearch: '',
    productType: '',
    dateRange: []
  }
  private getOrderModel: any = {
    userId: '',
    orderIds: []
  }

  mounted() {
    this.getFaceApprovalList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(4),
        align: 'center',
        fixed: 'left',
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
        align: 'center',
        title: '滞留天数',
        editable: true,
        key: 'detainedDays',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        key: 'orderLink',
        align: 'center',
        editable: true,
        title: '环节',
        minWidth: this.$common.getColumnWidth(4),
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
        title: '订单编号',
        key: 'orderNumber',
        editable: true,
        minWidth: this.$common.getColumnWidth(6),
        align: 'center',
        render: (h, { row, column, index }) => {
          if (row && row.orderNumber) {
            return h(
              'i-button',
              {
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
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        title: '进入资源池时间',
        editable: true,
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
        title: '省份',
        editable: true,
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
        minWidth: this.$common.getColumnWidth(4),
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

  /**
   * 导出面审列表
   */
  exportFaceApprovalList() {
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
    this.approvalService
      .batchReceiveApproval(this.getOrderModel)
      .subscribe(val => {
        this.$Message.success('领取成功！')
        this.getFaceApprovalList()
      })
    this.orderModal = false
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  getTimeSearch(val) {
    this.resourcePoolModel.timeSearch = val
    this.resourcePoolModel.startTime = ''
    this.resourcePoolModel.endTime = ''
    this.resourcePoolModel.city = ''
    this.resourcePoolModel.province = ''
    this.resourcePoolModel.personalInfo = ''
    this.resourcePoolModel.productType = ''
    this.getFaceApprovalList()
    this.resourcePoolModel.timeSearch = ''
  }

  getFaceApprovalList() {
    this.approvalService
      .auditResourcePool(this.resourcePoolModel, this.pageService)
      .subscribe(
      data => this.faceList = data,
      err => this.$Message.error(err)
      )
  }
}
</script>

<style lang="less" scoped>
.page.face-approval {
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
}
</style>

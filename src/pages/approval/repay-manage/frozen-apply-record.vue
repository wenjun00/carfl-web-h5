<!--冻结申请记录--> 
<template>
  <section class="page frozen-apply-record">
    <page-header title="冻结申请记录" hiddenPrint></page-header>
    <data-form date-prop="timeSearch" :model="frozenModel" @on-search="getFrozenList" :page="pageService">
      <template slot="input">
        <!-- <i-form-item prop="orderInfo">
          <i-input v-model="frozenModel.orderInfo" placeholder="请录入客户姓名\证件号码\订单号\手机号查询"></i-input>
        </i-form-item> -->
        <!-- <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="frozenModel.dateRange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item> -->
        <!-- <i-form-item prop="collectMoneyMethod" label="结算通道">
          <i-select placeholder="请选择结算通道" v-model="frozenModel.collectMoneyMethod" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item> -->
        <i-form-item prop="personalName" label="客户姓名">
          <i-input v-model="frozenModel.personalName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="证件号码">
          <i-input v-model="frozenModel.idCard" placeholder="请输入证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="frozenModel.orderNumber" placeholder="请输入证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="冻结申请日期">
          <i-date-picker v-model="frozenModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="348" :columns="columns1" :data="frozenList" @onPageChange="getFrozenList" :page="pageService"></data-box>

  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { RemitApplicationService } from '~/services/manage-service/remit-application.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class FrozenApplyRecord extends Page {
  @Dependencies(RemitApplicationService)
  private remitApplicationService: RemitApplicationService
  @Dependencies(PageService) private pageService: PageService
  private columns1: any
  private frozenList: Array<Object> = []
  private repayInfo: Boolean = false
  private searchOptions: Boolean = false
  private frozenModel: any = {
    personalName:'', // 客户姓名
    idCard:'',   // 证件号码
    tel:'',      // 联系电话
    remitItem: 1122,
    startTime: '',
    endTime: '',
    timeSearch: '',
    collectMoneyMethod: '',
    orderInfo: '',
    dateRange: []
  }

  mounted() {
    this.getFrozenList()
  }

  created() {
    this.columns1 = [
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(4),
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定解冻吗？',
                      onOk: () => {
                        this.unFrozen(row)
                      }
                    })
                  }
                }
              },
              '解冻'
            )
          ])
        }
      },
      {
        align: 'center',
        editable: true,
        title: '冻结金额',
        key: 'remitAmount',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => {
          return h(
            "div",
            {
              style: {
                textAlign: "right"
              }
            },
            // this.$filter.toThousands(row.remitAmount)
            this.$filter.moneyFormatFour(row.remitAmount)
          );
        }

      },
      {
        align: 'center',
        editable: true,
        title: '冻结期数',
        key: 'periods',
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        align: 'center',
        editable: true,
        title: '订单环节',
        key: 'orderLink',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderLink))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单状态',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('span', {}, this.$dict.getDictName(row.orderStatus))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '冻结申请日期',
        sortable: true,
        key: 'applyDate',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.applyDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '客户姓名',
        key: 'name',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        editable: true,
        title: '证件号码',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: 'center',
        editable: true,
        title: '手机号',
        key: 'mobileNumber',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: 'center',
        editable: true,
        title: '订单创建时间',
        key: 'orderCreateTime',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.orderCreateTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '订单号',
        sortable: true,
        key: 'orderNumber',
        minWidth: this.$common.getColumnWidth(8),
        render: (h, { row, column, index }) => {
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
        }
      },
      {
        align: 'center',
        editable: true,
        title: '合同生效日期',
        key: 'contractDate',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, column, index }) => {
          return h(
            'span',
            this.$filter.dateFormat(row.contractDate, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '减免备注',
        key: 'remitRemark',
        minWidth: this.$common.getColumnWidth(6)
      }
    ]
  }

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  trailerCar(row) { }

  /**
   * 查看凭证
   */
  checkProof(row) { }

  getFrozenList() {
    this.remitApplicationService
      .selectApplyForReliefHistory(this.frozenModel, this.pageService)
      .subscribe(
        data => this.frozenList = data,
        err => this.$Message.error(err)
      )
  }


  /**
   * 解冻
   */
  unFrozen(row) {
    this.remitApplicationService
      .freezeCancel({
        applyId: row.applyId
      })
      .subscribe(
        val => {
          this.$Message.success('解冻成功！')
          this.getFrozenList()
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  getTimeSearch(val) {
    this.frozenModel.applyDateStart = ''
    this.frozenModel.applyDateEnd = ''
    this.frozenModel.collectMoneyMethod = ''
    this.frozenModel.orderInfo = ''
    this.frozenModel.timeSearch = val
    this.getFrozenList()
    this.frozenModel.timeSearch = ''
  }
}
</script>
<style lang="less" scoped>
.page.frozen-apply-record {
  .seek-day {
    margin-top: 10px;
  }
  .open-search {
    color: #265ea2;
  }
  .command {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    .command-item {
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
      .daochu {
        font-size: 12px;
      }
    }
  }
  .data-form {
    margin: 6px;
    position: relative;
    right: 6px;
    .data-form-item {
      &.search-input {
        display: inline-block;
        width: 14%;
        margin-left: 10px;
      }
      &.date {
        margin-left: 10px;
      }
      &.date-picker {
        display: inline-block;
        width: 10%;
      }
      &.collect {
        width: 10%;
        margin-left: 10px;
      }
      &.search-button {
        margin-left: 20px;
      }
    }
  }
}
</style>

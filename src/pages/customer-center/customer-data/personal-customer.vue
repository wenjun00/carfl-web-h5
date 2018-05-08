<!--个人正式客户-->
<template>  
    <section class="page personal-customer">
        <page-header title="个人正式客户" hidden-print></page-header>
        <data-form :model="personalCustomerModel" date-prop="timeSearch" @on-search="getPersonalClientList">
            <template slot="input">
                <i-form-item prop="name" label="客户姓名">
                    <i-input v-model="personalCustomerModel.name"></i-input>
                </i-form-item>
                <i-form-item prop="telephone" label="手机号码">
                    <i-input v-model="personalCustomerModel.telephone"></i-input>
                </i-form-item>
                <i-form-item prop="dateRange" label="创建起止时间">
                    <i-date-picker type="daterange" v-model="personalCustomerModel.dateRange"></i-date-picker>
                </i-form-item>
                
            </template>
        </data-form>
        <data-box :columns="personalCustomerColumns" :data="dataSet" :page="pageService"></data-box>
        <template>
            <i-modal width="780" v-model="personalModal" title="客户详情" class="get-customer-details">
                <get-customer-details ref="get-customer-details"></get-customer-details>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="personalModal=false">取消</i-button>
                    <i-button size="large" type="primary" class="blueButton" @click="blacklistModal">加入黑名单</i-button>
                </div>
            </i-modal>
        </template>
          <!--订单详情弹窗-->
        <template>
            <i-modal width="780" v-model="orderDetailsModal" title="订单详情">
                <personal-order-details ref="personal-order-details"></personal-order-details>
                <div slot="footer"></div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import GetCustomerDetails from '~/components/purchase-manage/get-customer-details.vue'
import { PersonalService } from '~/services/manage-service/personal.service'
import PersonalOrderDetails from '~/components/customer-center/personal-center/personal-order-details.vue'
import { FilterService } from '~/utils/filter.service'
@Layout('workspace')
@Component({
  components: {
    GetCustomerDetails,
    PersonalOrderDetails,
  }
})
export default class personalCustomer extends Page {
  @Dependencies(PersonalService) private personalService: PersonalService
  @Dependencies(PageService) private pageService: PageService
  private orderDetailsModal: Boolean = false
  private dataSet: Array<any> = []
  private presentId:String=""
  private personalCustomerModel: any = {
    personalType: '118',
    name: '', //客户姓名
    telephone: '', // 手机号码
    startTime: '', // 创建起止时间
    endDate: '', // 创建结束日期
    dateRange: []
  }

  private personalModal: Boolean = false
  private personalCustomerColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
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
                  this.getFormalCustomerList(row)
                }
              }
            },
            '客户详情'
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
                  this.getOrderDetailsList(row)
                }
              }
            },
            '订单详情'
          )
        ])
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
      title: '证件类型',
      editable: true,
      key: 'certificateType',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      title: '证件号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'certificateNumber',
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      key: 'mobileMain',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '意向级别',
      editable: true,
      sortable: true,
      key: 'intentionalLevel',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '所属地区',
      editable: true,
      key: 'city',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '创建时间',
      editable: true,
      sortable: true,
      key: 'createTime',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center',
      render: (h, { row, column, index }) => {
        return h(
          'span',
          FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
        )
      }
    },
    {
      title: '归属业务员',
      editable: true,
      key: 'operator',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    }
  ]
  /**
   * 获取个人正式客户列表
   */
  getPersonalClientList() {
    this.personalService
      .getCustomeriIntentionList(this.personalCustomerModel, this.pageService)
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
   * 切换触发
   */
  activated() {
    this.getPersonalClientList()
  }

  /**
   * 个人正式账户客户详情
   *
   */
  getFormalCustomerList(row) {
    this.personalModal = true
    this.presentId = row.personalId
    let personalModal = this.$refs['get-customer-details'] as GetCustomerDetails
    personalModal.getDetailsData(this.presentId)
    
  }
   /**
   *  订单详情
   * @param row
   */
    getOrderDetailsList(row) {
        this.orderDetailsModal = true
        let orderDetailsModal = this.$refs['personal-order-details'] as PersonalOrderDetails
        orderDetailsModal.getIndentDetails(row.personalId)
    }

  /**
   * 个人正式客户添加黑名单
   */
  blacklistModal() {
    this.personalModal = false
     this.$Modal.confirm({
      title: '提示',
      content: '确定将该客户加入黑名单？加入后将立即结束相关未完成订单！',
      onOk: () => {
        this.personalService
        .personalJoinBlacklist({ personalDataId:this.presentId })
          .subscribe(
            data => {
              this.$Message.success('加入黑名单成功！')
              this.getPersonalClientList()
            },
            ({ msg }) => {
              this.$Message.error(msg)
            }
          )
      }
    })
    
  }

  mounted() {
    this.getPersonalClientList()
  }
}
</script>

<style lang="less" scoped>

</style>


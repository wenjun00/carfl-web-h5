<!--个人意向客户-->
<template>
    <section class="page personal-client">
        <page-header title="个人意向客户" hidden-print>
            <i-button type="text">新增客户</i-button>
        </page-header>
        <data-form :model="personalClientModel" date-prop="timeSearch">
            <template slot="input">
                <i-form-item prop="busNumber" label="客户姓名">
                    <i-input v-model="personalClientModel.busNumber"></i-input>
                </i-form-item>
                <i-form-item prop="customerName" label="手机号码">
                    <i-input v-model="personalClientModel.customerName"></i-input>
                </i-form-item>
                <i-form-item prop="startTime" label="创建起止时间">
                    <i-date-picker type="daterange" v-model="personalClientModel.startTime"></i-date-picker>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="personalClientColumns" :data="dataSet" :page="pageService"></data-box>

        <template>
            <i-modal width="780" v-model="customerDetailsModal" title="客户详情" class="get-customer-details">
                <get-customer-details ref="get-customer-details"></get-customer-details>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="customerDetailsModal=false">取消</i-button>
                    <i-button size="large" type="primary" class="blueButton" @click="customerDetailsModal=false">编辑</i-button>
                </div>
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
@Layout('workspace')
@Component({
  components: {
      GetCustomerDetails
  }
})
export default class PersonalClient extends Page {
  @Dependencies(PageService) private pageService: PageService
  private dataSet: Array<any> = []
  private personalClientModel: any = {
    busNumber: '', //客户姓名
    customerName: '', // 手机号码
    startTime: '' // 创建起止时间
  }
  private customerDetailsModal:Boolean = false
  private personalClientColumns: any = [
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
                  this.getClientList(row)
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
                  this.receive(row)
                }
              }
            },
            '领取'
          ),
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              }
            },
            '删除'
          )
        ])
      }
    },
    {
      title: '客户姓名',
      editable: true,
      key: 'a1',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      title: '证件类型',
      editable: true,
      key: 'a2',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    },
    {
      title: '证件号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'a3',
      align: 'center'
    },
    {
      title: '手机号码',
      editable: true,
      key: 'a4',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '意向级别',
      editable: true,
      sortable: true,
      key: 'a5',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '所属地区',
      editable: true,
      key: 'a6',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '创建时间',
      editable: true,
      sortable: true,
      key: 'a7',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '归属业务员',
      editable: true,
      key: 'a8',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    }
  ]
  /**
   *  领取
   */
  receive(row) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定领取至“押品评估列表”？',
      onOk: () => {
        console.log(row)
      }
    })
  }
  /**
   * 获取客户详情
   */
  getClientList(row) {
      this.customerDetailsModal= true
  }

  mounted() {
    this.dataSet = [
      {
        a1: '123'
      }
    ]
  }
}
</script>

<style lang="less" scoped>

</style>


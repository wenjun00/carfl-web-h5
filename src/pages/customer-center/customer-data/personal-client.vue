<!--个人意向客户-->
<template>
    <section class="page personal-client">
        <page-header title="个人意向客户">
            <i-button @click="addCustomerDetails" type="text">新增客户</i-button>
        </page-header>
        <data-form :model="personalClientModel" date-prop="timeSearch" @on-search="getPersonalClientList">
            <template slot="input">
                <i-form-item prop="name" label="客户姓名">
                    <i-input v-model="personalClientModel.name"></i-input>
                </i-form-item>
                <i-form-item prop="telephone" label="手机号码">
                    <i-input v-model="personalClientModel.telephone"></i-input>
                </i-form-item>
                <i-form-item prop="dateRange" label="创建起止时间">
                    <i-date-picker type="daterange" v-model="personalClientModel.dateRange"></i-date-picker>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="personalClientColumns" :data="dataSet" :page="pageService"></data-box>
         <template>
            <i-modal width="780" v-model="addCustomerDetailsModal" title="新增客户详情" class="add-customer-details">
                <add-customer-details ref="add-customer-details"></add-customer-details>
                <div slot="footer">
                    <i-button size="large" type="ghost" class="Ghost" @click="addCustomerDetailsModal=false">取消</i-button>
                    <i-button size="large" type="primary" class="blueButton" @click="addDetailsSave">保存</i-button>
                </div>
            </i-modal>
        </template>

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
import AddCustomerDetails from '~/components/purchase-manage/add-customer-details.vue'
import { PersonalService } from '~/services/manage-service/personal.service'
import { FilterService } from "~/utils/filter.service";
@Layout('workspace')
@Component({
  components: {
      GetCustomerDetails,
      AddCustomerDetails
  }
})
export default class PersonalClient extends Page {
  @Dependencies(PersonalService) private personalService: PersonalService
  @Dependencies(PageService) private pageService: PageService
  private dataSet: Array<any> = []
  private personalClientModel: any = {
    personalType:'84',
    name: '', //客户姓名
    telephone: '', // 手机号码
    startTime: '', // 创建起止时间
    endDate:'',    // 创建结束日期
    dateRange:[]
  }
  private addCustomerDetailsModal:Boolean = false  // 新增客户详情
  private customerDetailsModal:Boolean = false     // 查看客户详情
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
          "span",
          FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
        );
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
   * 获取个人意向客户列表
   */
    getPersonalClientList(){
    this.personalService.getCustomerList(this.personalClientModel,this.pageService)
      .subscribe( data => {
        this.dataSet = data
      },({msg}) => {
        this.$Message.error(msg)
      })
  }
 /**
  * 新增意向保存
  */
    addDetailsSave(){
       let addCustomerDetailsModal = this.$refs['add-customer-details'] as AddCustomerDetails
       addCustomerDetailsModal.addClientSave()
    //    this.getPersonalClientList()
    }

  /**
   * 切换触发
   */
   activated() {
    this.getPersonalClientList()
    }

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
    /**
    * 新增客户详情
    */
    addCustomerDetails(){
     this.addCustomerDetailsModal= true
    }

  mounted() {
    this.getPersonalClientList()
  }
}
</script>

<style lang="less" scoped>

</style>


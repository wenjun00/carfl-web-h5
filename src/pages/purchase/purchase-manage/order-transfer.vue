<!--订单交接-->
<template>
  <section class="page order-transfer">
    <i-row>
      <span class="form-title">订单交接</span>
      <i-button @click="getOrderInfoByTime(0)" type="text">昨日</i-button>
      <i-button @click="getOrderInfoByTime(1)" type="text">今日</i-button>
      <i-button @click="getOrderInfoByTime(2)" type="text">本周</i-button>
      <i-button @click="getOrderInfoByTime(3)" type="text">本月</i-button>
      <i-button @click="getOrderInfoByTime(4)" type="text">上月</i-button>
      <i-button @click="getOrderInfoByTime(5)" type="text">最近三月</i-button>
      <i-button @click="getOrderInfoByTime(6)" type="text">本季度</i-button>
      <i-button @click="getOrderInfoByTime(7)" type="text">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2"><span v-if="!searchOptions">展开</span><span v-if="searchOptions">收起</span>高级搜索</i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <!--<i-button @click="oneKeyToConnect" class="blueButton">一键交接</i-button>-->
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
        </div>
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <!--搜索项-->
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-date-picker v-model="ordertransferModel.startTime" type="date" @on-change="startTimeChange" placeholder="起始日期(始)" style="width: 200px"></i-date-picker>
      <i-date-picker v-model="ordertransferModel.endTime" type="date" @on-change="endTimeChange" placeholder="终止日期(止)" style="width: 200px"></i-date-picker>
      <i-input v-model="ordertransferModel.orderInfo" @on-change="orderInfochange" style="display:inline-block;width:20%;" placeholder="请输入客户姓名/证件号码/联系号码/订单所属人查询"></i-input>
      <i-button style="margin-left:10px;" class="blueButton" @click="refreshData">搜索</i-button>
    </i-row>
    <!--列表-->
    <data-box ref="databox" :columns="columns1" :data="ordertransferDataSet" :page="pageService"></data-box>
    <!--一键交接-->
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span>申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" style="text-align:right;">
          <i-button @click="oneKeyToConnect" class="highButton">一键交接</i-button>
        </i-col>
      </i-row>
    </div>
    <!--Model-->
    <!--列配置-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <!--<i-table :columns="columns2" :data="data2" border stripe @on-select="multipleSelect"></i-table>-->
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <!--一键交接弹框-->
    <template>
      <i-modal v-model="openOneKeyToConnect" title="一键交接" width="800">
        <i-row style="margin-bottom:10px">
          <i-input placeholder="请输入关键字搜索" style="width:60%;display:inline-block;margin-left:10px;"></i-input>
          <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
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
      <i-modal title="转交记录" v-model="transferRecordModal" class="transfer-record">
        <transfer-record ref="transfer" :customerName="customerName" :orderId="orderId"></transfer-record>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Layout
  } from "~/core/decorator";
  import TransferRecord from '~/components/purchase-manage/transfer-record.vue';


  import {
    ProductOrderService
  } from "~/services/manage-service/product.order.service";
  import {
    FilterService
  } from "~/utils/filter.service";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import OrganizeTree from '~/components/common/organize-tree.vue'



  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      TransferRecord,
      OrganizeTree
    }
  })
  export default class OrderTransfer extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(OrderService) private orderService: OrderService;
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
    @Dependencies(ManageService) private manageService: ManageService;
    private columns1: any;
    private columns2: any;
    private treeColumns: any;
    private ordertransferDataSet: Array < Object > = [];
    private treeData: Array < Object > = [];
    private treeDatabox: Array < Object > = [];
    private data2: Array < Object > = [];
    private dataList: Array < any > = [];
    private userList: Array < any > = [];
    private searchOptions: Boolean = false;
    private ordertransferModel: any = {
      orderInfo: '', // 请输入客户姓名/证件号码/联系号码/订单所属人查询
      startTime: '', // 起始日期
      endTime: '', // 终止日期
      timeSearch: ''
    };
    private openColumnsConfig: Boolean = false
    private openOneKeyToConnect: Boolean = false
    private transferRecordModal: Boolean = false
    private checkRadio: String = ""
    private customerName: String = ""
    private orderId: String = ""
    private userListModel: any = {
      deptId: 1
    };
    private mulipleSelection: any = []
    private currentRowuserId: any = null

    activated() {}
    created() {
      this.refreshData()
      this.getTree()
      this.treeData = [{
          title: '开呗管理',
          expand: true,
          children: [{
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
          children: [{
              title: '地推管理部',
              expand: true,
              children: [{
                title: '西安营业部'
              }, {
                title: '宝鸡营业部'
              }, {
                title: '咸阳营业部'
              }, {
                title: '渭南营业部'
              }, {
                title: '铜川营业部'
              }]
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
      this.treeColumns = [{
          align: 'center',
          title: '选择',
          width: 180,
          render: (h, {
            row,
            columns,
            index
          }) => {
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
          width: 180
        }, {
          align: 'center',
          key: 'userRealname',
          title: '姓名',
          width: 195
        }
      ]
      this.columns1 = [{
          align: 'center',
          type: 'index',
          width: 60,
          renderHeader: (h, {
            column,
            index
          }) => {
            return h('div', {
              on: {
                click: () => {
                  this.columnsConfig()
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('Icon', {
                props: {
                  type: 'gear-b',
                  size: '20'
                }
              })
            ])
          }
        }, {
          type: 'selection',
          width: 80,
          align: 'center'
        }, {
          title: '操作',
          align: 'center',
          width: 120,
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('i-button', {
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
            }, '转交记录')
          }
        }, {
          title: '订单编号',
          key: 'orderNumber',
          align: 'center',
          //   render: (h, row) => {
          //     return h('i-button', {
          //       props: {
          //         type: 'text'
          //       },
          //       on: {
          //         click: () => {

          //         }
          //       }
          //     }, row.orderNumber)
          //   }
        },
        {
          title: '制单人',
          key: 'recorderName',
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'deptName',
          align: 'center'
        },
        {
          title: '转交人',
          key: 'transferName',
          align: 'center'
        },
        {
          title: '订单创建时间',
          key: 'createTime',
          align: 'center',
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd'))
          }
        },
        {
          title: '客户姓名',
          key: 'personalName',
          align: 'center'
        },
        {
          title: '证件号码',
          key: 'idCard',
          align: 'center',
          width: 160
        },
        {
          title: '联系号码',
          key: 'mobileMain',
          align: 'center'
        },
        {
          title: '产品名称',
          key: 'productName',
          align: 'center'
        },
        {
          title: '产品期数',
          key: 'periods',
          align: 'center'
        },
        {
          title: '环节',
          key: 'orderLink',
          align: 'center'
        },
        {
          title: '审批状态',
          key: 'orderStatus',
          align: 'center'
        }
      ]
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: '80',
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: '80',
        align: 'center'
      }]
      this.data2 = [{
        columnsName: '订单编号'
      }, {
        columnsName: '订单所属人'
      }, {
        columnsName: '所属部门'
      }, {
        columnsName: '转交人'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '产品期数'
      }, {
        columnsName: '环节'
      }, {
        columnsName: '审批状态'
      }]
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
      this.treeDatabox = [{
        workId: '001',
        personalName: '张三丰'
      }, {
        workId: '002',
        personalName: '张四丰'
      }]
    }
    refreshData() {
      this.ordertransferModel.startTime = FilterService.dateFormat(this.ordertransferModel.startTime)
      this.ordertransferModel.endTime = FilterService.dateFormat(this.ordertransferModel.endTime)
      this.productOrderService.getOrderHandover(this.ordertransferModel, this.pageService).subscribe(data => {
        this.ordertransferDataSet = data.object.list;
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }
    currenttrablerowdata(currentRow, oldCurrentRow) {
      console.log(currentRow, oldCurrentRow)
      this.currentRowuserId = currentRow.id
    }
    /**
     * 获取机构数
     */
    getTree() {
      this.manageService.getAllDepartment().subscribe(val => {
        // this.deptObject = val.object[0]
        this.dataList = val.object
      })
    }
    /**
     * 根据机构树获取用户
     */
    organizetreeChange(value) {
      this.userListModel.deptId = value.id
      this.manageService.getUsersByDeptPage(this.userListModel, this.pageService).subscribe(data => {
        this.userList = data.object.list
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
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
      console.log(this.mulipleSelection)
      if (!this.mulipleSelection) {
        this.$Message.info('请选择要交接的订单！')
      } else {
        this.openOneKeyToConnect = true
      }
    }
    /**
     * 订单交接（确定并返回）
     */
    orderconfirm() {
      let mulipledata = this.mulipleSelection.map(v => {
        return v.orderId
      })
      console.log(mulipledata, 800)
      let orderconfirmData: any = {
        orderIds: mulipledata,
        userId: this.currentRowuserId
      }
      this.productOrderService.orderTransfer(orderconfirmData).subscribe(data => {
        this.$Message.success('交接成功!')
        this.openOneKeyToConnect = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
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
    confirm() {

    }
    transferRecord(row) {
      this.customerName = row.personalName
      this.orderId = row.orderId
      let _transfer: any = this.$refs['transfer']
      _transfer.refreshData(row.orderId)
    }
  }

</script>

<style lang="less" scope>
  .transfer-record {
    .ivu-modal-footer {
      display: none!important;
    }
  }

</style>

<!--审核记录表-->
<template>
  <section class="page approval-record-table">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold;position:relative;left:10px;">审核记录表</span>
      <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
      <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
      <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
      <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
      <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
      <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
      <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
      <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">收起</span>
        <span>高级搜索</span>
      </i-button>
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:16px;">
      <i-select placeholder="全部状态" style="margin-left:20px;width:10%" v-model="approvalRecordModel.type" @on-change="changeSelectOne">
        <i-option label="通过" :value="0" :key="0"></i-option>
        <i-option label="退件" :value="374" :key="374"></i-option>
        <i-option label="拒绝" :value="375" :key="375"></i-option>
      </i-select>
      <i-select placeholder="通过类型" v-if="passSelect" style="margin-left:20px;width:12%" v-model="approvalRecordModel.second">
        <i-option label="通过" :key="310" :value="310"></i-option>
        <i-option label="提交内审/通过" :key="321" :value="321"></i-option>
        <i-option label="灰名单/通过" :key="322" :value="322"></i-option>
      </i-select>
      <i-select placeholder="全部拒单原因" v-if="!passSelect" style="margin-left:20px;width:12%;display:inline-block" v-model="approvalRecordModel.second"
        @on-change="changeSelectTwo">
        <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second"></i-option>
      </i-select>
      <i-select placeholder="全部拒单细节" v-if="!passSelect" style="margin-left:20px;width:12%;display:inline-block" v-model="approvalRecordModel.detail">
        <i-option v-for="item in refuseDetail" :key="item.detail" :label="item.detail" :value="item.detail"></i-option>
      </i-select>
      <span style="margin-left:10px;">日期：</span>
      <i-date-picker style="display:inline-block;width:10%;" v-model="approvalRecordModel.startTime"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" v-model="approvalRecordModel.endTime"></i-date-picker>
      <i-button class="blueButton" style="margin-left:20px;" @click="getApprovaRecordList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="approvalRecordList" @onPageChange="getApprovaRecordList" :page="pageService"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns3" :data="data3"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--进度查询-->
    <template>
      <i-modal v-model="orderProgressModal" title="审核进度" width="76" class="order-progress">
        <order-progress ref="order-progress"></order-progress>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import OrderProgress from "~/components/purchase-manage/order-progress.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import {
    CityService
  } from "~/utils/city.service"
  import {
    ApprovalService
  } from "~/services/manage-service/approval.service";
  import {
    ApproveReasonService
  } from "~/services/manage-service/approve-reason.service";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      OrderProgress
    }
  })
  export default class ApprovalRecordTable extends Page {
    @Dependencies(ApprovalService) private approvalService: ApprovalService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApproveReasonService) private approveReasonService: ApproveReasonService;
    private columns1: any;
    private approvalRecordList: Array < Object > = [];
    private searchOptions: Boolean = false;
    private roleName: String = "";
    private openCreateCompact: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private openCompact: Boolean = false;
    private columns2: any;
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkRadio: String = "融资租赁合同";
    private columns3: any;
    private orderProgressModal: Boolean = false;
    private passSelect: Boolean = false; // 通过下拉框flag
    private refuseReason: Array < Object >= [] // 拒单原因
    private refuseDetail: Array < Object >= [] // 拒单细节
    private approvalRecordModel: any = {
      timeSearch: '',
      startTime: '',
      endTime: '',
      type: '',
      second: '',
      detail: ''
    }


    mounted() {
      this.getApprovaRecordList()
    }
    created() {
      this.columns3 = [{
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: 80,
        align: 'center'
      }]

      this.data3 = [{
        columnsName: '申请类型'
      }, {
        columnsName: '环节'
      }, {
        columnsName: '订单状态'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '进入资源池时间'
      }, {
        columnsName: '省份'
      }, {
        columnsName: '城市'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号'
      }, {
        columnsName: '手机号'
      }]
      this.columns1 = [{
          align: 'center',
          width: 90,
          type: 'index',
          renderHeader: (h, {
            column,
            index
          }) => {
            return h(
              "div", {
                on: {
                  click: () => {
                    this.columnsConfig();
                  }
                },
                style: {
                  cursor: "pointer"
                }
              }, [
                h("Icon", {
                  props: {
                    type: "gear-b",
                    size: "20"
                  }
                })
              ]
            );
          }
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.checkOrderProgress(row)
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "审核时间",
          key: "approvalDate",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.approvalDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: "省份",
          width: 100,
          key: "province",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', CityService.getCityName(row.province))
          }
        },
        {
          align: "center",
          title: "城市",
          width: 100,
          key: "city",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', CityService.getCityName(row.city))
          }
        },
        {
          align: "center",
          title: "网点",
          key: "dot",
          width: 160
        },
        {
          align: "center",
          title: "业务员",
          key: "salesmanName",
          width: 160
        },
        {
          align: "center",
          title: "客户姓名",
          key: "personalName",
          width: 160
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "审核状态",
          key: "approveStatus",
          width: 160,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.approveStatus === 320) {
              return h('span', {}, '退回资源池')
            } else if (row.approveStatus === 321) {
              return h('span', {}, '提交内审/通过')
            } else if (row.approveStatus === 321) {
              return h('span', {}, '黑名单')
            } else if (row.approveStatus === 313) {
              return h('span', {}, '灰名单/通过')
            } else if (row.approveStatus === 312) {
              return h('span', {}, '拒绝')
            } else if (row.approveStatus === 311) {
              return h('span', {}, '退件')
            } else if (row.approveStatus === 310) {
              return h('span', {}, '通过')
            }
          }
        },
        {
          align: "center",
          title: "是否提车",
          key: "isDeliveryCar",
          width: 180
          // ,
          // render: (h, {
          //   row,
          //   columns,
          //   index
          // }) => {
          //   if (row.approvalStatus === '拒绝') {
          //     return h('Tooltip', {
          //       props: {
          //         content: row.content
          //       },
          //     }, [h('span', {}, row.isDeliveryCar),
          //       h('Icon', {
          //         props: {
          //           type: 'ios-information',
          //           size: '20',
          //           color: '#F9435D'
          //         },
          //         style: {
          //           position: 'relative',
          //           top: '2px',
          //           left: '6px',
          //           cursor: 'pointer'
          //         }
          //       })
          //     ])
          //   } else {
          //     return h('Tooltip', {
          //       props: {
          //         content: row.content
          //       },
          //     }, [h('span', {}, row.isDeliveryCar),
          //       h('Icon', {
          //         props: {
          //           type: 'ios-information',
          //           size: '20',
          //           color: '#666666'
          //         },
          //         style: {
          //           position: 'relative',
          //           top: '2px',
          //           left: '6px',
          //           cursor: 'pointer'
          //         }
          //       })
          //     ])
          //   }
          // }
        },
        {
          align: "center",
          title: "拒单原因",
          key: "refuseResource",
          width: 160
        },
        {
          align: "center",
          title: "拒单细节",
          key: "refuseDetails",
          width: 160
        },
        {
          align: "center",
          title: "备注",
          key: "remark",
          width: 160
        },
        {
          align: "center",
          title: "审核人员",
          key: "approvalPersonal",
          width: 160
        }
      ];
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    deleteRole(row) {

    }
    allotRole(row) {

    }
    dataPower(row) {

    }
    changeSelectOne(val) {
      if (val === 0) {
        // TODO
        this.passSelect = true
      } else {
        this.passSelect = false
        this.approvalRecordModel.detail = ''
        this.approvalRecordModel.second = ''
        this.approvalRecordModel.type = val
        this.approveReasonService.getApproveReasonByCondition(this.approvalRecordModel).subscribe(data => {
          this.refuseReason = data
        }, ({
          msg
        }) => {
          this.$Message.error(msg)
        })
      }
    }
    changeSelectTwo(val) {
      this.approvalRecordModel.second = val
      this.approvalRecordModel.detail = ''
      this.approveReasonService.getApproveReasonByCondition(this.approvalRecordModel).subscribe(data => {
        this.refuseDetail = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    checkOrderProgress(row) {
      this.orderProgressModal = true
      let _orderProgress: any = this.$refs['order-progress']
      _orderProgress.getOrderProgressInfo(row)
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    getApprovaRecordList() {
      this.approvalRecordModel.startTime = FilterService.dateFormat(this.approvalRecordModel.startTime, "yyyy-MM-dd")
      this.approvalRecordModel.endTime = FilterService.dateFormat(this.approvalRecordModel.endTime, "yyyy-MM-dd")
      this.approvalService.getAuditRecord(this.approvalRecordModel, this.pageService).subscribe(data => {
        this.approvalRecordList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getTimeSearch(val) {
      this.approvalRecordModel.startTime = ''
      this.approvalRecordModel.endTime = ''
      this.approvalRecordModel.second = ''
      this.approvalRecordModel.detail = ''
      this.approvalRecordModel.type = ''
      this.approvalRecordModel.timeSearch = val
      this.getApprovaRecordList()
      this.approvalRecordModel.timeSearch = ''
    }
  }

</script>

<style lang="less">
  .order-progress {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>

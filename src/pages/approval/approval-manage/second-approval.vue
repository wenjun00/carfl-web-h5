<!--复审-->
<template>
  <section class="page second-approval">
    <span class="form-title">复审</span>
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
    <i-row v-if="searchOptions" style="margin-top:6px;position:relative;right:10px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询" v-model="resourcePoolModel.resourcePoolModel"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="resourcePoolModel.startTime"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="resourcePoolModel.endTime"></i-date-picker>
      <span style="margin-left:10px;">省市：</span>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择省" v-model="resourcePoolModel.province" clearable>
        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择市" v-model="resourcePoolModel.city" clearable>
        <i-option v-for="{value,label} in this.resourcePoolModel.province ? this.$city.getCityData({ level: 1, id: this.resourcePoolModel.province }) : []"
          :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <span style="margin-left:10px;">产品类型</span>
      <i-select placeholder="产品类型" style="width:120px;" v-model="resourcePoolModel.productType" clearable>
        <i-option label="直租" :value="398" :key="398"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getSecondList">搜索</i-button>
    </i-row>

    <data-box :columns="columns1" :data="secondList"></data-box>
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

    <template>
      <i-modal title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
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
  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class SecondApproval extends Page {
    @Dependencies(ApprovalService) private approvalService: ApprovalService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private secondList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private purchaseInfoModal: Boolean = false;
    private columns3: any;
    private data3: Array < Object > = [];
    private resourcePoolModel: any = {
      orderLink: 333,
      startTime: '',
      endTime: '',
      province: '',
      city: '',
      personalInfo: '',
      timeSearch: '',
      productType: ''
    };
    private getOrderModel: any = {
      userId: '',
      orderIds: []
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.getSecondList()
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
                      this.getOrder(row);
                    }
                  }
                },
                "领取"
              )
            ]);
          }
        }, {
          key: 'orderLink',
          title: '环节',
          align: 'center',
          width: 186,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.orderLink === 332) {
              return h('span', {}, '面审')
            } else if (row.orderLink === 333) {
              return h('span', {}, '复审')
            } else if (row.orderLink === 334) {
              return h('span', {}, '终审')
            } else if (row.orderLink === 337) {
              return h('span', {}, '合规')
            }
          }
        },
        {
          title: "订单编号",
          key: "orderNumber",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row && row.orderNumber) {
              return h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.purchaseInfoModal = true
                  }
                }
              }, row.orderNumber)
            } else if (!row) {
              return h('span', {}, '')
            }
          }
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "createTime",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "进入资源池时间",
          key: "intoPoolDate",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.intoPoolDate, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "省份",
          key: "province",
          width: 100,
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
          key: "city",
          width: 100,
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
          title: "订单类型",
          key: "orderType",
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.orderType == 301) {
              return h('span', {}, '融资租赁')
            } else if (row.orderType == 302) {
              return h('span', {}, '全额付款')
            }
          }
        },
        {
          align: "center",
          title: "产品名称",
          key: "productName",
          width: 100
        },
        {
          align: "center",
          title: "客户姓名",
          key: "personalName",
          width: 100
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "手机号",
          key: "mobileMain",
          width: 160
        }
      ]

      this.columns2 = [{
        align: 'center',
        title: '处理时间',
        key: 'handleTime'
      }, {
        align: 'center',
        key: 'operator',
        title: '操作人'
      }, {
        align: 'center',
        key: 'step',
        title: '环节'
      }]

      this.data2 = [{
        handleTime: '2017-12-06 18:45:36',
        operator: '刘佳',
        step: '提交审批'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '李健',
        step: '面审'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '吴小川',
        step: '提交审批'
      }]
    }
    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true
      this.getOrderModel.orderIds = row.orderId
      this.getOrderModel.userId = this.$store.state.userData.id
    }
    confirmGetOrder() {
      this.approvalService.batchReceiveApproval(this.getOrderModel).subscribe(val => {
        this.$Message.success('领取成功！')
        this.getSecondList()
      })
      this.orderModal = false
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    getTimeSearch(val) {
      this.resourcePoolModel.startTime = ''
      this.resourcePoolModel.endTime = ''
      this.resourcePoolModel.city = ''
      this.resourcePoolModel.province = ''
      this.resourcePoolModel.personalInfo = ''
      this.resourcePoolModel.productType = ''
      this.resourcePoolModel.timeSearch = val
      this.getSecondList()
      this.resourcePoolModel.timeSearch = ''
    }
    getSecondList() {
      this.resourcePoolModel.startTime = FilterService.dateFormat(this.resourcePoolModel.startTime, "yyyy-MM-dd")
      this.resourcePoolModel.endTime = FilterService.dateFormat(this.resourcePoolModel.endTime, "yyyy-MM-dd")
      this.approvalService.auditResourcePool(this.resourcePoolModel, this.pageService).subscribe(val => {
        this.secondList = val.object.list
      })
    }
  }

</script>

<style>


</style>

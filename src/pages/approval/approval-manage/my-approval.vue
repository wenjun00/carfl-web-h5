<!--我的审核-->
<template>
  <section class="page my-approval">
    <span class="form-title">我的审核</span>
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
    <i-row v-if="searchOptions" style="position:relative;right:10px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" v-model="myOrderModel.personalInfo" placeholder="请录入客户姓名\证件号码\联系号码查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:16%" type="datetimerange" placeholder="请选择日期" @on-change="timeRangeChange"></i-date-picker>
      <span style="margin-left:10px;">省市：</span>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择省" v-model="myOrderModel.province" clearable>
        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-select style="width:100px;margin-left:10px;" placeholder="选择市" v-model="myOrderModel.city" clearable>
        <i-option v-for="{value,label} in this.myOrderModel.province ? this.$city.getCityData({ level: 1, id: this.myOrderModel.province }) : []"
          :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <span style="margin-left:10px;">产品类型：</span>
      <i-select placeholder="产品类型" style="width:120px;" v-model="myOrderModel.productType" clearable>
        <i-option label="直租" :value="398" :key="398"></i-option>
      </i-select>
      <!--<i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>-->
      <i-button style="margin-left:10px" class="blueButton" @click="getMyOrderList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="myOrderList" @onPageChange="getMyOrderList" :page="pageService"></data-box>
    <!--Modal-->
    <template>
      <i-modal v-model="approveModal" title="审批" width="800" class="approve">
        <approve ref="approve"></approve>
        <div slot="footer">
          <i-button style="background:##E7EBEE;color:#666666" @click="backToResource">退回资源池</i-button>
          <div style="height:32px;background-color:#dddddd;width:1px;display:inline-block;margin:0 10px;position:relative;top:10px;"></div>
          <i-button style="background:##E7EBEE;color:#666666" @click="submitToGray">灰名单</i-button>
          <i-button style="background:##E7EBEE;color:#666666" @click="submitToblack">黑名单</i-button>
          <i-button style="background:##E7EBEE;color:#666666" @click="submitToInternal">提交内审</i-button>
          <div style="height:32px;background-color:#dddddd;width:1px;display:inline-block;margin:0 10px;position:relative;top:10px;"></div>
          <i-button size="large" style="background:#265ea2;color:#fff" @click="rejectOrder">拒绝</i-button>
          <i-button size="large" style="background:#265ea2;color:#fff" @click="rebackModal=true">退件</i-button>
          <i-button size="large" style="background:#265ea2;color:#fff" @click="pass">通过</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="提交内审" v-model="submitToInternalModal">
        <i-form>
          <i-form-item label="详细原因">
            <i-input type="textarea" v-model="internalModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddInternal">取消</i-button>
          <i-button @click="confirmAddInternal" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal :title="rejectOrBlackFlag?'拒绝':'黑名单'" v-model="blackListModal">
        <i-form>
          <i-form-item>
            <i-select placeholder="请选择结果" style="width:20%" @on-change="changeSelectOne">
              <i-option label="拒绝" :value="375" :key="375"></i-option>
            </i-select>
            <i-select placeholder="全部拒单原因" style="margin-left:20px;width:25%;display:inline-block" v-model="approvalRecordModel.second"
              @on-change="changeSelectTwo">
              <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second"></i-option>
            </i-select>
            <i-select placeholder="全部拒单细节" style="margin-left:20px;width:25%;display:inline-block" v-model="approvalRecordModel.approveReasonId">
              <i-option v-for="item in refuseDetail" :key="item.id" :label="item.detail" :value="item.id"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item>
            <i-input type="textarea" v-model="approvalRecordModel.remark" placeholder="请录入详细原因（非必填，限制1000字以内）" :maxlength="1000"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddBlack">取消</i-button>
          <i-button @click="confirmAddBlackOrIntenal" class="blueButton">确定</i-button>
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

    <template>
      <i-modal title="灰名单" v-model="grayListModal">
        <i-form>
          <i-form-item label="详细原因">
            <i-input type="textarea" v-model="grayModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddGray">取消</i-button>
          <i-button @click="confirmAddGray" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="退回申请" v-model="rebackModal" @on-ok="approveModal=false">
        <i-form>
          <i-form-item>
            <i-select placeholder="请选择结果" style="width:20%" @on-change="changeSelectOne">
              <i-option label="退件" :value="374" :key="374"></i-option>
            </i-select>
            <i-select placeholder="全部拒单原因" style="margin-left:20px;width:25%;display:inline-block" v-model="approvalRecordModel.second"
              @on-change="changeSelectTwo">
              <i-option v-for="item in refuseReason" :key="item.second" :label="item.second" :value="item.second"></i-option>
            </i-select>
            <i-select placeholder="全部拒单细节" style="margin-left:20px;width:25%;display:inline-block" v-model="approvalRecordModel.approveReasonId">
              <i-option v-for="item in refuseDetail" :key="item.id" :label="item.detail" :value="item.id"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item>
            <i-input type="textarea" v-model="approvalRecordModel.remark"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelBackToComing">取消</i-button>
          <i-button @click="confirmBackToComing" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="审批通过" v-model="approvePassedModal" @on-ok="approveModal=false">
        <i-form>
          <i-form-item label="备注说明">
            <i-input type="textarea" v-model="facePassModel.remark"></i-input>
          </i-form-item>
        </i-form>
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

    <!--复审终审-->
    <template>
      <i-modal title="审批通过" v-model="secendLastApproval" width="800">
        <second-last-approve></second-last-approve>
      </i-modal>
    </template>

    <!--合规通过-->
    <template>
      <i-modal title="审批通过" v-model="meetConditionApproval">
        <i-form :label-width="100">
          <i-row>
            <i-col :span="12">
              <i-form-item label="合同生效开始日">
                <i-date-picker placeholder="请选择"></i-date-picker>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item>
                <i-radio-group v-model="compactEffect">
                  <i-radio label="当月"></i-radio>
                  <i-radio label="次月"></i-radio>
                </i-radio-group>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="24">
              <i-form-item label="备注">
                <i-input type="textarea" :rows="4"></i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
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
  import Approve from '~/components/approval-manage/approve.vue'
  import SecondLastApprove from '~/components/approval-manage/second-last-approve.vue'; // 复审终审通过
  import {
    ApprovalService
  } from "~/services/manage-service/approval.service";
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
    ApproveReasonService
  } from "~/services/manage-service/approve.reason.service";
  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      PurchaseInformation,
      Approve,
      SecondLastApprove
    }
  })
  export default class MyApproval extends Page {
    @Dependencies(ApprovalService) private approvalService: ApprovalService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApproveReasonService) private approveReasonService: ApproveReasonService;

    private columns1: any;
    private myOrderList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private approveModal: Boolean = false;
    private submitToInternalModal: Boolean = false;
    private blackListModal: Boolean = false;
    private grayListModal: Boolean = false;
    private rejectModal: Boolean = false;
    private purchaseInfoModal: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private rebackModal: Boolean = false;
    private approvePassedModal: Boolean = false;
    private secendLastApproval: Boolean = false; // 复审终审通过弹窗
    private meetConditionApproval: Boolean = false; // 合规通过弹窗
    private columns3: any;
    private data3: Array < Object > = [];
    private approveStatue: number = 0
    private compactEffect: String = '当月'
    private approvalOrderId: number = 0;
    private rejectOrBlackFlag: Boolean = false;
    private myOrderModel: any = {
      startTime: '',
      endTime: '',
      province: '',
      city: '',
      personalInfo: '',
      timeSearch: '',
      productType: ''
    }
    // 灰名单
    private grayModel: any = {
      remark: '',
      orderId: '',
      operateType: 1
    }
    // 黑名单
    private approvalRecordModel: any = {
      type: '',
      second: '',
      approveReasonId: '',
      remark: '',
      operateType: 2
    }
    // 内审
    private internalModel: any = {
      remark: '',
      operateType: 0
    }
    // 面审通过model
    private facePassModel: any = {
      remark: ''
    }
    private refuseReason: Array < Object >= [] // 拒单原因
    private refuseDetail: Array < Object >= [] // 拒单细节
    mounted() {
      this.getMyOrderList()
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
                      this.approveClick(row)
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        },

        {
          key: 'orderLink',
          title: '环节',
          align: 'center',
          width: 100,
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
          title: "订单状态",
          align: "center",
          key: "orderStatus",
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.orderStatus === 309) {
              return h('span', {}, '审核中')
            }
          }
        },
        {
          title: '订单编号',
          key: 'orderNumber',
          align: 'center',
          width: 180,
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
                  this.purchaseInfoModal = true
                }
              }
            }, row.orderNumber)
          }
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "createTime",
          width: 180,
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
          title: "领取时间",
          key: "receiveDate",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.receiveDate, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "处理时间",
          key: "approvalDate",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.approvalDate, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "省份",
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
          title: "订单类型",
          key: "orderType",
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
          key: "productName"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "personalName"
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
          width: 120
        }
      ];

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
        handleTime: '2017-12-06 18:48:45',
        operator: '李健',
        step: '面审'
      }, {
        handleTime: '2017-12-06 18:52:15',
        operator: '吴小川',
        step: '提交审批'
      }]
    }

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    changeSelectOne(val) {
      this.approvalRecordModel.approveReasonId = ''
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
    changeSelectTwo(val) {
      this.approvalRecordModel.second = val
      this.approvalRecordModel.approveReasonId = ''
      this.approveReasonService.getApproveReasonByCondition(this.approvalRecordModel).subscribe(data => {
        this.refuseDetail = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 取消退件
     */
    cancelBackToComing() {
      this.rebackModal = false
      this.approvalRecordModel.remark = ''
      this.approvalRecordModel.approveReasonId = ''
      this.approvalRecordModel.second = ''
    }
    /**
     * 确定退件
     */
    confirmBackToComing() {
      this.approvalRecordModel.orderId = this.approvalOrderId
      if (this.approvalRecordModel.approveReasonId) {
        this.approvalService.goBackInComing(this.approvalRecordModel).subscribe(val => {
          this.$Message.success('退件成功！')
          this.cancelBackToComing()
          this.getMyOrderList()
          this.approveModal = false
        }, ({
          msg
        }) => {
          this.$Message.error(msg)
        })
      } else {
        this.$Message.error('拒单原因和拒单细节必须选择！')
      }
    }
    /**
     * 取消放入灰名单
     */
    cancelAddGray() {
      this.grayListModal = false
      this.grayModel.remark = ''
    }
    /**
     * 确定放入灰名单
     */
    confirmAddGray() {
      this.grayModel.orderId = this.approvalOrderId
      this.approvalService.submitInternalAuditOrGreyList(this.grayModel).subscribe(val => {
        this.$Message.success('提交灰名单成功！')
        this.grayModel.remark = ''
        this.grayListModal = false
        this.approveModal = false
        this.getMyOrderList()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 确认提交内审
     */
    confirmAddInternal() {
      this.internalModel.orderId = this.approvalOrderId
      this.approvalService.submitInternalAuditOrGreyList(this.internalModel).subscribe(val => {
        this.$Message.success('提交内审成功！')
        this.internalModel.remark = ''
        this.approveModal = false
        this.submitToInternalModal = false
        this.getMyOrderList()
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 取消提交内审
     */
    cancelAddInternal() {
      this.internalModel.remark = ''
    }
    /**
     * 取消加入黑名单
     */
    cancelAddBlack() {
      this.approvalRecordModel.second = ''
      this.approvalRecordModel.approveReasonId = ''
      this.approvalRecordModel.remark = ''
      this.blackListModal = false
    }
    /**
     * 确定加入黑名单或者拒绝
     */
    confirmAddBlackOrIntenal() {
      this.approvalRecordModel.orderId = this.approvalOrderId
      if (this.approvalRecordModel.approveReasonId) {
        // 黑名单
        if (!this.rejectOrBlackFlag) {
          this.approvalRecordModel.operateType = 2
        } else {
          // 拒绝
          this.approvalRecordModel.operateType = 3
        }
        this.approvalService.submitBlackListOrRefuse(this.approvalRecordModel).subscribe(val => {
          this.$Message.success('提交黑名单成功！')
          this.blackListModal = false
          this.cancelAddBlack()
          this.getMyOrderList()
        }, ({
          msg
        }) => {
          this.$Message.error(msg)
        })
      } else {
        this.$Message.error('拒单原因和拒单细节必须选择！')
      }
    }
    backToResource() {
      this.$Modal.confirm({
        title: '退回资源池',
        content: '确定停止并放弃审核此订单？',
        onOk: () => {
          this.approvalService.goBackResourcePool({
            orderId: this.approvalOrderId
          }).subscribe(val => {
            this.$Message.success('退回资源池成功！')
            this.approveModal = false
            this.getMyOrderList()
          }, ({
            msg
          }) => {
            this.$Message.error(msg)
          })
        }
      })
    }
    pass() {
      console.log(this.approveStatue, 89883)
      if (this.approveStatue === 332) {
        // 面审TODO
        this.approvePassedModal = true
      } else if (this.approveStatue === 333 || this.approveStatue === 334) {
        // 复审&终审TODO
        this.secendLastApproval = true
      } else if (this.approveStatue === 337) {
        // 合规TODO
        this.meetConditionApproval = true
      }
    }
    rejectOrder() {
      // this.rejectModal = true
      this.blackListModal = true
      this.rejectOrBlackFlag = true // 拒绝或者黑名单判断标识
    }
    /**
     * 提交黑名单
     */
    submitToblack() {
      this.blackListModal = true
      this.rejectOrBlackFlag = false // 拒绝或者黑名单判断标识
    }
    /**
     * 提交内审
     */
    submitToInternal() {
      this.submitToInternalModal = true
    }
    submitToGray() {
      this.grayListModal = true
    }
    /**
     * 领取
     */
    getOrder(row) {
      // this.orderModal = true
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 审核
     */
    approveClick(row) {
      this.approveModal = true
      this.approveStatue = row.status
      let _approve: any = this.$refs['approve']
      _approve.getOrderDetail(row)
      this.approvalOrderId = row.orderId //拿到审核的orderId
      console.log(this.approvalOrderId, row, 777)

    }
    getMyOrderList() {
      this.approvalService.getMyApprovalOrder(this.myOrderModel, this.pageService).subscribe(data => {
        this.myOrderList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    timeRangeChange(val) {
      let startTime, endTime
      startTime = new Date(val[0])
      endTime = new Date(val[1])
      this.myOrderModel.startTime = startTime
      this.myOrderModel.endTime = endTime
      this.myOrderModel.timeSearch = ''
    }
    getTimeSearch(val) {
      this.myOrderModel.startTime = ''
      this.myOrderModel.endTime = ''
      this.myOrderModel.timeSearch = val
      this.getMyOrderList()
      this.myOrderModel.timeSearch = ''
    }
  }

</script>

<style lang="less">
  .approve {
    .bigButtonErr {
      height: 46px;
      width: 80px;
      background: #265ea2;
      color: #fff;
    }
    .bigButtonDefault {
      height: 46px;
      width: 80px;
      background: #265ea2;
      color: #fff;
    }
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>

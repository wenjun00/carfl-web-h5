<template>
  <section class="page customer-sign">
    <page-header title="客户签约"></page-header>
    <data-form date-prop="timeSearch" :model="customerSignModel" :page="pageService" @on-search="getSignList">
      <template slot="input">
        <i-form-item prop="startTime" label="日期">
          <i-date-picker v-model="customerSignModel.startTime"></i-date-picker>
        </i-form-item>
        <i-form-item prop="endTime">
          <i-date-picker v-model="customerSignModel.endTime"></i-date-picker>
        </i-form-item>
        <i-form-item prop="orderInfo">
          <i-input v-model="customerSignModel.orderInfo" placeholder="请输入订单编号\客户姓名\证件号码\联系号码"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="184" :columns="columns1" :data="customerSignList" @onPageChange="getSignList" :page="pageService"></data-box>
    <!--弹出框-->
    <template>
      <!--生成合同-->
      <i-modal class="contract-types" v-model="openCreateCompact" title="合同生成">
        <i-row>
          <span class="order-type">订单类型</span>
          <i-radio-group v-model="checkRadio" @on-change="changeCompactType">
            <i-row>
              <i-col :span="12">
                <i-radio label="融资租赁合同"></i-radio>
                <!--<i-radio label="长租合同"></i-radio>-->
              </i-col>
              <i-col :span="12">
                <i-radio label="全款销售合同"></i-radio>
                <!--<i-radio label="长租合同（银行版）"></i-radio>-->
              </i-col>
            </i-row>
            <!--<i-row>-->
            <!--<i-table :columns="columns3" :data="data3" border stripe></i-table>-->
            <!--</i-row>-->
          </i-radio-group>
          <i-table :columns="columns3" :data="data3" @on-selection-change="currentSelect" ref="changeTable"></i-table>
        </i-row>
        <div slot="footer">
          <i-button class="blue-button" @click="printPreview">打印预览</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal class="upload-contract" v-model="openCompact" title="上传合同">
        <i-row class="uploading">
          <i-button class="blue-button" @click="openClick">上传</i-button>
          <span class="suggest">建议文件大小100M以内</span>
        </i-row>
        <div class="upload-count">
          <span>文件数量({{dataList.length+mertialList.length}})</span>
          <div class="upload-count-item">
            <svg-icon class="upload-count-icon" iconClass="xiazai"></svg-icon>
            <i-button type="text" @click="downloadAll">全部下载</i-button>
          </div>
        </div>
        <ul class="upload-count-ul one">
          <li v-for="item in mertialList">
            <p>{{item.contractName}}</p>
            <div>
              <i-button type="text" icon="arrow-down-a" @click="downloadOne(item)"></i-button>
              <i-button type="text" icon="eye" @click="previewOne(item)"></i-button>
              <i-button type="text" icon="close" @click="handleRemoveOne(item)"></i-button>
            </div>
          </li>
        </ul>
        <ul class="upload-count-ul two">
          <li v-for="item in dataList" :key="item.uid">
            <p>{{item.name}}</p>
            <div>
              <i-button type="text" icon="arrow-down-a" @click="download(item)"></i-button>
              <i-button type="text" icon="eye" @click="preview(item)"></i-button>
              <i-button type="text" icon="close" @click="handleRemove(item)"></i-button>
            </div>
          </li>
        </ul>
        <div slot="footer">
          <i-button @click="cancelButton">取消</i-button>
          <i-button class="blueButton" @click="confirm">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal :loading="true" v-model="openUpload" @on-ok="postFile">
        <i-row>
          <i-col span="24">
            <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
          </i-col>
        </i-row>
      </i-modal>
    </template>
    <template>
      <i-modal title="预览" v-model="previewModel" width="800" class-name="no-footer">
        <img :src="url" class="preview" style="width: 100%">
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page'
  import DataBox from '~/components/common/data-box.vue'
  import Component from 'vue-class-component'
  import SvgIcon from '~/components/common/svg-icon.vue'
  import FileUpload from '~/components/common/file-upload.tsx.vue'
  import {
    Dependencies
  } from '~/core/decorator'
  import {
    OrderService
  } from '~/services/business-service/order.service'
  import {
    Layout
  } from '~/core/decorator'
  import {
    PersonalService
  } from '~/services/manage-service/personal.service'
  import {
    PageService
  } from '~/utils/page.service'
  import {
    FilterService
  } from '~/utils/filter.service'
  import {
    ContractService
  } from '~/services/contract-service/contract.service'
  import {
    CommonService
  } from '~/utils/common.service'

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      FileUpload
    }
  })
  export default class CustomerSign extends Page {
    @Dependencies(ContractService) private contractService: ContractService
    @Dependencies(PersonalService) private personalService: PersonalService
    @Dependencies(PageService) private pageService: PageService
    private previewModel: Boolean = false
    private columns1: any
    private customerSignList: Array < Object > = []
    private searchOptions: Boolean = false
    private customName: String = ''
    private openCreateCompact: Boolean = false
    private openColumnsConfig: Boolean = false
    private openCompact: Boolean = false
    private columns2: any
    private data2: Array < Object > = []
    private data3: Array < Object > = []
    private checkRadio: String = '融资租赁合同'
    private columns3: any
    private rowData: any
    private type: any
    private contectEnum: any
    private multipleSelection: any // 多选数据
    private openUpload: Boolean = false
    private dataList: Array < any > = []
    private url: any = ''
    private orderId: any = ''
    private materialUrl: any = []
    private mertialList: any = []
    private customerSignModel: any = {
      orderInfo: '',
      timeSearch: '',
      startTime: '',
      endTime: ''
    }

    mounted() {
      this.getSignList()
    }
    activated() {
      this.getSignList()
    }
    created() {
      this.columns1 = [{
          title: '操作',
          width: 200,
          fixed: 'left',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.createCompact(row)
                    }
                  }
                },
                '生成合同'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.openCompactInfos(row)
                    }
                  }
                },
                '合同资料'
              )
            ])
          }
        },
        {
          title: '订单编号',
          align: 'center',
          editable: true,
          key: 'orderNumber'
        },
        {
          align: 'center',
          title: '订单创建时间',
          editable: true,
          key: 'orderCreateTime',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              'span',
              FilterService.dateFormat(row.orderCreateTime, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        },
        {
          align: 'center',
          editable: true,
          title: '订单类型',
          key: 'orderType',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', {}, this.$dict.getDictName(row.orderType))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '产品名称',
          key: 'productName'
        },
        {
          align: 'center',
          editable: true,
          title: '客户姓名',
          key: 'personalName'
        },
        {
          align: 'center',
          editable: true,
          title: '证件号码',
          key: 'idCard'
        },
        {
          align: 'center',
          editable: true,
          title: '联系号码',
          key: 'mobileMain'
        },
        {
          align: 'center',
          editable: true,
          title: '最近合同生成日期',
          key: 'latelyContractTime',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              'span',
              FilterService.dateFormat(
                row.latelyContractTime,
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
      ]
      this.columns2 = [{
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '列名',
          key: 'columnsName',
          align: 'center'
        },
        {
          type: 'selection',
          width: 80,
          align: 'center'
        }
      ]
      this.columns3 = [{
          title: '文件名称',
          align: 'center',
          key: 'fileName'
        },
        {
          type: 'selection',
          align: 'center',
          width: 80
        }
      ]
      this.data2 = [{
          columnsName: '订单编号'
        },
        {
          columnsName: '订单创建时间'
        },
        {
          columnsName: '订单类型'
        },
        {
          columnsName: '产品名称'
        },
        {
          columnsName: '客户姓名'
        },
        {
          columnsName: '证件号码'
        },
        {
          columnsName: '最近合同生成日期'
        }
      ]

      this.data3 = [{
          fileName: '融资租赁申请单'
        }
        //   {
        //   fileName: "融资租赁申请单"
        // },
        // {
        //   fileName: "融资租赁合同正文"
        // },
        // {
        //   fileName: "合同附件一(付款时间表)"
        // },
        // {
        //   fileName: "合同附件二(配偶确认书)"
        // },
        // {
        //   fileName: "合同附件三(共同承租人确认书)"
        // },
        // {
        //   fileName: "委托收款合同"
        // },
        // {
        //   fileName: "首付款明细"
        // },
        // {
        //   fileName: "服务确认书"
        // },
        // {
        //   fileName: "责任告知书"
        // },
        // {
        //   fileName: "车辆交接单"
        // },
        // {
        //   fileName: "车辆出库单"
        // },
        // {
        //   fileName: "补充协议（减免）"
        // }
      ]
    }
    /**
     * 获取客户签约列表
     */
    getSignList() {
      this.customerSignModel.startTime = FilterService.dateFormat(
        this.customerSignModel.startTime,
        'yyyy-MM-dd'
      )
      this.customerSignModel.endTime = FilterService.dateFormat(
        this.customerSignModel.endTime,
        'yyyy-MM-dd'
      )
      this.personalService
        .getCustomerSignList(this.customerSignModel, this.pageService)
        .subscribe(
          data => {
            this.customerSignList = data
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    getOrderInfoByTime(val) {
      this.customerSignModel.timeSearch = val
      this.customerSignModel.orderInfo = ''
      this.customerSignModel.startTime = ''
      this.customerSignModel.endTime = ''
      this.getSignList()
      this.customerSignModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    oneKeyToConnect() {}
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 生成合同
     */
    createCompact(row) {
      this.rowData = row
      this.openCreateCompact = true
    }
    openCompactInfos(row) {
      this.orderId = row.orderId
      this.openCompact = true
      this.contractService
        .getContractResourceAll({
          orderId: this.orderId
        })
        .subscribe(
          data => {
            this.mertialList = data
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 切换合同种类
     */
    changeCompactType(type) {
      this.type = type
      if (type === '全款销售合同') {
        this.data3 = [{
            fileName: '融资租赁申请单'
          }
          //   {
          //     fileName: "融资租赁合同正文"
          //   },
          //   {
          //     fileName: "合同附件一(付款时间表)"
          //   },
          //   {
          //     fileName: "合同附件二(配偶确认书)"
          //   },
          //   {
          //     fileName: "合同附件三(共同承租人确认书)"
          //   }
        ]
      } else if (type === '长租合同（银行版）') {
        this.data3 = [{
            fileName: '融资租赁申请单'
          },
          {
            fileName: '融资租赁合同正文'
          },
          {
            fileName: '合同附件一(付款时间表)'
          },
          {
            fileName: '合同附件二(配偶确认书)'
          }
        ]
      } else if (type === '长租合同') {
        this.data3 = [{
            fileName: '长期租赁申请单'
          },
          {
            fileName: '长期租赁合同正文'
          },
          {
            fileName: '合同附件一(甲乙双方相关责任条款)'
          },
          {
            fileName: '合同附件二(车辆交接清单)'
          },
          {
            fileName: '委托收款合同'
          },
          {
            fileName: '车辆销售协议'
          },
          {
            fileName: '收款明细'
          },
          {
            fileName: '车辆出库单'
          },
          {
            fileName: '补充协议（减免）'
          }
        ]
      } else {
        this.data3 = [{
            fileName: '融资租赁申请单'
          }
          //   {
          //     fileName: "融资租赁合同正文"
          //   },
          //   {
          //     fileName: "合同附件一(付款时间表)"
          //   },
          //   {
          //     fileName: "合同附件二(配偶确认书)"
          //   },
          //   {
          //     fileName: "合同附件三(共同承租人确认书)"
          //   },
          //   {
          //     fileName: "委托收款合同"
          //   },
          //   {
          //     fileName: "首付款明细"
          //   },
          //   {
          //     fileName: "服务确认书"
          //   },
          //   {
          //     fileName: "责任告知书"
          //   },
          //   {
          //     fileName: "车辆交接单"
          //   },
          //   {
          //     fileName: "车辆出库单"
          //   },
          //   {
          //     fileName: "补充协议（减免）"
          //   }
        ]
      }
    }
    /**
     * 打印预览
     */
    printPreview() {
      if (this.checkRadio === '全款销售合同') {
        this.contectEnum = 'FULL_SALES'
      }
      if (this.checkRadio === '融资租赁合同') {
        this.contectEnum = 'DIRECT_RENT'
      }
      let printData: any = {
        orderId: this.rowData.orderId,
        contectEnum: this.contectEnum
      }
      if (this.multipleSelection) {
        this.contractService.createOneContract(printData).subscribe(
          data => {
            if (data.resultJson && data.resultJson.contractInfo) {
              window.open(data.resultJson.contractInfo[0].pdfUrl)
            }
            this.openCreateCompact = false
            // this.multipleSelection = []
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
      } else {
        this.$Message.warning('请选择文件！')
      }
    }
    currentSelect(selection) {
      this.multipleSelection = selection
    }
    openClick() {
      this.openUpload = true
    }
    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs['file-upload'] as FileUpload
      fileUpload.upload()
    }
    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false
      this.$nextTick(() => {
        let fileUpload = this.$refs['file-upload'] as FileUpload
        fileUpload.reset()
        for (let item of fileUpload.makeList()) {
          this.dataList.push({
            name: item.name,
            uid: item.uid,
            url: item.response.url,
            localUrl: item.response.localUrl,
            type: item.response.type,
            id: item.response.id,
            size: item.size,
            status: item.status,
            createTime: item.response.createTime
          })
        }
      })
    }
    /**
     * 下载
     */
    download(file) {
      CommonService.downloadFile(file.url, file.name)
    }
    /**
     * 预览
     */
    preview(file) {
      if (
        file.type === 'jpg' ||
        file.type === 'png' ||
        file.type === 'JPG' ||
        file.type === 'PNG'
      ) {
        this.url = file.url
        this.previewModel = true
      } else {
        window.open(file.url)
      }
    }
    /**
     * 删除
     */
    handleRemove(file) {
      this.dataList.splice(this.dataList.indexOf(file), 1)
    }
    cancelButton() {
      this.openCompact = false
      this.dataList = []
    }
    /**
     * 全部下载
     */
    downloadAll() {
      this.dataList.forEach(v => {
        CommonService.downloadFile(v.url, v.name)
      })
      this.mertialList.forEach(v => {
        CommonService.downloadFile(v.pdfUrl, v.contractName)
      })
    }
    /**
     * 确定
     */
    confirm() {
      this.dataList.forEach(v => {
        this.materialUrl.push(v.url)
      })
      this.contractService
        .uploadContractResource({
          orderId: this.orderId,
          materialUrl: this.materialUrl
        })
        .subscribe(
          data => {
            this.openCompact = false
            this.dataList = []
            this.$Message.success('上传成功！')
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    downloadOne(file) {
      CommonService.downloadFile(file.pdfUrl, file.contractName)
    }
    previewOne() {}
    handleRemoveOne(file) {
      this.mertialList.splice(this.mertialList.indexOf(file), 1)
    }
  }

</script>
<style lang="less" scoped>
  .page.customer-sign {
    .seek-day {
      margin-top: 10px;
    }
    // .command {
    //   float: right;
    //   margin-right: 10px;
    //   margin-top: 10px;
    //   .command-item {
    //     cursor: pointer;
    //     display: inline-block;
    //     margin-left: 10px;
    //     color: #3367a7;
    //     &.dayin {
    //       font-size: 24px;
    //       span {
    //         font-size: 12px;
    //       }
    //     }
    //     &.daochu {
    //       font-size: 12px;
    //       span {
    //         font-size: 12px;
    //       }
    //     }
    //   }
    // }
    // .data-form-data {
    //   margin: 6px;
    //   span {
    //     margin-left: 10px;
    //   }
    //   .data-picker {
    //     display: inline-block;
    //     width: 10%;
    //   }
    //   .data-input {
    //     display: inline-block;
    //     width: 20%;
    //   }
    //   .blue-button {
    //     margin-left: 10px;
    //     background: #265ea2;
    //     color: #fff;
    //   }
    // }
    .preview {
      width: 100%;
    }
  }

</style>
<style lang="less" scoped>
  .contract-types {
    .order-type {
      position: relative;
      bottom: 6px;
      margin-right: 10px;
    }
    .blue-button {
      background: #265ea2;
      color: #fff;
    }
  }

  .upload-contract {
    .uploading {
      .blue-button {
        background: #265ea2;
        color: #fff;
      }
      .suggest {
        margin-left: 15px;
      }
    }
    .upload-count {
      font-size: 18px;
      font-weight: bold;
      margin-top: 10px;
      .upload-count-item {
        display: inline-block;
        float: right;
        .upload-count-icon {
          font-size: 24px;
          cursor: pointer;
          position: relative;
          left: 18px;
        }
      }
    }
    .upload-count-ul {
      margin-left: 20px;
      &.one {
        margin-top: 20px;
      }
      &.two {
        margin-top: 10px;
      }
    }
  }

</style>

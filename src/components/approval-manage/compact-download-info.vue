<!--合同下载详情-->
<template>
    <section class="component compact-download-info">
        <data-box :columns="columnsdata" :data="dataSet" :page="pageService"></data-box>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'iview'
import Component from 'vue-class-component'
import CheckAttachment from '~/components/finance-manage/check-attachment.vue'
import { PageService } from '~/utils/page.service'
import { Dependencies } from '~/core/decorator'
import { ContractDownloadService } from '~/services/manage-service/contract-download.service'

@Component({
  components: {}
})
export default class CompactDownloadInfo extends Vue {
  @Dependencies(ContractDownloadService)
  private contractDownloadService: ContractDownloadService
  @Dependencies(PageService) private pageService: PageService

  private dataSet: Array<any> = []
  private columnsdata: any = [
    {
      align: 'center',
      type: 'index',
      title: '序号',
      minWidth: 60
    },
    {
      align: 'center',
      title: '下载时间',
      key: 'downTime',
      minWidth: 180
    },
    {
      align: 'center',
      title: '客户姓名',
      key: 'personalName'
    },
    {
      align: 'center',
      title: '身份证号',
      key: 'idCard',
      minWidth: 180
    },
    {
      align: 'center',
      title: ' 手机号',
      key: 'mobileMain'
    },
    {
      align: 'center',
      title: ' 归属公司',
      key: 'companyName'
    },
    {
      align: 'center',
      title: ' 订单编号',
      key: 'orderNumber'
    },
    {
      align: 'center',
      title: ' 产品名称',
      key: 'productName'
    }
  ]

  //   this.data1 = [{
  //     downloadTime: '2017-12-01 15:56:56',
  //     customerName: '孙丹',
  //     idCard: '610303199111142616',
  //     phone: '18036457812',
  //     belongFirm: '开呗西安66',
  //     orderId: 'kb20171001',
  //     prdName: '群泰融资'
  //   }, {
  //     downloadTime: '2017-12-01 15:50:56',
  //     customerName: '孙丹',
  //     idCard: '610303199111142616',
  //     phone: '18036457812',
  //     belongFirm: '开呗西安',
  //     orderId: 'kb20171001',
  //     prdName: '群泰融资'
  //   }, {
  //     downloadTime: '2017-12-01 13:26:45',
  //     customerName: '孙丹',
  //     idCard: '610303199111142616',
  //     phone: '18036457812',
  //     belongFirm: '开呗西安',
  //     orderId: 'kb20171001',
  //     prdName: '开呗长租'
  //   }, {
  //     downloadTime: '2017-12-01 18:16:56',
  //     customerName: '孙丹',
  //     idCard: '610303199111142616',
  //     phone: '18036457812',
  //     belongFirm: '开呗西安',
  //     orderId: 'kb20171001',
  //     prdName: '群泰融资'
  //   }]

  /**
   * 查看合同详情  this.pageService
   */
  contractDetails(userName) {
    this.contractDownloadService
      .getAllContractDetails({ userName: userName }, this.pageService)
      .subscribe(
        data => {
         this.dataSet = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
}
</script>

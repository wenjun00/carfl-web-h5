<!--合同下载详情-->
<template>
  <section class="component compact-download-info">
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'

  @Component({
    components: {
      DataBox
    }
  })
  export default class CompactDownloadInfo extends Vue {

    private columns1: any;
    private data1: Array < Object > = [];

    created() {

      this.columns1 = [{
          align: "center",
          type: "index",
          title: '序号',
          width: 60
        },
        {
          align: "center",
          title: "下载时间",
          key: 'downloadTime',
          width: 180
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "身份证号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: " 手机号",
          key: "phone"
        },
        {
          align: "center",
          title: " 归属公司",
          key: "belongFirm"
        },
        {
          align: "center",
          title: " 订单编号",
          key: "orderId"
        },
        {
          align: "center",
          title: " 产品名称",
          key: "prdName"
        }
      ];

      this.data1 = [{
        downloadTime: '2017-12-01 15:56:56',
        customerName: '孙丹',
        idCard: '610303199111142616',
        phone: '18036457812',
        belongFirm: '开呗西安',
        orderId: 'kb20171001',
        prdName: '群泰融资'
      },{
        downloadTime: '2017-12-01 15:50:56',
        customerName: '孙丹',
        idCard: '610303199111142616',
        phone: '18036457812',
        belongFirm: '开呗西安',
        orderId: 'kb20171001',
        prdName: '群泰融资'
      },{
        downloadTime: '2017-12-01 13:26:45',
        customerName: '孙丹',
        idCard: '610303199111142616',
        phone: '18036457812',
        belongFirm: '开呗西安',
        orderId: 'kb20171001',
        prdName: '开呗长租'
      },{
        downloadTime: '2017-12-01 18:16:56',
        customerName: '孙丹',
        idCard: '610303199111142616',
        phone: '18036457812',
        belongFirm: '开呗西安',
        orderId: 'kb20171001',
        prdName: '群泰融资'
      }]
    }
  }

</script>
<style>


</style>

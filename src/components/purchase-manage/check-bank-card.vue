<!--客户开户信息-->
<template>
  <section class="component compact-download-info">
    <data-box :columns="columns1" :data="data"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import DataBox from "~/components/common/data-box.vue";
  import {
    CityService
  } from '~/utils/city.service'
  import CheckAttachment from '~/components/finance-manage/check-attachment.vue'

  @Component({
    components: {
      DataBox
    }
  })
  export default class CompactDownloadInfo extends Vue {

    private columns1: any;
    private data1: Array < Object > = [];
    @Prop() data;

    created() {

      this.columns1 = [
        {
          align: 'center',
          editable: true,
          title: '开户状态',
          key: 'openAccountStatus',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', {}, this.$dict.getDictName(row.openAccountStatus))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '卡户银行',
          key: 'depositBank',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, { row }) => {
            return h('span', {}, this.$dict.getDictName(Number(row.depositBank)))
          }
        },
        {
          align: 'center',
          editable: true,
          title: '开户支行',
          key: 'depositBranch',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: 'center',
          editable: true,
          title: '银行卡号',
          key: 'cardNumber',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: 'center',
          editable: true,
          title: '客户号',
          key: 'clientNumber',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: 'center',
          editable: true,
          title: '账户类型',
          key: 'accountType',
          minWidth: this.$common.getColumnWidth(3),
          render:(h,{row}) => {
            return h('span',{},this.$dict.getDictName(row.accountType))
          }
        },
        // {
        //   align: 'center',
        //   editable: true,
        //   title: '开户省份',
        //   key: 'depositProvince',
        //   minWidth: this.$common.getColumnWidth(3),
        //   render: (h, {
        //     row,
        //     column,
        //     index
        //   }) => {
        //     return h('span', CityService.getCityName(row.depositProvince))
        //   }
        // },
        // {
        //   align: 'center',
        //   editable: true,
        //   title: '开户城市',
        //   key: 'depositCity',
        //   minWidth: this.$common.getColumnWidth(3),
        //   render: (h, {
        //     row,
        //     column,
        //     index
        //   }) => {
        //     return h('span', CityService.getCityName(row.depositCity))
        //   }
        // },
        {
          title: '验卡失败原因',
          key: 'cardFailure',
          //   editable: true,
          minWidth: this.$common.getColumnWidth(6),
          //   renderHeader: (h, {
          //     column,
          //     index
          //   }) => {
          //     return h(
          //       'div', {
          //         on: {
          //           click: () => {
          //             this.openHelpPage()
          //           }
          //         },
          //         style: {
          //           cursor: 'pointer'
          //         }
          //       }, [
          //         h('span', {}, '验卡失败原因'),
          //         h('Icon', {
          //           props: {
          //             type: 'help-circled',
          //             size: '20'
          //           }
          //         })
          //       ]
          //     )
          //   },
          align: 'center'
        },
        // {
        //   align: 'center',
        //   editable: true,
        //   title: '结算通道',
        //   key: 'settleChannel',
        // },
        {
          align: 'center',
          editable: true,
          title: '预留手机号',
          key: 'reservedPhoneNumber',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          align: 'center',
          editable: true,
          title: '开户名',
          key: 'personalName',
          minWidth: this.$common.getColumnWidth(3),
        }
      ]
    }
    /**
     * 打开帮助页
     */
    openHelpPage() {
      //   this.openHelp = true
    }
  }

</script>

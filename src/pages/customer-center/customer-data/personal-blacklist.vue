<!--个人黑名单-->
<template>
  <section class="page personal-blacklist">
    <page-header title="个人黑名单" hidden-print>
      <i-button type="text">新增黑名单</i-button>
    </page-header>
    <data-form :model="personalBlacklistModel" date-prop="timeSearch">
      <template slot="input">
        <i-form-item prop="busNumber" label="客户姓名">
          <i-input v-model="personalBlacklistModel.busNumber"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="手机号码">
          <i-input v-model="personalBlacklistModel.customerName"></i-input>
        </i-form-item>
        <i-form-item prop="startTime" label="创建起止时间">
          <i-date-picker type="daterange"  v-model="personalBlacklistModel.startTime"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="personalBlacklistColumns" :data="dataSet" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  @Layout("workspace")
  @Component({
    components: {}
  })
  export default class PersonalBlacklist extends Page{
    @Dependencies(PageService) private pageService: PageService;
    private dataSet: Array<any> = []
    private personalBlacklistModel: any = {
      busNumber: '', //客户姓名
      busNumber: '', // 手机号码
      startTime: '', // 创建起止时间
    }
    private personalBlacklistColumns:any =  [{
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
              }
            },
            '订单详情'
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
      }]

    mounted() {
      this.dataSet = [{
        a1:'123'
      }]
    }

  }
</script>

<style lang="less" scoped>

</style>


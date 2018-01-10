<!--系统日志-->
<template>
  <section class="page system-log">
    <i-row>
      <div class="form-title">系统日志</div>
      <span style="margin-left:10px;">操作人</span>
      <i-input v-model="customName" style="display:inline-block;width:8%;" placeholder="请输入操作人"></i-input>
      <span>操作时间</span>
      <DatePicker placeholder="请选操作时间"></DatePicker>
      <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" :page="pageService"></data-box>

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

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class OrderTransfer extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private columns2: any;
    private treeColumns: any;
    private data1: Array < Object > = [];
    private treeData: Array < Object > = [];
    private treeDatabox: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = '';
    private openColumnsConfig: Boolean = false
    private openOneKeyToConnect: Boolean = false
    private editSysParamsModal: Boolean = false

    private checkRadio: String = ""
    activated() {}
    created() {
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
        width: 320,
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
      }, {
        align: 'center',
        key: 'workId',
        title: '工号',
        width: 90
      }, {
        align: 'center',
        key: 'personalName',
        title: '姓名'
      }]
      this.columns1 = [{
          align: 'center',
          type: 'index',
          title: '序号',
          width: 60
        },
        {
          title: '描述',
          key: 'desc',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center'
        },
        {
          title: '客户端IP',
          key: 'clientIP',
          align: 'center'
        },
        {
          title: '操作时间',
          key: 'operatorTime',
          align: 'center'
        },
        {
          title: '请求执行时长(秒)',
          key: 'requestTime',
          align: 'center'
        },
        {
          title: '执行方法',
          key: 'executeWay',
          align: 'center'
        }
      ]

      this.data1 = [{
        desc: '查询所属公司的部门',
        operator: 'liujia',
        clientIP: '192.168.3.94',
        operatorTime: '2018-01-08 14:23:23',
        requestTime: '0.025',
        executeWay:'cn.fintecher.web.DepartmentController.queryAllDepartment'
      }, {
        desc: '获取所有委托方信息',
        operator: 'liujia',
        clientIP: '192.168.3.94',
        operatorTime: '2018-01-08 14:23:23',
        requestTime: '0.027',
        executeWay:'cn.fintecher.web.DepartmentController.queryAllDepartment'
      }, {
        desc: '查询所属公司的部门',
        operator: 'liujia',
        clientIP: '192.168.3.94',
        operatorTime: '2018-01-08 14:23:23',
        requestTime: '0.021',
        executeWay:'cn.fintecher.web.DepartmentController.queryAllDepartment'
      }]

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
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    oneKeyToConnect() {
      this.openOneKeyToConnect = true
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
  }

</script>

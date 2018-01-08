<!--系统参数管理-->
<template>
  <section class="page system-param-manage">
    <i-row>
      <div class="form-title">系统参数管理</div>
      <span style="margin-left:10px;">参数名称</span>
      <i-input v-model="customName" style="display:inline-block;width:8%;" placeholder="请输入参数名称"></i-input>
      <span>是否启用</span>
      <i-select>
        <i-option label="启用" value="启用" key="启用"></i-option>
        <i-option label="停用" value="停用" key="停用"></i-option>
      </i-select>
      <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" :page="pageService"></data-box>

    <template>
      <i-modal v-model="editSysParamsModal" title="修改系统参数">
        <modify-system-params></modify-system-params>
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
  import ModifySystemParams from "~/components/system-manage/modify-system-params.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      ModifySystemParams
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
                  this.editSysParamsModal = true
                }
              },
              style: {
                color: 'blue'
              }
            }, '修改')
          }
        },
        {
          title: '参数代码',
          key: 'paramsCode',
          align: 'center'
        },
        {
          title: '参数名称',
          key: 'paramsName',
          align: 'center'
        },
        {
          title: '参数值',
          key: 'paramsValue',
          align: 'center'
        },
        {
          title: '是否启用',
          key: 'isUsable',
          align: 'center'
        },
        {
          title: '说明',
          key: 'information',
          align: 'center'
        }
      ]

      this.data1 = [{
          paramsCode: 'SysParam.resetpassword',
          paramsName: '重置用户密码',
          paramsValue: '887888',
          isUsable: '启用',
          information: '无'
        },
        {
          paramsCode: 'SysParam.applypassword',
          paramsName: '申请用户密码',
          paramsValue: '888888',
          isUsable: '启用',
          information: '无'
        }, {
          paramsCode: 'SysParam.overday',
          paramsName: '密码过期天数(天)',
          paramsValue: '889888',
          isUsable: '启用',
          information: '无'
        }
      ]

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
  }

</script>

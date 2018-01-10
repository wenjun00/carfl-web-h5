<!--客户资料查询-->
<template>
  <section class="page customer-data-query">
    <span class="form-title">客户资料查询</span>
    <i-button type="text">昨日</i-button>
    <i-button type="text">今日</i-button>
    <i-button type="text">本周</i-button>
    <i-button type="text">本月</i-button>
    <i-button type="text">上月</i-button>
    <i-button type="text">最近三月</i-button>
    <i-button type="text">本季度</i-button>
    <i-button type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2"><span v-if="!searchOptions">展开</span><span v-if="searchOptions">关闭</span>高级搜索</i-button>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input v-model="customName" style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <!--上传资料、补充资料-->
    <template>
      <i-modal v-model="openUpload" title="上传资料">
        <i-button @click="uploadDialog">上传</i-button>
        <div style="font-size:18px;font-weight:bold;margin-top:10px">
          <span>文件数量（3）</span>
          <div style="display:inline-block;float:right;">
            <i-icon type="ios-download" style="position:relative;left:10px;"></i-icon>
            <i-button type="text">全部下载</i-button>
          </div>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>身份证-001fdawdeklvkje...</span><span style="margin-left:10px;">驾驶证-001fdawdeklvkje...</span>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>结婚证-001fdawdeklvkje...</span>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="uploadList" title="上传合同">
        <i-form :label-width="100">
          <i-form-item label="文件类型">
            <i-select style="width:160px;">
              <i-option label="身份证（必须）" value="身份证（必须）" key="身份证（必须）"></i-option>
              <i-option label="银行流水（必须）" value="银行流水（必须）" key="银行流水（必须）"></i-option>
              <i-option label="房产证（必须）" value="房产证（必须）" key="房产证（必须）"></i-option>
              <i-option label="话单（必须）" value="话单（必须）" key="话单（必须）"></i-option>
              <i-option label="行驶证（必须）" value="行驶证（必须）" key="行驶证（必须）"></i-option>
              <i-option label="驾驶证（必须）" value="驾驶证（必须）" key="驾驶证（必须）"></i-option>
              <i-option label="户口本" value="户口本" key="户口本"></i-option>
              <i-option label="结婚证" value="结婚证" key="结婚证"></i-option>
              <i-option label="学历证" value="学历证" key="学历证"></i-option>
            </i-select>
            <i-upload action="//jsonplaceholder.typicode.com/posts/" style="display:inline-block;margin-left:10px;">
              <i-button type="ghost" icon="ios-cloud-upload-outline">上传</i-button>
              <div style="margin-top:10px;">
              </div>
            </i-upload>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue"
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox
    }
  })
  export default class CustomerDataQuery extends Page {
    @Dependencies(OrderService) private orderService: OrderService;

    private searchOptions: Boolean = false;
    private openUpload: Boolean = false;
    private uploadList: Boolean = false;
    private customName: String = '';
    private columns1: any;
    private data1: Array < Object > = [];
    private openColumnsConfig: Boolean = false;
    private columns2: any;
    private data2: Array < Object > ;

    created() {
      this.columns1 = [{
          align: 'center',
          type: 'index',
          width: '60',
          renderHeader: (h, {
            column,
            index
          }) => {
            return h('div', {
              on: {
                click: () => {
                  this.columnsConfig()
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('Icon', {
                props: {
                  type: 'gear-b',
                  size: '20'
                }
              })
            ])
          }
        }, {
          title: '操作',
          width: '100',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.customerName === '王泽杰') {
              return h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: 'blue'
                },
                on: {
                  click: () => {
                    this.uploadFiles(row)
                  }
                }
              }, '上传资料')
            } else {
              return h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: 'blue'
                },
                on: {
                  click: () => {
                    this.addFiles(row)
                  }
                }
              }, '补充资料')
            }
          }
        },
        {
          title: '资料上传',
          key: 'uploadStatus',
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          title: '订单创建时间',
          key: 'orderCreateTime',
          align: 'center'
        },
        {
          title: '订单类型',
          key: 'orderType',
          align: 'center'
        },
        {
          title: '产品名称',
          key: 'prdName',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'customerName',
          align: 'center'
        },
        {
          title: '证件号码',
          key: 'idCard',
          align: 'center'
        },
        {
          title: '联系号码',
          key: 'phone',
          align: 'center'
        }
      ]
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: '80',
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: '80',
        align: 'center'
      }]
      this.data2 = [{
        columnsName: '资料上传'
      }, {
        columnsName: '订单编号'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '联系号码'
      }]
      // 获取数据
      this.orderService.getClientInfo().subscribe(({
        val
      }) => {
        console.log(222, val)
        this.data1 = val
      })
    }
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    /**
     * 上传资料
     */
    uploadFiles(row) {
      this.openUpload = true
    }
    /**
     * 补充资料
     */
    addFiles(row) {
      this.openUpload = true
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    uploadDialog() {
      this.uploadList = true
    }
  }

</script>

<style lang="less" scope>


</style>

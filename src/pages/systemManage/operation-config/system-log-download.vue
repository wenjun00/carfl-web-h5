<!--系统日志下载-->
<template>
  <section class="page system-log-download">
    <span class="form-title">系统日志下载</span>
    <i-row style="margin:6px;">
      <span>公司名称：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <span style="margin-left:10px;">操作人：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入证件号码"></i-input>
      <span style="margin-left:10px;">操作时间：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入联系号码"></i-input>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;">下载</i-button>
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

    <template>
      <i-modal v-model="changeStatusOpen" title="状态变更" width="300">
        <i-select placeholder="请选择状态">
          <i-option label="已删除" value="已删除" key="已删除"></i-option>
          <i-option label="待提交" value="待提交" key="待提交"></i-option>
          <i-option label="待面审" value="待面审" key="待面审"></i-option>
          <i-option label="待复审" value="待复审" key="待复审"></i-option>
          <i-option label="待终审" value="待终审" key="待终审"></i-option>
          <i-option label="待合规" value="待合规" key="待合规"></i-option>
        </i-select>
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
    Layout
  } from "~/core/decorator";

  @Layout("workspace")

  @Component({

    components: {
      DataBox
    }
  })
  export default class SystemLogDownload extends Page {
    private changeStatusOpen: Boolean = false;
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
        },
        {
          title: '操作时间',
          key: 'operateTime',
          align: 'center',
          width: '160'
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
          title: '请求执行时长（秒）',
          key: 'requestTime',
          align: 'center'
        },
        {
          title: '描述',
          key: 'desc',
          align: 'center'
        },
        {
          title: '执行方法',
          key: 'executeWay',
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
        columnsName: '操作时间'
      }, {
        columnsName: '操作人'
      }, {
        columnsName: '客户端IP'
      }, {
        columnsName: '请求执行时长（秒）'
      }, {
        columnsName: '描述'
      }, {
        columnsName: '执行方法'
      }]
      // 获取数据
      this.data1 = [{
        operateTime: '2017-12-01',
        operator: '刘琛',
        clientIP: '192.168.3.94',
        requestTime: '50',
        desc: '获取所有分公司信息',
        executeWay: 'report-service/api/CaseInfoInquiryController/getInfoByConditio'
      }]
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 更改状态
     */
    changeStatus(row) {
      this.changeStatusOpen = true
    }
  }

</script>

<style lang="less" scope>


</style>

<!--组织架构同步-->
<template>
  <section class="page org-frame-syn">
    <span class="form-title">组织架构同步</span>
    <i-row class="data-form" >
      <span>工号：</span>
      <i-input class="form-input" placeholder="请输入工号"></i-input>
      <span>姓名：</span>
      <i-input class="form-input" placeholder="请输入姓名"></i-input>
      <span >所属部门：</span>
      <i-input class="form-input" placeholder="请输入所属部门"></i-input>
      <i-button class="form-button">搜索</i-button>
      <i-button class="form-button">执行同步</i-button>
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
  export default class OrgFrameSyn extends Page {
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
          title: '序号'
        },
        {
          title: '用户工号',
          key: 'userId',
          align: 'center',
          width: '160'
        },
        {
          title: '用户姓名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'belongDept',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '同步时间',
          key: 'synTime',
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
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '联系号码'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '订单编号'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '产品期数'
      }, {
        columnsName: '利率（月）'
      }, {
        columnsName: '还款方式'
      }, {
        columnsName: '融资总额'
      }, {
        columnsName: '订单状态'
      }]
      // 获取数据
      this.data1 = [{
        userId: 'zzl4883a',
        userName: '胡开甲',
        belongDept: '群泰西安',
        createTime: '2017-12-01 13:20:50',
        synTime: '2017-12-06 16:26:37'
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
  .page.org-frame-syn{
    .data-form{
      margin:6px;
      .form-input{
        display:inline-block;
        width:10%;
        margin-right:10px
      }
      .form-button{
        margin-left:10px;
        background: #265EA2;
        color: #fff;

      }
    }
  }
</style>
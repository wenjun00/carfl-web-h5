<!--功能模块-->
<template>
  <section class="component function-module">
    <span>功能名称：</span>
    <i-input style="width:10%;display:inline-block"></i-input>
    <span style="margin-left:10px;">功能名称：</span>
    <i-input style="width:10%;display:inline-block"></i-input>
    <i-select placeholder="全部状态" style="margin-left:10px;width:10%;">
      <i-option label="已启用" value="已启用" key="已启用"></i-option>
      <i-option label="未启用" value="未启用" key="未启用"></i-option>
    </i-select>
    <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
    <i-button style="margin-left:10px;" class="blueButton">添加</i-button>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataBox
    }
  })

  export default class FunctionModule extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '操作',
          width: 170,
          align: 'center',
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: "#265EA2"
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: "#265EA2"
                }
              }, '移除')
            ])
          }
        },
        {
          title: '功能名称',
          key: 'functionName',
          align: 'center',
          width: 120
        },
        {
          title: '功能标记',
          key: 'functionMark',
          align: 'center'
        },
        {
          title: '功能状态',
          key: 'functionStatus',
          align: 'center',
          width: 100
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center',
          width: 100
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 160
        },
        {
          title: '修改时间',
          key: 'modifyTime',
          align: 'center',
          width: 160
        }
      ]
      this.data1 = [{
        functionName: '提交申请',
        functionMark: 'customerFileBtn',
        functionStatus: '启用',
        operator: '超级管理员',
        createTime: '2017-12-01 13:56:45',
        modifyTime: '2017-12-01 14:31:40'
      }]
    }
  }
</script>
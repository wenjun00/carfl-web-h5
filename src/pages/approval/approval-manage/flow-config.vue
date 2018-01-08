<!--流程配置-->
<template>
  <section class="page flow-config">
    <span class="form-title">审批流程配置</span>
    <i-row :gutter="20">
      <i-col :span="4" style="border:1px solid #F2F2F2;height:500px;margin-left:30px;">
        <div style="font-size:14px;font-weight:bold">部门分类</div>
        <i-tree :data="treeData"></i-tree>
      </i-col>
      <i-col :span="19">
        <i-button @click="addFlow" class="blueButton" style="margin-left:10px;">添加流程</i-button>
        <data-box :columns="columns1" :data="data1"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal title="添加流程" v-model="addFlowOpen" width="300">
        <i-select placeholder="请选择需要添加的流程" style="width:100%">
          <i-option label="面审" value="面审" key="面审"></i-option>
          <i-option label="复审" value="复审" key="复审"></i-option>
          <i-option label="终审" value="终审" key="终审"></i-option>
        </i-select>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
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
  export default class FlowConfig extends Page {
    private treeData: Array < Object > = [];
    private columns1: any;
    private data1: Array < Object > = [];
    private addFlowOpen: Boolean = false;

    created() {
      this.treeData = [{
          title: '融资租赁',
          expand: true,
          children: [{
            title: '车贷'
          }]
        },
        {
          title: '直租',
          expand: true,
          children: [{
              title: '群泰融租'
            },
            {
              title: '开呗长租'
            }
          ]
        }
      ]

      this.columns1 = [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 160
      }, {
        title: '审批流',
        align: 'center',
        key: 'approvalFlow',
        width: 400
      }, {
        align: 'center',
        title: '操作',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("div", [
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.deleteFlow(row);
                  }
                }
              },
              "删除"
            ),
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.moveUp(row);
                  }
                }
              },
              "上移"
            ),
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.moveDown(row);
                  }
                }
              },
              "下移"
            )
          ]);
        }
      }]

      this.data1 = [{
        approvalFlow: '面审'
      }, {
        approvalFlow: '复审'
      }, {
        approvalFlow: '终审'
      }, {
        approvalFlow: '合规'
      }]
    }

    deleteFlow(row) {
      this.$Modal.confirm({
        title:'提示',
        content:'确定删除吗？'
      })
    }
    moveUp(row) {

    }
    moveDown(row) {

    }
    addFlow() {
      this.addFlowOpen = true
    }
  }
</script>

<style>

</style>
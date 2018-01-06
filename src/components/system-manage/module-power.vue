<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <i-tree show-checkbox :data="treeData"></i-tree>
      </i-col>
      <!--表格-->
      <i-col :span="14">
        <span>模块功能</span>
        <data-box :columns="treeColumns" :data="treeDatabox"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DataBox from "~/components/common/data-box.vue";

  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      DataBox
    }
  })
  export default class ModulePower extends Vue {
    private treeData: Array < Object > = [];
    private treeColumns: any;
    private treeDatabox: Array < Object > = [];

    @Prop()
    row: Object;

    created() {
      this.treeData = [{
          title: '进件管理',
          expand: true,
          children: [{
              title: '融资租赁申请'
            },
            {
              title: '全额付款申请'
            },
            {
              title: '订单交接'
            },
            {
              title: '客户签约'
            },
            {
              title: '客户开户'
            }
          ]
        },
        {
          title: '系统设置',
          expand: true,
          children: [{
              title: '权限设置',
              expand: true,
              children: [{
                title: '角色维护'
              }, {
                title: '分配角色'
              }]
            }
          ]
        }
      ]

      this.treeColumns = [{
        align: 'center',
        type: 'selection',
        title: '选择',
        width: '60'
      }, {
        align: 'center',
        key: 'functionName',
        title: '功能名称',
        width: '90'
      }, {
        align: 'center',
        key: 'desc',
        title: '描述'
      }]

      this.treeDatabox=[{
        functionName:'查询',
        desc:'基础查询'
      },{
        functionName:'一件交接',
        desc:'交接功能'
      },{
        functionName:'签约',
        desc:''
      },{
        functionName:'编辑',
        desc:'编辑'
      }]
    }
    cancel() {

    }
    confirm() {

    }
  }
</script>
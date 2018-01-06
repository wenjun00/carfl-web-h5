<!--分配角色-->
<template>
  <section class="component data-power-modal">
    <i-row :gutter="10">
      <i-col :span="6">
        <div style="border:1px solid #D7D7D7;height:380px;">
          <span style="position:absolute;top:50%;left:24px;">可选部门</span>
        </div>
      </i-col>
      <i-col :span="18">
        <div style="border:1px solid #D7D7D7;height:380px;">
          <i-tree show-checkbox :data="treeData"></i-tree>
        </div>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class DataPowerModal extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    private treeData: Array < Object > = [];

    @Prop()
    row: Object;

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
    }
    cancel() {

    }
    confirm() {

    }
  }
</script>
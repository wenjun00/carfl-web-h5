<!--用户列表-->
<template>
  <section class="component user-list">
    <span style="margin-left:20px;">工号：</span>
    <i-input  style="display:inline-block;width:12%;" placeholder="请输入工号"></i-input>
      <span style="margin-left:20px;">姓名：</span>
    <i-input style="display:inline-block;width:12%;" placeholder="请输入姓名"></i-input>
      <span style="margin-left:20px;">所属部门：</span>
    <i-input style="display:inline-block;width:14%;" placeholder="请输入所属部门"></i-input>
    <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    <data-box :columns="columns1" :data="data1"></data-box>
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
  export default class UserList extends Vue {
    @Prop()
    row: Object;
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          title: '序号',
          width:'60'
        },
        { 
          title: "操作",
          align: "center",
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
                      this.moveOut(row);
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "工号",
          key: "workId",
        },
        {
          align: "center",
          title: "姓名",
          key: "staffName",
        },
        {
          align: "center",
          title: "所属部门",
          key: "belongDept",
          width:'120'
        }
      ];
      this.data1 = [{
        workId: 'zzl4883a',
        staffName: '刘佳',
        belongDept: '指望技术部'
      }, {
        workId: 'zzl4883a',
        staffName: '吴小川',
        belongDept: '指望技术部'
      }, {
        workId: 'zzl4883a',
        staffName: '李楠',
        belongDept: '安卓技术部'
      }, {
        workId: 'zzl4883a',
        staffName: '李兵强',
        belongDept: 'ios技术部'
      }]
    }
    cancel() {

    }
    confirm() {

    }
    moveOut(row) {

    }
  }
</script>
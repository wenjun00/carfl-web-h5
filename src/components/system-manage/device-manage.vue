<!--设备管理-->
<template>
  <section class="component device-manage">
    <span style="margin-left:20px;">当前用户名：{{this.userName}}</span>
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
  export default class DeviceManage extends Vue {
    @Prop()
    row: Object;
    @Prop()
    userName: String;
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
          align: "center",
          title: '类型',
          key:'type'
        },
        {
          align: "center",
          title: "是否禁用",
          key: "isDisabled",
        },
        {
          align: "center",
          title: "设备锁状态",
          key: "deviceLockStatus",
        }
      ];
      this.data1 = [{
        type: '移动端',
        isDisabled: '是',
        deviceLockStatus: '启用'
      },{
        type: 'PC端',
        isDisabled: '是',
        deviceLockStatus: '启用'
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

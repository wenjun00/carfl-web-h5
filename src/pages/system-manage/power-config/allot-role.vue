<!--分配角色-->
<template>
  <section class="page allot-role">
    <span class="form-title">分配角色</span>
    <i-row style="margin-bottom:10px;margin-left:25px;">
      <span style="margin-left:20px;">工号：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入工号"></i-input>
      <span style="margin-left:10px;">姓名：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入姓名"></i-input>
      <span style="margin-left:10px;">所属部门：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入所属部门"></i-input>
      <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="allotRoleModal" title="分配角色">
        <allot-role-modal></allot-role-modal>
      </i-modal>
    </template>

     <template>
      <i-modal v-model="dataPowerModal" title="数据权限">
        <data-power-modal></data-power-modal>
      </i-modal>
    </template>

    <!--<i-row>
      <i-col :span="4">
        <i-tree></i-tree>
      </i-col>
      <i-col :span="20">
        <data-box :columns="columns1" :data="data1"></data-box>
      </i-col>
    </i-row>-->
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import AllotRoleModal from '~/components/system-manage/allot-role-modal.vue'
  import DataPowerModal from '~/components/system-manage/data-power-modal.vue'

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
      DataBox,
      AllotRoleModal,
      DataPowerModal
    }
  })
  export default class AllotRole extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private roleName: String = "";
    private openCreateCompact: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private openCompact: Boolean = false;
    private columns2: any;
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkRadio: String = "融资租赁合同";
    private columns3: any;
    private allotRoleModal: Boolean = false;
    private dataPowerModal: Boolean = false;

    activated() {}
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: "60",
          title: '序号'
        },
        {
          title: "操作",
          width: "200",
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
                      this.allotRole(row);
                    }
                  }
                },
                "分配角色"
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
                      this.dataPower(row);
                    }
                  }
                },
                "数据权限"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "用户工号",
          key: "workId"
        },
        {
          align: "center",
          title: "用户姓名",
          key: "userName"
        },
        {
          align: "center",
          title: "所属部门",
          key: "belongDept"
        },
        {
          align: "center",
          title: "用户角色",
          key: "userRole"
        }
      ];
      this.data1 = [{
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }, {
        workId: 'zzl4883a',
        userName: '张飞飞',
        belongDept: '西安营业部',
        userRole: '总经理'
      }]

    }

    deleteRole(row) {

    }
    allotRole(row) {
      // this.$Modal.info({
      //   title: '分配角色',
      //   render: h => h(AllotRoleModal, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.allotRoleModal = true
    }
    dataPower(row) {
      // this.$Modal.info({
      //   title: '数据权限',
      //   render: h => h(DataPowerModal, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.dataPowerModal = true
    }


  }
</script>
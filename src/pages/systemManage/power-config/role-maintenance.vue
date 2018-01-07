<template>
  <section class="page role-maintenance">
    <span class="form-title">角色维护</span>
    <i-row style="margin-bottom:10px;margin-left:25px;">
      <span style="margin-left:20px;">角色名称：</span>
      <i-input v-model="roleName" style="display:inline-block;width:10%;" placeholder="请输入角色姓名"></i-input>
      <span style="margin-left:10px;">状态：</span>
      <i-select style="display:inline-block;width:10%">
        <i-option label="启用" value="启用" key="启用"></i-option>
        <i-option label="停用" value="停用" key="停用"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="modifyRoleModal" title="修改角色">
        <modify-role></modify-role>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="modulePowerModal" title="模块权限" width="600">
        <module-power></module-power>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="userListModal" title="用户列表" width="800">
        <user-list></user-list>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="waitHandleCaseModal" title="待办事项配置">
        <wait-handle-case></wait-handle-case>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import ModifyRole from "~/components/system-manage/modify-role.vue"
  import UserList from "~/components/system-manage/user-list.vue"
  import WaitHandleCase from "~/components/system-manage/wait-handle-case.vue"
  import ModulePower from "~/components/system-manage/module-power.vue"


  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    RoleService
  } from "~/services/role-service/role.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    
    components: {
      DataBox,
      ModifyRole,
      UserList,
      WaitHandleCase,
      ModulePower
    }
  })
  export default class RoleMaintenance extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    @Dependencies(RoleService) private roleService: RoleService;

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
    private modifyRoleModal: Boolean = false; // 修改角色
    private modulePowerModal: Boolean = false; // 模块权限
    private userListModal: Boolean = false; // 用户列表
    private waitHandleCaseModal: Boolean = false; // 待办事项配置

    created() {
     this.data1=[{
         roleName:'管理员',
         belongSystem:'指旺上海',
         operator:'刘佳',
         createTime:'2017-12-01 10:16:32',
         updateTime:'2017-12-01 13:56:21',
         desc:''
     }]
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
          title: '序号'
        },
        {
          title: "操作",
          width: 420,
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
                      this.modifyRole(row);
                    }
                  }
                },
                "修改"
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
                      this.deleteRole(row);
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
                      this.modulePower(row);
                    }
                  }
                },
                "模块权限"
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
                      this.userList(row);
                    }
                  }
                },
                "用户列表"
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
                      this.waitHandleCaseConfig(row);
                    }
                  }
                },
                "待办事项配置"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "角色名称",
          key: "roleName"
        },
        {
          align: "center",
          title: "所属系统",
          key: "belongSystem"
        },
        {
          align: "center",
          title: "操作人",
          key: "operator"
        },
        {
          align: "center",
          title: "创建时间",
          key: "createTime",
          width:160
        },
        {
          align: "center",
          title: "修改时间",
          key: "updateTime",
          width:160
        },
        {
          align: "center",
          title: "描述",
          key: "desc"
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
          align: "center"
        }
      ];
      this.columns3 = [{
          title: "文件名称",
          align: "center",
          key: "fileName"
        },
        {
          type: "selection",
          align: "center",
          width: 80
        }
      ];
      this.data2 = [{
          columnsName: "订单编号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "订单类型"
        },
        {
          columnsName: "产品名称"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "最近合同生成日期"
        }
      ];

      this.data3 = [{
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        },
        {
          fileName: "合同附件三(共同承租人确认书)"
        },
        {
          fileName: "委托收款合同"
        },
        {
          fileName: "首付款明细"
        },
        {
          fileName: "服务确认书"
        },
        {
          fileName: "责任告知书"
        },
        {
          fileName: "车辆交接单"
        },
        {
          fileName: "车辆出库单"
        },
        {
          fileName: "补充协议（减免）"
        }
      ];
      // this.orderService.getRoleList().subscribe(({
      //   val
      // }) => {
      //   this.data1 = val;
      // });
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    modifyRole(row) {
      // this.$Modal.info({
      //   title: '修改角色',
      //   render: h => h(ModifyRole, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.modifyRoleModal = true
    }
    deleteRole(row) {

    }
    modulePower(row) {
      // this.$Modal.info({
      //   title: '模块权限',
      //   width: '600',
      //   render: h => h(ModulePower, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.modulePowerModal = true
    }
    userList(row) {
      // this.$Modal.info({
      //   title: '用户列表',
      //   width: '800',
      //   render: h => h(UserList, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.userListModal = true
    }
    waitHandleCaseConfig(row) {
      // this.$Modal.info({
      //   title: '待办事项配置',
      //   render: h => h(WaitHandleCase, {
      //     props: {
      //       row
      //     }
      //   })
      // })
      this.waitHandleCaseModal = true
    }
  }

</script>

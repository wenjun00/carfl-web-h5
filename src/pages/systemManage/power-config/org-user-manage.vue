<!--机构用户与管理-->
<template>
  <section class="page org-user-manage">
    <span class="form-title">机构与用户管理</span>
    <i-row>
      <i-col :span="4">
        <i-tree :data="treeData"></i-tree>
      </i-col>
      <i-col :span="20">
        <i-row style="margin-bottom:10px;margin-left:25px;">
          <span style="margin-left:20px;">用户名：</span>
          <i-input style="display:inline-block;width:10%;" placeholder="请输入用户名"></i-input>
          <span style="margin-left:20px;">姓名：</span>
          <i-input style="display:inline-block;width:10%;" placeholder="请输入用户名"></i-input>
          <span style="margin-left:10px;">状态：</span>
          <i-select style="display:inline-block;width:10%">
            <i-option label="启用" value="启用" key="启用"></i-option>
            <i-option label="停用" value="停用" key="停用"></i-option>
          </i-select>
          <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
        </i-row>
        <data-box :columns="columns1" :data="data1"></data-box>
      </i-col>
    </i-row>

    <!--<template>
      <i-modal v-model="modifyRoleModal" title="修改角色">
        <modify-role></modify-role>
      </i-modal>
    </template>-->

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
  export default class OrgUserManage extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    @Dependencies(RoleService) private roleService: RoleService;

    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private treeData: Array < any > = [];

    allotRole(row) {

    }
    modifyRole(row) {

    }
    resetPwd(row) {

    }
    deviceManage(row) {

    }
    created() {
      this.treeData = [{
        title: '中资联',
        expand: true,
        children: [{
          title: '指旺金科',
          expand: true,
          children: [{
            title: '指旺西安'
          }, {
            title: '指旺上海'
          }, {
            title: '指旺合肥'
          }]
        }]
      }]
      this.data1 = [{
        userName: 'dianguangshihuio',
        actualName: '胡开甲',
        belongOrg: '指旺西安',
        status: '开启',
        phone: '13565757815',
        createTime: '2017-12-01 13:56:56'
      }]
      this.columns1 = [{
          align: "center",
          type: "index",
          width: "60",
          title: '序号'
        },
        {
          title: "操作",
          width: "420",
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
                      this.resetPwd(row);
                    }
                  }
                },
                "重置密码"
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
                      this.deviceManage(row);
                    }
                  }
                },
                "设备管理"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "用户名",
          key: "userName"
        },
        {
          align: "center",
          title: "姓名",
          key: "actualName"
        },
        {
          align: "center",
          title: "所属机构",
          key: "belongOrg"
        },
        {
          align: "center",
          title: "状态",
          key: "status"
        },
        {
          align: "center",
          title: "电话",
          key: "phone"
        },
        {
          align: "center",
          title: "创建时间",
          key: "createTime"
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
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


    }


  }
</script>
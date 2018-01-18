<!--用户列表-->
<template>
  <section class="component user-list">
    <span style="margin-left:20px;">用户名：</span>
    <i-input style="display:inline-block;width:12%;" v-model="userListModel.username"></i-input>
    <span style="margin-left:20px;">姓名：</span>
    <i-input style="display:inline-block;width:12%;" v-model="userListModel.realname"></i-input>
    <i-button class="blueButton" style="margin-left:10px;" @click="search">搜索</i-button>
    <data-box :columns="columns1" :data="userList"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DataBox from "~/components/common/data-box.vue";
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    PageService
  } from "~/utils/page.service";

  @Component({
    components: {
      DataBox
    }
  })
  export default class UserList extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ManageService) private manageService: ManageService;
    @Prop() roleId
    private columns1: any;
    private userList: Array < Object > = [];
    private userListModel: any

    created() {
      this.userListModel = {
        username: '',
        realName: '',
        roleId: this.roleId
      }
      this.columns1 = [{
          align: "center",
          type: "index",
          title: '序号',
          width: 60
        },
        {
          align: "center",
          title: "用户名",
          key: "userName",
        },
        {
          align: "center",
          title: "姓名",
          key: "realName",
        },
        {
          align: "center",
          title: "所属部门",
          key: "deptName",
          width: 120
        },
        {
          align: "center",
          title: "电话",
          key: "userPhone",
        }, {
          align: "center",
          title: "邮箱",
          key: "userEmail",
        },
      ];
    }
    getUserListByRole(roleId) {
      this.userListModel.roleId = roleId
      console.log(this.userListModel.roleId, 9090)
      this.manageService.getUserByRoleIdPage(this.userListModel, this.pageService).subscribe(val => {
        this.userList = val.object.list
      })
    }
    search() {
      console.log(this.userListModel.roleId, 9090)
      this.manageService.getUserByRoleIdPage(this.userListModel, this.pageService).subscribe(val => {
        this.userList = val.object.list
      })
    }
  }

</script>

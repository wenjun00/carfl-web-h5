<!--分配角色-->
<template>
  <section class="component allot-role-modal">
    <span>角色名称：</span>
    <i-input style="display:inline-block;width:20%;" v-model="roleListModel.roleName"></i-input>
    <i-button class="blueButton" style="margin-left:10px;" @click="getRoleList">搜索</i-button>
    <data-box :columns="columns1" :data="roleList" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PageService
  } from "~/utils/page.service";
  @Component({
    components: {
      DataBox
    }
  })
  export default class AllotRoleModal extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private roleList: Array < Object > = [];
    private roleListModel: any;
    private allotRoleModel: any; // 单个分配角色model
    private batchAllotModel: any; // 批量分配角色model
    private multipleRoleId; // 所选角色array
    @Prop() userId: any; // 单个用户id
    @Prop() batchAllotFlag: Boolean;
    @Prop() userIds: any;
    created() {
      this.allotRoleModel = {
        userId: '',
        rolesId: []
      }
      this.batchAllotModel = {
        usersId: [],
        rolesId: []
      }
      this.roleListModel = {
        roleName: ''
      }
      this.columns1 = [{
        align: 'center',
        type: 'selection',
        width: 60
      }, {
        align: 'center',
        title: '角色名称',
        key: 'roleName'
      }, {
        align: 'center',
        title: '备注',
        key: 'roleRemark'
      }]
    }

    getRoleList() {
      this.manageService.queryRolePage(this.roleListModel, this.pageService).subscribe(val => {
        this.roleList = val.object.list
      })
    }
    cancel() {

    }
    confirm() {

    }
    allotRole() {
      this.multipleRoleId = this.$refs['databox']
      this.multipleRoleId = this.multipleRoleId.getCurrentSelection()
      // 获取roleId
      if (this.multipleRoleId) {
        this.allotRoleModel.rolesId = this.multipleRoleId.map(v => v.id)
        this.batchAllotModel.rolesId = this.multipleRoleId.map(v => v.id)
      } else {
        this.multipleRoleId = []
      }

      // 根据flag判断是批量分配还是单个分配角色
      if (!this.multipleRoleId.length) {
        this.$Message.info('请选择角色！')
      } else {
        if (this.batchAllotFlag) {
          this.batchAllotModel.usersId = this.userIds
          this.manageService.userBatchAllocateRoles(this.batchAllotModel).subscribe(val => {
            this.$Message.success('批量分配成功！')
            this.$emit('closeAndRefreshTree')
          })
        } else {
          this.allotRoleModel.userId = this.userId
          this.manageService.userAllocateRoles(this.allotRoleModel).subscribe(val => {
            this.$Message.success('分配成功！')
            this.$emit('closeAndRefreshTree')
          })
        }
      }
    }
  }

</script>

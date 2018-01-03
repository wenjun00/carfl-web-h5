<template>
  <section class="page organization-manage">
    <data-form :model="orgModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="机构名称:" prop="name">
          <el-input v-model="orgModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="createOrg">添加机构</el-button>
      </template>
    </data-form>
    <data-box :data="orgDataSet">
      <template slot="columns">
        <el-table-column prop="name" label="机构名称">
        </el-table-column>
        <el-table-column prop="type" label="机构类型">
        </el-table-column>
        <el-table-column prop="parentId" label="父级机构">
        </el-table-column>
        <el-table-column prop="date" label="更新时间">
        </el-table-column>
        <el-table-column prop="operator" label="操作人">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyClick(scope)">修改</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--新建机构-->
    <el-dialog title="新增机构" :center="true" :visible.sync="dialog.create" width="40%">
      <create-organization ref="create-organization" @close="dialog.create = false" @success="refreshData"></create-organization>
    </el-dialog>
    <el-dialog title="修改机构" :center="true" :visible.sync="dialog.modify" width="40%" @open="modifyOpen">
      <modify-organization ref="modify-organization" @close="dialog.modify = false" @success="refreshData"></modify-organization>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";
  import {
    organizationService
  } from "~/services/organization.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import CreateOrganization from "~/components/pages/system-manage/create-organization.vue";
  import ModifyOrganization from "~/components/pages/system-manage/Modify-organization.vue";

  @Layout('workspace')
  @Component({
    components: {
      CreateOrganization,
      ModifyOrganization,
      DataForm,
      DataBox
    }
  })
  export default class OrganizationManage extends Vue {
    @Dependencies(organizationService) private organizationService: organizationService;
    private orgDataSet: Array < any > = [];
    private orgModel: any = {
      name: ""
    };
    private dialog: any = {
      create: false,
      modify: false
    };
    private modifyData: any = {};
    createOrg(){
      this.dialog.create = true
    }
    /**
     * 获取刷新数据
     */
    refreshData() {
      this.organizationService.getAllOrganizations().subscribe(data => {
        this.orgDataSet = data;
      });
      console.log('aaa')
    }
    /**
     * 修改
     */
    modifyClick(scope) {
      this.dialog.modify = true
      this.modifyData = scope.row
    }
    modifyOpen() {
      this.$nextTick(() => {
        let ref: any = this.$refs['modify-organization']
        ref.refresh(this.modifyData)
      })
    }
    mounted () {
      this.refreshData()
    }
  }

</script>

<style>


</style>

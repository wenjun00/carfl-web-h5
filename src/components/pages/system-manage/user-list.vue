<template>
  <section class="component user-list">
    <data-form :model="userModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="userModel.name"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="fullName">
          <el-input v-model="userModel.fullName"></el-input>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="userDataSet" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="fullName" label="姓名">
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    operatorService
  } from "~/services/operator.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";


  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class CreateCase extends Vue {
    @Dependencies(operatorService) private operatorService: operatorService;
    // 用户列表数据集
    private userDataSet: Array < any > = [];
    // 用户数据实体
    private userModel: any = {
      name: "",
      fullName: ""
    };
    /**
     * 获取刷新数据
     */
    refreshData(id) {
      this.operatorService.orgSimpleListByRole(id).subscribe(data => {
        this.userDataSet = data;
      });
    }
  }

</script>
<style>


</style>

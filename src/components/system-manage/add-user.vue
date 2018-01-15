<!--新增用户-->
<template>
  <section class="component add-user">
    <i-form :label-width="110" class="addUser">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="所属机构">
            <i-input v-model="addUserModel.belongOrg"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="公司名称">
            <i-select v-model="addUserModel.firmName">
              <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
              <i-option label="群泰上海" value="群泰上海" key="群泰上海"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="年龄">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="性别">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="民族">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="绑定主叫号码">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="数据权限">
            <i-select>
              <i-option value="个人" label="个人" key="个人"></i-option>
              <i-option value="组织" label="组织" key="组织"></i-option>
              <i-option value="公司" label="公司" key="公司"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
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
  export default class AddUser extends Vue {
    private addUserModel: Object
    created() {
      this.addUserModel = {
        belongOrg: '指旺西安',
        firmName: '群泰西安'
      }
    }
    cancel() {

    }
    confirm() {

    }
  }

</script>
<style lang="less">
  // .modifyUserForm {
  //   .ivu-input {
  //     width: 65%;
  //   }
  // }
  .addUser {
    position: relative;
    right: 30px;
  }

</style>

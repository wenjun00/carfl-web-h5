<!--新增组织-->
<template>
  <section class="component add-org">
    <i-form :label-width="110" class="addOrg" ref="add-org-form" :model="addOrgModel" :rules="rules">
      <i-row>
        <i-col :span="24">
          <i-form-item label="机构名称" prop="deptName">
            <i-input v-model="addOrgModel.deptName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="组织机构类型" prop="deptType">
            <i-input v-model="addOrgModel.deptType"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="组织机构等级" prop="deptLevel">
            <i-select v-model="addOrgModel.deptLevel">
              <i-option label="一级" :value="401" :key="401"></i-option>
              <i-option label="二级" :value="402" :key="402"></i-option>
              <i-option label="三级" :value="403" :key="403"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="状态" prop="deptStatus">
            <i-select v-model="addOrgModel.deptStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称" v-model="addOrgModel.companyName" prop="companyId">
            <i-select v-model="addOrgModel.companyId">
              <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="deptRemark">
            <i-input v-model="addOrgModel.deptRemark" type="textarea"></i-input>
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
    @Prop() deptLevel;
    private addOrgModel: any;
    private rules: any;
    created() {
      this.addOrgModel = {
        deptName: '',
        deptStatus: 0,
        companyName: '',
        deptRemark: '',
        deptType: '',
        deptLevel: ''
      }
      this.rules = {
        deptName: [{
          required: true,
          trigger: 'blur',
          message: '请输入机构名称'
        }]
      }
    }
    /**
     * 添加组织机构
     */
    addOrg() {
      this.addOrgModel.deptLevel = this.deptLevel
      let _addOrg: any = this.$refs['add-org-form']
      _addOrg.validate(valid => {
        if (valid) {

        }
      })
    }
  }

</script>
<style lang="less">
  // .modifyUserForm {
  //   .ivu-input,
  //   .ivu-select,
  //   .ivu-select-single {
  //     width: 85%;
  //   }
  // }
  .addOrg {
    position: relative;
    right: 30px;
  }

</style>

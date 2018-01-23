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
          <i-form-item label="组织机构等级" prop="deptLevel">
            <i-select v-model="addOrgModel.deptLevel" disabled>
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
            <i-select v-model="addOrgModel.deptStatus" clearable>
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称" prop="companyId">
            <i-select v-model="addOrgModel.companyId" disabled>
              <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
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
    Prop,
    Watch
  } from "vue-property-decorator";
  import {
    DepartmentService
  } from "~/services/manage-service/department.service";
  import {
    CompanyService
  } from "~/services/manage-service/company.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {}
  })
  export default class AddOrg extends Vue {
    @Dependencies(DepartmentService) private departmentService: DepartmentService;
    @Dependencies(CompanyService) private companyService: CompanyService;
    @Prop() addOrgModel: any;
    private rules: any;
    private getAllCompany: any;
    private companyObject: Array < Object >= []; // 公司信息
    created() {
      this.rules = {
        deptName: [{
          required: true,
          trigger: 'blur',
          message: '请输入机构名称'
        }]
      }


    }
    confirmAddOrg() {
      let _addOrg: any = this.$refs['add-org-form']
      _addOrg.validate(valid => {
        if (valid) {
          this.departmentService.createDepartment(this.addOrgModel).subscribe(val => {
            this.$Message.success('添加成功！')
            this.$emit('close')
          })
        }
      })
    }
    addDept() {
      console.log('子组件', this.addOrgModel)
      // 获取公司名称
      this.companyService.getAllCompany(this.getAllCompany).subscribe(val => {
        this.companyObject = val.object
      })
    }
  }

</script>
<style lang="less">
  .addOrg {
    position: relative;
    right: 30px;
  }

</style>

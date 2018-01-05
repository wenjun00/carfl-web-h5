<template>
  <section class="component modify-template">
    <el-form ref="modify-form" :model="modifyModel">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="modifyModel.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="委托方" prop="trustee">
        <el-input v-model="modifyModel.trustee" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="modifyModel.set" stripe>
      <el-table-column prop="cell" label="名称" min-width="90">
      </el-table-column>
      <el-table-column label="映射字段" min-width="60">
        <template slot-scope="scope">
          <el-select v-model="scope.row.name" placeholder="请选择" clearable @change="change(scope)" filterable>
            <el-option v-for="(v,i) in canUse" :key="i" :label="v.name" :value="v.name">
            </el-option>
          </el-select>        
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </el-row>
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
    importOrderConfigService
  } from "~/services/import-order-config.service";

  @Component({})
  export default class modifyTemplate extends Vue {
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
    private modifyModel: any = {
      name: '',
      trustee: '',
      set: []
    };
    private allAttribute: Array < any > = [];
    private canUse: Array < any > = [];
    refresh(modify) {
      this.modifyModel.name = modify.name
      this.modifyModel.trustee = modify.trustee
      this.modifyModel.set = []
      this.canUse = []
      this.importOrderConfigService.getAllAttribute().subscribe(data => {
        this.allAttribute = data
        this.importOrderConfigService.getImportOrderById(modify.id).subscribe(res => {
          this.modifyModel.set = res
          this.canUse = this.allAttribute.filter(v => !this.modifyModel.set.find(val => val.attribute === v.attribute))
        });
      });
    }
    change(scope) {
      scope.row.name ? scope.row.attribute = this.allAttribute.find(v => v.name === scope.row.name).attribute :
        scope.row.attribute = '';
      this.canUse = this.allAttribute.filter(v => !this.modifyModel.set.find(val => val.attribute === v.attribute))
    }
    /**
     * 修改案件提交
     */
    submit() {
      let flag = true
      for (let index = 0; index < this.modifyModel.set.length; index++) {
        if (!this.modifyModel.set[index].attribute) {
          flag = false
        }
      }
      if (!flag) {
        this.$message('映射字段不能为空')
        return
      }
      let obj: any = {
        list: this.modifyModel.set,
      }
      this.importOrderConfigService.modifyImportConfig(obj).subscribe(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.close()
        this.$emit('success')
      });
    }
    close() {
      this.$emit('close')
    }
    mounted() {}
  }

</script>

<style scoped>


</style>

<template>
  <section class="component create-template">
    <el-form ref="create-form" :model="createModel">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="createModel.name"></el-input>
      </el-form-item>
      <el-form-item label="委托方" prop="trustee">
        <el-input v-model="createModel.trustee"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="createModel.set" stripe>
      <el-table-column type="index" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="90">
      </el-table-column>
      <el-table-column prop="attribute" label="属性名" min-width="90">
      </el-table-column>
      <el-table-column label="对应列" min-width="60">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cell"></el-input>
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
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataBox
    }
  })
  export default class CreateTemplate extends Vue {
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
    private createModel: any = {
      name: '',
      trustee: '',
      set: []
    };
    /**
     * 新增案件提交
     */
    submit() {
      let obj: any = {
        set: this.createModel.set,
        name: this.createModel.name,
        trustee: this.createModel.trustee
      }
      this.importOrderConfigService.createImportConfig(obj).subscribe(data => {
        this.$message({
          type: 'success',
          message: '创建成功'
        })
        this.close()
        this.$emit('success')
      });
    }
    refreshData() {
      console.log(1)
      this.createModel.set = []
      this.importOrderConfigService.getAllAttribute().subscribe(data => {
        console.log(data)
        this.createModel.set = data
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

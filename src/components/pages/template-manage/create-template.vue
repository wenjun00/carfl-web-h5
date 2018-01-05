<template>
  <section class="component create-template">
    <el-form ref="create-form" :model="createModel" :rules="rules">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="createModel.name"></el-input>
      </el-form-item>
      <el-form-item label="委托方" prop="trustee">
        <el-input v-model="createModel.trustee"></el-input>
      </el-form-item>
      <el-form-item label="上传文件">
        <file-upload :fileNumberLimit="1" :fileList.sync="importCaseFileList" ref="file-upload" @onUploadSuccess="onUploadSuccess"></file-upload>
      </el-form-item>
    </el-form>
    <el-table :data="createModel.set" stripe>
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
    dataImpService
  } from "~/services/data-imp.service";
  import {
    importOrderConfigService
  } from "~/services/import-order-config.service";
  import DataBox from "~/components/common/data-box.vue";
  import FileUpload from '~/components/common/file-upload.vue'
  import SvgIcon from "~/components/common/svg-icon.vue";

  @Component({
    components: {
      SvgIcon,
      DataBox,
      FileUpload
    }
  })
  export default class CreateTemplate extends Vue {
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
    @Dependencies(dataImpService) private dataImpService: dataImpService;

    private createModel: any = {
      name: '',
      trustee: '',
      set: []
    };
    rules: any = {
      name: [{
        required: true,
        message: '请输入模板名称',
        trigger: 'blur'
      }],
      trustee: [{
        required: true,
        message: '请输入委托方',
        trigger: 'blur'
      }]
    }
    private importCaseFileList: Array < any > = [];
    private allAttribute: Array < any > = [];
    private canUse: Array < any > = [];
    change(scope) {
      scope.row.name ? scope.row.attribute = this.allAttribute.find(v => v.name === scope.row.name).attribute :
        scope.row.attribute = '';
      this.canUse = this.allAttribute.filter(v => !this.createModel.set.find(val => val.attribute === v.attribute))
    }
    /**
     * 上传成功
     */
    onUploadSuccess(id, data) {
      this.dataImpService.importAttribute(data.id).subscribe(data => {
        this.createModel.set = data.map(v => {
          return {
            attribute: '',
            name: '',
            cell: v
          }
        })
        console.log("importData", data);
      });
    }
    /**
     * 新增案件提交
     */
    submit() {
      let ref: any = this.$refs['create-form']
      ref.validate((valid) => {
        if (!valid) {
          return false;
        }
        let flag = true
        for (let index = 0; index < this.createModel.set.length; index++) {
          if (!this.createModel.set[index].attribute) {
            flag = false
          }
        }
        if (!flag) {
          this.$message('映射字段不能为空')
          return
        }
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
      });
    }
    refreshData() {
      let ref: any = this.$refs['create-form']
      ref.resetFields()
      let upload: any = this.$refs['file-upload']
      upload.reset()
      this.createModel.set = []
      this.canUse = []
      this.importOrderConfigService.getAllAttribute().subscribe(data => {
        this.allAttribute = data
        this.canUse = data
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

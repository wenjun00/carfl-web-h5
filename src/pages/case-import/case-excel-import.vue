<template>
  <section class="page case-excel-import">
    <el-form ref="data-form" :model="excelModel" label-width="100px">
      <el-form-item label="上传文件">
        <file-upload :fileNumberLimit="1" :fileList.sync="importCaseFileList" ref="file-upload"></file-upload>
      </el-form-item>
      <el-form-item label="Excel模板">
        <el-select v-model="templateId">
          <el-option v-for="item in excelTemplateList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button @click="cancel">取消</el-button>
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
  import FileUpload from '~/components/common/file-upload.vue'
  import app from '~/config/app.config'
  import {
    PageService
  } from "~/utils/page.service";
  import {
    dataImpService
  } from "~/services/data-imp.service";
  import {
    importOrderConfigService
  } from "~/services/import-order-config.service";

  @Layout("workspace")
  @Component({
    components: {
      FileUpload
    }
  })
  export default class CaseExcelImport extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(dataImpService) private dataImpService: dataImpService;
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
    private excelModel: any = {};
    private importCaseFileList: Array < any > = [];
    private templateId: any = "";
    private excelTemplateList: any = [];

    mounted() {}
    cancel() {
      this.close()
    }
    submit() {
      console.log(this.importCaseFileList[0])
      let fileData = this.importCaseFileList[0];
      let fileId = fileData.response.id;
      console.log(fileId)
      if (fileData.status !== "success") {
        this.$message({
          type: "info",
          message: "模板上传失败"
        })
        return;
      }
      this.dataImpService.importExcel(fileId, this.templateId).subscribe(data => {
        this.$message({
          type: "success",
          message: "案件导入成功"
        })
        console.log("importData", data);
        this.$emit("success")
        this.close()
      });
    }
    close() {
      this.$emit('close')
      this.resetFile()
    }
    resetFile() {
      let fileUpload: any = this.$refs['file-upload']
      fileUpload.reset()
    }
    refreshData() {
      console.log('999')
      this.importOrderConfigService.getAllImportConfig(this.excelModel, this.pageService).subscribe(data => {
        this.excelTemplateList = data;
        console.log('8888', this.excelTemplateList)
      });
    }
  }

</script>

<style scoped>


</style>

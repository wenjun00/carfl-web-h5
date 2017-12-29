<template>
  <section class="page case-excel-import">
    <el-form ref="data-form" :model="excelModel" label-width="100px">
      <el-form-item label="上传文件">
        <!--<el-upload :action="uploadUrl()"></el-upload>-->
      </el-form-item>
    </el-form>
    <el-button @click="close">取消</el-button>
    <el-button @click="submit">确定</el-button>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Layout} from "~/core/decorator";
  // import {Dependencies} from "~/core/decorator";
  import app from '~/config/app.config'
  @Layout("workspace")
  export default class CaseExcelImport extends Vue {
    private excelModel: any = {};
    close() {
      console.log('close')
    }
    submit() {
      console.log('submit',this)
    }
    /**
     * 获取上传文件url
     */
    // uploadUrl() {
    //   let base = app.url.upload
    //   // let uploadServer = this.server ? this.server : server.app.upload
    //   // let uploadServer = this.server ? this.server : services.businessService.uploadFile.upload
    //   // let appendPostfix = this.append ? '/' + this.append : ''

    //   // return `${base}/api/${uploadServer.controller}/${uploadServer.action}${appendPostfix}`
    // }
  }

</script>

<style scoped>


</style>

<template>
  <section class="component file-upload" :class="{'disable':disableUpload}">
    <el-upload ref="upload" class="upload" :disabled="disableUpload" multiple :before-upload="onBeforeUpload" :before-remove="onBeforeRemove" :file-list="fileList"  :action="uploadUrl" :limit="fileNumberLimit?fileNumberLimit:null" :show-file-list="true" :on-success="onSucess" :on-progress="onProgress" :on-error="onError" :on-change="onChange" :on-remove="onRemove">
      <el-button size="small" type="primary">上传文件</el-button>
    </el-upload>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { NetService } from "~/utils/net.service";
import { uploadFileController } from "~/config/server";
import app from "~/config/app.config";
import {Upload} from 'element-ui'
@Component({
  components: {}
})
export default class FileUpload extends Vue {
  // 上传成功回调事件
  @Emit("onUploadSuccess")
  onUploadSucess(id, data) {}

  // 上传进度回调事件
  @Emit("onUploadProgress")
  onUploadProgress(id, percent) {}

  // 上传异常回调事件
  @Emit("onUploadError")
  onUploadError(id, error) {}

  // 更新文件列表
  @Emit("update:fileList")
  updateFileList(fileList) {}

  // 是否显示文件列表
  @Prop({ default: true })
  showFileList;

  // 是否显示文件列表
  // @Prop({ default: [] })
  // defaultFileList;

  // 文件数量限制
  @Prop({
    default: false,
    type: [Boolean, Number]
  })
  fileNumberLimit;

  // 文件带下限制
  @Prop({
    default: 100,
    type: Number
  })
  fileSizeLimit;

  // 文件列表
  @Prop({
    default: () => [],
    type: Array
  })
  fileList;

  /**
   * 是否禁止上传
   */
  get disableUpload() {
    return this.fileNumberLimit
      ? this.fileList.length >= this.fileNumberLimit
      : false;
  }

  /**
   * 上传路径
   */
  get uploadUrl() {
    return [
      app.url.server,
      NetService.generateRequestUrl(uploadFileController.upload)
    ].join("/");
  }

  /**
   * 上传成功回调
   */
  onSucess(data, { uid }) {
    this.onUploadSucess(uid, data);
  }

  /**
   * 上传进度回调
   */
  onProgress({ percent }, { uid }) {
    // let targetFile = this.fileList.find(x => x.uid === uid);
    // if (targetFile) {
    //   targetFile.percentage = percent;
    // }
    // this.updateFileList(this.fileList);
  }

  /**
   * 错误信息回调
   */
  onError(err, file) {
    this.onUploadError(err, file);
  }

  /**
   * 文件上传状态改变回调
   */
  onChange(file, uploadFileList) {
    switch (file.status) {
      case "ready": {
        this.fileList.push({
          uid: file.uid,
          name: file.name,
          percentage: file.percentage,
          status: file.status
        });
        break;
      }
      // default: {
      //   if (file.response) {
      //     let targetFile = this.fileList.find(x => x.uid === file.uid);
      //     targetFile.percentage = file.ppercentage;
      //     targetFile.status = file.status;
      //     targetFile.id = file.response.id;
      //     targetFile.fileName = file.response.fileName;
      //   }
      //   break;
      // }
    }

    this.updateFileList(this.fileList);
  }

  /**
   * 删除处理
   */
  onRemove(file) {
    // let targetFileIndex = this.fileList.findIndex(x => x.uid === file.uid);
    // if (targetFileIndex >= 0) {
    //   this.fileList.splice(targetFileIndex, 1);
    // }
    // this.updateFileList(this.fileList);
  }

  /**
   * 删除预处理
   */
  onBeforeRemove() {
    return this.$confirm("是否确定删除该文件?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
  }

  /**
   * 上传文件预处理
   * 上传文件大小限制
   */
  onBeforeUpload({ name, size, uid }) {
    // 限制上传文件大小
    if (this.fileSizeLimit * 1024 * 1024 < size) {
      this.$message(`文件${name}超过上传文件大小限制${this.fileSizeLimit}MB`);
      return false;
    }
  }

  reset(){
    let upload = <any>this.$refs['upload']
    upload.clearFiles()
  }
}
</script>

<style lang="less">
.component.file-upload {
  &.disable {
    .el-button {
      background-color: gray;
      border-color: gray;
    }
  }
}
</style>

<template>
  <section class="component file-upload" :class="{'disable':disableUpload}">
    <el-upload :disabled="disableUpload" :file-list="fileList" class="upload" :action="uploadUrl" :limit="limit?limit:100" :show-file-list="true" :on-success="onSucess" :on-progress="onProgress" :on-error="onError">
      <el-button size="small" type="primary">点击上传123</el-button>
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

@Component({
  components: {}
})
export default class FileUpload extends Vue {
  @Emit("onUploadSuccess")
  onUploadSucess(id, data) {}

  @Emit("onUploadProgress")
  onUploadProgress(id, percent) {}

  @Emit("onUploadError")
  onUploadError(id, error) {}

  @Prop({ default: true })
  showProcess;

  @Prop({
    default: false,
    type: [Boolean, Number]
  })
  limit;

  public fileList: Array<any> = [];

  /**
   *
   */
  get disableUpload() {
    return this.limit ? this.fileList.length > this.limit : false;
  }

  /**
   * 获取上传路径
   */
  get uploadUrl() {
    return [
      app.url.server,
      NetService.generateRequestUrl(uploadFileController.upload)
    ].join("/");
  }

  onSucess(data, { uid }) {
    console.log()
    this.onUploadSucess(uid, data);
  }

  onProgress({ percent }, { uid }) {
    this.onUploadProgress(uid, percent);
  }

  onError({ url }) {
    this.onUploadError(url, "");
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

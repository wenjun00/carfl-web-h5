<template>
  <section class="component file-upload" :class="{'disable':disableUpload}">
    <i-upload :headers="headers" ref="upload" class="upload" multiple :before-upload="onBeforeUpload" :file-list="fileList" :action="uploadUrl"
      :limit="fileNumberLimit?fileNumberLimit:null" show-upload-list :on-success="onSucess" :on-progress="onProgress" :on-error="onError"
      :on-change="onChange" :on-remove="onRemove">
      <i-button size="small" type="primary">上传文件</i-button>
    </i-upload>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Watch,
    Prop,
    Emit
  } from "vue-property-decorator";
  import {
    State
  } from "vuex-class"
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    NetService
  } from "~/utils/net.service";
  import {
    fileService
  } from "~/config/server/file-service";
  import app from "~/config/app.config";
  import {
    Upload
  } from "iview";
  @Component({
    components: {}
  })
  export default class FileUpload extends Vue {
    @State userToken

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
    @Prop({
      default: true
    })
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

    get headers() {
      return {
        "X-UserToken": this.userToken
      }
    }
    /**
     * 是否禁止上传
     */
    get disableUpload() {
      return this.fileNumberLimit ?
        this.fileList.length >= this.fileNumberLimit :
        false;
    }

    /**
     * 上传路径
     */
    get uploadUrl() {
      return [
        app.url.server,
        NetService.generateRequestUrl(fileService.fileUploadController.uploadFileGrid)
      ].join("/");
    }

    /**
     * 上传成功回调
     */
    onSucess(data, {
      uid
    }) {
      this.onUploadSucess(uid, data);
    }

    /**
     * 上传进度回调
     */
    onProgress({
      percent
    }, {
      uid
    }) {
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
        case "ready":
          {
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
      return this.$Modal.confirm({
        title: '提示',
        content: "是否确定删除该文件",
        onOk: () => {
          // 确定事件
        }
      });
    }

    /**
     * 上传文件预处理
     * 上传文件大小限制
     */
    onBeforeUpload({
      name,
      size,
      uid
    }) {
      // 限制上传文件大小
      if (this.fileSizeLimit * 1024 * 1024 < size) {
        this.$Message.info(`文件${name}超过上传文件大小限制${this.fileSizeLimit}MB`);
        return false;
      }
    }

    reset() {
      let upload = < any > this.$refs["upload"];
      upload.clearFiles();
      this.updateFileList([]);
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

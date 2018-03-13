<!--财务·上传图片-->
<template>
  <section class="component file-upload">
    <Upload :on-progress="onProgress" :on-success="onSuccess" :show-upload-list="false" :headers="{'authorization':$store.token}" ref="upload" :action="uploadUrl" :before-upload="beforeUpload">
      <i-row>
        <i-col>
          <Button class="blueButton">选择文件</Button>
        </i-col>
      </i-row>
    </Upload>
    <i-table :columns="uploadColumns" :data="uploadList"></i-table>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { NetService } from "~/utils/net.service";
import { fileService } from "~/config/server";
import { Prop, Emit } from "vue-property-decorator";
import { Upload, Button } from "iview";
import appConfig from "~/config/app.config";
@Component({
  components: {}
})
export default class FileUpload extends Vue {
  // 文件数量限制
  @Prop({
    default: 5,
    type: [Boolean, Number]
  })
  fileNumberLimit;

  // 文件大小限制
  @Prop({
    default: 200,
    type: Number
  })
  fileSizeLimit;

  @Emit("on-success")
  success() {}

  private uploadColumns: any;
  private uploadList: Array<any> = [];
  private fileList: Array<any> = []; // 文件上传成功文件列表

  /**
   * 初始化
   */
  created() {
    this.uploadColumns = [
      {
        title: "名称",
        key: "name",
        align: "center"
      },
      {
        title: "大小",
        key: "size",
        align: "center"
      },
      {
        title: "文件类型",
        key: "type",
        align: "center"
      },
      {
        title: "状态",
        align: "center",
        key: "percentage",
        render: (h, { row, column, index }) => {
          let state = {
            ready: "准备",
            finish: "完成"
          };

          return <span>{state[row.state] || row.percentage}</span>;
        }
      },
      {
        title: "操作",
        align: "center",
        render: (h, { row, column, index }) => {
          // 移除文件
          let removeHandle = () => {
            this.$Modal.confirm({
              title: "提示",
              content: "确定移出吗？",
              transfer: false,
              onOk: () => {
                this.uploadList.splice(index, 1);
              }
            });
          };
          // 移除按钮
          return (
            <i-button
              type="text"
              disabled={row.state !== "ready"}
              style="#265ea2"
              onClick={removeHandle}
            >
              移除
            </i-button>
          );
        }
      }
    ];
  }

  /**
   * 上传文件服务路径
   */
  get uploadUrl() {
    let url = NetService.generateRequestUrl(
      fileService.fileUploadController.uploadFileGrid
    );
    return `${appConfig.url.server}/${url}`;
  }
  /**
   * 上传预处理
   */
  beforeUpload(file) {
    if (this.fileSizeLimit * 1024 * 1024 < file.size) {
      this.$Message.info(
        `文件${name}超过上传文件大小限制${this.fileSizeLimit}MB`
      );
      return false;
    }

    if (this.fileNumberLimit <= this.uploadList.length) {
      this.$Message.info(`文件上传文件数量限制${this.fileNumberLimit}个`);
      return false;
    }

    // 添加待上传文件
    this.uploadList.push({
      name: file.name,
      size: file.size,
      type: file.type,
      state: "ready",
      percentage: 0,
      file: file
    });

    return false;
  }

  /**
   * 进度通知
   */
  onProgress(event, file) {
    let target = this.uploadList.find(x => x.file.uid === file.uid);
    target.state = "uploading";
    target.percentage = file.percentage;
  }

  /**
   * 上传成功回调
   */
  onSuccess(event, file,fileList) {
    let target = this.uploadList.find(x => x.file.uid === file.uid);
    target.state = "finish";

    if (this.uploadList.every(x => x.state === "finish")) {
      this.success();
      this.fileList = fileList
      console.log(fileList,'fileList')
    }
  }

  /**
   * 返回上传成功时文件列表
   */
  makeList(){
    return this.fileList
  }

  /**
   * 上传操作
   */
  upload() {
    let upload = this.$refs["upload"] as Upload;
    this.uploadList.filter(x => x.state === "ready").forEach(({ file }) => {
      upload.post(file);
    });
  }

  reset() {
    let upload = this.$refs["upload"] as Upload;
    this.uploadList = [];
    upload.clearFiles();
  }
}
</script>

<style>

</style>
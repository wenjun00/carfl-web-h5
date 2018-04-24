<template>
  <section class="component upload-the-material ">
    <i-card :title="`上传素材 (${uploadList.length})`">
      <div slot="extra">
        <i-dropdown transfer @on-click="onUploadFile">
          <a>
            上传
            <Icon type="arrow-down-b"></Icon>
          </a>
          <i-dropdown-menu slot="list">
            <i-dropdown-item v-for="fileType in fileTypeList" :key="fileType.id" :name="fileType.id">{{fileType.name}}</i-dropdown-item>
          </i-dropdown-menu>
        </i-dropdown>
      </div>
      <div v-show="uploadList.length" class="file-list">
        <ul>
          <li v-for="item in uploadList" :key="item.uid" class="row">
            <p>{{item.name}}</p>
            <div>
              <i-button type="text" icon="arrow-down-a" @click="download(item)"></i-button>
              <i-button type="text" icon="eye" @click="preview(item)"></i-button>
              <i-button type="text" icon="close" @click="handleRemove(item)"></i-button>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="!uploadList.length" class="empty-text row middle-span center-span">
        暂无待上传素材
      </div>
    </i-card>

    <template>
      <i-modal :loading="true" v-model="openUpload" @on-ok="postFile">
        <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
      </i-modal>
    </template>

    <template>
      <i-modal title="预览" v-model="previewModel" :width="800" class-name="no-footer">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { State, Mutation, namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { CommonService } from "~/utils/common.service";
import { PersonalMaterialService } from "~/services/manage-service/personal-material.service";
import { Prop, Watch } from "vue-property-decorator";

const ModuleState = namespace("purchase", State);

@Component({
  components: {
    FileUpload
  }
})
export default class UploadTheMaterial extends Vue {
  @Dependencies(PersonalMaterialService)
  private personalMaterialService: PersonalMaterialService;
  @ModuleState("productId") productId;

  private fileTypeList = [];
  private currentFileType = "";
  private model1: String = "";
  private cityList: any = [];
  private uploadList: Array<any> = [];

  private openUpload: Boolean = false;
  private previewModel: Boolean = false;
  private url: any = "";

  @Watch("productId")
  onProductIdChange(value) {
    this.reset();
    this.getFileTypeList();
  }

  getFileTypeList() {
    if (this.productId) {
      this.personalMaterialService
        .getAllPersonalMaterialNoPage({
          productId: this.productId
        })
        .subscribe(data => {
          this.fileTypeList = data;
        });
    }
  }

  onUploadFile(aa) {
    console.log(aa);
    let dialog = this.$dialog.show({
      title: "上传文件",
      footer: true,
      onOk: fileUpload => {},
      onCancel: () => {},
      render: h => {
        return h(FileUpload, {});
      }
    });
  }

  reset() {}

  update() {
    this.reset();
  }

  /**
   * 数据验证
   */
  async validate() {
    this.fileTypeList.map(item => item.isSelect === 0).map(item => {
      //  this.uploadList.find(x=>x.)
    });
    return true;
  }

  onProductId() {}
  /**
   * 重置
   */
  resetfileList() {
    this.uploadList = [];
  }
  /**
   * 反显
   */
  Reverse(data) {
    data.personal.personalDatas.map(v => {
      (v.url = v.materialUrl), (v.name = v.uploadName);
    });
    this.uploadList = data.personal.personalDatas;
  }

  /**
   * 下载
   */
  download(file) {
    CommonService.downloadFile(file.url, file.name);
  }

  /**
   * 补充资料反显
   */
  supplement(data) {
    data.map(v => {
      (v.name = v.uploadName),
        (v.url = v.materialUrl),
        (v.typeup = v.materialType),
        (v.upid = v.id);
    });
    this.uploadList = data;
  }
  /**
   * 预览
   */
  preview(file) {
    if (
      file.type === "jpg" ||
      file.type === "png" ||
      file.type === "JPG" ||
      file.type === "PNG"
    ) {
      this.url = file.url;
      this.previewModel = true;
    } else {
      window.open(file.url);
    }
  }
  /**
   * 删除
   */
  handleRemove(file) {
    this.uploadList.splice(this.uploadList.indexOf(file), 1);
  }

  /**
   * 上传文件成功回调
   */
  uploadSuccess() {
    this.openUpload = false;
    this.$nextTick(() => {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.reset();
      for (let item of fileUpload.makeList()) {
        this.uploadList.push({
          name: item.name,
          uid: item.uid,
          url: item.response.url,
          localUrl: item.response.localUrl,
          type: item.response.type,
          id: item.response.id,
          size: item.size,
          status: item.status,
          createTime: item.response.createTime
          // typeup: this.cityList.find(v => v.id === this.model1).type || ""
        });
      }
    });
  }
  /**
   *
   * 上传文件
   */
  postFile() {
    let fileUpload = this.$refs["file-upload"] as FileUpload;
    fileUpload.upload();
  }
}
</script>

<style lang="less" scoped>
.component.upload-the-material {
  .empty-text {
    height: 200px;
    font-size: 16px;
  }
}
</style>

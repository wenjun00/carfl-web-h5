<template> 
  <section class="component upload-the-material ">
    <i-card :title="`上传素材 (${uploadDataSet.length})`">
      <div slot="extra">
        <i-dropdown transfer @on-click="onUploadFile" trigger="click">
          <a>
            上传
            <Icon type="arrow-down-b"></Icon>
          </a>
          <i-dropdown-menu slot="list">
            <i-dropdown-item v-for="fileType in fileTypeList" :key="fileType.id" :name="fileType.id">{{fileType.name}}</i-dropdown-item>
          </i-dropdown-menu>
        </i-dropdown>
      </div>

      <div v-if="uploadDataSet.length" class="file-list">
        <i-table :data="uploadDataSet" :columns="uploadColumns"></i-table>
      </div>
      <div v-else class="empty-text row middle-span center-span">
        暂无待上传素材
      </div>
    </i-card>

    <template>
      <i-modal title="预览" v-model="previewModel" :width="800" class-name="no-footer">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>

  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { State, Mutation, namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { CommonService } from "~/utils/common.service";
import { PersonalMaterialService } from "~/services/manage-service/personal-material.service";
import { Prop, Watch } from "vue-property-decorator";
import { Button } from "iview";
const ModuleState = namespace("purchase", State);

@Component({
  components: {
    FileUpload
  }
})
export default class UploadTheMaterial extends Vue {
  @Dependencies(PersonalMaterialService)
  private personalMaterialService: PersonalMaterialService;
  @Prop({
    default: () => null
  }) currentProduct;

  private fileTypeList = [];
  public uploadDataSet: Array<any> = [];

  private previewModel: Boolean = false;
  private url: any = "";


  // 回填备用数据
  private revertPersonalDatas: any = [];

  private uploadColumns = [
    {
      title: "序号",
      type: "index",
      align: "center"
    },
    {
      title: "文件名",
      key: "uploadName",
      align: "center"
    },
    {
      title: "类型",
      key: "materialTypeName",
      align: "center"
    },
    {
      title: "操作",
      align: "center",
      render: (h, { row }) => {
        return (
          <div>
            <i-button
              type="text"
              icon="arrow-down-a"
              onClick={() => {
                this.$common.downloadFile(row.materialUrl, row.uploadName);
              }}
            />
             <i-button
              type="text"
              icon="eye"
              onClick={() => this.viewImage(row)}
            />
            <i-button
              type="text"
              icon="close"
              onClick={() => this.deleteImage(row)}
            />
          </div>


        );
      }
    }
  ];

  @Watch("currentProduct", { immediate: true })
  onCurrentProductChange(value) {
    this.getFileTypeList()
  }

  /**
   * 获取文件类型列表
   */
  getFileTypeList() {
    if (this.currentProduct) {
      this.personalMaterialService
        .getAllPersonalMaterialNoPage({
          productId: this.currentProduct.productId
        })
        .subscribe(data => {
          this.fileTypeList = data;
          this.revert();
        });
    }
  }

  /**
   * 打开上传文件弹出框
   */
  onUploadFile(type) {
    let dialog = this.$dialog.show({
      title: "上传文件",
      footer: true,
      onOk: fileUpload => {
        fileUpload.upload();
        return false;
      },
      render: h => {
        return h(FileUpload, {
          on: {
            "on-success": filelist => {
              this.uploadSuccess(type, filelist);
              dialog.remove();
            }
          }
        });
      }
    });
  }

  /**
   * 页面重置
  */
  public reset() {
    this.revertPersonalDatas = [];
    this.uploadDataSet = [];
  }

  /**
   * 恢复数据
   */
  revert(data?: any) {
    if (data) {
      this.revertPersonalDatas = data.personal.personalDatas
    }

    if (this.fileTypeList.length) {
      this.uploadDataSet = this.revertPersonalDatas.map(v => {
        let type = this.fileTypeList.find(x => x.id === v.materialType);
        return {
          id: v.id,
          materialType: v.materialType,
          materialTypeName: (type || {}).name,
          materialUrl: v.materialUrl,
          uploadName: v.uploadName
        }
      })
    }
  }
  /**
   * 查看图片
   */
  viewImage(file){
    this.url = file.materialUrl
    this.previewModel = true
  }
  /**
   * 删除图片
   */
  deleteImage(file){ 
    this.uploadDataSet.splice(file._index, 1);
  }


  /**
   * 数据验证
   */
  async validate() {
    // 判断列表中是否包含所有必传
    let result = this.fileTypeList
      .filter(item => item.isSelect === 0)
      .every((item: any) => {
        return !!this.uploadDataSet.find(x => x.materialType === item.id);
      });
    if (result) {
      return true;
    }

    this.$Message.error("请上传必传的素材");
  }


  /**
   * 上传文件成功回调
   */
  uploadSuccess(typeId, filelist) {
    let type = this.fileTypeList.find(x => x.id === typeId);
    filelist.forEach(file => {
      this.uploadDataSet.push({
        materialType: type.id,
        materialTypeName: type.name,
        materialUrl: file.response.url,
        uploadName: file.name
      });
    });
  }

  mounted() {
    if (this.currentProduct) {
      this.getFileTypeList();
    }
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

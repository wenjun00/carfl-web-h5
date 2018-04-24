<template>
  <section class="component upload-the-material ">
    <i-card :title="`上传素材 (${uploadDataSet.length})`">
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
      <div v-show="uploadDataSet.length" class="file-list">
        <i-table :data="uploadDataSet" :columns="uploadColumns"></i-table>
      </div>
      <div v-show="!uploadDataSet.length" class="empty-text row middle-span center-span">
        暂无待上传素材
      </div>
    </i-card>
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
  @ModuleState("productId") productId;

  private fileTypeList = [];
  public uploadDataSet: Array<any> = [];

  private previewModel: Boolean = false;
  private url: any = "";

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
              click={()=>{
                this.$common.downloadFile(row.materialUrl, row.uploadName)
              }}
            />
          </div>
        );
      }
    }
  ];

  @Watch("productId")
  onProductIdChange(value) {
    this.reset();

    if (!!value) {
      this.getFileTypeList();
    }
  }

  /**
   * 获取文件类型列表
   */
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

  reset() {}

  update() {
    this.reset();
  }

  /**
   * 数据验证
   */
  async validate() {
    // 判断列表中是否包含所有必传
    let result =  this.fileTypeList.map(item => item.isSelect === 0).every((item: any) => {
      return this.uploadDataSet.find(x => x.type === item.id);
    });

    if(result){
      return true
    }

    this.$Message.error("请上传必传的素材")
  }

  /**
   * 反显
   */
  Reverse(data) {
    // data.personal.personalDatas.map(v => {
    //   (v.url = v.materialUrl), (v.name = v.uploadName);
    // });
    // this.uploadDataSet = data.personal.personalDatas;
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
    this.uploadDataSet = data;
  }

  /**
   * 上传文件成功回调
   */
  uploadSuccess(typeId, filelist) {
    let type = this.fileTypeList.find(x => x.id === typeId);
    filelist.forEach(file => {
      this.uploadDataSet.push({
        id: file.response.id,
        materialType: type.id,
        materialTypeName: type.name,
        materialUrl: file.response.url,
        uploadName: file.name
      });
    });
  }

  mounted() {
    if (this.productId) {
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

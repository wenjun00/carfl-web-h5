<!--上传素材 通用组件-->
<template>
  <section class="component upload-the-fodder ">
    <span class="form-title">文件数量</span>
    <i-row>
      <!-- <i-col :span="3">
      </i-col> -->
      <!-- <i-col :span="21"> -->
      <div style="display:flex;justify-content:flex-start;">
        <div style="height:200px;width:200px;border:1px solid #dddddd;cursor:pointer;text-align:center;" @click="addAttachment">
          <Icon type="plus-circled" style="display:block;margin-top:60px;" size="40" color="#265ea2"></Icon>
          <div>点击添加附件</div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
        <div v-for="item in fodderList" :key="item.id">
          <div class="demo-upload-list" style="margin-left:10px;">
            <img style="height:200px;width:200px;border:1px solid #dddddd;" :src="item.materialUrl">
          </div>
          <div class="demo-upload-list-cover">
            <i-icon type="ios-trash-outline" size="18" @click.native="handleRemove(item)"></i-icon>
            <i-icon type="ios-download-outline" size="18"></i-icon>
          </div>
        </div>
      </div>
      <!-- </i-col> -->
    </i-row>
    <!-- 弹出框 -->
    <!-- <template>
      <i-modal v-model="openUpload" title="上传素材">
        <i-row>
          <i-col span="4">
            <span style="line-height:36px;">文件类型</span>
          </i-col>
          <i-col span="6">
            <i-select v-model="model1">
              <i-option v-for="item in cityList" :label="item.name" :value="item.id" :key="item.id"></i-option>
            </i-select>
          </i-col>
          <i-col span="4">
            <i-upload :default-file-list="dataList" :on-success="onsuccess" multiple action="//jsonplaceholder.typicode.com/posts/">
              <i-button style="color: #2d8cf0;font-size:14px;" type="text" icon="ios-cloud-upload-outline">上传文件</i-button>
            </i-upload>
          </i-col>
        </i-row>
        <div slot="footer">
          <i-button @click="openUpload=false">取消</i-button>
          <i-button class="blueButton" @click="confirmUploadFodder">确定</i-button>
        </div>
      </i-modal>
    </template> -->

    <template>
      <i-modal title="上传素材" v-model="openUpload">
        <upload-image></upload-image>
        <div slot="footer">
          <i-button @click="openUpload=false">取消</i-button>
          <i-button class="blueButton" @click="confirmUpload">确定</i-button>
        </div>
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { PersonalMaterialService } from "~/services/manage-service/personal-material.service";
import { Prop } from "vue-property-decorator";
import UploadImage from "~/components/common/upload-image.vue";
const ModuleState = namespace("purchaseManage", State);

@Component({
  components: {
    UploadImage
  }
})
export default class UploadTheFodder extends Vue {
  @Prop() orderFodderInfo: Object;
  @Dependencies(PersonalMaterialService)
  private personalMaterialService: PersonalMaterialService;
  @ModuleState("productId") productId;
  private model1: String = "";
  private cityList: Array<object> = [];
  private dataList: Array<any> = [];
  private fodderList: Array<any> = [];
  private openUpload: Boolean = false;

  // @Prop() productId: any

  openClick() {
    // console.log(this.productId, 70);
    this.personalMaterialService
      .getAllPersonalMaterialNoPage({
        productId: this.productId
      })
      .subscribe(data => {
        // console.log(data.object);
        this.cityList = data.object;
        // console.log(this.cityList, 45455);
      });
    this.openUpload = true;
  }
  /**
   * 确认上传
   */
  confirmUpload() {
    this.openUpload = false;
  }
  onsuccess(response, file, fileList) {
    this.dataList = fileList;
  }
  makeList(data) {
    console.log(data.applicationPhaseResources, "erer");
    if (data.applicationPhaseResources) {
      this.fodderList = data.applicationPhaseResources;
    }
  }
  /**
   * 添加附件
   */
  addAttachment() {
    this.openUpload = true;
  }
  /**
   *删除附件
   */
  handleRemove(item) {}
  created() {}
  /**
   * 确认上传素材
   */
  confirmUploadFodder() {
    this.openUpload = false;
  }
}
</script>

<style lang="less" scope>
.demo-upload-list-cover {
  display: none;
}

.demo-upload-list:focus {
  .demo-upload-list-cover {
    display: inline-block;
  }
}
</style>

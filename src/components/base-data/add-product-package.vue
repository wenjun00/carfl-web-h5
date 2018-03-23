<template>
  <section class="component add-product-package">
    <i-form ref="form" :model="productPackage" :rules="rulesProduct" :label-width="70">
      <i-row>
        <i-col span="18">
          <i-form-item label="文件名" prop="name">
            <i-input style="width:300px" v-model="files.name"></i-input>
          </i-form-item>
        </i-col>
        <i-col span="6">
          <Button type="text" icon="ios-cloud-upload-outline" @click="openUpload=true">上传文件</Button>
        </i-col>
      </i-row>
      <i-row>
        <i-form-item label="文件类型" prop="dataType">
          <i-select style="width:300px" v-model="productPackage.dataType">
            <i-option v-for="{value,label} in $dict.getDictData('0422')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-row>
      <i-row>
        <i-form-item label="备注" prop="remark">
          <i-input style="width:300px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="productPackage.remark"></i-input>
        </i-form-item>
      </i-row>
    </i-form>

    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材" v-model="openUpload">
        <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Prop
  } from "vue-property-decorator";
  import Component from "vue-class-component";
  import {
    ProductPackageService
  } from '~/services/manage-service/product-package.service';
  import {
    Form
  } from "iview";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    FileUploadControllerService
  } from "~/services/manage-service/file-upload-controller.service";

  import {
    Emit
  } from "vue-property-decorator";
  import FileUpload from "~/components/common/file-upload.tsx.vue";

  @Component({
    components: {
      FileUpload
    }
  })
  export default class AddProductPackage extends Vue {
    @Dependencies(ProductPackageService) private productPackageService: ProductPackageService;
    @Dependencies(FileUploadControllerService)
    private fileUploadControllerService: FileUploadControllerService;
    private productPackage: any = {
      fileId: '',
      fileName: "",
      remark: "",
      type: 393,
      dataType: ""
    };
    private rulesProduct: any = {};
    private openUpload: Boolean = false;
    private files: any = {};
    private fileList: any = [];
    private actions: String = "0";
    created() {
      this.rulesProduct = {
        name: [
          { required: true, message: '请上传文件', trigger: 'blur' },
        ],
        dataType: [
          { required: true, message: '请选择文件类型', trigger: 'blur' },
        ],
      }
    }
    reset() {
      let _form: any = this.$refs['form']
      _form.resetFields()
      this.files = {}
    }
    addproductpackage() {
      let form = <Form>this.$refs['form'];
      form.validate(valid => {
        if (!valid) return false;
        this.productPackage.fileName = this.files.name
        this.productPackage.fileId = this.files.response.id
        this.productPackageService.createProductPackage(this.productPackage).subscribe(
          val => {
            this.$emit('close')
            this.reset()
          },
          ({
             msg
           }) => {
            this.$Message.error(msg);
          }
        );
      })
    }
    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload = this.$refs["file-upload"] as FileUpload;
        fileUpload.reset();
        this.fileList = fileUpload.makeList()
        let file: any = this.fileList[0]
        this.files = file
      });
    }
    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.upload();
    }
    /**
     *获取文件名称
     */
    handleUpload(file) {
      this.files = file;
      console.log(file, 999);
    }
    action() {
      this.fileUploadControllerService.uploadFileGrid().subscribe(val => {
        console.log(val);
      });
    }
  }

</script>

<style lang="less" scope>
  .add-product-package {
    .ivu-select-selection {
      width: 100%!important;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>

<template>
  <i-form ref="form" :model="productPackage" :rules="rulesProduct" :label-width="60">
    <i-form-item label="文件名">
      <i-input v-model="files.name"></i-input>
    </i-form-item>
    <div>
      <Upload :before-upload="handleUpload" :action="actions" style="margin-left:60px;">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
      </Upload>
    </div>
    <i-form-item label="文件类型">
      <i-select v-model="productPackage.dataType">
        <i-option v-for="{value,label} in $dict.getDictData('0422')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="备注">
      <i-input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="productPackage.remark"></i-input>
    </i-form-item>
  </i-form>
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

  @Component({
    components: {}
  })
  export default class AddProductPackage extends Vue {
    @Dependencies(ProductPackageService) private productPackageService: ProductPackageService;
    @Dependencies(FileUploadControllerService)
    private fileUploadControllerService: FileUploadControllerService;
    private productPackage: any = {
      fileId: '1',
      fileName: "",
      remark: "",
      type: 393,
      dataType: ""
    };
    private rulesProduct: any = {};
    private files: any = {};
    private actions: String = "0";
    created() {}
    addproductpackage() {
      this.productPackage.fileName = this.files.name
      this.productPackageService.createProductPackage(this.productPackage).subscribe(
        val => {
          this.$emit('close')
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
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

<!--上传素材 通用组件-->
<template>
  <section class="component upload-the-fodder ">
    <i-card title="文件数量">
    <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher"></upload-voucher>
     </i-card>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  @Component({
    components: {
      UploadVoucher
    }
  })

  export default class UploadTheFodder extends Vue {
    private fodderList:any = []
    public fodder:UploadVoucher
    mounted(){
      this.fodder = this.$refs['upload-voucher'] as UploadVoucher
    }
    fileNumber(item){
      this.fodderList = item
    }
  }
</script>

<style lang="less" scoped>
</style>

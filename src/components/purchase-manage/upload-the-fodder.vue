<!--上传素材 通用组件-->
<template>
  <section class="component upload-the-fodder ">
    <i-card title="文件数量">
      <upload-voucher @financeUploadResources="(item) => fodderList = item" ref="upload-voucher"></upload-voucher>
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
  public fodderList: any = []
  public fodder: UploadVoucher
  mounted() {
    this.fodder = this.$refs['upload-voucher'] as UploadVoucher
  }
}
</script>

<style lang="less" scoped>

</style>

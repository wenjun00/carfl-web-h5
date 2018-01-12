<!--补传附件-->
<template>
  <section class="component add-attachment">
    <i-row style="margin-top:20px">
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
          @click="addAttachment">
          <Icon type="plus-circled" style="display:block;margin-top:53px;" color="#265ea2" size="40"></Icon>
          <div>点击添加附件</div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
      </i-col>
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;right:140px;">
        </div>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  @Component({
    components: {
      AddAttachment
    }
  })
  export default class AddAttachment extends Vue {


    created() {

    }

  }

</script>

<style>


</style>

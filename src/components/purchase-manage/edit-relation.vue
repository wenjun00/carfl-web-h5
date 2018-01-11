<!--编辑联系人-->
<template>
  <section class="component edit-relation">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="与本人关系">
        <i-select>
          <i-option label="朋友" value="朋友" key="朋友"></i-option>
          <i-option label="同事" value="同事" key="同事"></i-option>
          <i-option label="配偶" value="配偶" key="配偶"></i-option>
          <i-option label="子女" value="子女" key="子女"></i-option>
          <i-option label="父母" value="父母" key="父母"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="姓名">
        <i-input></i-input>
      </i-form-item>
      <i-form-item label="联系方式">
        <i-input></i-input>
      </i-form-item>
      <i-form-item label="单位名称">
        <i-input></i-input>
      </i-form-item>
       <i-form-item label="家庭住址">
        <i-input></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({})
  export default class EditRelation extends Vue {
    @Prop()
    row: Object;

    created() {
      console.log(this.row,999999)
    }
  }
</script>
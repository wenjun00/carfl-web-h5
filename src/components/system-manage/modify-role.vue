<!--修改角色-->
<template>
  <section class="component modify-role">
    <i-form :label-width="100" style="margin-top:20px;">
      <i-form-item label="角色名称">
        <i-input></i-input>
      </i-form-item>
      <i-form-item label="所属系统">
        <i-select>
          <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
          <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="状态">
        <i-select>
          <i-option label="启用" value="启用" key="启用"></i-option>
          <i-option label="停用" value="停用" key="停用"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="描述">
        <i-input type="textarea"></i-input>
      </i-form-item>
      <!--<div slot="footer">
      <i-button @click="cancel">取消</i-button>
      <i-button class="blueButton" @click="confirm">确定</i-button>
    </div>-->
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
  export default class ModifyRole extends Vue {
    @Prop()
    row: Object;

    created() {
    }
    cancel() {

    }
    confirm() {

    }
  }
</script>
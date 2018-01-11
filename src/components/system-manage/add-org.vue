<!--新增组织-->
<template>
  <section class="component add-org">
    <i-form :label-width="110" class="addOrg">
      <i-row>
        <i-col :span="24">
          <i-form-item label="机构名称">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="状态">
            <i-select>
              <i-option label="启用" value="启用" key="启用"></i-option>
              <i-option label="停用" value="停用" key="停用"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称">
            <i-select>
              <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class AddUser extends Vue {
    created() {}
    cancel() {

    }
    confirm() {

    }
  }

</script>
<style lang="less">
  // .modifyUserForm {
  //   .ivu-input,
  //   .ivu-select,
  //   .ivu-select-single {
  //     width: 85%;
  //   }
  // }
.addOrg{
   position: relative;
   right:30px;
}
</style>

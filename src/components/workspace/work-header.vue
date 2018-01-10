<template>
  <div class="component work-header row between-span middle-span">
    <div class="logo">
      <!--<img src="/static/images/common/logo.png" width="200"></img>-->
      <span style="color:#fff;font-size:22px;">指旺汽车金融系统</span>
    </div>
    <work-menu class="col-span" style="margin-left:80px;"></work-menu>
    <div class="row">
      <work-theme></work-theme>
    </div>
    <div class="row">
      <i-poptip trigger="hover" placement="bottom">
        <div class="headPortrait"></div>
        <div slot="content" style="text-align:left">
          <div style="font-size:18px;border-bottom:1px solid #F5F5F5;padding-bottom:6px;">莎莎</div>
          <div style="padding:10px 0">上次登录时间</div>
          <div style="padding:10px 0;border-bottom:1px solid #F5F5F5">2018-01-10 15:30:56</div>
          <div style="position:relative;right:16px;">
            <i-button type="text" style="display:block" @click="modifyPwd">修改密码</i-button>
            <i-button type="text" @click="logOut">退出登录</i-button>
          </div>
        </div>
      </i-poptip>
      <span style="color:#fff;font-size:12px;margin-left:6px;margin-right:50px;position:relative;top:2px;">莎莎</span>
    </div>


    <template>
      <i-modal v-model="modifyPwdModal" title="修改密码">
        <i-form :label-width="100">
          <i-form-item label="请输入原密码">
            <i-input></i-input>
          </i-form-item>
          <i-form-item label="请输入新密码">
            <i-input></i-input>
          </i-form-item>
          <i-form-item label="确认新密码">
            <i-input></i-input>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Action
  } from "vuex-class";
  import WorkMenu from "~/components/workspace/work-menu.vue";
  import WorkTheme from '~/components/workspace/work-theme.vue'
  @Component({
    components: {
      WorkMenu,
      WorkTheme
    }
  })
  export default class WorkHeader extends Vue {
    private modifyPwdModal: Boolean = false;
    @Prop() person;
    @Action select;

    modifyPwd() {
      this.modifyPwdModal = true
    }
    logOut() {
      this.$Modal.confirm({
        title: '提示',
        content: '确认退出系统吗？'
      })
    }
  }

</script>

<style scoped>
  .work-header {
    flex-basis: 60px;
    height: 60px;
    min-height: 60px;
  }

  .logo {
    padding: 10px;
  }

  .headPortrait {
    width: 20px;
    height: 20px;
    border: 1px solid #dddddd;
    border-radius: 50%;
    background-image: url('/static/images/common/headPortrail.png')
  }

</style>

<template>
  <div class="component work-header row between-span middle-span">
    <div class="logo">
      <img src="/static/images/common/logo.png" alt="" style="margin-left:5px;margin-top:8px;">
    </div>
    <work-menu class="col-span" style="margin-left:80px;"></work-menu>
    <div class="row">
      <work-theme></work-theme>
    </div>
    <div class="row">
      <i-poptip trigger="click" placement="bottom" style="cursor: pointer">
        <div class="headPortrait"></div>
        <div slot="content" style="text-align:left">
          <div style="font-size:18px;border-bottom:1px solid #F5F5F5;padding-bottom:6px;">{{loginPerson}}</div>
          <div style="padding:10px 0">上次登录时间</div>
          <div style="padding:10px 0;border-bottom:1px solid #F5F5F5">2018-01-10 15:30:56</div>
          <div style="position:relative;right:16px;">
            <i-button type="text" style="display:block" @click="modifyPwd">修改密码</i-button>
            <i-button type="text" @click="logOut">退出登录</i-button>
          </div>
        </div>
      </i-poptip>
      <span style="color:#fff;font-size:12px;margin-left:6px;margin-right:50px;position:relative;top:2px;">{{loginName}}</span>
    </div>

    <template>
      <i-modal v-model="modifyPwdModal" title="修改密码">
        <i-form :label-width="110" ref="change-password" :model="repairModel">
          <i-form-item label="请输入原密码" prop="oldPassword">
            <i-input type="password" v-model="repairModel.oldPassword"></i-input>
          </i-form-item>
          <i-form-item label="请输入新密码" prop="newPasswordOne">
            <i-input type="password" v-model="repairModel.newPasswordOne"></i-input>
          </i-form-item>
          <i-form-item label="确认新密码" prop="newPassword">
            <i-input type="password" v-model="repairModel.newPassword"></i-input>
          </i-form-item>
        </i-form>
        <template slot="footer">
          <i-button @click="workCancel">取消</i-button>
          <i-button @click="workRole" class="blueButton">确定</i-button>
        </template>
      </i-modal>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";
import WorkMenu from "~/components/workspace/work-menu.vue";
import WorkTheme from "~/components/workspace/work-theme.vue";
import { Dependencies } from "~/core/decorator";
import { LoginService } from "~/services/manage-service/login.service";
import md5 from 'md5'
@Component({
  components: {
    WorkMenu,
    WorkTheme
  }
})
export default class WorkHeader extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  private repairModel :any = {
    newPassword:'',
    oldPassword:'',
    newPasswordOne:''
  }
  private modifyPwdModal: Boolean = false;
  private loginPerson: String = "";
  private loginName: String = "";
  @Prop() person;
  @Action select;

  created() {
    this.loginPerson = this.$store.state.userData.username;
    this.loginName = this.$store.state.userData.realname;
  }
  modifyPwd() {
    this.modifyPwdModal = true;
  }
  logOut() {
    this.$Modal.confirm({
      title: "提示",
      content: "确认退出系统吗？",
      onOk: () => {
        this.loginService.logout().subscribe(
          () => {},
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
        this.$router.push("/");
      }
    });
  }
  workCancel(){
    this.modifyPwdModal = false;
    let _changePassword: any = this.$refs["change-password"];
    _changePassword.resetFields();
  }
  workRole(){
    if(this.repairModel.newPassword !== this.repairModel.newPasswordOne){
      this.$Message.warning('两次密码输入不一致，请重新输入！')
      return
    }else{
      this.loginService.modifyPassword({
        newPassword:md5(this.repairModel.newPassword),
        oldPassword:md5(this.repairModel.oldPassword)
      })
      .subscribe( data => {
        this.modifyPwdModal = false;
        let _changePassword: any = this.$refs["change-password"];
        _changePassword.resetFields();
        this.$Message.success('操作成功')
      },({msg})=> {
        this.$Message.error(msg)
      })
    }
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
  background-image: url("/static/images/common/headPortrail.png");
}
</style>

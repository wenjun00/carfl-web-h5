<!--机构与用户管理-->
<template> 
  <section>
    <data-form  :model="userModel" @on-search="getUserListByCondition" :page="pageService" hidden-date-search hidden-reset>
      <template slot="input">
        <i-form-item prop="userName" label="用户名:">
          <i-input v-model="userModel.userName" placeholder="请输入用户名"></i-input>
        </i-form-item>
        <i-form-item prop="realName" label="姓名:">
          <i-input v-model="userModel.realName" placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item prop="status" label="状态:">
          <i-select v-model="userModel.status">
            <i-option label="启用" :value="0" :key="0"></i-option>
            <i-option label="停用" :value="1" :key="1"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :show-config-column="false" highlight-row :id="9" :columns="userColumns" :data="userDataSet" ref="databox" @on-current-change="onCurrentChange" @onPageChange="getUserListByCondition" :page="pageService"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { ManageService } from "~/services/manage-service/manage.service";
import { Layout } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";
import { Emit } from "vue-property-decorator";
//TODO
@Layout("workspace")
@Component({
  components: {}
})
export default class SalesmanName extends Page {
  @Dependencies(ManageService) private manageService: ManageService;
  @Dependencies(PageService) private pageService: PageService;

  private currentRow: any = null;
  private userDataSet: Array<any> = [];

  private userModel: any = {
    userName: "",
    realName: "",
    status: 0,
    deptId: 1
  };

  private userColumns = [
    {
      align: "center",
      title: "用户名",
      key: "userUsername",
      editable: true
    },
    {
      align: "center",
      title: "姓名",
      editable: true,
      key: "userRealname"
    },
    {
      align: "center",
      title: "所属机构",
      editable: true,
      key: "deptName"
    }
  ];

  /**
   * 当前选中行变化处理
   */
  onCurrentChange(currentRow) {
    this.currentRow = currentRow;
  }

  /**
   * 获取当前选中项
   */
  getCurrentRow() {
    return this.currentRow;
  }

  /**
   * 获取用户列表
   */
  getUserListByCondition() {
    this.manageService
      .getUsersByDeptPage(this.userModel, this.pageService)
      .subscribe(
        data => {
          this.userDataSet = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  mounted() {
    this.getUserListByCondition();
  }
}
</script>

<style lang="less" scoped>
.batch-manage-device {
  .ivu-modal-footer {
    display: none;
  }
}
</style>

<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <div style="height:600px;overflow:auto">
          <i-tree show-checkbox :data="menuResource" @on-select-change="getControlResourcesById" @on-check-change="updateMenuResourcesState"></i-tree>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="14" style="padding:0 10px">
        <span>模块功能</span>
        <i-table ref="databox" :columns="treeColumns" :data="treeDatabox" :noDefaultRow="true"></i-table>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import {Observable} from 'rxjs'
import { RoleService } from "~/services/manage-service/role.service";
import { Prop,Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { RoleResoService } from "~/services/manage-service/role-reso.service";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    DataBox
  }
})
export default class ModulePower extends Vue {
  @Dependencies(RoleService) private roleService: RoleService;
  @Dependencies(RoleResoService) private roleResoService: RoleResoService;
  @Dependencies(PageService) private pageService: PageService;

  // 角色id
  @Prop() roleId

  @Watch("roleId")
  onRoleIdChange(value){
    this.getResourceDataByRole()
  }

  private resourceData = [];
  private menuResource = [];
  private controlResource = [];

  private treeData: Array<any> = [];
  private treeColumns: any;
  private treeDatabox: Array<any> = [];

  private allData: Array<any> = [];
  private resoPid: number = 0;
  private checkBoolen: Boolean = false;
  private checkedId: any = [];
  private treeId: any = [];
  private expandData: any = [];
  private multipleSelection: any = [];
  private expand: any = [];
  private checkButtonIds: Array<any> = []; // 接口返回的已选按钮和输入框
  private checkMenuIds: Array<any> = []; // 接口返回的已选页面
  private tableCheckChangeId: Array<any> = []; // 表格checkId
  private treeCheckChangeId: Array<any> = []; // 树checkId

  created() {
    this.treeData = [];
    //   this.getTreeDate();
    this.treeColumns = [
      {
        align: "center",
        type: "selection",
        title: "选择",
        width: "60"
      },
      {
        align: "center",
        key: "resoName",
        title: "功能名称",
        width: "90"
      },
      {
        align: "center",
        key: "resoRemark",
        title: "描述"
      }
    ];
  }

  updateMenuResourcesState(){

  }

  /**
   * 获取控件资源通过id
   */
  getControlResourcesById(id){
    // 菜单资源数据
      return this.controlResource.filter(x =>
        [423].includes(x.resoFiletype) &&
        x.resoPid === id
      )
  }

  getResourceData() {
    this.roleResoService.getAllResource().subscribe(data => {
      // 全部资源数据
      this.resourceData = data;

      // 菜单资源数据
      this.menuResource = data.filter(x =>
        [422, 421, 429].includes(x.resoFiletype)
      );

      // 菜单资源数据
      this.controlResource = data.filter(x =>
        [423].includes(x.resoFiletype)
      );
    });
  }

  /**
   * 生成菜单资源数据
   * 生成树形结构
   */
  getMenuResourceData() {
    let parents = this.menuResource.filter(x => x.resoPid === 1000);

    let fun = item => {
      let children = this.menuResource.filter(x => x.resoPid === item.id);

      if (children && children.length) {
        item.children = children.map(fun);
      }

      return item;
    };

    return parents.map(fun);
  }

  /**
   * 获取组件资源数据
   */
  getControlResourceData(id) {
    return this.controlResource.filter(x => x.resoPid === id);
  }

  /**
   * 获取角色资源数据
   */
  getResourceDataByRole() {
    Observable.zip(
      this.roleResoService.findRoleResoResourceByRoleId({
        roleIds:[this.roleId]
      }),
      this.roleResoService.findRoleResoMenuByRoleId({
        roleIds:[this.roleId]
      })
    ).subscribe(([controlItems,menuItems])=>{
      // 筛选资源选中项
      this.controlResource.forEach((item)=>
        item.checked = controlItems.find(x=>item.id===x.id)
      )

      // 筛选菜单选中项
      this.menuResource.forEach((item)=>
        item.checked = menuItems.find(x=>item.id===x.id)
      )
    })
  }

  mounted() {
    // 获取所有资源数据
    this.getResourceData();
  }
}
</script>

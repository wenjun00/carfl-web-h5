<!--修改角色--> 
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <div class="module-name" >
          <data-tree  ref="data-tree" show-checkbox :data="menuResourceData" @on-select-change="getControlResourcesById"></data-tree>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="14" class="module-form">
        <span>模块功能</span>
        <data-box @on-selection-change="onSelectionChange"  ref="data-box" :showConfigColumn="false" :columns="columns" :data="controlResourceData"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Observable } from "rxjs";
import { RoleService } from "~/services/manage-service/role.service";
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { RoleResoService } from "~/services/manage-service/role-reso.service";
import { PageService } from "~/utils/page.service";
import DataTree from "~/components/common/data-tree.vue";

@Component({
  components: {
    DataBox,
    DataTree
  }
})
export default class ModulePower extends Vue {
  @Dependencies(RoleService) private roleService: RoleService;
  @Dependencies(RoleResoService) private roleResoService: RoleResoService;
  @Dependencies(PageService) private pageService: PageService;

  // 角色id
  @Prop() roleId;

  @Watch("roleId")
  onRoleIdChange(value) {
    this.getResourceDataByRole();
    this.controlResourceData = []
  }

  private resourceData = [];
  private menuResource = [];
  private controlResource = [];
  private menuResourceData = [];
  private controlResourceData = [];

  private columns = [];

  created() {
    this.columns = [
      {
        align: "center",
        type: "index",
        title: "序号",
        width: 30
      },
      {
        align: "center",
        type: "selection",
        key: "checked",
        title: "选择",
        width: 60
      },
      {
        align: "center",
        key: "resoName",
        title: "功能名称",
        width: 90
      },
      {
        align: "center",
        key: "resoRemark",
        title: "描述"
      }
    ];
  }

  /**
   * 获取控件资源通过id
   */
  getControlResourcesById({ id }) {
      console.log(this.controlResourceData)
      console.log('656')
    this.controlResourceData = this.controlResource.filter(
      x => [423, 424, 425].includes(x.resoFiletype) && x.resoPid === id
     
    );
  }

  getResourceData() {
    this.roleResoService.getAllResource().subscribe(data => {
      // 全部资源数据
      this.resourceData = data;

      // 菜单资源数据
      this.menuResource = data
        .filter(x => [422, 421, 429].includes(x.resoFiletype))
        .map(x => {
          x.title = x.resoName;
          return x;
        });

      // 菜单资源数据
      this.controlResource = data.filter(x =>
        [423, 424, 425].includes(x.resoFiletype)
      );

      this.createMenuResourceData();
    });
  }

  onSelectionChange(section){
    this.controlResourceData.forEach(x=>{
      x._checked = !!section.find(item=>item.id === x.id)
    })
  }

  /**
   * 生成菜单资源数据
   * 生成树形结构
   */
  createMenuResourceData() {
    let parents = this.menuResource.filter(x => x.resoPid === 10000);

    let fun = item => {
      let children = this.menuResource.filter(x => x.resoPid === item.id);

      if (children && children.length) {
        item.children = children.map(fun);
      }

      return item;
    };

    this.menuResourceData = parents.map(fun);
  }

  /**
   * 获取角色资源数据
   */
  getResourceDataByRole() {
    Observable.zip(
      this.roleResoService.findRoleResoResourceByRoleId({
        roleIds: [this.roleId]
      }),
      this.roleResoService.findRoleResoMenuByRoleId({
        roleIds: [this.roleId]
      })
    ).subscribe(([controlItems, menuItems]) => {
      // 筛选菜单选中项
      let menuCheckedKeys = this.menuResource
        .filter(item => menuItems.find(x => item.id === x.id))
        .map(x => x.id);

      // 筛选资源选中项
      this.controlResource.forEach(item => {
        item._checked = !!controlItems.find(x => item.id === x.id);
      });

      let dataTree = this.$refs["data-tree"] as DataTree;
      dataTree.setCheckedKeys(menuCheckedKeys);
    });
  }

  mounted() {
    // 获取所有资源数据
    this.getResourceData();
  }

  public submit(){
    let dataTree = this.$refs['data-tree'] as DataTree
    let menuResourceIds = dataTree.getCheckedKeys()
    let controlResourceIds = this.controlResource.filter(x=>x._checked).map(x=>x.id)

    this.roleService.roleAllocateResources({
      roleId:this.roleId,
      resourcesId:[...menuResourceIds,...controlResourceIds]
    }).subscribe(()=>{
      this.$Message.success('模块权限配置成功！')
      this.$emit('close')
    })
  }
}
</script>
<style  lang="less" scoped>
    .component.module-power{
        .module-name{
            height:600px;
            overflow:auto;
        }
        .module-form{
            padding:0 10px;
        }
    }
</style>

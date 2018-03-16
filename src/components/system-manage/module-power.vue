<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <div style="height:600px;overflow:auto">
          <i-tree show-checkbox :data="treeData" @on-select-change="getPageButton" @on-check-change="treeCheckChange"></i-tree>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="14" style="padding:0 10px">
        <span>模块功能</span>
        <i-table ref="databox" :columns="treeColumns" :data="treeDatabox" :noDefaultRow="true" @on-selection-change="selectionChange"></i-table>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { RoleService } from "~/services/manage-service/role.service";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { RoleResoService } from "~/services/manage-service/role-reso.service";
import { Emit } from "vue-property-decorator";
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

  @Emit("close")
  close() {}

  private resourceData = [];
  private menuResource = [];
  private controlResource = [];
  private roleId: Number = 0; // 角色id
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

  refresh(rowId) {
    // this.id = rowId;
    // this.roleService
    //   .findResourceByRoleId({
    //     roleId: rowId
    //   })
    //   .subscribe(data => {
    //     this.expandData = data;
    //     this.getTreeDate();
    //   });
  }

  getPageButton(val) {
    if (val.length) {
      this.roleResoService
        .getSonResoNoPage({
          id: val[0].id
        })
        .subscribe(
          data => {
            data.forEach(v => {
              if (this.checkButtonIds.includes(v.id)) {
                v._checked = true;
              } else {
                v._checked = false;
              }
            });
            this.treeDatabox = data;
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }

  /**
   * 树勾选后change事件
   */
  treeCheckChange(data) {
    this.treeCheckChangeId = data.map(v => v.id);
  }

  /**
   * 表格checkbox的change事件
   */
  selectionChange(data) {
    this.tableCheckChangeId = data.map(v => v.id);
  }

  /**
   * 获取角色已有按钮输入框&&已有页面
   */
  getRoleButtonAndMenu(rolesId) {
    this.roleId = rolesId; // 将roleId保存起来以备他用
    // 反显按钮输入框
    this.roleResoService
      .findRoleResoResourceByRoleId({
        roleIds: [rolesId]
      })
      .subscribe(
        data => {
          this.checkButtonIds = data.map(v => v.id);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );

    // 反显页面
    this.roleResoService
      .findRoleResoMenuByRoleId({
        roleIds: [rolesId]
      })
      .subscribe(
        data => {
          this.checkMenuIds = data.map(v => v.id);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  /**
   * 取消
   */
  cancelClick() {
    this.close();
  }

  /**
   * 确定
   */
  submitRole() {
    this.multipleSelection = this.$refs["databox"];
    let treeIds: any = [];
    let tableIds: any = [];
    if (!this.treeCheckChangeId.length) {
      treeIds = this.checkMenuIds; // 若未对树的checkbox进行点击，treeId 等于 接口返回的反显数据。否则treeId等于checkbox点击后的id
    } else {
      treeIds = this.treeCheckChangeId;
    }
    if (!this.tableCheckChangeId.length) {
      tableIds = this.checkButtonIds;
    } else {
      tableIds = this.tableCheckChangeId;
    }
    let resourcesId = treeIds.concat(tableIds);

    this.roleService
      .roleAllocateResources({
        roleId: this.roleId,
        resourcesId: resourcesId
      })
      .subscribe(
        data => {
          this.$Message.success("模块权限分配成功！");
          this.close();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  /**
   * 获取树接口
   */
  getTreeDate() {
    // 获取树的数据
    this.roleResoService.findRoleResoMenu().subscribe(
      val => {
        this.allData = val;
        this.resoPid = val.resoPid;
        this.createNewTree(this.allData);
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 生成树
   */
  createNewTree(allData) {
    let root = allData.filter(v => v.pid === 10000); // 获取树根
    this.treeData = [];

    // 遍历根对象push进树中
    root.forEach(item => {
      let node = {
        title: item.resoname,
        id: item.id,
        resoname: item.resoname,
        expand: true,
        checked: this.checkMenuIds.includes(item.id),
        children: this.getChild(item)
      };

      this.treeData.push(node);
    });
  }

  /**
   * 获取相对根元素的子元素
   */
  getChild(item) {
    let child: any = [];
    // 判断子的父id与全部数据的id相等
    this.allData.map(val => {
      if (item.id === val.pid) {
        if (val.pid) {
          let node = {
            title: val.resoname,
            resoname: val.resoname,
            id: val.id,
            checked: this.checkMenuIds.includes(item.id),
            expand: true,
            children: this.getChild(val) // 迭代产生根
          };

          child.push(node);
        }
      }
    });
    return child;
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
      this.controlResource = data.filter(x => [423].includes(x.resoFiletype));
    });
  }

  /**
   * 生成菜单资源数据
   * 生成树形结构
   */
  getMenuResourceData() {
    let parents = this.menuResource.find(x => x.resoPid === 1000);

    let fun = item => {
      let children = this.menuResource.find(x => x.resoPid === item.id);

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
    return this.controlResource.find(x => x.resoPid === id);
  }

  /**
   * 获取角色资源数据
   */
  getResourceDataByRole() {}

  mounted() {
    // 获取所有资源数据
    this.getResourceData();
    // 获取角色资源数据
    this.getResourceDataByRole();
  }
}
</script>

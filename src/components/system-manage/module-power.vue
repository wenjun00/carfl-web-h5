<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <div style="height:600px;overflow:auto">
          <i-tree show-checkbox :data="treeData" @on-select-change="getPageButton"></i-tree>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="14" style="padding:0 10px">
        <span>模块功能</span>
        <i-table ref="databox" :columns="treeColumns" :data="treeDatabox"  @on-select="selectFun" :noDefaultRow="true"></i-table>
      </i-col>
    </i-row>
    <!-- <div style="text-align:right">
      <i-button type="ghost" @click="cancelClick">取消</i-button>
      <i-button class="blueButton" @click="submitRole">确定</i-button>
    </div> -->
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

  private treeData: Array<Object> = [];
  private treeColumns: any;
  private treeDatabox: Array<any> = [];
  private allData: Array<any> = [];
  private resoPid: number = 0;
  private checkBoolen: Boolean = false;
  private checkedId: any = [];
  private treeId: any = [];
  private expandData: any = [];
  private id: any = "";
  private multipleSelection: any = [];
  private expand: any = [];
  // private itemexpand: Boolean = false;

  @Emit("close")
  close() {}

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
    this.id = rowId;
    this.roleService
      .findResourceByRoleId({
        roleId: rowId
      })
      .subscribe(data => {
        this.expandData = data;
        this.getTreeDate();
      });
  }
  getPageButton(val){
    if(val.length){
      this.roleResoService.getSonResoNoPage({
        id:val[0].id
      }).subscribe(data=>{
        this.treeDatabox = data
      },({msg})=>{
        this.$Message.error(msg)
      })
    }
  }
  /**
   * 获取角色已有按钮和输入框
   */
  getRoleButton(){
    this.roleResoService.findRoleResoResourceByRoleId({
      roleIds:rolesId
    }).subscribe(data=>{

    },({msg})=>{
      this.$Message.error(msg)
    })
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
    let checkMsg: any = this.multipleSelection
      .getCurrentSelection()
      .map(v => v.id);
    this.roleService
      .roleAllocateResources({
        roleId: this.id,
        resourcesId: checkMsg
      })
      .subscribe(
        data => {
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
    this.roleResoService.findRoleResoMenu().subscribe(val => {
      this.allData = val;
      this.resoPid = val.resoPid;
      this.createNewTree(this.allData);
    });
  }
  /**
   * 生成树
   */
  createNewTree(allData) {
    let root = allData.filter(v => v.pid===10000); // 获取树根
    console.log(root,'root')
    this.treeData = [];

    // 遍历根对象push进树中
    root.forEach(item => {

      let node1 = {
        title: item.resoname,
        id: item.id,
        resoname: item.resoname,
        expand: false,
        children: this.getChild(item)
      };
      this.treeData.push(node1);
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
        // this.expand = this.expandData.find((v, i) => v === val.id);
        if (val.pid) {
          let node2 = {
            title: val.resoname,
            resoname: val.resoname,
            id: val.id,
            expand: this.expand,
            children: this.getChild(val) // 迭代产生根
          };
          child.push(node2);
        }
      }
    });
    return child;
  }
  /**
   * 点击模块权限节点 显示模块功能
   */
  // showdesi(item, checked, indeterminate) {
  //   if (item[0].nodeKey === 3) {
  //     this.treeDatabox = item[0].children;
  //   } else {
  //     this.treeDatabox = [];
  //   }
  // }
  selectFun(row) {}
  /**
   * 通过角色id查询资源 (获取该角色已配置过的模块)
   */
  // findRoleResource() {
  // 	this.roleService
  // 		.findResourceByRoleId({
  // 			roleId: this.rowId,
  // 		})
  // 		.subscribe(val => {
  // 			this.checkedId = val.map(v => v.id);
  // 			this.treeId = this.allData.map(v => v.id);
  // 			this.allData.forEach(v => {
  // 				this.checkedId.forEach(checkVal => {
  // 					if (v.id === checkVal) {
  // 						this.checkBoolen = true;
  // 					} else {
  // 						this.checkBoolen = false;
  // 					}
  // 				});
  // 			});
  // 		});
  // 	console.log(this.treeData, 222);
  // }
}
</script>

<!--模块功能-->
<template>
  <section class="page module-function">
    <span class="form-title">模块功能</span>
    <i-row style="margin-bottom:10px;margin-left:25px;">
      <span>菜单名称：</span>
      <i-input placeholder="请输入菜单名称" style="display:inline-block;width:10%;"></i-input>
      <span style="margin-left:10px;">菜单编号：</span>
      <i-input placeholder="请输入菜单编号" style="display:inline-block;width:10%;"></i-input>
      <span style="margin-left:10px;">所属系统：</span>
      <i-input placeholder="请输入所属系统" style="display:inline-block;width:10%;"></i-input>
      <i-select placeholder="全部状态" style="margin-left:10px;width:10%;">
        <i-option label="已启用" value="0" key="已启用"></i-option>
        <i-option label="未启用" value="1" key="未启用"></i-option>
      </i-select>
      <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
      <!--<i-button style="margin-left:10px;" class="blueButton" @click="addModuleFunction">添加</i-button>-->
      <i-button style="margin-left:10px;" class="blueButton" @click="ResetNameClick">重置名称</i-button>
      <i-button style="margin-left:10px;" class="blueButton" @click="ResetIconClick">重置图标</i-button>
    </i-row>
    <i-row :gutter="20">
      <!--树-->
      <i-col :span="3" style="border:1px solid #DDDEE1;height:500px;margin-left:30px;margin-top:9px">
        <div style="text-align:center;font-size: 14px;font-weight: bold;width: 109%;background: #F8F8F9;height: 41px; position: relative;right: 10px;top: 1px;">
          <span>模块名称</span>
        </div>
        <i-tree :data="treeData" @on-select-change="prdTreeChange"></i-tree>
      </i-col>
      <!--表格-->
      <i-col :span="20">
        <data-box :columns="treeColumns" :data="treeDatabox"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal title="模块添加/修改" v-model="addModuleFunctionModal" class="modal" width="600">
        <i-form :label-width="110" style="margin-top:20px;">
          <i-form-item label="模块名称">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="排序">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="状态">
            <i-select class="input">
              <i-option label="启用" value="启用" key="启用"></i-option>
              <i-option label="停用" value="停用" key="停用"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="权限图标">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块等级">
            <i-select class="input">
              <i-option label="一级菜单" value="一级菜单" key="一级菜单"></i-option>
              <i-option label="下级菜单" value="下级菜单" key="下级菜单"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="父级目录">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块路径(url)">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块编号">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="所属系统">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="描述">
            <i-input type="textarea" class="input"></i-input>
          </i-form-item>
          <div slot="footer">
            <i-button>取消</i-button>
            <i-button class="blueButton">确定</i-button>
          </div>
        </i-form>
      </i-modal>
    </template>

    <!--功能模块-->
    <template>
      <i-modal v-model="functionModuleModal" width="1200" title="功能模块">
        <function-module></function-module>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="toViewModal" width="500" title="查看" class="toViewModalClass">
        <to-view :ToviewrowData="ToviewrowData"></to-view>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="modifyNameModal" width="500" title="修改资源名称" class="toViewModalClass">
        <i-form :label-width="110" style="margin-top:20px;">
          <i-form-item label="资源名称" prop="resoName">
            <i-input v-model="modifyNameDataset.resoName"></i-input>
          </i-form-item>
        </i-form>
        <div style="text-align:right;">
          <i-button @click="cancelmodifyName" class="defalutButton">取消</i-button>
          <i-button @click="confirmmodifyName" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="modifyIconModal" width="500" title="修改资源图标" class="toViewModalClass">
        <i-form :label-width="110" style="margin-top:20px;">
          <i-form-item label="资源图标" prop="resoIcon">
            <i-input v-model="modifyIconData.resoIcon"></i-input>
          </i-form-item>
        </i-form>
        <div style="text-align:right;">
          <i-button @click="cancelmodifyIcon" class="defalutButton">取消</i-button>
          <i-button @click="confirmmodifyIcon" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import FunctionModule from "~/components/system-manage/function-module.vue";
  import ToView from "~/components/system-manage/to-view.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    RoleResoService
  } from "~/services/manage-service/role.reso.service";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      FunctionModule,
      ToView
    }
  })
  export default class ModuleFunction extends Page {
    @Dependencies(RoleResoService) private roleResoService: RoleResoService;

    private treeData: Array < any > = [];
    private treeColumns: any;
    private treeDatabox: Array < Object > = [];
    private addModuleFunctionModal: Boolean = false;
    private functionModuleModal: Boolean = false;
    private modifyNameModal: Boolean = false;
    private toViewModal: Boolean = false;
    private modifyIconModal: Boolean = false;
    private resoPid: number = 0;
    private allData: Array < any > = [];
    private ToviewrowData: any = '';
    private modifyNameDataset: any = {
      resoName: '',
      id: ''
    };
    private modifyIconData: any = {
      id: '',
      resoIcon: ''
    }

    /**
     * 添加
     */
    addModuleFunction() {
      this.addModuleFunctionModal = true;
    }
    created() {
      this.getTreeDate();
      this.treeData = [];

      this.treeColumns = [{
          align: "center",
          type: "index",
          title: "排序",
          width: 60,
          fixed: "left"
        },
        {
          align: "center",
          title: "操作",
          width: 260,
          fixed: "left",
          render: (h, {
            row,
            columns,
            index
          }) => {
            return [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      // this.$Modal.info({
                      //   render:h=>h(FunctionModule),
                      //   title:'功能模块',
                      //   width:1200
                      // })
                      this.functionModuleModal = true;
                    }
                  }
                },
                "功能模块"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.modifyIconData.resoIcon = row.resoIcon
                      this.modifyIconData.id = row.id
                      this.modifyIconModal = true
                    }
                  }
                },
                "修改图标"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.modifyNameDataset.resoName = row.resoName
                      this.modifyNameDataset.id = row.id
                      this.modifyNameModal = true
                    }
                  }
                },
                "修改名称"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.ToviewrowData = row
                      console.log(this.ToviewrowData, 777)
                      this.toViewModal = true
                    }
                  },
                  style: {
                    color: "#265EA2"
                  }
                },
                "查看"
              )
            ];
          }
        },
        {
          align: "center",
          key: "resoInitName",
          title: "资源初始化名称"
        },
        {
          align: "center",
          key: "resoName",
          title: "资源名称"
        },
        {
          align: "center",
          key: "resoInitIcon",
          title: "资源初始化图标"
        },
        {
          align: "center",
          key: "resoIcon",
          title: "资源图标"
        },

        {
          align: "center",
          key: "moduleId",
          title: "重置"
        },
        {
          align: "center",
          key: "resoStatus",
          title: "状态"
        },
        {
          align: "center",
          key: "resoRemark",
          title: "备注"
        }
      ];

      this.treeDatabox = []; //表格数据存储
    }
    /**
     * 重置名称
     */
    ResetNameClick() {
      this.roleResoService.resetResoName().subscribe(data => {
        this.$Message.success('重置名称成功！')
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }
    /**
     * 重置图标
     */
    ResetIconClick() {
      this.roleResoService.resetResoIcon().subscribe(data => {
        this.$Message.success('重置图标成功！')
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }
    /**
     * 取消修改资源名称
     */
    cancelmodifyName() {
      this.modifyNameModal = false
    }
    /**
     * 确定修改资源名称
     */
    confirmmodifyName() {
      this.roleResoService.modifyResoName(this.modifyNameDataset).subscribe(data => {
        this.$Message.success('修改成功！')
        this.modifyNameModal = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }
    /**
     * 取消修改资源图标
     */
    cancelmodifyIcon() {
      this.modifyIconModal = false
    }
    /**
     * 确定修改资源图标
     */
    confirmmodifyIcon() {
      this.roleResoService.modifyResoIcon(this.modifyIconData).subscribe(data => {
        this.$Message.success('修改成功！')
        this.modifyIconModal = false
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }

    /**
     * 获取树接口
     */
    getTreeDate() {
      this.roleResoService.getAllResource().subscribe(val => {
        console.log(val, 999)
        this.allData = val;
        this.resoPid = val.resoPid;
        this.createNewTree(this.allData);
      });
    }
    /**
     * 生成树
     */
    createNewTree(allData) {
      let root = allData.filter(v => !v.resoPid); // 获取树根
      this.treeData = [];
      // 遍历根对象push进树中
      root.forEach(item => {
        let node1 = {
          title: item.resoName,
          id: item.id,
          resoSysname: item.resoSysname,
          resoInitName: item.resoInitName,
          resoCode: item.resoCode,
          resoLevel: item.resoLevel,
          resoStatus: item.resoStatus,
          resoPath: item.resoPath,
          resoInitIcon: item.resoInitIcon,
          resoIcon: item.resoIcon,
          resoType: item.resoType,
          resoFiletype: item.resoFiletype,
          resoRemark: item.resoRemark,
          expand: true,
          children: this.getChild(item)
        };
        this.treeData.push(node1);
      });
      console.log(this.treeData, 222);
    }
    /**
     * 获取相对根元素的子元素
     */
    getChild(item) {
      let child: any = [];
      // 判断子的父id与全部数据的id相等
      this.allData.map(val => {
        if (item.id === val.resoPid) {
          if (val.resoPid) {
            let node2 = {
              title: val.resoName,
              resoName: val.resoName,
              id: val.id,
              resoSysname: val.resoSysname,
              resoInitName: val.resoInitName,
              resoCode: val.resoCode,
              resoLevel: val.resoLevel,
              resoStatus: val.resoStatus,
              resoPath: val.resoPath,
              resoInitIcon: val.resoInitIcon,
              resoIcon: val.resoIcon,
              resoType: val.resoType,
              resoFiletype: val.resoFiletype,
              resoRemark: val.resoRemark,
              expand: true,
              children: this.getChild(val) // 迭代产生根
            };
            child.push(node2);
          } else if (val.resoPid === null) {
            let node2 = {
              title: val.resoName,
              id: val.id,
              resoName: val.resoName,
              resoSysname: val.resoSysname,
              resoInitName: val.resoInitName,
              resoCode: val.resoCode,
              resoLevel: val.resoLevel,
              resoStatus: val.resoStatus,
              resoPath: val.resoPath,
              resoInitIcon: val.resoInitIcon,
              resoIcon: val.resoIcon,
              resoType: val.resoType,
              resoFiletype: val.resoFiletype,
              resoRemark: val.resoRemark,
              expand: true,
              children: this.getChild(val)
            };
            child.push(node2);
          }
        }
      });
      return child;
    }
    prdTreeChange(val) {
      this.treeDatabox = val;
    }
  }

</script>

<style lang="less" scope>
  .input {
    width: 60%;
  }
  
  .toViewModalClass {
    .ivu-modal-footer {
      display: none!important;
    }
  }

</style>

<!--机构与用户管理-->
<template>
  <section>
    <i-row>
      <!--<i-col :span="4" style="border:1px solid #dddddd;padding:20px 0;height:590px;">
        <i-row style="border-bottom:1px solid #dddddd;display:flex;align-items:center;justify-content:flex-end">
          <i-button class="blueButton" @click="addDept" style="position:relative;bottom:10px;right:8px;">添加机构</i-button>
        </i-row>
        <i-row>
          <div style="overflow:auto;height:540px">
            <organize-tree :dataList="dataList" @add="addDept" @change="onChange" @remove="removeDept"
                           @edit="editDept"></organize-tree>
          </div>
        </i-row>
      </i-col>-->
          <span style="margin-left:20px;">用户名：</span>
          <i-input style="display:inline-block;width:10%;" v-model="userListModel.userName"
                   placeholder="请输入用户名"></i-input>
          <span style="margin-left:20px;">姓名：</span>
          <i-input style="display:inline-block;width:10%;" v-model="userListModel.realName"
                   placeholder="请输入姓名"></i-input>
          <span style="margin-left:10px;">状态：</span>
          <i-select style="display:inline-block;width:10%" v-model="userListModel.status">
            <i-option label="启用" :value="0" :key="0"></i-option>
            <i-option label="停用" :value="1" :key="1"></i-option>
          </i-select>

          <i-button class="blueButton" style="margin-left:20px;" @click="getUserListByCondition">搜索</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="refreshRoleList">重置</i-button>
        </i-row>
        <data-box :id="9" :columns="columns1" :width="700" :data="userList" ref="databox" @onPageChange="getUserListByCondition"
                  :page="pageService"></data-box>
    </i-row>
    <i-row style="margin-top:20px;">
      <i-button style="float:right" @click="chooseAndBackPrd" class="blueButton">选择并返回</i-button>
    </i-row>
  </section>
</template>

<script lang="tsx">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import UserList from "~/components/system-manage/user-list.vue";
  import WaitHandleCase from "~/components/system-manage/wait-handle-case.vue";
  import ModulePower from "~/components/system-manage/module-power.vue";
  import ModifyUser from "~/components/system-manage/modify-user.vue";
  import AddUser from "~/components/system-manage/add-user.vue";
  import DeviceManage from "~/components/system-manage/device-manage.vue";
  import AddOrg from "~/components/system-manage/add-org.vue";
  import DataPowerModal from "~/components/system-manage/data-power-modal.vue";
  import OrganizeTree from "~/components/common/organize-tree.vue";
  import {Dependencies} from "~/core/decorator";
  import {RoleService} from "~/services/role-service/role.service";
  import {ManageService} from "~/services/manage-service/manage.service";
  import {DepartmentService} from "~/services/manage-service/department.service";
  import {Layout} from "~/core/decorator";
  import {PageService} from "~/utils/page.service";
  import {FilterService} from "~/utils/filter.service";
  import { Upload, Radio } from "iview";
  import {
    Emit
  } from "vue-property-decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      UserList,
      WaitHandleCase,
      ModulePower,
      ModifyUser,
      AddUser,
      DeviceManage,
      AddOrg,
      OrganizeTree,
      DataPowerModal
    }
  })
  export default class SalesmanName extends Page {
    // @Dependencies(RoleService) private roleService: RoleService;
    @Dependencies(ManageService) private manageService: ManageService;
    @Dependencies(DepartmentService) private departmentService: DepartmentService;
    @Dependencies(PageService) private pageService: PageService;

    @Emit('choosecurrentData')
    choosecurrentData(data) {}
    @Emit('close')
    close() {}
    

    private columns1: any;
    private userList: any = [];
    private columns2: any;
    private data2: Array<Object> = [];
    private dataList: Array<any> = [];
    private userName: String = "";
    private userListModel: any = {};
    private deptObject: any;
    private modifyUserModel: any;
    private userId: number | null = null;
    private userIds: Array<any> = [];
    private multipleUserId: any;
    private batchAllotFlag: Boolean = false;
    private deptLevel: number | null = null;
    private deptCode: String = "";
    // private deptPid: number | null = null;
    private openColumnsConfig: Boolean = false;
    private editNewOrgModal: Boolean = false;
    private warnStatus: any = null;
    private dataPowerModal: Boolean = false; // 数据权限弹出框
    private addOrgModel: any = {
      deptName: "",
      deptStatus: 0,
      companyName: "",
      deptRemark: "",
      deptLevel: "",
      deptCode: "",
      deptPid: "",
      companyId: ""
    };
    private companyId: any = 0;


    mounted() {
      this.manageService.getAllDepartment().subscribe(
        data => {
          this.deptObject = data[0];
          this.dataList = data;
          console.log(data,'dataList')
        },
        ({msg}) => {
          this.$Message.error(msg);
        }
      );
      this.getUserListByCondition();
      this.getTree();
    }

    created() {
      this.deptObject = {
        deptName: "",
        deptId: "",
        company: ""
      };
      this.modifyUserModel = {
        userName: "",
        realName: "",
        companyName: "",
        status: "",
        phone: ""
      };
      this.manageService.getAllDepartment().subscribe(data => {
        this.deptObject = data[0];
        this.dataList = data;
      });
      this.userListModel = {
        userName: "",
        realName: "",
        status: "",
        deptId: 1
      };
      this.columns1 = [
        {
            align: 'center',
            title: '选择',
            width: 180,
            render: (h, {
              row,
              columns,
              index
            }) => {
            let radioChange=(status) => {
                this.userList.forEach(v=>v.radio=false)
                this.userList[index].radio = status
                this.userList = JSON.parse(JSON.stringify(this.userList))
            };
            return (<i-radio onOn-change={radioChange} value={row.radio}></i-radio>)
            }
          },
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
          key: "userRealname",
        },
        {
          align: "center",
          title: "所属机构",
          editable: true,
          key: "deptName"
        }
      ];

      this.data2 = [
        {
          columnsName: "订单编号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "订单类型"
        },
        {
          columnsName: "产品名称"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "最近合同生成日期"
        }
      ];
    }

    dataPowerModalChange(flag) {
      if (!flag) {
        let _dataPower: any = this.$refs["data-power"];
        _dataPower.resetTree();
      }
    }
    /**
     * 选择并返回
     */
    chooseAndBackPrd(){
        let radioData:any=this.userList.find(v=>v.radio===true)
        if(radioData){
            this.choosecurrentData(radioData)
            this.close()
        }else{
            this.$Message.error("请选择归属业务员！");
        }
    }

    /**
     * 确定数据权限
     */
    confirmDataPower() {
      let _dataPower: any = this.$refs["data-power"];
      _dataPower.allotUserDataPower(this.userId);
    }


    getUserListByCondition() {
      // let deptId =
      this.manageService
        .getUsersByDeptPage(this.userListModel, this.pageService)
        .subscribe(
          data => {
            this.userList = data.filter(x=>{
              return x.userStatus === 0
            });
          },
          ({msg}) => {
            this.$Message.error(msg);
          }
        );
    }

    /**
     * 树change
     */
    onChange(value) {
      this.userListModel.deptId = value.id;
      this.deptLevel = value.deptLevel;
      this.deptObject = value;
      this.addOrgModel = value;
      this.manageService
        .getUsersByDeptPage(this.userListModel, this.pageService)
        .subscribe(
          data => {
            this.userList = data
          },
          ({msg}) => {
            this.$Message.error(msg);
          }
        );
    }

    /**
     * 数据权限
     */
    dataPowerClick(row) {
      this.dataPowerModal = true;
      this.userId = row.id;
      let _dataPower: any = this.$refs["data-power"];
      _dataPower.getAllOrg(this.userId);
    }

    getTree() {
      this.manageService.getAllDepartment().subscribe(
        data => {
          this.deptObject = data[0];
          this.dataList = data;
        },
        ({msg}) => {
          this.$Message.error(msg);
        }
      );
    }


    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true;
    }

    /**
     * 重置搜索
     */
    refreshRoleList() {
      this.userListModel = {
        userName: "",
        realName: "",
        status: "",
        deptId: 1
      };
    }
  }
</script>

<style lang="less">
  .batch-manage-device {
    .ivu-modal-footer {
      display: none;
    }
  }
</style>

<template>
  <section class="page role-maintenance">
    <i-row style="margin-bottom:10px;">
      <span class="form-title">角色维护</span>
      <span style="margin-left:20px;">角色名称：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入角色姓名" v-model="roleModel.roleName"></i-input>
      <span style="margin-left:10px;">状态：</span>
      <i-select style="display:inline-block;width:10%" v-model="roleModel.roleStatus" clearable>
        <i-option label="启用" :value="0" :key="0"></i-option>
        <i-option label="停用" :value="1" :key="1"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;" @click="getRoleListByCondition">搜索</i-button>
      <i-button class="blueButton" style="margin-left:20px;" @click="addNewRole">新增角色</i-button>
    </i-row>
    <data-box :columns="columns1" :data="roleList" @onPageChange="getRoleListByCondition" :page="pageService"></data-box>

    <template>
      <i-modal v-model="modifyRoleModal" title="修改角色" class="modify-role" @on-ok="modifyRoleClick">
        <modify-role :modifyRoleModel="modifyRoleModel" ref="modify-role"></modify-role>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="modulePowerModal" title="模块权限" width="600">
        <module-power :rowId="rowIdFun" ref="module-power"></module-power>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="userListModal" title="用户列表" width="800" class="user-list" @on-visible-change="visibleChange">
        <user-list ref="user-list"></user-list>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="waitHandleCaseModal" title="待办事项配置">
        <wait-handle-case ref="wait-handle" @configData="configData"></wait-handle-case>
        <div slot="footer">
          <i-button type="ghost" @click="waitHandleCaseModal=false">取消</i-button>
          <i-button class="blueButton" @click="submitRole">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="新增角色" v-model="addRoleModal">
        <add-role ref="add-role" @refreshRoleList="refreshRoleList"></add-role>
        <template slot="footer">
          <i-button @click="addRoleCancel">取消</i-button>
          <i-button @click="addRole" class="blueButton">确定</i-button>
        </template>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import ModifyRole from '~/components/system-manage/modify-role.vue';
import UserList from '~/components/system-manage/user-list.vue';
import WaitHandleCase from '~/components/system-manage/wait-handle-case.vue';
import ModulePower from '~/components/system-manage/module-power.vue';
import AddRole from '~/components/system-manage/add-role.vue';

import { Dependencies } from '~/core/decorator';
import { ManageService } from '~/services/manage-service/manage.service';
import { OrderService } from '~/services/business-service/order.service';
import { RoleService } from '~/services/role-service/role.service';
import { BackLogService } from '~/services/manage-service/backLog.service';
import { Layout } from '~/core/decorator';
import { Modal } from 'iview';
import { PageService } from '~/utils/page.service';
import { FilterService } from '~/utils/filter.service';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		ModifyRole,
		UserList,
		WaitHandleCase,
		ModulePower,
		AddRole,
	},
})
export default class RoleMaintenance extends Page {
	@Dependencies(OrderService) private orderService: OrderService;
	@Dependencies(RoleService) private roleService: RoleService;
	@Dependencies(ManageService) private manageService: ManageService;
	@Dependencies(PageService) private pageService: PageService;
	@Dependencies(BackLogService) private backLogService: BackLogService;

	private columns1: any;
	private roleList: Array<Object> = [];
	private searchOptions: Boolean = false;
	private openCreateCompact: Boolean = false;
	private openColumnsConfig: Boolean = false;
	private openCompact: Boolean = false;
	private columns2: any;
	private data2: Array<Object> = [];
	private data3: Array<Object> = [];
	private checkRadio: String = '融资租赁合同';
	private columns3: any;
	private modifyRoleModal: Boolean = false; // 修改角色
	private modulePowerModal: Boolean = false; // 模块权限
	private userListModal: Boolean = false; // 用户列表
	private waitHandleCaseModal: Boolean = false; // 待办事项配置
	private addRoleModal: Boolean = false; // 新增角色
	private roleModel: any;
	private modifyRoleModel: any;
	private roleConfig: Object = {};
	private roleID: Number;
	private rowIdFun: any = '';

	mounted() {
		this.getRoleListByCondition();
	}
	created() {
		this.roleModel = {
			roleName: '',
			roleStatus: '',
		};
		this.modifyRoleModel = {
			roleName: '',
			roleStatus: '',
			roleRemark: '',
		};
		this.columns1 = [
			{
				align: 'center',
				type: 'index',
				width: 60,
				title: '序号',
			},
			{
				title: '操作',
				width: 420,
				align: 'center',
				render: (h, { row, column, index }) => {
					return h('div', [
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								style: {
									color: '#265EA2',
								},
								on: {
									click: () => {
										this.modifyRole(row);
									},
								},
							},
							'修改'
						),
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								style: {
									color: '#265EA2',
								},
								on: {
									click: () => {
										this.deleteRole(row);
									},
								},
							},
							'删除'
						),
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								style: {
									color: '#265EA2',
								},
								on: {
									click: () => {
										this.modulePower(row);
									},
								},
							},
							'模块权限'
						),
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								style: {
									color: '#265EA2',
								},
								on: {
									click: () => {
										this.userList(row);
									},
								},
							},
							'用户列表'
						),
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								style: {
									color: '#265EA2',
								},
								on: {
									click: () => {
										this.waitHandleCaseConfig(row);
									},
								},
							},
							'待办事项配置'
						),
					]);
				},
			},
			{
				align: 'center',
				title: '状态',
				key: 'roleStatus',
				render: (h, { row, columns, index }) => {
					if (row.roleStatus === 0) {
						return h('span', {}, '启用');
					} else if (row.roleStatus === 1) {
						return h('span', {}, '停用');
					}
				},
			},
			{
				align: 'center',
				title: '角色名称',
				key: 'roleName',
			},
			{
				align: 'center',
				title: '备注',
				key: 'roleRemark',
			},
			{
				align: 'center',
				title: '操作人',
				key: 'realName',
			},
			{
				align: 'center',
				title: '创建时间',
				key: 'operateTime',
				width: 160,
				render: (h, { row, columns, index }) => {
					return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'));
				},
			},
		];
		this.columns2 = [
			{
				title: '序号',
				type: 'index',
				width: 80,
				align: 'center',
			},
			{
				title: '列名',
				key: 'columnsName',
				align: 'center',
			},
			{
				type: 'selection',
				width: 80,
				align: 'center',
			},
		];
		this.columns3 = [
			{
				title: '文件名称',
				align: 'center',
				key: 'fileName',
			},
			{
				type: 'selection',
				align: 'center',
				width: 80,
			},
		];
		this.data2 = [
			{
				columnsName: '订单编号',
			},
			{
				columnsName: '订单创建时间',
			},
			{
				columnsName: '订单类型',
			},
			{
				columnsName: '产品名称',
			},
			{
				columnsName: '客户姓名',
			},
			{
				columnsName: '证件号码',
			},
			{
				columnsName: '最近合同生成日期',
			},
		];

		this.data3 = [
			{
				fileName: '融资租赁申请单',
			},
			{
				fileName: '融资租赁合同正文',
			},
			{
				fileName: '合同附件一(付款时间表)',
			},
			{
				fileName: '合同附件二(配偶确认书)',
			},
			{
				fileName: '合同附件三(共同承租人确认书)',
			},
			{
				fileName: '委托收款合同',
			},
			{
				fileName: '首付款明细',
			},
			{
				fileName: '服务确认书',
			},
			{
				fileName: '责任告知书',
			},
			{
				fileName: '车辆交接单',
			},
			{
				fileName: '车辆出库单',
			},
			{
				fileName: '补充协议（减免）',
			},
		];
	}
	addNewRole() {
		this.addRoleModal = true;
	}
	/**
	 * 取消新增
	 */
	addRoleCancel() {
		this.addRoleModal = false;
		let _addRole = <Modal>this.$refs['add-role'];
		_addRole.reset();
	}
	getRoleListByCondition() {
		this.manageService
			.queryRolePage(
				{
					roleName: this.roleModel.roleName,
					roleStatus: this.roleModel.roleStatus,
				},
				this.pageService
			)
			.subscribe(
				data => {
					this.roleList = data;
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
	}
	refreshRoleList() {
		this.getRoleListByCondition();
		this.addRoleModal = false;
	}
	/**
	 * 新增角色弹窗的确定
	 */
	addRole() {
		let _addRole = <Modal>this.$refs['add-role'];
		_addRole.addRole();
	}
	openSearch() {
		this.searchOptions = !this.searchOptions;
	}
	modifyRole(row) {
		this.modifyRoleModal = true;
		this.modifyRoleModel = row;
	}
	deleteRole(row) {
		this.$Modal.confirm({
			title: '提示',
			content: '确定删除此角色吗？',
			onOk: () => {
				this.manageService
					.deleteRole({
						roleId: row.id,
					})
					.subscribe(
						val => {
							this.$Message.success('删除成功！');
							this.getRoleListByCondition();
						},
						({ msg }) => {
							this.$Message.error(msg);
						}
					);
			},
		});
	}
	modifyRoleClick() {
		let modifyRole = <Modal>this.$refs['modify-role'];
		modifyRole.updateRole();
	}
	/**
	 * 点击模块权限 按钮
	 */
	modulePower(row) {
		this.modulePowerModal = true;
		this.rowIdFun = row.id;
		let roleOpen: any = this.$refs['module-power'];
		roleOpen.getTreeDate();
	}
	userList(row) {
		this.userListModal = true;
		let _userList = <Modal>this.$refs['user-list'];
		_userList.getUserListByRole(row.id);
	}
	waitHandleCaseConfig(row) {
		this.waitHandleCaseModal = true;
		let waitHandle: any = this.$refs['wait-handle'];
		waitHandle.getDate();
		this.roleID = row.id;
	}
	visibleChange(val) {
		if (!val) {
			let _userList = <Modal>this.$refs['user-list'];
			_userList.resetFrom();
		}
	}
	/**
	 * 代办事项配置选择/子组件向父组件传
	 */
	configData(data) {
		this.roleConfig = {
			backlogIds: data,
			roleld: this.roleID,
		};
	}
	/**
	 * 代办事项配置确定提交
	 */
	submitRole() {
		this.backLogService.roleAllocateBacklogs(this.roleConfig).subscribe(
			val => {
				this.$Message.success(val.msg);
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
}
</script>

<style lang="less">
.modify-role {
	.ivu-form {
		position: relative;
		right: 16px;
	}
}

.user-list {
	.ivu-modal-footer {
		display: none;
	}
}
</style>

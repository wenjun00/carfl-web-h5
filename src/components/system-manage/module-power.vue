<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <i-tree show-checkbox :data="treeData"></i-tree>
      </i-col>
      <!--表格-->
      <i-col :span="14">
        <span>模块功能</span>
        <data-box :columns="treeColumns" :data="treeDatabox"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import { RoleService } from '~/services/manage-service/role.service';
import { Prop } from 'vue-property-decorator';
import { Dependencies } from '~/core/decorator';
import { RoleResoService } from '~/services/manage-service/role.reso.service';
@Component({
	components: {
		DataBox,
	},
})
export default class ModulePower extends Vue {
	@Dependencies(RoleService) private roleService: RoleService;
	@Dependencies(RoleResoService) private roleResoService: RoleResoService;

	private treeData: Array<Object> = [];
	private treeColumns: any;
	private treeDatabox: Array<Object> = [];
	private allData: Array<any> = [];
	private resoPid: number = 0;
	@Prop() rowId: Object;

	created() {
		this.treeData = [];
		this.getTreeDate();
		this.treeColumns = [
			{
				align: 'center',
				type: 'selection',
				title: '选择',
				width: '60',
			},
			{
				align: 'center',
				key: 'functionName',
				title: '功能名称',
				width: '90',
			},
			{
				align: 'center',
				key: 'desc',
				title: '描述',
			},
		];

		this.treeDatabox = [
			{
				functionName: '查询',
				desc: '基础查询',
			},
			{
				functionName: '一件交接',
				desc: '交接功能',
			},
			{
				functionName: '签约',
				desc: '',
			},
			{
				functionName: '编辑',
				desc: '编辑',
			},
		];
	}

	/**
	 * 获取树接口
	 */
	getTreeDate() {
		this.roleResoService.getAllResource().subscribe(val => {
			console.log(val, 999);
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
				expand: true,
				children: this.getChild(item),
			};
			this.treeData.push(node1);
		});
		this.findRoleResource();
		// console.log(this.treeData, 666);
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
						checked: this.findRoleResource(),
						expand: true,
						children: this.getChild(val), // 迭代产生根
					};
					child.push(node2);
				}
			}
		});
		return child;
	}
	/**
	 * 通过角色id查询资源 (获取该角色已配置过的模块)
	 */
	findRoleResource() {
		this.roleService
			.findResourceByRoleId({
				roleId: this.rowId,
			})
			.subscribe(val => {
				let checkedId: any = val.map(v => v.id);
				let treeId: any = this.allData.map(v => v.id);
				this.allData.forEach(v => {
					checkedId.forEach(checkVal => {
						if (v.id === checkVal) {
							return true;
						} else {
							return false;
						}
					});
				});
			});
	}
}
</script>
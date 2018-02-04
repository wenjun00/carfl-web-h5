<!--修改角色-->
<template>
  <section class="component module-power">
    <i-row>
      <!--树-->
      <i-col :span="10">
        <span>模块名</span>
        <i-tree show-checkbox :data="treeData" @on-select-change="showdesi"></i-tree>
      </i-col>
      <!--表格-->
      <i-col :span="14">
        <span>模块功能</span>
        <data-box :columns="treeColumns" :data="treeDatabox" @on-select="selectFun"></data-box>
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
	private checkBoolen: Boolean = false;
	private checkedId: any = [];
	private treeId: any = [];

	@Prop() rowId: Number;

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
				key: 'resoName',
				title: '功能名称',
				width: '90',
			},
			{
				align: 'center',
				key: 'desc',
				title: '描述',
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
				resoName: item.resoName,
				expand: true,
				children: this.getChild(item),
			};
			this.treeData.push(node1);
		});
		// this.findRoleResource();
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
						checked: false,
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
	 * 点击模块权限节点 显示模块功能
	 */
	showdesi(item) {
		if (item[0].nodeKey === 3) {
			this.treeDatabox = item[0].children;
		} else {
			this.treeDatabox = [];
		}
	}
	selectFun(row) {
		console.log(row, 222);
	}
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
<!--客户素材维护-->
<template>
  <section class="page customer-fodder-maintain">
    <i-row style="margin-top:20px;">
      <span style="font-size:18px;font-weight:bold;margin-left:8px;">客户素材维护</span>
      <i-row>
        <i-col :span="6" style="margin-left:10px;">
          <div style="background:#D8D8D8;width:250px;height:30px;border:1px solid black;line-height:30px;font-size:16px;">
            <span style="position:relative;left:10px;">素材类型</span>
            <div style="float:right;display:inline-block;font-weight:bold">
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;" @click="materialModel=true">
                <svg-icon iconClass="tianjiawenjian"></svg-icon>
              </div>
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;" @click="MaterialTypeModel=true">
                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
              </div>
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;">
                <svg-icon iconClass="sousuo"></svg-icon>
              </div>
            </div>
          </div>
          <div style="width:250px;height:600px;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black">
            <div v-for="item in maintains" :key="item.id" :value="item.name" :class="{'maintainCss':item.id===checkId}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto" @click="checkMaintain(item)">
              <span>{{item.name}}</span>
            </div>
          </div>
        </i-col>
        <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
          <span>素材名称：</span>
          <i-input style="width:10%" v-model="personalModel.name"></i-input>
          <i-button class="blueButton" style="margin-left:10px" @click="search">搜索</i-button>
          <i-button class="blueButton" style="margin-left:10px;position:absolute;right:11px;" @click="materialModel=true">新增素材</i-button>
          <data-box :columns="columns" :data="data1" @onPageChange="search" :page="pageService"></data-box>
        </i-col>
      </i-row>
    </i-row>
    <template>
      <i-modal title="新增素材" v-model="materialModel">
        <add-material @close="closeMaterial" ref="add-material"></add-material>
        <div slot="footer">
          <i-button class="Ghost" @click="materialModel=false">取消</i-button>
          <i-button class="blueButton" @click="newAdd">新增</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="编辑素材" v-model="editMaterialModel">
        <edit-material @close="closeEditMaterial" :propId="editId" ref="edit-material"></edit-material>
        <div slot="footer">
          <i-button class="Ghost" @click="editMaterialModel=false">取消</i-button>
          <i-button class="blueButton" @click="editSure">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="新增素材类型" v-model="MaterialTypeModel">
        <add-material-type @close="closeMaterialType" ref="add-material-type"></add-material-type>
        <div slot="footer">
          <i-button class="Ghost" @click="MaterialTypeModel=false">取消</i-button>
          <i-button class="blueButton" @click="addMatrialTypeSure">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import AddMaterial from '~/components/base-data/add-material.vue';
import EditMaterial from '~/components/base-data/edit-material.vue';
import AddMaterialType from '~/components/base-data/add-material-type.vue';

import { Dependencies } from '~/core/decorator';
import { DataDictService } from '~/services/manage-service/data-dict.service';
import { PersonalMaterialService } from '~/services/manage-service/personal-material.service';
import { PageService } from '~/utils/page.service';
import { Layout } from '~/core/decorator';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		AddMaterial,
		EditMaterial,
		AddMaterialType,
	},
})
export default class CustomerFodderMaintain extends Page {
	@Dependencies(DataDictService) private dataDictService: DataDictService;
	@Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
	@Dependencies(PageService) private pageService: PageService;
	private columns: any;
	private data1: Array<Object> = [];
	private maintains: Array<any> = [];
	private searchOptions: Boolean = false;
	private checkId: number = 0;
	private item: any;
	private personalModel: any;
	private addMaterialInfo: any;
	private materialModel: Boolean = false;
	private editMaterialModel: Boolean = false;
	private MaterialTypeModel: Boolean = false;
	private editId: Number = 0;

	created() {
		this.addMaterialInfo = [
			{
				id: '',
				isNecessary: '',
				type: '',
			},
		];
		this.maintains = [];
		this.item = {
			id: '376',
		};
		this.getCustomerList();
		this.checkMaintain(this.item);
		this.personalModel = {
			type: 0,
			name: '',
		};
		this.columns = [
			{
				title: '序号',
				width: 60,
				type: 'index',
				align: 'center',
			},
			{
				title: '操作',
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
										this.editFun(row);
									},
								},
							},
							'编辑'
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
										this.$Modal.confirm({
											title: '提示',
											content: '您确定要删除吗？',
											onOk: () => {
												this.delectMaintain(row);
											},
										});
									},
								},
							},
							'删除'
						),
					]);
				},
			},
			{
				title: '名称',
				key: 'name',
				align: 'center',
			},
			{
				title: '是否必传',
				key: 'isNecessary',
				align: 'center',
				render: (h, { row, columns, index }) => {
					return h(
						'i-switch',
						{
							on: {
								'on-change': val => {
									console.log(val, 9999);
								},
							},
						},
						[
							h(
								'span',
								{
									props: {
										slot: 'open',
									},
								},
								'是'
							),
							h(
								'span',
								{
									props: {
										slot: 'close',
									},
								},
								'否'
							),
						]
					);
				},
			},
		];
	}
	getOrderInfoByTime() {}
	openSearch() {
		this.searchOptions = !this.searchOptions;
	}
	exportMonthReport() {}

	/**
	 * 获取客户素材列表
	 */
	getCustomerList() {
		this.dataDictService
			.getDataDictByTypeCode({
				typeCode: '0309',
			})
			.subscribe(val => {
				this.maintains = val;
			});
	}
	/**
	 * 分页查询客户素材
	 *
	 */
	checkMaintain(item) {
		this.checkId = item.id;
		this.personalModel = {
			type: this.checkId,
		};
		this.search();
	}
	/**@
	 * 根据条件搜索
	 */
	search() {
		this.personalMaterialService.getAllPersonalMaterial(this.personalModel, this.pageService).subscribe(
			val => {
				this.data1 = val;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	/**
	 * 删除客户素材
	 */
	delectMaintain(row) {
		this.personalMaterialService
			.deletePersonalMaterial({
				id: row.id,
			})
			.subscribe(
				val => {
					this.$Message.success('删除成功！');
					this.checkMaintain(this.item);
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
	}
	/**
	 *新增素材 确定按钮
	 */
	newAdd() {
		let materialOpen: any = this.$refs['add-material'];
		materialOpen.formRules(this.checkId);
	}
	closeMaterial() {
		this.materialModel = false;
		this.checkMaintain(this.item); //刷新
	}
	/**
	 * 编辑素材 确定按钮
	 */
	editFun(row) {
		this.editMaterialModel = true;
		this.editId = row.id;
	}
	editSure() {
		let materialOpen: any = this.$refs['edit-material'];
		materialOpen.formRules(this.checkId);
	}
	closeEditMaterial() {
		this.editMaterialModel = false;
		this.checkMaintain(this.item); //刷新
	}
	/**
	 * 新增素材类型  确定按钮
	 */
	addMatrialTypeSure() {
		let materialOpen: any = this.$refs['add-material-type'];
		materialOpen.formRules();
	}
	closeMaterialType() {
		this.editMaterialModel = false;
		this.getCustomerList(); //刷新
	}
	mounted() {
		this.checkId = 376; //checkId 保存了点击素材类型时的id
	}
}
</script>
<style>
.maintainCss {
	background: #e4f4fa;
}
</style>

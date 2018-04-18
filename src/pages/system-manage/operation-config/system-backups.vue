<!--系统备份-->
<template>
  <section class="page system-backups">
    <i-row class="data-form">
      <div class="form-title">系统备份</div>
      <span >mysql文件名：</span>
      <i-input class="form-input" v-model="systemBackUpModel.mysqlName"></i-input>
      <span>mongodb文件名：</span>
      <i-input class="form-input" v-model="systemBackUpModel.mongdbName"></i-input>
      <span>备份类型：</span>
      <!--<i-input style="display:inline-block;width:10%;" ></i-input>-->
      <i-select v-model="systemBackUpModel.type" class="form-input" clearable>
        <i-option label="自动" :value="0" :key="0"></i-option>
        <i-option label="手动" :value="1" :key="1"></i-option>
      </i-select>
      <span class="title" >备份时间：</span>
      <!--<i-date-picker type="datetimerange" v-model="backupTimeRange" @on-change="changeBackupTime" @on-clear="clearDateTime"></i-date-picker>-->
      <i-date-picker class="form-item"  v-model="systemBackUpModel.startTime"></i-date-picker>~
      <i-date-picker class="form-item"  v-model="systemBackUpModel.endTime"></i-date-picker>
      <i-button class="form-button"  @click="getSystemBackupList">搜索</i-button>
      <i-button class="form-button"  @click="refreshRoleList">重置</i-button>
      <i-button class="form-button"  @click="addNewBackups">新增备份</i-button>
    </i-row>
    <data-box :id="69" :columns="columns1" :data="systemBackUpList" @onPageChange="getSystemBackupList" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { PageService } from '~/utils/page.service';
import { Dependencies } from '~/core/decorator';
import { OrderService } from '~/services/business-service/order.service';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Layout } from '~/core/decorator';
import { ManageService } from '~/services/manage-service/manage.service';
import { FilterService } from '~/utils/filter.service';
// import ColumnsConfig from "~/components/common/columns-config.vue";

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		// ColumnsConfig
	},
})
export default class SystemBackups extends Page {
	@Dependencies() private pageService: PageService;
	@Dependencies(ManageService) private manageService: ManageService;
	private columns1: any;
	private columns2: any;
	private treeColumns: any;
	private systemBackUpList: Array<Object> = [];
	private treeData: Array<Object> = [];
	private treeDatabox: Array<Object> = [];
	private data2: Array<Object> = [];
	private searchOptions: Boolean = false;
	private customName: String = '';
	private openColumnsConfig: Boolean = false;
	private openOneKeyToConnect: Boolean = false;
	private editSysParamsModal: Boolean = false;
	private checkRadio: String = '';
	private systemBackUpModel: any = {
		mysqlName: '',
		mongdbName: '',
		type: '',
		startTime: '',
		endTime: '',
	};
	private backupTimeRange: Array<any> = [];
	mounted() {
		this.getSystemBackupList();
	}
	created() {
		this.columns1 = [
			{
				title: '操作',
				width: 220,
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
										this.recoverData(row);
									},
								},
							},
							'恢复数据'
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
											content: '确定删除吗？',
											onOk: () => {
												this.manageService
													.deleteSystemBackup({
														id: row.id,
													})
													.subscribe(
														val => {
															this.$Message.success('删除成功！');
															this.getSystemBackupList();
														},
														({ msg }) => {
															this.$Message.error(msg);
														}
													);
											},
										});
									},
								},
							},
							'删除备份'
						),
					]);
				},
			},
			{
				title: '操作人',
				key: 'operatorName',
				editable: true,
				align: 'center',
			},
			{
				title: '操作时间',
				key: 'operateTime',
				editable: true,
				align: 'center',
				render: (h, { row, columns, index }) => {
					return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'));
				},
			},
			{
				title: 'mysql文件名',
				key: 'mysqlName',
				editable: true,
				align: 'center',
			},
			{
				title: 'mongodb文件名',
				key: 'mongdbName',
				editable: true,
				align: 'center',
			},
			{
				title: '备份类型',
				key: 'type',
				editable: true,
				align: 'center',
				render: (h, { row, columns, index }) => {
					if (row.type === 0) {
						return h('span', {}, '自动');
					} else if (row.type === 1) {
						return h('span', {}, '手动');
					}
				},
			},
		];
	}
	getSystemBackupList() {
		this.systemBackUpModel.startTime = FilterService.dateFormat(this.systemBackUpModel.startTime, 'yyyy-MM-dd');
		this.systemBackUpModel.endTime = FilterService.dateFormat(this.systemBackUpModel.endTime, 'yyyy-MM-dd');
		this.manageService.querySystemBackupPage(this.systemBackUpModel, this.pageService).subscribe(data => {
			this.systemBackUpList = data;
		});
	}
	addNewBackups() {
		this.manageService.createSystemBackup().subscribe(
			data => {
				this.$Message.success('新增备份成功！');
				this.getSystemBackupList();
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	/**
	 * 列配置
	 */
	columnsConfig() {
		this.openColumnsConfig = true;
		let _columnsConfig: any = this.$refs['columns-config'];
		_columnsConfig.getColumnsData();
	}
	clearDateTime() {
		this.systemBackUpModel.startTime = '';
		this.systemBackUpModel.endTime = '';
	}
	recoverData(row) {
		this.$Message.success('恢复备份成功！');
	}
	/**
	 * 重置搜索
	 */
	refreshRoleList() {
		this.systemBackUpModel = {
			mysqlName: '',
			mongdbName: '',
			type: '',
			startTime: '',
			endTime: '',
		};
	}
}
</script>
<style lang="less" scoped>
  .page.system-backups{
    .data-form{
        .form-input{
          display:inline-block;
          width:10%;
          margin-right:20px
        }
        .title{
          margin-left:20px
        }
        .form-item{
          display:inline-block;
          width:10%
        }
        .form-button{
          margin-left:10px;
          background: #265EA2;
          color: #fff;
        }
    }
  }
</style>

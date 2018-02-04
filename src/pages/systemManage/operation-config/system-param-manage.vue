<!--系统参数管理-->
<template>
  <section class="page system-param-manage">
    <i-row>
      <div class="form-title">系统参数管理</div>
      <span style="margin-left:10px;">参数名称</span>
      <i-input v-model="systemParameterModel.paramName" style="display:inline-block;width:8%;"></i-input>
      <span>是否启用</span>
      <i-select style="width:10%;" v-model="systemParameterModel.paramStatus">
        <i-option label="启用" :value="0" :key="0"></i-option>
        <i-option label="停用" :value="1" :key="1"></i-option>
      </i-select>
      <i-button style="margin-left:10px;" class="blueButton" @click="getSystemParam">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="systemParamsData"></data-box>

    <template>
      <i-modal v-model="editSysParamsModal" title="修改系统参数">
        <modify-system-params :modifySysParamsModel="modifySysParamsModel" ref="modify-sys-param" @close="editSysParamsModal=false"></modify-system-params>
        <div slot="footer">
          <i-button @click="editSysParamsModal=false">取消</i-button>
          <i-button @click="confirmModifySysParams" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
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
import ModifySystemParams from '~/components/system-manage/modify-system-params.vue';
import { SystemParameterService } from '~/services/manage-service/system.parameter.service';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		ModifySystemParams,
	},
})
export default class OrderTransfer extends Page {
	@Dependencies() private pageService: PageService;
	@Dependencies(SystemParameterService) private systemParameterService: SystemParameterService;
	private columns1: any;
	private columns2: any;
	private systemParamsData: Array<Object> = [];
	private customName: String = '';
	private openColumnsConfig: Boolean = false;
	private openOneKeyToConnect: Boolean = false;
	private editSysParamsModal: Boolean = false;
	private systemParameterModel: any;
	private checkRadio: String = '';
	private modifySysParamsModel: any;
	activated() {}
	created() {
		this.getSystemParam();
		this.systemParameterModel = {
			paramName: '',
			paramStatus: '',
		};
		this.modifySysParamsModel = {
			paramCode: '',
			paramName: '',
			paramValue: '',
			paramStatus: '',
		};
		this.columns1 = [
			{
				align: 'center',
				type: 'index',
				title: '序号',
				width: 60,
			},
			{
				title: '操作',
				align: 'center',
				width: 120,
				render: (h, { row, columns, index }) => {
					return h(
						'i-button',
						{
							props: {
								type: 'text',
							},
							on: {
								click: () => {
									this.modifySysParams(row);
								},
							},
							style: {
								color: '#265EA2',
							},
						},
						'修改'
					);
				},
			},
			{
				title: '参数代码',
				key: 'paramCode',
				align: 'center',
			},
			{
				title: '参数名称',
				key: 'paramName',
				align: 'center',
			},
			{
				title: '参数值',
				key: 'paramValue',
				align: 'center',
			},
			{
				title: '是否启用',
				key: 'paramStatus',
				align: 'center',
				render: (h, { row, columns, index }) => {
					if (row.paramStatus === 0) {
						return h('span', {}, '启用');
					} else if (row.paramStatus === 0) {
						return h('span', {}, '停用');
					}
				},
			},
			{
				title: '说明',
				key: 'information',
				align: 'center',
			},
		];
	}
	getOrderInfoByTime() {}
	oneKeyToConnect() {
		this.openOneKeyToConnect = true;
	}
	/**
	 * 列配置
	 */
	columnsConfig() {
		this.openColumnsConfig = true;
	}
	/**
	 * 多选
	 */
	multipleSelect(selection) {}
	/**
	 * 确定
	 */
	modifySysParams(row) {
		this.editSysParamsModal = true;
		this.modifySysParamsModel = row;
	}
	/**
	 * 获取分页查询系统参数
	 */
	getSystemParam() {
		this.systemParameterService
			.querySystemParameterPage(this.systemParameterModel, this.pageService)
			.subscribe(val => {
				this.systemParamsData = val;
			});
	}
	confirmModifySysParams() {
		let _modify: any = this.$refs['modify-sys-param'];
		_modify.confirmModify();
	}
}
</script>

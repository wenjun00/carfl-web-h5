<!--批量管理-->
<template>
  <section class="page system-backups">
    <i-row>
      <div class="form-title">批量管理</div>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span>申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间： 2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" style="text-align:right;">
          <i-button class="highButton" @click="batchManage">批量管理</i-button>
        </i-col>
      </i-row>
    </div>
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

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
	},
})
export default class SystemBackups extends Page {
	@Dependencies() private pageService: PageService;
	@Dependencies(OrderService) private orderService: OrderService;
	private columns1: any;
	private columns2: any;
	private treeColumns: any;
	private data1: Array<Object> = [];
	private treeData: Array<Object> = [];
	private treeDatabox: Array<Object> = [];
	private data2: Array<Object> = [];
	private searchOptions: Boolean = false;
	private customName: String = '';
	private openColumnsConfig: Boolean = false;
	private openOneKeyToConnect: Boolean = false;
	private editSysParamsModal: Boolean = false;

	private checkRadio: String = '';
	created() {
		this.columns1 = [
			{
				align: 'center',
				type: 'index',
				title: '序号',
				width: 60,
			},
			{
				title: '操作',
				width: 220,
				align: 'center',
				render: (h, { row, column, index }) => {
					if (row.status === '暂停') {
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
											this.startUse();
										},
									},
								},
								'启用'
							),
							h(
								'i-button',
								{
									props: {
										type: 'text',
										disabled: true,
									},
									style: {
										// color: "#265EA2"
									},
								},
								'暂停'
							),
						]);
					} else if (row.status === '启用') {
						return h('div', [
							h(
								'i-button',
								{
									props: {
										type: 'text',
										disabled: true,
									},
									style: {
										// color: "#265EA2"
									},
									on: {
										click: () => {},
									},
								},
								'启用'
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
											this.stopUse();
										},
									},
								},
								'暂停'
							),
						]);
					}
				},
			},
			{
				title: '任务名称',
				key: 'missionName',
				align: 'center',
			},
			{
				title: '任务所在组',
				key: 'missionGroup',
				align: 'center',
			},
			{
				title: '任务描述',
				key: 'missionDesc',
				align: 'center',
			},
			{
				title: '任务类名',
				key: 'missionClassName',
				align: 'center',
			},
			{
				title: '触发器名称',
				key: 'triggerName',
				align: 'center',
			},
			{
				title: '触发器所在组',
				key: 'triggerGroup',
				align: 'center',
			},
			{
				title: '下次执行时间',
				key: 'nextExecuteTime',
				align: 'center',
			},
			{
				title: '表达式',
				key: 'expression',
				align: 'center',
			},
			{
				title: '状态',
				key: 'status',
				align: 'center',
			},
			{
				title: '时区',
				key: 'timeZone',
				align: 'center',
			},
		];

		this.data1 = [
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '暂停',
				timeZone: 'Asia/Shanghai',
			},
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '启用',
				timeZone: 'Asia/Shanghai',
			},
		];
	}
	batchManage() {
		this.$Modal.confirm({
			title: '提示',
			content: '确认进行批量管理？',
			onOk: () => {
				this.$Message.info('批量管理成功！');
			},
		});
	}
	/**
	 * 确定
	 */
	confirm() {}
	startUse() {
		this.$Message.info('启用成功');
		this.data1 = [
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '启用',
				timeZone: 'Asia/Shanghai',
			},
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '启用',
				timeZone: 'Asia/Shanghai',
			},
		];
	}
	stopUse() {
		this.$Message.info('暂停成功');
		this.data1 = [
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '启用',
				timeZone: 'Asia/Shanghai',
			},
			{
				missionName: 'OverNightJobName_0001',
				missionGroup: 'OverNightJobGroup',
				missionDesc: '晚间批量',
				missionClassName: 'cn.fintecher.pangolin.business.job.OverNightJob',
				triggerName: 'overNightTriggerName_0001',
				triggerGroup: 'overNightTriggerGroup',
				nextExecuteTime: '2018-01-09 16:48:00',
				expression: '00 48 16 * * ?',
				status: '暂停',
				timeZone: 'Asia/Shanghai',
			},
		];
	}
}
</script>

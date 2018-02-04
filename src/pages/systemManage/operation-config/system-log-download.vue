<!--系统日志下载-->
<template>
  <section class="page system-log-download">
    <span class="form-title">系统日志下载</span>
    <i-row style="margin:6px;">
      <span style="margin-left:10px;">用户姓名：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.realName"></i-input>
      <span style="margin-left:10px;">用户端IP：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.clientIp"></i-input>
      <span style="margin-left:10px;">执行参数：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.exeParams"></i-input>
      <span style="margin-left:10px;">执行类型：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.exeType"></i-input>
      <span style="margin-left:10px;">执行时间：</span>
      <i-input style="display:inline-block;width:10%;" v-model="systemLogModel.exeTime"></i-input>
      <i-button class="blueButton" style="margin-left:10px;" @click="search">搜索</i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="xiazai"></svg-icon>
          <span style="font-size: 12px;">下载</span>
        </div>
      </div>
    </i-row>
    <data-box :columns="columns1" :data="systemLogsList"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="changeStatusOpen" title="状态变更" width="300">
        <i-select placeholder="请选择状态">
          <i-option label="已删除" value="已删除" key="已删除"></i-option>
          <i-option label="待提交" value="待提交" key="待提交"></i-option>
          <i-option label="待面审" value="待面审" key="待面审"></i-option>
          <i-option label="待复审" value="待复审" key="待复审"></i-option>
          <i-option label="待终审" value="待终审" key="待终审"></i-option>
          <i-option label="待合规" value="待合规" key="待合规"></i-option>
        </i-select>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Dependencies } from '~/core/decorator';
import { Layout } from '~/core/decorator';
import { ManageService } from '~/services/manage-service/manage.service';
import { PageService } from '~/utils/page.service';
import { FilterService } from '~/utils/filter.service';
@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
	},
})
export default class SystemLogDownload extends Page {
	@Dependencies(ManageService) private manageService: ManageService;
	@Dependencies(PageService) private pageService: PageService;

	private changeStatusOpen: Boolean = false;
	private columns1: any;
	private systemLogsList: Array<Object> = [];
	private openColumnsConfig: Boolean = false;
	private columns2: any;
	private data2: Array<Object>;
	private test: String = '';
	private systemLogModel: any;

	created() {
		this.systemLogModel = {
			clientIp: '',
			exeType: '',
			exeTime: '',
		};
		this.search();

		this.columns1 = [
			{
				align: 'center',
				type: 'index',
				width: 60,
				renderHeader: (h, { column, index }) => {
					return h(
						'div',
						{
							on: {
								click: () => {
									this.columnsConfig();
								},
							},
							style: {
								cursor: 'pointer',
							},
						},
						[
							h('Icon', {
								props: {
									type: 'gear-b',
									size: '20',
								},
							}),
						]
					);
				},
			},
			{
				title: '操作时间',
				key: 'operateTime',
				align: 'center',
				width: 160,
				render: (h, { row, columns, index }) => {
					return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'));
				},
			},
			{
				title: '操作人',
				key: 'realName',
				align: 'center',
			},
			{
				title: '客户端IP',
				key: 'clientIp',
				align: 'center',
			},
			{
				title: '执行参数',
				key: 'exeParams',
				align: 'center',
			},
			{
				title: '备注',
				key: 'logRemark',
				align: 'center',
			},
			{
				title: '请求执行时长（秒）',
				key: 'exeTime',
				align: 'center',
			},
			{
				title: '执行类型',
				key: 'exeType',
				align: 'center',
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

		this.data2 = [
			{
				columnsName: '操作时间',
			},
			{
				columnsName: '操作人',
			},
			{
				columnsName: '客户端IP',
			},
			{
				columnsName: '请求执行时长（秒）',
			},
			{
				columnsName: '描述',
			},
			{
				columnsName: '执行方法',
			},
		];
	}
	search() {
		this.manageService.querySystemLogsPage(this.systemLogModel, this.pageService).subscribe(val => {
			this.systemLogsList = val;
		});
	}
	/**
	 * 列配置
	 */
	columnsConfig() {
		this.openColumnsConfig = true;
	}
	/**
	 * 更改状态
	 */
	changeStatus(row) {
		this.changeStatusOpen = true;
	}
}
</script>

<style lang="less" scope>

</style>

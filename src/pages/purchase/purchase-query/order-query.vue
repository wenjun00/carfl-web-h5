<!--订单查询-->
<template>
  <section class="page order-query">
    <i-row>
      <span class="form-title">订单查询</span>
      <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
      <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
      <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
      <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
      <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
      <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
      <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
      <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">收起</span>
        <span>高级搜索</span>
      </i-button>
    </i-row>
    <i-row v-if="searchOptions" style="margin-top:6px;position:relative;right:10px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询" v-model="approvalModel.orderInfo"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.startTime"></i-date-picker>~
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.endTime"></i-date-picker>
      <i-button style="margin-left:10px" class="blueButton" @click="getOrderQuery">搜索</i-button>
    </i-row>
    <i-row style="margin-top:20px">
      <data-box :columns="queryColumns" :data="queryData" @onPageChange="getOrderQuery" :page="pageService"></data-box>
    </i-row>
    <!--列配置-->
    <template>
      <i-modal v-model="columnsManage" title="列配置">
        <i-table :columns="columns2" :data="data2" border stripe></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="modal2" width="360" title="编辑订单">
        <div style="text-align:center;margin: 10px">
          融资租赁申请中有您未保存的内容，建议先保存在做编辑，是否继续编辑？
        </div>
        <div slot="footer" style="text-align:center;">
          <i-button class="blueButton" @click="confirm">确定</i-button>
          <i-button @click="cancel">取消</i-button>
        </div>
      </i-modal>
    </template>
    <!--客户chaxun-->
    <template>
      <i-modal v-model="openCustomerInformation" title="客户查询" width="600">
        <customer-query :row="customerInformation"></customer-query>
      </i-modal>
    </template>

    <!--进度查询-->
    <template>
      <i-modal v-model="orderProgressModal" title="审核进度" width="1000">
        <order-progress></order-progress>
        <div slot="footer"></div>
      </i-modal>
    </template>

    <!--订单详情-->
    <template>
      <i-modal v-model="purchaseInfoModal" title="订单详情" width="1000" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import DataBox from '~/components/common/data-box.vue';
import Page from '~/core/page';
import Component from 'vue-class-component';
import OrderProgress from '~/components/purchase-manage/order-progress.vue';
import CustomerQuery from '~/components/purchase-manage/customer-query.vue';
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue';
import PurchaseInformationTotal from '~/components/purchase-manage/purchase-information-total.vue';

import { DataGrid, DataGridItem } from 'vue-fintech-component';

import { Dependencies } from '~/core/decorator';
import { ProductOrderService } from '~/services/manage-service/product-order.service';
import { PersonalService } from '~/services/manage-service/personal.service';
import { PageService } from '~/utils/page.service';
import { Layout } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';
import { Mutation } from 'vuex-class';
@Layout('workspace')
@Component({
	components: {
		OrderProgress,
		PurchaseInformation,
		DataBox,
		DataGrid,
		DataGridItem,
		CustomerQuery,
	},
})
export default class OrderQuery extends Page {
	@Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
	@Dependencies(PersonalService) private personalService: PersonalService;
	@Dependencies(PageService) private pageService: PageService;
	private queryColumns: any;
	@Mutation openPage;
	private columns2: any;
	private customerInformation: Array<Object> = [];
	private queryData: Array<Object> = [];
	private data2: Array<Object> = [];
	private searchOptions: Boolean = false;
	private customName: String = '';
	private loading: Boolean = false;
	private openCreateCompact: Boolean = false;
	private columnsManage: Boolean = false;
	private modal2: Boolean = false;
	private openCustomerInformation: Boolean = false;
	private orderProgressModal: Boolean = false;
	private purchaseInfoModal: Boolean = false;
	private orderInfo: any;
	private startTime: any;
	private endTime: any;
	private approvalModel: any = {
		timeSearch: '',
		orderInfo: '',
		startTime: '',
		endTime: '',
	};
	confirm() {
		this.modal2 = false;
		this.openPage({
			title: '融资租赁申请',
			path: 'purchase/purchase-manage/financing-lease-apply',
		});
	}
	cancel() {
		this.modal2 = false;
	}
	created() {
		this.getOrderQuery();
		this.queryColumns = [
			{
				title: '操作',
				width: 220,
				align: 'center',
				fixed: 'left',
				render: (h, params) => {
					if (params.row.link === '待命') {
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
											this.modal2 = true;
										},
									},
								},
								'编辑订单'
							),
						]);
					} else {
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
											this.$Modal.confirm({
												title: '提示',
												content: '确认申请收款吗？',
												onOk: () => {
													this.openPage({
														title: '销售收款申请',
														path: 'purchase/finance-account/sale-gathering-apply',
													});
												},
											});
										},
									},
								},
								'申请收款'
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
											this.orderProgressModal = true;
										},
									},
								},
								'进度查询'
							),
						]);
					}
				},
			},
			{
				title: '销售单号',
				align: 'center',
				width: 180,
				render: (h, params) => {
					return h('div', [
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								on: {
									click: () => {
										if (params.row.orderType === '全额') {
											this.$Modal.info({
												width: 800,
												closable: true,
												// scrollable:true,
												render: h => h(PurchaseInformationTotal),
											});
										} else {
											this.purchaseInfoModal = true;
										}
									},
								},
							},
							params.row.orderId
						),
					]);
				},
			},
			{
				align: 'center',
				title: '订单创建时间',
				key: 'createTime',
				width: 180,
				render: (h, { row, column, index }) => {
					return h('span', FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss'));
				},
			},
			{
				align: 'center',
				title: '客户',
				width: 140,
				render: (h, params) => {
					return h('div', [
						h(
							'i-button',
							{
								props: {
									type: 'text',
								},
								on: {
									click: () => {
										this.openCustomerInformation = true;
										this.personalService
											.getPersonalMessage({
												personalId: params.row.personalId,
											})
											.subscribe(
												val => {
													this.customerInformation = val;
												},
												({ msg }) => {
													this.$Message.error(msg);
												}
											);
									},
								},
							},
							params.row.personalName
						),
					]);
				},
			},
			{
				align: 'center',
				title: '订单类型',
				width: 100,
				key: 'orderType',
			},
			{
				align: 'center',
				width: 180,
				title: '产品名称',
				key: 'productName',
			},
			{
				align: 'center',
				title: '产品期数',
				key: 'periods',
				width: 180,
			},
			{
				align: 'center',
				title: '利率(月)',
				key: 'productRate',
				width: 180,
			},
			{
				align: 'center',
				title: '还款方式',
				key: 'payWay',
				width: 180,
			},
			{
				align: 'center',
				title: '融资总额',
				key: 'financingAmount',
				width: 180,
			},
			{
				align: 'center',
				title: '环节',
				key: 'orderLink',
				width: 180,
			},
			{
				align: 'center',
				title: '订单状态',
				key: 'orderStatus',
				width: 180,
			},
		];
		/**@argument列配置 */
		this.columns2 = [
			{
				title: '序号',
				type: 'index',
				width: '80',
				align: 'center',
			},
			{
				title: '列名',
				key: 'columnsName',
				align: 'center',
			},
			{
				type: 'selection',
				width: '80',
				align: 'center',
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
	}
	getOrderQuery() {
		this.approvalModel.startTime = FilterService.dateFormat(this.approvalModel.startTime, 'yyyy-MM-dd');
		this.approvalModel.endTime = FilterService.dateFormat(this.approvalModel.endTime, 'yyyy-MM-dd');
		this.productOrderService.orderSearch(this.approvalModel, this.pageService).subscribe(
			val => {
				this.queryData = val;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	getTimeSearch(val) {
		this.approvalModel.startTime = '';
		this.approvalModel.endTime = '';
		this.approvalModel.timeSearch = val;
		this.getOrderQuery();
		this.approvalModel.timeSearch = '';
	}
	openSearch() {
		this.searchOptions = !this.searchOptions;
	}
	oneKeyToConnect() {}
	changeLoading() {
		this.loading = !this.loading;
	}
}
</script>

<style lang="less">
.order-query td {
	padding: 10px;
}
</style>

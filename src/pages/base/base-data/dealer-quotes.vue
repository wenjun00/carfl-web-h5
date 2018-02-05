<template>
  <section class="page">
    <div style="margin-top:10px;display: flex;align-items: baseline;justify-content: space-between;">
      <div style="margin-top:10px;display: flex;align-items: baseline;">
        <span style="font-size:18px;font-weight:bold;margin-right:5px;">经销商报价</span>
        <i-input style="width:14%" placeholder="请输入产品包名称" v-model="busModal.productPackageName"></i-input>
        <span style="margin-left:20px;margin-right:5px;">品牌</span>
        <i-input style="width:12%" placeholder="请输入品牌" v-model="busModal.carBrandName"></i-input>
        <span style="margin-left:20px;margin-right:5px;">系列</span>
        <i-input style="width:12%" placeholder="请输入系列" v-model="busModal.carSeriesName"></i-input>
        <span style="margin-left:20px;margin-right:5px;">型号</span>
        <i-input style="width:12%" placeholder="请输入型号" v-model="busModal.carName"></i-input>
        <i-button class="blueButton" style="margin-left:10px;" @click="seachBusiness">搜索</i-button>
      </div>
      <div>
        <i-button type="text" style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" disabled>
          <svg-icon iconClass="daoru" style="font-size:16px;"></svg-icon>
          <span style="font-size:14px;">导入</span>
        </i-button>
        <i-button type="text" style="font-size:14px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" disabled>
          <svg-icon iconClass="xiazai"></svg-icon>
          <span>模版下载</span>
        </i-button>
      </div>
    </div>
    <data-box :columns="columns" :data="carList" @onPageChange="seachBusiness" :page="pageService"></data-box>
    <template>
      <i-modal v-model="editModal" title="编辑" width="600" class="editclass" :mask-closable="false">
        <edit-car :carFormItem="carformitem" @seachBusiness="seachBusiness" @close="editModal=false" ref="edit-car"></edit-car>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="addquoteModel" title="新增报价">
        <new-quote ref="new-quote" @close="addquoteModel=false"></new-quote>
        <div slot="footer">
          <i-button class="Ghost" @click="addquoteModel=false">取消</i-button>
          <i-button class="blueButton" @click="submitQuote">确定</i-button>
        </div>
      </i-modal>
    </template>
    <div class="bottom_addPrice">
      <i-button class="blueButton" @click="addquoteFun">新增报价</i-button>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '~/core/page';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import EditCar from '~/components/base-data/edit-car.vue';
import NewQuote from '~/components/base-data/new-quote.vue';

import { Dependencies } from '~/core/decorator';
import { CarQuotationService } from '~/services/manage-service/carQuotation.service';
import { PageService } from '~/utils/page.service';

@Component({
	components: {
		DataBox,
		SvgIcon,
		EditCar,
		NewQuote,
	},
})
export default class AddPeriods extends Vue {
	@Dependencies(CarQuotationService) private carQuotationService: CarQuotationService;
	@Dependencies(PageService) private pageService: PageService;
	private columns: any;
	private status: Number = 0;
	private carList: Array<Object> = [];
	private busModal: Object = {};
	private editModal: Boolean = false;
	private carInfo: any = {};
	private carformitem: any = {};
	private addquoteModel: Boolean = false;

	created() {
		this.busModal = {
			productPackageName: '',
			carBrandName: '',
			carSeriesName: '',
			carName: '',
		};
		this.carInfo = {
			id: '',
			productPackageName: '',
			carBrandId: '',
			carSeriesId: '',
			carName: '',
			carRemark: '',
			marketGuidingPrice: '',
			dealerGuidingPrice: '',
			firstPayment: '',
			financeAmount: '',
			periods: '',
			monthPay: '',
			purchaseTaxMoney: '',
			roadBridgeFee: '',
			annualAmount: '',
			gpsFee: '',
			otherFee: '',
			status: '',
		};
		this.columns = [
			{
				title: '序号',
				width: 60,
				type: 'index',
				align: 'center',
				fixed: 'left',
			},
			{
				title: '操作',
				align: 'center',
				fixed: 'left',
				width: 250,
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
										if (row.status === 0) {
											this.$Modal.confirm({
												title: '提示',
												content: '您确定停用吗？',
												onOk: () => {
													this.stopCar(row);
												},
											});
										} else if (row.status === 1) {
											this.$Modal.confirm({
												title: '提示',
												content: '您确定启用吗？',
												onOk: () => {
													this.startCar(row);
												},
											});
										}
									},
								},
							},
							row.status === 0 ? '停用' : '启用'
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
										//   this.editCarFun(row);
										this.carformitem = row;
										console.log(this.carformitem);
										this.editModal = true;
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
												this.deleteCar(row);
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
				title: '产品包名称',
				key: 'productPackageName',
				align: 'center',
				fixed: 'left',
				width: 160,
			},
			{
				title: '品牌',
				key: 'carBrandName',
				align: 'center',
				width: 160,
			},
			{
				title: '系列',
				key: 'carSeriesName',
				align: 'center',
				width: 160,
			},
			{
				title: '型号',
				key: 'carName',
				align: 'center',
				width: 160,
			},
			{
				title: '颜色',
				key: 'carColor',
				align: 'center',
				width: 160,
			},
			{
				title: '市场指导价',
				key: 'marketGuidingPrice',
				align: 'center',
				width: 160,
			},
			{
				title: '经销商价格',
				key: 'dealerGuidingPrice',
				align: 'center',
				width: 160,
			},
			{
				title: '首期金额',
				key: 'firstPayment',
				align: 'center',
				width: 160,
			},
			{
				title: '融资金额',
				key: 'financeAmount',
				align: 'center',
				width: 160,
			},
			{
				title: '融资期数',
				key: 'periods',
				align: 'center',
				width: 160,
			},
			{
				title: '租金（月）',
				key: 'monthPay',
				align: 'center',
				width: 160,
			},
			{
				title: '购置税',
				key: 'purchaseTaxMoney',
				align: 'center',
				width: 160,
			},
			{
				title: '路桥费',
				key: 'roadBridgeFee',
				align: 'center',
				width: 160,
			},
			{
				title: '保险费',
				key: 'annualAmount',
				align: 'center',
				width: 160,
			},
			{
				title: 'GPS费',
				key: 'gpsFee',
				align: 'center',
				width: 160,
			},
			{
				title: '其他费用',
				key: 'otherFee',
				align: 'center',
				width: 160,
			},
			{
				title: '状态',
				key: 'status',
				align: 'center',
				width: 90,
				render: (h, { row, column, index }) => {
					if (row.status == '0') {
						return h('span', {}, '已启用');
					} else if (row.status == '1') {
						return h('span', {}, '未启用');
					}
				},
			},
		];
	}
	mounted() {
		this.seachBusiness();
	}
	/**
	 * 查询经销商报价
	 */
	seachBusiness() {
		this.carQuotationService.getCarQuotationByConditionPage(this.busModal, this.pageService).subscribe(
			val => {
				this.carList = val;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	/**
	 * 停用
	 */
	stopCar(row) {
		this.carInfo = {
			id: row.id,
			status: 1,
		};
		this.carQuotationService.updateCarQuotation(this.carInfo).subscribe(val => {
			this.$Message.success('已停用');
			this.seachBusiness();
		});
	}
	/**
	 * 启用 start
	 */
	startCar(row) {
		this.carInfo = {
			id: row.id,
			status: 0,
		};
		this.carQuotationService.updateCarQuotation(this.carInfo).subscribe(val => {
			this.$Message.success('已启用!');
			this.seachBusiness();
		});
	}
	/**@augments
	 *删除
	 */
	deleteCar(row) {
		this.carQuotationService
			.deleteCarQuotation({
				id: row.id,
			})
			.subscribe(
				val => {
					this.$Message.success('删除成功！');
					this.seachBusiness();
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
	}
	/**@augments
	 * 编辑
	 */
	editCarFun(row) {
		this.editModal = true;
		this.carformitem = row;
	}
	/**
	 * 新增报价
	 */
	addquoteFun() {
		this.addquoteModel = true;
	}
	/**
	 * 新增报价确定按钮
	 */
	submitQuote() {
		let openQuote: any = this.$refs['new-quote'];
    openQuote.rulesFun();
    this.seachBusiness();
	}
}
</script>
<style lang="less" scoped>
.editclass {
	.ivu-modal-footer {
		display: none !important;
	}
}
.bottom_addPrice {
	width: 100%;
	height: 80px;
  background: rgb(255,255,255);
  border: 1px solid rgb(221, 221, 221);
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
  justify-content: flex-end;
  align-items:center;
  cursor: pointer;
  .blueButton{
    height:40px;
    margin-right:18px;
  }
}
</style>

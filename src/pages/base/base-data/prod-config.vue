<!--产品配置-->
<template>
  <section class="page prod-config">
    <i-row style="margin-top:20px;">
      <span style="font-size:18px;font-weight:bold;margin-left:8px;">产品配置</span>
      <i-row>
        <i-col style="margin-left:10px;width:260px;float:left;">
          <div style="width:250px;height:30px;border:1px solid #999999;line-height:30px;font-size:16px;">
            <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
            <span style="position:relative;left:5px;">产品类目</span>
            <div style="float:right;display:inline-block;font-weight:bold">
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)" @click="addProductFun">
                <svg-icon iconClass="tianjiawenjian"></svg-icon>
              </div>
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)" @click="addSericeFun">
                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
              </div>
              <!-- <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                <svg-icon iconClass="sousuo"></svg-icon>
              </div> -->
            </div>
          </div>
          <div style="width:250px;height:600px;border-left:1px solid #999999;border-right:1px solid #999999;border-bottom:1px solid #999999;position:relative;bottom:8px;">
            <i-tree :data="treeData" @on-select-change="productNameDetail"></i-tree>
          </div>
        </i-col>
        <i-col :span="18">
          <i-row>
            <i-col :span="12">
              <data-grid :labelWidth="100" labelAlign="left" contentAlign="left;">
                <data-grid-item label="产品名称" :span="12">
                  <span>{{productMessage.name}}</span>
                </data-grid-item>
                <data-grid-item label="产品序号" :span="12">
                  <span>{{productMessage.number}}</span>
                </data-grid-item>
              </data-grid>
            </i-col>
            <i-col :span="12">
              <!-- <span style="margin-left:20px;font-size:14px;">租金渠道选择：</span>
                            <RadioGroup v-model="productMessage.capitaChannels" @on-change="radioSelect">
                                <Radio label="自有资金"></Radio>
                                <Radio label="第三方"></Radio>
                            </RadioGroup> -->
              <i-button class="blueButton" style="margin-left:10px;" @click="customerFodderConfig">{{productMessage.isConfig=0 ? "已配置" : "客户素材配置" }}</i-button>
              <!--<i-button class="blueButton" @click="chargeAgainstOrderConfig">冲抵顺序配置</i-button>-->
            </i-col>
          </i-row>
          <i-row style="margin-top:20px;width:auto;display:flex;flex-wrap:wrap;">
            <div class="addPeriods" @click="addPeriods" v-show="addPeriodsBox">
              <div>
                <i-icon type="plus" style="font-size:50px;"></i-icon>
                <p>添加新增期数</p>
              </div>
            </div>
            <i-col v-for="item in prdConfig" :key="item.productId" style="margin-bottom:10px;felx:1;margin-right:20px;" v-show="productShow">
              <div>
                <div class="boxContainerTitle">
                  <div style="height:48px;display:inline-block;position:relative;bottom:2px;font-size:12px;margin-left:10px;">No.{{item.id}}</div>
                  <div style="position:relative;left:63px;display:inline-block">
                    <span style="font-size:18px;font-weight:bold;">{{item.periods}}</span>
                    <span>月/期</span>
                  </div>
                  <div :class="[item.isPublish===361 ?'pulishCss':'Publish']">
                  </div>
                </div>
                <div class="boxContainerContent">
                  <div class="itemContainer">
                    <span class="itemName">账期类型</span>
                    <!-- item.paymentType="387" ? "固定账期" : "正常账期" -->
                    <span class="item">{{getPaymentType(item)}}</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">产品利率</span>
                    <span class="item">{{item.productRate}} %/月</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">还款方式</span>
                    <span class="item">{{getPayWay(item)}}</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">融资金额</span>
                    <span class="item">{{item.financingAmount}}元</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">首付款</span>
                    <span class="item">{{item.initialPayment}} %</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">保证金</span>
                    <span class="item">{{item.depositCash}}元</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">尾付款</span>
                    <span class="item">{{item.finalCash}}元</span>
                  </div>
                  <div class="itemContainer">
                    <span class="itemName">管理费</span>
                    <span class="item">{{item.manageCost}}元</span>
                  </div>
                  <div v-if="item.isPublish===360" class="itemContainer">
                    <span class="itemName">启用/停用</span>
                    <i-switch class="item" v-model="item.productStatus" size="large" @on-change="switchStatus(item)">
                      <span slot="open">启用</span>
                      <span slot="close">停用</span>

                    </i-switch>
                  </div>
                  <div v-if="item.isPublish===361" class="itemContainer">
                    <span class="itemName">操作</span>
                    <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;" @click="showDetail(item)">
                      <svg-icon iconClass="tianxie" class="item"></svg-icon>
                    </div>
                  </div>
                </div>
                <div v-if="item.isPublish===361" class="PublishContent">
                  <span class="PublishButton" @click="publish(item)">发布</span>
                </div>
                <div v-if="item.isPublish===360" class="PublishContent">
                  <span class="PublishButton" @click="viewButton(item)">查看</span>
                </div>
              </div>
            </i-col>
          </i-row>
        </i-col>
      </i-row>
    </i-row>

    <template>
      <i-modal title="客户素材配置" v-model="customerFodderConfigModal" :width="300">
        <i-tree :data="customerFodderTree" show-checkbox></i-tree>
      </i-modal>
    </template>

    <template>
      <i-modal title="发布" :width="350" v-model="confirmPublishModal" @on-ok="publishNext">
        <span>是否确定发布？</span>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addPeriodsModal" title="新增期数" width="900" class="purchaseInformation">
        <add-periods :pNameTitle="productMessage" ref="add-periods-ref" @close="closeModal"></add-periods>
        <div slot="footer">
          <i-button type="primary" @click="submiteButton">保存并退出</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="editModal" title="编辑期数" width="900" class="purchaseInformation">
        <edit-periods :productDetail="productDetails" :pNameTitle="productMessage" ref="edit-periods" @close="closeEditModal"></edit-periods>
        <div slot="footer">
          <i-button type="primary" @click="editSubmit">保存并退出</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="viewModal" title="查看期数" width="900" class="periods">
        <preview-product :productDetailView="productDetails" :dpNameTitleView="productMessage"></preview-product>
        <div slot="footer">
          <i-button type="primary" @click="viewModal=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="chargeAgainstOrderConfigModal" title="冲抵顺序配置" width="900">
        <charge-against-order></charge-against-order>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addProductModal" title="新增产品">
        <add-product ref="add-product" @close="closeAddProductModal"></add-product>
        <div slot="footer">
          <i-button class="Ghost" @click="addProductModal=false">取消</i-button>
          <i-button class="blueButton" @click="submintAddProduct">确认</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addSericeModal" title="新增产品系列">
        <add-series ref="add-series" @close="closeSericeModal"></add-series>
        <div slot="footer">
          <i-button class="Ghost" @click="addSericeModal=false">取消</i-button>
          <i-button class="blueButton" @click="submitAddSerice">确认</i-button>
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
import AddPeriods from '~/components/base-data/add-periods.vue';
import EditPeriods from '~/components/base-data/edit-product.vue';
import PreviewProduct from '~/components/base-data/preview-product.vue';
import AddProduct from '~/components/base-data/add-product.vue';
import AddSeries from '~/components/base-data/add-series.vue';

import ChargeAgainstOrder from '~/components/base-data/charge-against-order.vue';
import { Dependencies } from '~/core/decorator';
import { DataGrid, DataGridItem } from 'vue-fintech-component';
import { Layout } from '~/core/decorator';
import { ProductService } from '~/services/manage-service/product.service';
import { ProductPlanIssueService } from '~/services/manage-service/product-plan-issue.service';
import { PersonalMaterialService } from '~/services/manage-service/personal-material.service';
import { PageService } from '~/utils/page.service';
import { constants } from 'zlib';
import { Set } from 'core-js/library/web/timers';
import { retry } from 'rxjs/operator/retry';
import { prototype } from 'stream';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		DataGrid,
		DataGridItem,
		AddPeriods,
		ChargeAgainstOrder,
		EditPeriods,
		PreviewProduct,
		AddProduct,
		AddSeries,
	},
})
export default class ProdConfig extends Page {
	@Dependencies(ProductService) private productService: ProductService;
	@Dependencies(ProductPlanIssueService) private productPlanIssueService: ProductPlanIssueService;
	@Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
	@Dependencies(PageService) private pageService: PageService;
	private columns1: any = [];
	private data1: Array<Object> = [];
	private maintains: Array<any> = [];
	private treeData: Array<any> = [];
	private productId: number = 0;
	private prdConfig: Array<any> = [];
	private customerFodderTree: Array<any> = [];
	private searchOptions: Boolean = false;
	private confirmPublishModal: Boolean = false;
	private customerFodderConfigModal: Boolean = false;
	private addPeriodsModal: Boolean = false;
	private checkId: Number = 1;
	private chargeAgainstOrderConfigModal: Boolean = false;
	private allData: Array<any> = [];
	private productShow: Boolean = false;
	private productMessage: any = {};
	private publishItem: any = {};
	private addPeriodsBox: Boolean = false;
	private editModal: Boolean = false;
	private viewModal: Boolean = false;
	private productDetails: Object = {};
	private productDe: Object = {};
	private addProductModal: Boolean = false;
	private addSericeModal: Boolean = false;
	private seriId: Number = -1;
	private parentsId: Number = -1;
	private scopes: any = {};
	private newTree: any = {};
	private parent: any = {};
	private node1: any = {};
	private childs: any = {};

	created() {
		this.treeList();
		this.customerFodderTree = [
			//   {
			//   title: '全选',
			//   expand: true,
			//   children: [{
			//       title: '个人基本资料',
			//       expand: true,
			//       children: [{
			//           title: '身份证',
			//         },
			//         {
			//           title: '户口本',
			//         },
			//         {
			//           title: '结婚证',
			//         },
			//       ],
			//     },
			//     {
			//       title: '资产证明',
			//     },
			//     {
			//       title: '银行流水',
			//     },
			//     {
			//       title: '征信',
			//     },
			//     {
			//       title: '职业证明',
			//     },
			//     {
			//       title: '其他',
			//     },
			//   ],
			// },
		];
		this.prdConfig = [
			{
				productId: '',
				periods: '', // 产品期数
				periodType: '',
				paymentType: '',
				productRate: '',
				payWay: '',
				financingAmount: '',
				initialPayment: '',
				depositCash: '',
				finalCash: '',
				manageCost: '',
				creditProtectDays: '',
				overdueProtectDays: '',
				penaltyRate: '',
				contractBreakRate: '',
				prepaymentRate: '',
				productStatus: '',
				isPublish: '',
				operator: '',
				operatorTime: '',
				id: '',
			},
		];
		this.productMessage = {
			number: '',
			name: '',
			capitaChannels: '',
			seriesId: '',
			type: '',
			status: '',
			isConfig: '',
			operator: '',
			operatorTime: '',
			id: '',
		};
		this.maintains = [
			{
				id: 1,
				name: '个人基本资料',
			},
			{
				id: 2,
				name: '资产证明',
			},
			{
				id: 3,
				name: '银行流水',
			},
			{
				id: 4,
				name: '征信',
			},
			{
				id: 5,
				name: '职业证明',
			},
			{
				id: 6,
				name: '其他',
			},
		];
		this.columns1 = [
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
							},
							'删除'
						),
					]);
				},
			},
			{
				title: '名称',
				key: 'maintainName',
				align: 'center',
			},
			{
				title: '是否上传',
				key: 'isUpload',
				align: 'center',
				render: (h, { row, columns, index }) => {
					return h(
						'RadioGroup',
						{
							props: {
								value: 1,
							},
						},
						[
							h('Radio', {
								props: {
									label: '是',
									value: 1,
								},
							}),
							h('Radio', {
								props: {
									label: '否',
									value: 2,
								},
							}),
						]
					);
				},
			},
		];

		this.data1 = [
			{
				maintainName: '身份证',
			},
		];
	}
	getOrderInfoByTime() {}
	openSearch() {
		this.searchOptions = !this.searchOptions;
	}
	exportMonthReport() {}
	checkMaintain(item) {
		this.checkId = item.id;
	}
	/**
	 * 发布产品
	 */
	publish(item) {
		this.confirmPublishModal = true;
		this.publishItem = item;
		this.publishItem.isPublish = 360;
		if (this.prdConfig[0].productStatus === true) {
			return (this.prdConfig[0].productStatus = 0);
		} else {
			return (this.prdConfig[0].productStatus = 1);
		}
	}
	publishNext() {
		this.productPlanIssueService.publish(this.publishItem).subscribe(
			val => {
				this.$Message.success('发布成功！');
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	chargeAgainstOrderConfig() {
		this.chargeAgainstOrderConfigModal = true;
	}
	/**
	 * 获取树形结构
	 */
	treeList() {
		this.productService.getProductTree().subscribe(val => {
			this.allData = val;
			this.productId = val.productId;
			this.createNewTree(this.allData);
		});
	}
	createNewTree(allData) {
		let root = allData.filter(v => !v.parent);
		this.treeData = [];
		root.forEach(item => {
			let node1 = {
				title: item.name,
				seriesId: item.id,
				flag: item.flag,
				id: item.id,
				expand: true,
				children: this.getChild(item),
			};
			this.treeData.push(node1);
		});
	}
	getChild(item) {
		let child: any = [];
		// 判断子的父id与全部数据的id相等
		this.allData.map(val => {
			if (item.id === val.parent) {
				if (val.flag === '产品') {
					let node2 = {
						title: val.name,
						productId: val.id,
						parentId: val.parent,
						flag: val.flag,
						id: item.id,
						expand: true,
						children: this.getChild(val), // 迭代产生根
					};
					child.push(node2);
				} else if (val.flag === '产品系列') {
					let node2 = {
						title: val.name,
						seriesId: val.id,
						parentId: val.parent,
						flag: val.flag,
						expand: true,
						children: this.getChild(val),
					};
					child.push(node2);
				}
			}
		});
		return child;
	}

	/**
	 *  树change事件 查询产品列表详情
	 */
	productNameDetail(scope) {
		this.seriId = scope[0].seriesId; //保存系列ID
		this.parentsId = scope[0].id; //保存ID
		console.log(scope, 444);
		this.scopes = scope;
		if (scope[0].productId) {
			this.productPlanIssueService
				.getAllProductPlan(
					{
						productId: scope[0].productId,
					},
					this.pageService
				)
				.subscribe(val => {
					this.addPeriodsBox = true;
					if (val.length > 0) {
						this.productShow = true;
						this.prdConfig = val;
						//初始化启用/停用状态
						if (this.prdConfig[0].productStatus === 0) {
							this.prdConfig[0].productStatus = true;
						} else if (this.prdConfig[0].productStatus === 1) {
							this.prdConfig[0].productStatus = false;
						}
						//初始化
						if ((this.productMessage.capitaChannels = 382)) {
							this.productMessage.capitaChannels = '自有资金';
						} else {
							this.productMessage.capitaChannels = '第三方';
						}
					} else {
						this.prdConfig = val;
					}
				});
			this.checkProduct(scope[0].productId);
		}
	}
	/**@
	 * 查询产品名称、序列号、租金渠道
	 */
	checkProduct(scope) {
		this.productService
			.getProductById({
				id: scope,
			})
			.subscribe(val => {
				this.productMessage = val;
			});
	}
	/**
	 * 资金渠道选择
	 */
	radioSelect(scope) {
		scope === '自有资金' ? (this.productMessage.capitaChannels = 382) : (this.productMessage.capitaChannels = 383);
		this.saveProductConfig();
	}
	/**
	 * 保存产品
	 */
	saveProductConfig() {
		this.productService.createOrModifyProduct(this.productMessage).subscribe(
			val => {
				this.$Message.success('数据保存成功！');
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	getPaymentType(item) {
		if (item.paymentType === 387) {
			return '固定账期';
		} else {
			return '正常账期';
		}
	}
	getPayWay(item) {
		if (item.paymentType === 384) {
			return '等本等息';
		} else {
			return '等额本息';
		}
	}
	/**
	 * 停用启用状态
	 */
	switchStatus(item) {
		if (item.productStatus === true) {
			return (item.productStatus = 0);
		} else {
			return (item.productStatus = 1);
		}
	}

	/**
	 * 新增/修改产品计划期数管理
	 */
	addPeriods() {
		this.addPeriodsModal = true;
	}
	/**
	 * 新增提交按钮
	 */
	submiteButton() {
		let periodsModal: any = this.$refs['add-periods-ref'];
		periodsModal.confirmPeriods();
	}
	/**
	 * 关闭弹窗
	 */
	closeModal() {
		this.addPeriodsModal = false;
		this.treeList();
		this.productNameDetail(this.scopes);
	}
	/**
	 * 点击编辑
	 */
	showDetail(item) {
		this.editModal = true;
		this.productDetails = item;
		let openDetails: any = this.$refs['edit-periods'];
		openDetails.moneyFun(item);
	}
	/**
	 * 编辑提交按钮
	 */
	editSubmit() {
		let periodsModal: any = this.$refs['edit-periods'];
		periodsModal.confirmPeriods();
	}
	/**
	 * 编辑关闭弹窗
	 */
	closeEditModal() {
		this.editModal = false;
		this.treeList();
		this.productNameDetail(this.scopes);
	}
	viewButton(item) {
		this.viewModal = true;
		this.productDetails = item;
	}
	/**
	 * 树形结构 新增产品
	 */
	addProductFun() {
		if (this.seriId > -1 && this.seriId !== undefined) {
			this.addProductModal = true;
		} else {
			this.$Message.error('请先选择产品系列');
		}
	}
	/**
	 * 点击新增产品确认按钮
	 */
	submintAddProduct() {
		let openAddProduct: any = this.$refs['add-product'];
		openAddProduct.vaildFun(this.seriId);
	}
	/**
	 * 关闭新增产品窗口
	 */
	closeAddProductModal() {
		this.addProductModal = false;
		this.treeList();
	}

	/**
	 * 树形结构 新增产品系列
	 */
	addSericeFun() {
		console.log(this.scopes, 222);
		if (typeof this.scopes[0].flag === 'undefined' || this.scopes[0].flag !== '产品') {
			this.addSericeModal = true;
		} else {
			this.$Message.error('温馨提示：不能在产品中添加产品系列！');
		}
	}
	/**
	 * 点击新增产品系列确认按钮
	 */
	submitAddSerice() {
		let openAddSerice: any = this.$refs['add-series'];
		openAddSerice.vaildFun(this.seriId);
		console.log(this.parentsId, 1111);
	}
	/**
	 * 关闭新增产品系列窗口
	 */
	closeSericeModal() {
		this.addSericeModal = false;
		this.treeList();
	}
	/**
	 * 客户素材配置
	 */
	customerFodderConfig() {
		this.customerFodderConfigModal = true;
		this.personalMaterialService
			.getAllPersonalMaterialNoPage({
				productId: this.productMessage.id,
			})
			.subscribe(val => {
				this.newTree = val;
				console.log(this.newTree, 9999);
				this.newTree.map(val => {
					let dictData = JSON.parse(localStorage.dictData); //获取所有数字字典项
					let pt = dictData.find(v => v.id === val.type); // 找到字典项对应的父类

					this.childs = {
						title: pt.name,
						expand: true,
						children: [
							{
								title: val.name,
								expand: true,
							},
						],
					};
				});
				this.node1 = {
					title: '全选',
					expand: true,
					children: [this.childs],
				};
				this.customerFodderTree.push(this.node1);
			});
	}
}
</script>
<style lang="less">
.prod-config {
	// height: 100%;
}
.maintainCss {
	background: #e4f4fa;
}

.boxContainerContent {
	width: 300px;
	height: 370px;
	border-left: 1px solid rgb(221, 221, 222);
	border-right: 1px solid rgb(221, 221, 222);
}

.boxContainerContent .itemContainer:first-child {
	padding-top: 35px;
}

.itemContainer {
	margin: 0 15px 15px 15px;
	display: flex;
	justify-content: space-between;
}

.itemName {
	color: #999999;
}

.item {
	margin-left: 20px;
}

.addPeriods {
	width: 300px;
	height: 450px;
	border: 1px solid rgb(221, 221, 222);
	border-radius: 3px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
}

.addPeriods > div {
	display: flex;
	align-items: center;
	flex-direction: column;
	color: rgb(169, 168, 170);
}

.pulishCss {
	background: url('./../../../../static/images/common/no-publish.png') no-repeat;
	width: 90px;
	height: 90px;
	position: relative;
	left: 228px;
	bottom: 39px;
	z-index: 999;
}

.Publish {
	background: url('./../../../../static/images/common/publish.png') no-repeat;
	width: 90px;
	height: 90px;
	position: relative;
	left: 228px;
	bottom: 39px;
	z-index: 999;
}

.PublishContent {
	width: 300px;
	height: 50px;
	border: 1px solid rgb(221, 221, 222);
	background: rgb(245, 245, 245);
	text-align: center;
	cursor: pointer;
	position: relative;
	bottom: 20px;
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

.PublishButton {
	line-height: 50px;
	font-size: 14px;
	color: rgb(104, 138, 188);
}

.boxContainerTitle {
	width: 300px;
	height: 50px;
	border: 1px solid rgb(221, 221, 222);
	border-top: 2px solid rgb(104, 138, 188);
	line-height: 50px;
	background: rgb(245, 245, 245);
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}
.ivu-tree-empty {
	height: 50px;
	line-height: 50px;
	text-indent: 14px;
}

.periods {
	.ivu-modal-body {
		height: 600px !important;
		overflow: auto !important;
	}
}
</style>

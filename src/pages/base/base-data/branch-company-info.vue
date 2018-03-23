<!--分公司信息-->
<template>
  <section class="page branch-company-info">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold;margin-left:10px;">分公司管理</span>
      <span style="margin-left:10px;">关键字搜索：</span>
      <i-input style="width:15%" placeholder="请输入公司名称、户名、开户银行、银行卡号搜索" v-model="companyModel.keyWord"></i-input>
      <i-button class="blueButton" style="margin-left:10px;" @click="seachCompany">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="resetSeach">重置</i-button>
    </i-row>
    <data-box :id="175" :columns="columns" :data="companyList" @onPageChange="seachCompany" :page="pageService"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:0px">
        <i-col :span="24" style="text-align:right;">
          <i-button @click="addNewBranchFirmClick" class="highButton">新增分公司</i-button>
        </i-col>
      </i-row>
    </div>

    <!--修改分公司-->
    <template>
      <i-modal title="修改分公司" v-model="modal" :mask-closable="false">
        <modify-branch-info ref="modify-branch" @close="closeModifyBrach"></modify-branch-info>
        <div slot="footer">
          <i-button @click="modal=false">取消</i-button>
          <i-button class="blueButton" @click="sureButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--新增分公司-->
    <template>
      <i-modal title="新增分公司" v-model="addBranchCompanyModal" :mask-closable="false">
        <add-branch-company ref="add-firm" @close="closeAndRefresh"></add-branch-company>
        <div slot="footer">
          <i-button @click="closeAndRefreshAddFirm">取消</i-button>
          <i-button class="blueButton" @click="confirmAddNewFirm">确定</i-button>
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
import { CompanyService } from '~/services/manage-service/company.service';
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { Layout } from '~/core/decorator';
import ModifyBranchInfo from '~/components/base-data/modify-branch-info.vue';
import AddBranchCompany from '~/components/base-data/add-branch-company.vue';
import { CityService } from '~/utils/city.service';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		ModifyBranchInfo,
		AddBranchCompany,
	},
})
export default class BranchCompanyInfo extends Page {
	@Dependencies(CompanyService) private companyService: CompanyService;
	@Dependencies(PageService) private pageService: PageService;
	private columns: any;
	private data1: Array<Object> = [];
	private searchOptions: Boolean = false;
	private companyModel: any = {};
	private companyList: Array<Object> = [];
	private sasStatus: any;
	private modal: Boolean = false;
	private formItem: any;
	private addBranchCompanyModal: Boolean = false;
	private openColumnsConfig: Boolean = false;

	mounted() {
		this.seachCompany();
	}
	created() {
		this.formItem = {
			id: '',
			companyChinaname: '',
			companyProvince: '',
			companyCity: '',
			bankAccount: '',
			depositBank: '',
			cardNumber: '',
			branchName: '',
			companyAddress: '',
			companyEngname: '',
			companyFax: '',
			companyLegperson: '',
			companyLinkman: '',
			companyPhone: '',
			companyRemark: '',
			companyStatus: '',
		};
		this.columns = [
			{
				title: '操作',
				align: 'center',
				fixed: 'left',
				width: 100,
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
										this.editInformation(row);
									},
								},
							},
							'修改'
						),
					]);
				},
			},
			{
				title: '公司简称',
				key: 'companyChinaname',
				align: 'center',
				fixed: 'left',
				width: 160,
				editable: true,
        ellipsis:true,
			},
			{
				title: '省份',
				key: 'companyProvince',
				align: 'center',
				width: 160,
				editable: true,
				render: (h, { row, column, index }) => {
					return h('span', CityService.getCityName(row.companyProvince));
				},
			},
			{
				title: '城市',
				key: 'companyCity',
				align: 'center',
				width: 160,
				editable: true,
        render: (h, { row, column, index }) => {
          return h("span", CityService.getCityName(row.companyCity));
        }
			},
			{
				title: '户名',
				key: 'bankAccount',
				align: 'center',
				width: 260,
				editable: true,
        ellipsis:true,
			},
			{
				title: '开户银行',
				key: 'depositBank',
				align: 'center',
				width: 260,
				editable: true,
			},
			{
				title: '银行卡号',
				key: 'cardNumber',
				align: 'center',
				width: 260,
				editable: true,
			},
			{
				title: '支行名称',
				key: 'branchName',
				align: 'center',
				width: 260,
				editable: true,
			},
			{
				title: '状态',
				key: 'companyStatus',
				align: 'center',
				width: 90,
				editable: true,
				render: (h, { row, column, index }) => {
					if (row.companyStatus === 0) {
						return h('span', {}, '已启用');
					} else if (row.companyStatus === 1) {
						return h('span', {}, '已停用');
					}
				},
			},
		];

		this.companyModel = {
			keyWord: '',
		};
	}
	closeAndRefresh() {
		this.addBranchCompanyModal = false;
		this.seachCompany();
	}
	addNewBranchFirmClick() {
		this.addBranchCompanyModal = true;
	}
	/**
	 * 取消新增分公司
	 */
	closeAndRefreshAddFirm() {
		this.addBranchCompanyModal = false;
		let _addFirm: any = this.$refs['add-firm'];
		_addFirm.resetForm();
	}
	/**
	 * 列配置
	 */
	columnsConfig() {
		this.openColumnsConfig = true;
	}
	/**
	 * 确定新增分公司
	 */
	confirmAddNewFirm() {
		let _addFirm: any = this.$refs['add-firm'];
		_addFirm.confirmAddCompany();
	}
	getOrderInfoByTime() {}
	openSearch() {
		this.searchOptions = !this.searchOptions;
	}
	exportMonthReport() {}
	/**
	 * 查询分公司信息
	 */
	seachCompany() {
		this.companyService.getAllCompanyWithPage(this.companyModel, this.pageService).subscribe(
			val => {
				this.companyList = val;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	/**
	 * 停用/启用
	 */
	startAndStop(row) {
		this.sasStatus = {
			id: row.id,
			status: row.companyStatus === 0 ? 1 : 0,
		};
		this.companyService.disableOrEnable(this.sasStatus).subscribe(val => {
			this.$Message.success(row.companyStatus === 0 ? '停用成功！' : '启用成功！');
			this.seachCompany();
		});
	}
	/**
	 * 修改信息 传递参数
	 */
	editInformation(row) {
		this.modal = true;
		let _modifyBranchCompany: any = this.$refs['modify-branch'];
		_modifyBranchCompany.makeData(row);
	}
	/**
	 * 修改信息 并提交数据
	 */
	sureButton(formItem) {
		let _modifyBranch: any = this.$refs['modify-branch'];
		_modifyBranch.confirmModify();
		this.seachCompany();
	}
	closeModifyBrach() {
		this.modal = false;
		this.seachCompany();
	}
	/**
	 * 重置搜索
	 */
	resetSeach() {
		this.companyModel = {
			keyWord: '',
		};
	}
}
</script>

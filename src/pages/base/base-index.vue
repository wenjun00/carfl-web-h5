<template>
  <section class="base-index">
    <!--#EFF3F5-->
    <div style="width:96%;height:60px;background:#F5F5F5;margin-top:10px;border:1px solid #DDDDDD;margin:0 auto">
      <div style="font-size:14px;margin-top: 18px;margin-left: 57px;">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu" style="font-size:16px;"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in base" :key="item.index">
      <div class="purchaseContainer">
        <div class="iconContainer" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" style="color:#fff;font-size:50px;position:relative;left:6px;top:4px"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="verticalLine"></div>
        <div v-for="val in item.pageList" :key="val.pageName" style="margin-left:100px;">
          <div class="pageList_pageName" @click="redirectToPage(val)">{{val.pageName}}</div>
          <div @click="val.isAttention=!val.isAttention" style="display:inline-block;cursor:pointer">
            <svg-icon iconClass="yiguanzhu" style="font-size:16px;color:#F8B551" v-show="val.isAttention"></svg-icon>
            <svg-icon iconClass="weiguanzhu" style="font-size:16px;" v-show="!val.isAttention"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Mutation } from 'vuex-class';
@Component({
	components: {
		SvgIcon,
	},
})
export default class BaseIndex extends Vue {
	private base: Array<Object> = [];
	@Mutation('openPage') openPage;
	redirectToPage(val) {
		this.openPage({
			title: val.pageName,
			path: val.path,
		});
	}
	created() {
		this.base = [
			{
				index: 1,
				color: '#598AC5',
				iconName: '基础数据',
				icon: 'jichushuju',
				pageList: [
					{
						pageName: '产品包管理',
						isAttention: true,
						path: 'base/base-data/prod-package-info',
					},
					{
						pageName: '车辆维护',
						isAttention: true,
						path: 'base/base-data/vehicle-maintenance',
					},
					{
						pageName: '数据字典',
						isAttention: false,
						path: 'base/base-data/data-dict',
					},
					{
						pageName: '审批原因管理',
						isAttention: false,
						path: 'base/base-data/approval-reason-manage',
					},
					{
						pageName: '分公司信息',
						isAttention: false,
						path: 'base/base-data/branch-company-info',
					},
				],
			},
			{
				index: 2,
				color: '#36B48C',
				iconName: '配置管理',
				icon: 'peizhiguanli',
				pageList: [
					{
						pageName: '产品配置',
						isAttention: false,
						path: 'base/base-data/prod-config',
					},
					{
						pageName: '客户素材维护',
						isAttention: false,
						path: 'base/base-data/customer-fodder-maintain',
					},
					{
						pageName: '经销商报价',
						isAttention: false,
						path: 'base/base-data/dealer-quotes',
					},
          {
            pageName: '导出模版管理',
            isAttention: false,
            path: 'base/base-data/export-template-manage',
          },
				],
			},
		];
	}
}
</script>

<style lang="less">
.purchaseContainer {
	width: 96%;
	height: 130px;
	background: #fff;
	margin: 30px auto;
	border: 1px solid #dddddd;
	display: flex;
	align-items: center;
}

.iconContainer {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-left: 60px;
}

.verticalLine {
	width: 1px;
	height: 78px;
	background-color: #dddddd;
	position: relative;
	left: 60px;
}

.iconName {
	font-size: 18px;
	margin-left: 10px;
}

.pageList_pageName {
	font-size: 14px;
	display: inline-block;
}

.pageList_pageName:hover {
	font-size: 14px;
	color: #265ea2;
	cursor: pointer;
}

.base-index {
	height: 846px;
}
</style>

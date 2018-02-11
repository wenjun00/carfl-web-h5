<template>
  <section class="page prod-config">
    <span class="form-title">车辆维护</span>
    <i-row>
      <i-col :span="4" style="border:1px solid #dddddd;padding:20px 0;height:590px;">
        <!--<div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>-->
        <i-row style="border-bottom:1px solid #dddddd;position:relative;bottom:10px;">
          <span style="position:relative;left:5px;">车辆品牌</span>
          <div style="float:right;display:inline-block;font-weight:bold;position:relative;bottom:6px;overflow:auto;">
            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)" @click="addVehicle">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </div>
            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
              <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
            </div>
          </div>
        </i-row>
        <div style="height: 540px;overflow: auto;">
          <i-tree :data="treeData" style="padding:10px;" @on-select-change="cartreeChange"></i-tree>
        </div>
      </i-col>
      <i-col :span="19" style="margin-left:15px;">
        <div>型号名称：2016款 15N 手动进取型</div>
        <i-row type="flex" justify="space-between" style="margin:15px 0;">
          <i-col>
            <span>可选颜色：</span>
            <RadioGroup>
              <Radio label="金斑蝶"></Radio>
              <Radio label="爪哇犀牛"></Radio>
              <Radio label="印度黑羚"></Radio>
            </RadioGroup>
          </i-col>
          <i-button class="blueButton">编辑参数</i-button>
        </i-row>
        <div>型号参数</div>
        <i-row justify="space-between" type="flex">
          <i-col class="parms_container">
            <div>基本参数</div>
            <div>发动机</div>
            <div>变速箱</div>
            <div>车身</div>
            <div>安装装备</div>
            <div>内容配置</div>
            <i-button class="blueButton">+ 添加类别</i-button>
          </i-col>
          <i-col :span="22">
            <i-table v-if="viewStatus" stripe :columns="carColumns" :page="pageService"></i-table>
            <i-form class="table_container" ref="parms=form" :molel="parmsForm" :rules="parmsRules" v-else>
              <i-row type="flex">
                <i-col :span="12">参数名称</i-col>
                <i-col :span="12">参数值</i-col>
              </i-row>
              <i-row>
                <i-col :span="12">
                  <i-form-item>
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item>
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <template>
      <i-modal v-model="addVehicleModal" title="新增车辆">
        <add-vehicle ref="add-vehicle" @close="closeAndRefreshVehicle"></add-vehicle>
        <div slot="footer">
          <i-button @click="cancleAddVehicle">取消</i-button>
          <i-button class="blueButton" @click="confirmAddVehicle">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
import Page from '~/core/page';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Layout } from '~/core/decorator';
import SvgIcon from '~/components/common/svg-icon.vue';
import { PageService } from '~/utils/page.service';
import { CarService } from '~/services/manage-service/car.service';
@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
	},
})
export default class ProdConfig extends Page {
	@Dependencies(CarService) private carService: CarService;
	@Dependencies(PageService) private pageService: PageService;
	private treeData: Array<any> = [];
	private dataList: any = [];
	private treeId: any;
	private carDataModel: Array<any> = [];
	private carColumns: Array<any> = [];
	private carParam: String = '';
	private editmessage: any = {};
	private editModal: Boolean = false;
	private addVehicleModal: Boolean = false; // 添加车辆
	private checkData: any;
	private treeDatas: any = [];
	private viewStatus: Boolean = false;
	/**
	 * 客户素材配置
	 */

	created() {
		this.getCarseries();
		this.carColumns = [
			{
				title: '参数名称',
				key: 'brandName',
				align: 'center',
			},
			{
				title: '参数值',
				key: 'modelName',
				align: 'center',
			},
		];
	}
	/**
	 * 添加车辆
	 */
	addVehicle() {
		this.addVehicleModal = true;
		let _addVehicle: any = this.$refs['add-vehicle'];
		_addVehicle.getAllBrand();
	}
	/**
	 * 根据车系列树获取车列表
	 */
	cartreeChange(data) {
		this.checkData = data;
		if (data[0].seriesId) {
			this.treeId = data[0].seriesId;
		}
		if (data[0].brandId) {
			this.treeId = data[0].brandId;
		}
		if (data[0].carId) {
			this.treeId = data[0].carId;
		}
		this.carService
			.findAllCarBySeries({
				seriesId: this.treeId,
			})
			.subscribe(
				data => {
					this.carDataModel = data;
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
	}
	/**
	 * 获取所有车辆系列
	 */
	getCarseries() {
		this.carService.findAllCarSeries().subscribe(
			data => {
				this.dataList = data;
				this.getTreeDate();
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	/**
	 * 车系列树遍历
	 */
	getTreeDate() {
		let series: Map<string, any> = new Map();
		this.dataList.map(t => {
			if (t.id) {
				series.set(t.id, t);
			}
		});
		this.treeDatas = [];
		series.forEach(item => {
			let lv1Node = {
				title: item.brandName,
				seriesId: item.id,
				expand: true,
				children: item.series.map(v => {
					return {
						title: v.seriesName,
						brandId: v.id,
						expand: true,
						children: v.cars.map(m => {
							return {
								title: m.modelName,
								carId: m.id,
							};
						}),
					};
				}),
			};
			this.treeDatas.push(lv1Node);
		});
		this.treeData = [
			{
				title: '所有品牌',
				expand: true,
				children: this.treeDatas,
			},
		];
	} /**
	 * 取消新增车辆
	 */
	cancleAddVehicle() {
		this.addVehicleModal = false;
		let _addVehicle: any = this.$refs['add-vehicle'];
		_addVehicle.reset();
	} /**
	 * 确定新增车辆
	 */
	confirmAddVehicle() {
		let _addVehicle: any = this.$refs['add-vehicle'];
		_addVehicle.addVehicle();
	}
	closeAndRefreshVehicle() {
		this.getCarseries();
		this.addVehicleModal = false;
	}
}
</script>
<style lang="less" scoped>
.parms_container {
	width: 48px;
	div {
		padding: 8px 0;
		text-align: center;
		color: rgb(212, 211, 211);
	}
}
.avtive {
	color: #000;
}
.table_container {
	text-align-last: center;
	border: 1px solid #dddd;
}
</style>


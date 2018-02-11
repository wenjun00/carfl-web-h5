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
            <RadioGroup v-for="item in colorPa" :key="item.id" v-model="colorModel">
              <Radio :label="item.name" disabled></Radio>
            </RadioGroup>
          </i-col>
          <i-button class="blueButton" @click="editParam">编辑参数</i-button>
        </i-row>
        <i-row>型号参数</i-row>
        <div v-if="!dataLength" class="empty_text">空空如也，请选择车辆^_^</div>
        <i-row justify="space-between" type="flex" v-if="dataLength">
          <i-col class="parms_container">
            <div v-for="item in carTypes" :key="item.id" @click="paramDetail(item)">{{item.paramName}}</div>
            <span class="textButton">+ 添加类别</span>
          </i-col>
          <i-col :span="22">
            <i-table v-if="viewStatus" stripe :columns="carColumns" :data="paramList"></i-table>
            <i-form class="table_container" ref="parms=form" v-else>
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
          <span class="blueButton" @click="confirmAddVehicle">确定</span>
        </div>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
import Page from '~/core/page';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import AddVehicle from '~/components/base-data/add-vehicle.vue';

import { Dependencies } from '~/core/decorator';
import { Layout } from '~/core/decorator';
import SvgIcon from '~/components/common/svg-icon.vue';
import { PageService } from '~/utils/page.service';
import { CarService } from '~/services/manage-service/car.service';
import { CarParamTypeControllerService } from '~/services/manage-service/car-param-type-controller.service';
import { CarParamControllerService } from '~/services/manage-service/car-param-controller.service';

@Layout('workspace')
@Component({
	components: {
		DataBox,
		SvgIcon,
		AddVehicle,
	},
})
export default class ProdConfig extends Page {
	@Dependencies(CarParamTypeControllerService) private CarParamTypeControllerService: CarParamTypeControllerService;
	@Dependencies(CarParamControllerService) private carParamControllerService: CarParamControllerService;

	@Dependencies(CarService) private carService: CarService;
	@Dependencies(PageService) private pageService: PageService;
	private treeData: Array<any> = [];
	private dataList: any = [];
	private carId: any;
	private carDataModel: Array<any> = [];
	private carColumns: any = [];
	private carParam: String = '';
	private editmessage: any = {};
	private editModal: Boolean = false;
	private addVehicleModal: Boolean = false; // 添加车辆
	private treeDatas: any = [];
	private viewStatus: Boolean = true;
	private dataLength: Boolean = false;
	private carTypes: any = {};
	private paramList: any = [];
	private oneParamCode: any = {}; //基本参数
	private colorPa: any = {}; //车身颜色
	private colorModel: any = {};
	/**
	 * 客户素材配置
	 */

	created() {
		this.getCarseries();
		this.carColumns = [
			{
				title: '参数名称',
				key: 'name',
				align: 'center',
			},
			{
				title: '参数值',
				key: 'value',
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
	 * 根据车系列树获取车参数类型
	 */
	cartreeChange(data) {
		if (data[0].carId) {
			this.carId = data[0].carId;
			this.CarParamTypeControllerService.getCarParamTypeByCarId({
				carId: this.carId,
			}).subscribe(val => {
				this.carTypes = val;
				this.paramList = [];
				this.oneParamCode = val[0];
				val == '' ? (this.dataLength = false) : (this.dataLength = true);
				let colorObject = val.filter(v => v.paramName === '车身颜色');
				this.colorPa = colorObject[0].carParams;
				let colorName = this.colorPa.filter(v => v.value == 0);
				this.colorModel = colorName[0].name;
				this.paramDetail(this.oneParamCode);
			});
		}
	}
	/**
	 * 点击基本参数类型获取参数信息
	 */
	paramDetail(item) {
		this.carParamControllerService
			.getCarParamByCode({
				code: item.paramCode,
			})
			.subscribe(
				val => {
					console.log(val);
					this.paramList = val;
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
	}
	/**
	 * 取消新增车辆
	 */
	cancleAddVehicle() {
		this.addVehicleModal = false;
		let _addVehicle: any = this.$refs['add-vehicle'];
		_addVehicle.reset();
	}
	/**
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
	/**
	 * 编辑参数/保存
	 */
	editParam(val) {
		console.log(val, 333);
		if ((val.target.innerHTML = '编辑参数')) {
			val.target.innerHTML = '保存';
		} else if ((val.target.innerHTML = '保存')) {
			val.target.innerHTML = '编辑参数';
		}
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
		cursor: pointer;
	}
}

.avtive {
	color: #000;
}

.table_container {
	text-align-last: center;
	border: 1px solid #dddd;
}
.textButton {
	width: 61px;
	color: #265ea2;
	display: inline-block;
	cursor: pointer;
}
.empty_text {
	height: 300px;
	text-align: center;
	line-height: 300px;
}
</style>

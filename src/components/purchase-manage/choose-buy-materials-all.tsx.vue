<!--全额付款客户资料-->
<template>
  <section class="component choose-buy-materials-all">
    <i-card title="选购信息">
      <i-form :rules="chooseRule" ref="parchase-form" :label-width="90" :model="chooseModel">
        <i-row>
          <i-col :span="12">
            <i-form-item label="申请省份" prop="province">
              <i-select placeholder="选择省" v-model="chooseModel.province" clearable>
                <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="申请城市" prop="city">
              <i-select v-model="chooseModel.city" placeholder="选择市" :disabled="!chooseModel.province" clearable>
                <i-option v-for="{value,label} in this.chooseModel.province ? this.$city.getCityData({ level: 1, id: this.chooseModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="所属公司" prop="companyId">
              <i-select v-model="chooseModel.companyId" clearable>
                <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>
    <!--车辆选购列表-start-->
    <i-card title="车辆列表" class="car-container">
      <div slot="extra">
        <i-button icon="plus" @click="onAddCar" type="text">添加车辆</i-button>
      </div>
      <i-table class="car-table" :columns="carColumns" :data="carDataSet" stripe></i-table>
      <div class="car-static row between-span">
        <div class="car-total-price">
          <span class="label">总价</span>
          <span class="price">￥ {{totalPrice|toThousands}}</span>
        </div>
      </div>
    </i-card>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import DataBox from "~/components/common/data-box.vue";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { CompanyService } from "~/services/manage-service/company.service";
import { CarService } from "~/services/manage-service/car.service";
import { Prop, Watch } from "vue-property-decorator";
import AddCar from "~/components/purchase-manage/add-car.tsx.vue";
import { Input, Button, InputNumber } from "iview";

@Component({
  components: {
    SvgIcon,
    DataBox,
    AddCar
  }
})
export default class chooseBuyMaterialsAll extends Vue {

  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Dependencies(CarService) private carService: CarService;

  private addCar: Boolean = false;
  private totalPrice: any = "";

  private companyObject: Array<Object> = []; // 公司信息

  private addcarData: any = [];
  // 车辆选择结果
  public carDataSet: any = [];
  // 车辆表格列配置
  private carColumns: Array<any> = [];

  // 客户基本信息form
  private chooseForm: any = {};
  public chooseModel: any = {};
  private chooseRule: any = {};

  // 页面流程检测规则
  private customRules: any = {}

  @Prop() disabledStatus: String;
  @Prop() currentRowData: any;

  /**
   * 检测车辆信息更新
   */
  @Watch("carDataSet", { immediate: true, deep: true })
  onCarDataSetChange(value) {
    if (this.carDataSet && this.carDataSet.length) {
      this.totalPrice = this.carDataSet
        .map(x => x.carAmount | 0)
        .reduce((a, b) => a + b);
    } else {
      this.totalPrice = 0;
    }
  }

  created() {

    this.chooseModel = {
      province: "", // 省份
      city: "", // 城市
      companyId: "" // 所属公司
    }

    this.chooseRule = {
      province: { required: true, message: "请选择申请省份", trigger: "change", type: "number" },
      city: { required: true, message: "请选择申请城市", trigger: "change", type: "number" }

    };

    this.carColumns = [
      {
        title: "操作",
        align: "center",
        width: 180,
        render: (h, { row, index }) => {
          return (
            <div>
              <i-button
                type="text"
                style="color:#265EA2"
                onClick={() => this.onDeleteCar(index)}
              >
                删除
            </i-button>
            </div>
          );
        }
      },
      {
        title: "车辆品牌",
        key: "brandName",
        align: "center"
      },
      {
        title: "车辆型号",
        key: "modelName",
        align: "center"
      },
      {
        title: "车身颜色",
        key: "carColour",
        align: "center"
      },
      {
        title: "车辆排量",
        key: "carEmissions",
        align: "center"
      },
      {
        title: "单价(元)",
        key: "carAmount",
        align: "center",
        render: (h, { row, column, index }) => {
          let amount = row.carAmount || 0;
          return (
            <i-input-number
              value={amount}
              formatter={value => this.$filter.moneyFormat(value)}
              onOn-change={value => (amount = value)}
              parser={value => this.$filter.moneyParse(value)}
              onOn-blur={() => this.onCarAmountChange(index, amount)}
              min={0}
            />
          );
        }
      },
      {
        title: "车辆配置",
        key: "vehicleConfiguration",
        align: "center"
      },
      {
        title: "车辆牌照",
        key: "vehicleLicence",
        align: "center"
      }
    ];

    // 自定义校验规则
    this.customRules = {
      chooseForm: { validator: this.$validator.formValidate },
      carListCount: { type: "number", min: 1, message: "请添加车辆" },
      totalPrice: { type: "number", min: 1, message: "请填写车辆价格" }
    };

  }

  mounted() {
    // 获取公司名称
    this.companyService.getAllEnableCompany().subscribe(val => {
      this.companyObject = val;
    });
  }

  /**
   * 添加车辆处理
   */
  onAddCar() {
    let dialog = this.$dialog.show({
      title: "添加车辆",
      footer: true,
      onOk: addCar => {
        let currentSelection = addCar.getCurrentSelection();

        if (currentSelection && currentSelection.length) {
          this.carDataSet.push(...currentSelection);
        }
      },
      onCancel: () => { },
      render: h => {
        return h(AddCar, {});
      }
    });
  }

  /**
   * 删除车辆
   */
  onDeleteCar(index) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除吗？",
      onOk: () => {
        this.carDataSet.splice(index, 1);
      }
    });
  }

  /**
   * 更新车辆金额
   */
  onCarAmountChange(index, amount) {
    if (this.carDataSet.length > index) {
      let car = this.carDataSet[index];
      car.carAmount = amount;
    }
  }




  /**
   * 验证数据
   */
  async validate() {
    // 自定义验证
    return await this.$validator
      .validate({
        chooseForm: this.$refs['parchase-form'],
        carListCount: this.carDataSet.length,
        totalPrice: this.totalPrice
      }, this.customRules)
      .then((error) => {
        if (!error) {
          return true;
        }
        this.$Message.error(error);
      });
  }

  Reverse(data) {
    this.chooseModel.companyId = data.companyId;
    this.chooseModel.city = data.city;
    this.chooseModel.province = data.province;
  }

  distributionData(data) {
    data.vehicleColour = data.map(v => v.carColour);
    this.addcarData = data;
    let sum: any = 0;
    data.forEach(v => {
      sum = sum + (Number(v.carAmount) || 0);
    });
    this.totalPrice = sum;
  }
}
</script>

<style lang="less" scoped>
.component,
.choose-buy-materials-all {
  .car-container {
    .car-static {
      margin-top: 20px;
    }
  }
}
</style>

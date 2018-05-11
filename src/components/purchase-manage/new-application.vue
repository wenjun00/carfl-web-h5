<template>
  <section class="component new-application">
    <i-row>
      <i-col>
        <div class="box-commend">
          <div class="box-commend-first">
            <div class="box-commend-first-one">1</div>
            <div class="box-commend-first-two">选择车辆</div>
          </div>
          <div class="box-commend-secend" :class="{'secend-color':this.judgeDiv === true}">
            <div class="box-commend-secend-one" :class="{'secend-one-color':this.judgeDiv === true}"></div>
          </div>
          <div class="box-commend-therd" :class="{'therd-color':this.judgeDiv === true}">
            <div class="box-commend-therd-one" :class="{'change-color':this.judgeDiv === true}">2</div>
            <div class="box-commend-therd-two" :class="{'change-color':this.judgeDiv === true}">客户资料</div>
          </div>
        </div>
      </i-col>
    </i-row>
    <div class="div-box">
      <i-row v-if="judge">
        <i-col :span="7">
          <h2 class="brand">品牌</h2>
          <div class="content">
            <div v-for="item in brand" class="content-one" :key="item.id" :class="{'content-click':fatherId===item.id}" @click="clickBrand(item)">
              <span class="content-two">{{item.brandName }}</span>
            </div>
          </div>
        </i-col>
        <i-col :span="7">
          <h2 class="brand">车系</h2>
          <div class="content">
            <div class="content-one" v-for="item in series" :key="item.id" :class="{'content-click':SerciseId===item.id}" @click="clickSeries(item)">
              <span class="content-two">{{item.seriesName }}</span>
            </div>
          </div>
        </i-col>
        <i-col :span="10">
          <h2 class="brand">车型</h2>
          <div class="content">
            <div class="content-one" v-for="item in car" :key="item.id" :class="{'content-click':CarId===item.id}" @click="clickCar(item)">
              <span class="content-two">{{item.modelName }}</span>
            </div>
          </div>
        </i-col>
      </i-row>

      <i-row v-if="judgeDiv" class="judge-div">
        <!--<div>搜房网色温</div>-->
        <i-form :label-width="90" :model="requestModal" :rules="requestRules" ref="form-item">
          <i-col :span="12">
            <i-form-item label="所选车辆">
              <i-input disabled v-model="requestModal.selectCar"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="联系电话" prop="ownPhone">
              <i-input v-model="requestModal.ownPhone" :maxlength="13"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="上牌省份" prop="province">
              <i-select placeholder="选择省" v-model="requestModal.province" clearable>
                <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="上牌城市" prop="city">
              <i-select v-model="requestModal.city" placeholder="选择市" :disabled="!requestModal.province" clearable>
                <i-option v-for="{value,label} in this.requestModal.province ? this.$city.getCityData({ level: 1, id: this.requestModal.province }) : []" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="车身颜色" prop="carColor">
              <i-input v-model="requestModal.carColor" :maxlength="4"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="发动机号" prop="engineNo">
              <i-input v-model="requestModal.engineNo" :maxlength="15"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="车牌号码" prop="carNo">
              <i-input v-model="requestModal.carNo" :maxlength="10"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="车架号" prop="frameNo">
              <i-input v-model="requestModal.frameNo" :maxlength="17"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="客户姓名" prop="ownerName">
              <i-input v-model="requestModal.ownerName" :maxlength="15"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input v-model="requestModal.idCard" :maxlength="18"></i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-row>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import { CarService } from "~/services/manage-service/car.service";
import { AssessMentApplyService } from "~/services/manage-service/assess-ment-apply.service";

@Component({
  components: {}
})
export default class NewApplication extends Vue {
  @Dependencies(CarService) private carService: CarService
  @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
  private carList: any = []
  private brand: any = [] //车辆品牌
  private series: any = [] //车辆系列
  private car: any = [] //车辆型号

  public fatherId = '' //保存的根Id
  public SerciseId = '' //车系Id
  public CarId = ''  //车型Id

  private fatherName = '' //选择的品牌名称
  private SerciseName = '' //选择的车系名称
  private CarName = ''  //选择的车型名称

  private judge: Boolean = true;
  private judgeDiv: Boolean = false;

  private applyCars: any = [{}]

  private requestModal: any = {
    carColor: '',
    engineNo: '',
    carNo: '',
    frameNo: '',
    ownerName: '',
    idCard: '',
    ownPhone: '',
    province: '',
    city: '',
    assessmentStatus: '',
    applyCars: '',
    id: null
  }
  private requestRules: any = {
    carColor: [{ required: true, message: "请输入车身颜色", trigger: "blur" }, { type: 'string', max: 4, message: "车身颜色不能超过4位", trigger: "blur" }],
    engineNo: [{ required: true, message: "请输入发动机号", trigger: "blur" }, { type: 'string', max: 15, message: "发动机号不能超过15位", trigger: "blur" }],
    carNo: [{ required: true, message: "请输入车牌号码", trigger: "blur" }, { type: 'string', max: 10, message: "车牌号码不能超过10位", trigger: "blur" }],
    frameNo: [{ required: true, message: "请输入车架号", trigger: "blur" }, { type: 'string', min: 17, max: 17, message: "请输入17位车架号", trigger: "blur" }],
    ownerName: [{ required: true, message: "请输入客户姓名", trigger: "blur" },
    { pattern: /^([\u4e00-\u9fa5]){2,7}$/g, message: "请输入正确客户姓名", trigger: "blur" }],
    idCard: [{ required: true, message: "请输入证件号码", trigger: "blur" },
    { validator: this.$validator.idCard, trigger: 'blur' }],
    ownPhone: [{ required: true, message: "请输入联系电话", trigger: "blur" },
    { validator: this.$validator.phoneNumber, trigger: 'blur' }],
    province: [{ required: true, message: "请选择省份", trigger: "change", type: 'number' }],
    city: [{ required: true, message: "请选择城市", trigger: "change", type: 'number' }],
  }
  carTree() {
    this.carService.findAllCarSeries()
      .subscribe(data => {
        this.carList = data
        this.brand = this.carList.filter(v => v.id)
        console.log(this.brand)
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
  /**
   *  点击车辆品牌
   */
  clickBrand(item) {
    this.fatherId = item.id //保存根Id
    this.fatherName = item.brandName
    this.series = this.carList.filter(v => v.id === item.id)[0].series.filter(x => x.brandId == item.id)
    this.car = []
  }
  /**
   *  点击车辆系列
   */
  clickSeries(item) {
    this.SerciseId = item.id
    this.SerciseName = item.seriesName
    this.car = this.carList.filter(v => v.id === this.fatherId)[0].series.filter(x => x.id === item.id)[0].cars.filter(m => m.seriesId === item.id)
  }
  /**
   *  点击车辆型号
   */
  clickCar(item) {
    this.CarId = item.id
    this.CarName = item.modelName
  }
  /**
   *  选择下一步
   */
  lastStep() {
    this.judge = false
    this.judgeDiv = true
    this.requestModal.selectCar = `${this.fatherName} ${this.SerciseName} ${this.CarName}`

  }
  /**
   *  回到上一步
   */
  backStep() {
    this.judge = true
    this.judgeDiv = false
  }

  /**
   *  提交申请
   */
  submission(val) {
    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false
      delete this.requestModal.selectCar
      this.applyCars[0].brandId = this.fatherId
      this.applyCars[0].seriesId = this.SerciseId
      this.applyCars[0].carId = this.CarId
      this.requestModal.applyCars = this.applyCars
      this.requestModal.assessmentStatus = val
      this.assessMentApplyService.saveAssessmentApplyInfo(this.requestModal)
        .subscribe(data => {
          this.$Message.success("申请成功！")
          this.$emit('close');
          this.requestModal.ownPhone = ''
          this.requestModal.province = ''
          this.requestModal.city = ''
          this.requestModal.carColor = ''
          this.requestModal.engineNo = ''
          this.requestModal.carNo = ''
          this.requestModal.frameNo = ''
          this.requestModal.ownerName = ''
          this.requestModal.idCard = ''
          this.requestModal.id = null
          this.brand = []
          this.series = []
          this.car = []
          this.judge = true
          this.judgeDiv = false
        }, ({ msg }) => {
          this.$Message.error(msg)
        })
    })
  }

  /**
   *  编辑
   */
  editProject(row) {
    this.carTree()
    this.assessMentApplyService.findOrderInfoByOrderNumber(row.assessmentNo)
      .subscribe(data => {
        this.requestModal.ownPhone = data.ownPhone
        this.requestModal.province = data.province
        this.requestModal.city = data.city
        this.requestModal.carColor = data.carColor
        this.requestModal.engineNo = data.engineNo
        this.requestModal.carNo = data.carNo
        this.requestModal.frameNo = data.frameNo
        this.requestModal.ownerName = data.ownerName
        this.requestModal.idCard = data.idCard
        this.requestModal.id = data.id
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
}
</script>

<style lang="less" scoped>
.component.new-application {
  .box-commend {
    display: flex;
    justify-content: center;
    .box-commend-first {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid dodgerblue;
      position: relative;
      .box-commend-first-one {
        position: absolute;
        top: 25%;
        left: 45%;
        font-size: 18px;
        color: dodgerblue;
      }
      .box-commend-first-two {
        position: absolute;
        top: 60%;
        left: 20%;
        font-size: 12px;
        color: dodgerblue;
      }
    }
    .box-commend-secend {
      width: 150px;
      height: 1px;
      background-color: gray;
      position: relative;
      margin: 40px 20px 0px;
      .box-commend-secend-one {
        border: 10px solid #000;
        border-left-color: gray;
        width: 10px;
        height: 10px;
        border-right-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
        position: absolute;
        top: -10px;
        left: 150px;
      }
    }
    .box-commend-therd {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid gray;
      position: relative;
      .box-commend-therd-one {
        position: absolute;
        top: 25%;
        left: 45%;
        font-size: 18px;
      }
      .box-commend-therd-two {
        position: absolute;
        top: 60%;
        left: 20%;
        font-size: 12px;
      }
    }
  }
  .content {
    height: 300px;
    margin: 20px 10px;
    border: 1px solid #ebebeb;
    overflow: auto;
    .content-one {
      width: 100%;
      height: 35px;
      .content-two {
        line-height: 35px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
  .brand {
    display: inline-block;
    margin-top: 20px;
    margin-left: 40%;
  }
  .content-click {
    background: #8cc5ff;
  }
  .div-box {
    height: 400px;
    .judge-div {
      margin-top: 50px;
      margin-left: 50px;
    }
  }
  .change-color {
    color: dodgerblue;
  }
  .therd-color {
    border: 1px solid dodgerblue !important;
  }
  .secend-color {
    background: dodgerblue !important;
  }
  .secend-one-color {
    border-left-color: dodgerblue !important;
  }
}
</style>

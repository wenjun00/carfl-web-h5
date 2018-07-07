<template >
  <section class="page subscribe">
    <p class="title">提交购车需求，金牌顾问为您服务</p>
    <div class="buy-form">
      <van-cell class="cityLive" title="选择门店" is-link :value="buyModel.cityName" @click="pickerDialog=true" />
      <!-- 选择选择门店 -->
      <transition name="fade">
        <van-picker class="subsidiaryOrgan " :columns="subsidiaryOrganList" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
      </transition>
      <van-field class="phoneText" maxlength="11" v-model="buyModel.phone" label="手机号码" placeholder="请输入您的手机号" icon="clear" @click-icon="buyModel.phone = ''" @focus="onCodeNumberFocus" />
      <van-number-keyboard :show="show.phone" title="洋葱汽车安全键盘" close-button-text="完成" @blur="show.phone = false" @input="onKeyBoardInputPhone" @delete="onKeyBoardDeletePhone" />
    </div>
    <van-button type="primary" class="full-radius" size="large" @click="onSubmitClick">帮我买车</van-button>

    <van-dialog v-model="show.confirm" confirmButtonText="立即预约" @confirm="onConfirmClick">
      <div class="buy-info">
        <p>您的电话：{{buyModel.phone}}</p>
        <p>选择门店：{{buyModel.cityName}}</p>
        <!-- <p>预约门店：暂时为空</p> -->
      </div>
    </van-dialog>

    <van-dialog v-model="show.success" :show-confirm-button="false">
      <div class="buy-success">
        <img src="/static/images/home/success.png">
      </div>
      <p>提交成功</p>
      <p class="buy-success-info">金牌顾问第一时间会联系您</p>
    </van-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import AreaData from "~/assets/area";
import CityPicker from "~/components/common/city-picker.vue";
import { State, Mutation, Action } from "vuex-class";
import { AppCustomerService } from "~/services/manage-service/app-customer.service";
import { Dependencies } from "~/core/decorator";
import PolisPicker from "~/components/common/polis-picker.vue";
import { DepartmentService } from "~/services/manage-service/department.service";
@Component({
  components: {
    CityPicker,
    PolisPicker
  }

})
export default class Subscribe extends Vue {
  @Dependencies(AppCustomerService) private appCustomerService: AppCustomerService;
  @Dependencies(DepartmentService) private departmentService: DepartmentService;
  @Mutation promptlyMakeControl
  @State orderInfo
  @State userData
  private subsidiaryOrganList: any = [];
  private areaList = {
    province_list: {
      110000: '北京市',
      120000: '天津市'
    },
    city_list: {
      110100: '北京市',
      110200: '县',
      120100: '天津市',
      120200: '县'
    },
    county_list: {
      110101: '东城区',
      110102: '西城区',
      110105: '朝阳区',
      110106: '丰台区',
      120101: '和平区',
      120102: '河东区',
      120103: '河西区',
      120104: '南开区',
      120105: '河北区',
      // ....
    }
  }
  private pickerDialog: Boolean = false
  private dataList = AreaData
  private showForm: boolean = false
  private show = {
    phone: false, // 手机号码数字键盘
    area: false, // 区域选择器
    confirm: false, // 确认标识
    success: false // 成功标识
  }

  private buyModel = {
    cityName: "",  // 所在城市 汉子显示
    phone: "",     //手机号
    subsidiaryId: "",      //机构id
    appointmentShop: ""  // 预约门店
  }


  private rules = {
    cityName: { required: true, message: "请选择门店" },
    phone: [{ required: true, message: "请输入正确的手机号" }, { validator: this.$validator.phoneNumber }]
  }
  /**
   * 点击立即预约
   */

  private onConfirmClick() {
    this.getPromptlySubscribe()

  }

  /**
   * 点击立即预约
   */
  getPromptlySubscribe() {
    let dataAll = {
      mobileMain:this.buyModel.phone,
      departmentId:this.buyModel.subsidiaryId
    }
    this.appCustomerService.customerReservation(dataAll).subscribe(
      data => {
        this.$toast('预约成功')
        this.promptlyMakeControl(true)
        this.show.success = true
        setTimeout(() => {
          this.show.success = false
          this.$router.push('/home')
        }, 3000);
      },
      err => {
        this.$toast(err.msg)
        this.$router.push('/home')
      }
    )
  }
  /**
    * 查询所属机构
    */
  getSubsidiaryOrgan() {
    this.departmentService.getAllDepartment().subscribe(
      data => {
        for (let i of data) {
          this.subsidiaryOrganList.push({
            text: i.deptName,
            value: i.id
          })
        }
        this.subsidiaryOrganList = this.subsidiaryOrganList.filter(x => x.value !== 1)
      },
      err => {
        this.$toast(err.msg)
      }
    )
  }
  /**
  * 点击所属机构确定事件
  */

  private onConfirm(val) {
    this.buyModel.cityName = val.text 
    this.buyModel.subsidiaryId = val.value
    this.pickerDialog = false
  }





  /**
  * 键盘输入
  * @param val 案件内容
  */
  private onKeyBoardInputPhone(val) {
    if (this.buyModel.phone.length === 11) return
    this.buyModel.phone += val.toString()
  }

  /**
   * 按钮删除操作
   */
  private onKeyBoardDeletePhone() {
    let length = this.buyModel.phone.length
    if (length === 0) return
    this.buyModel.phone = this.buyModel.phone.substring(0, length - 1)
  }
  private onCodeNumberFocus() {
    (document.activeElement as HTMLElement).blur()
    this.show.phone = true
  }

  //点击帮我买车
  private onSubmitClick() {
    this.$validator.validate(this.buyModel, this.rules).then(error => {
      if (!error) {
        this.show.confirm = true
      } else {
        this.$toast(error);
      }
    });
  }

  mounted() {
    this.getSubsidiaryOrgan()
  }

}
</script>

<style lang="less" scoped>
@marginHight: 20px;
.subscribe {
  text-align: center;
}
.subsidiaryOrgan {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 100;
}

.title {
  margin-top: @marginHight * 2;
  margin-bottom: @marginHight;
}
.buy {
  &-form {
    margin-bottom: @marginHight;
  }
  &-info {
    margin-bottom: @marginHight;
  }
  &-success {
    margin-top: @marginHight;
    margin-bottom: @marginHight;
    &-info {
      font-size: 0.8rem;
      color: gray;
      margin-bottom: @marginHight;
    }
  }
}
</style>
<style lang="less">
.page.subscribe {
  .cityLive {
    .van-cell__title {
      max-width: 90px;
    }
  }
  .phoneText {
    .van-field__control {
      text-align: right;
    }
  }
  .shop {
    .van-field__control {
      text-align: right;
      padding-right: 19px;
    }
  }
}
</style>



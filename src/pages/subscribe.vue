<template >
  <section class="page subscribe">
    <p class="title">提交购车需求,金牌顾问为您服务</p>
    <div class="buy-form">
      <!-- <van-field label="所在城市" v-model="buyModel.cityName" placeholder="请选择所在城市" @focus="show.area = true" />
      <van-popup v-model="show.area" position="bottom">
        <van-area title="选择所在城市" :columns-num="2" :area-list="dataList" @cancel="show.area = false" @confirm="onAreaConfirmClick"></van-area>
      </van-popup> -->
      <van-cell class="cityLive" title="所在城市" is-link :value="buyModel.cityName | cityConvert " @click="$refs['cityPicker'].show()" />
      <city-picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></city-picker>
      <!-- <van-field class="shop" label="预约门店" v-model="buyModel.appointmentShop" placeholder="请选择要预约的门店" /> -->
      <van-field class="phoneText" maxlength="11" v-model="buyModel.phone" label="手机号码" placeholder="请输入您的手机号" icon="clear" @click-icon="buyModel.phone = ''" @focus="onCodeNumberFocus" />
      <van-number-keyboard :show="show.phone" title="洋葱汽车安全键盘" close-button-text="完成" @blur="show.phone = false" @input="onKeyBoardInputPhone" @delete="onKeyBoardDeletePhone" />
    </div>
    <van-button type="primary" class="full-radius" size="large" @click="onSubmitClick">帮我买车</van-button>

    <van-dialog v-model="show.confirm" confirmButtonText="立即预约" @confirm="onConfirmClick">
      <div class="buy-info">
        <p>您的电话：{{buyModel.phone}}</p>
        <p>所在城市：{{buyModel.cityName | cityConvert}}</p>
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
@Component({
  components: {
    CityPicker,
  }

})
export default class Subscribe extends Vue {

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
    city: "",      // 城市code   
    appointmentShop: ""  // 预约门店
  }

  // 选择城市点击事件
  private onCityPickerConfirm(currentCitys) {
    // console.log(currentCitys)
    currentCitys.pop()
    this.buyModel.cityName = currentCitys
    this.buyModel.city = currentCitys[1]

  }

  private rules = {
    cityName: { required: true, message: "请选择所在城市" },
    phone: [{ required: true, message: "请输入正确的手机号" }, { validator: this.$validator.phoneNumber }]
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

  // private onAreaConfirmClick(val) {
  //   console.log(val)
  //   if (val && val.length >= 2) {
  //     let city = val[1]
  //     this.buyModel.city = city.code
  //     this.buyModel.cityName = city.name
  //   }
  //   this.show.area = false
  // }
  private onCodeNumberFocus() {
    (document.activeElement as HTMLElement).blur()
    this.show.phone = true
  }

  private onSubmitClick() {
    this.$validator.validate(this.buyModel, this.rules).then(error => {
      if (!error) {
        this.show.confirm = true
      } else {
        this.$toast(error);
      }
    });

    // TODO 测试。先注释
    // this.$validator.validate(this.buyModel, this.rules).then(err => {
    //   if (err) {
    //     this.$toast(err)
    //     return
    //   }
    //   this.show.confirm = true
    // })

  }

  private onConfirmClick() {
    this.show.success = true
    setTimeout(() => {
      this.show.success = false
      this.$router.push('/home')
    }, 3000);
  }
}
</script>

<style lang="less" scoped>
@marginHight: 20px;
.subscribe {
  text-align: center;
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



<template>
  <section class="page uploadIdPhotoTwo">
    <van-cell title="选择城市" required is-link :value="IntoACity | cityConvert " @click="optionCity=true" />
    <van-row>
      <van-steps :active="1" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请扫描上传承租人驾驶证照片</p>
    <van-row>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead('photo',1371)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img height="100%" v-else :src="photo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photo',1371)" v-if="!photo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photo')" v-if="!photo == ''" class="lookiconHead" name="password-view" />
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead('photoTwo',1372)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img height="100%" v-else :src="photoTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photoTwo',1372)" v-if="!photoTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photoTwo')" v-if="!photoTwo == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
      <van-row style="text-align: center">
        <van-col span="12" style="font-size:14px">驾驶证正页</van-col>
        <van-col span="12" style="font-size:14px">驾驶证副页</van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">请确认驾驶证信息是否一致</p>
      <van-cell-group>
        <van-cell title="有效期限" name="center" required is-link :value="peopleCar.useful_time" @click="validPeriod=true" />
        <van-datetime-picker v-show="validPeriod" v-model="currentDate" type="date" :min-date="minDate" @cancel="validPeriodCancel" @confirm="validPeriodAffirm" />
        <van-field name="center" v-model="peopleCar.file_number" placeholder="请输入档案编号" label="档案编号" required/>
        <!-- <van-field v-model="drivingType" required label="准驾车型" placeholder="请选择准驾车型" @click="pickerDialog=true" /> -->
        <van-cell title="准驾车型" required is-link :value="drivingType" @click="pickerDialog=true" />

      </van-cell-group>
    </van-row>
    <!-- 选择下单城市 -->
    <transition name="fade">
      <van-picker :columns="columnsTwo" v-show="optionCity" show-toolbar @confirm="onConfirmTwo" @cancel="optionCity=false" />
    </transition>

    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" class="nextStepSty" @click="nextStep" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { NetService } from "~/utils/net.service";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
@Component({})
export default class Login extends Vue {
  private arrImgTwo: any = []
  private arrAll: any = []
  private idName: any = null;
  private idNumber: any = null;
  private value: any = null;
  private photo: any = "";
  private photoTwo: any = ''
  private pickerDialog: boolean = false;
  private columns: any = [];
  private validPeriod: boolean = false   // 有效期限
  private minDate: any = new Date(1949, 0, 1);
  private type: any;
  private currentDate: any = new Date()
  private drivingType: string = ''
  private peopleCar: any = {
    useful_time: '',  // 有效期限
    file_number: '',  // 档案编号
    driving_license: '', // 准驾车型
    driverPhoto: '',   // 驾驶证正面
    driverVicePhoto: '', // 驾驶证负面
  }
  private optionCity: boolean = false;     // 城市选择弹窗
  private columnsTwo: any = [
    {
      text: '郑州',
      val: '902',
      pid: '734',
    }, {
      text: '南宁',
      val: '3125',
      pid: '3021',
    }
  ];
  /***
  * 选择下单城市确定事件
  */
  private onConfirmTwo(val) {
    let catyAll = {
      id: Number(val.val),
      pid: Number(val.pid),
    }

    this.selectCity(catyAll)
    //  console.log(this.IntoACity)
    this.optionCity = false
  }
  // 验证规则
  private rules = {
    useful_time: { required: true, message: '请输入有效期限' },
    file_number: { required: true, message: '请输入档案编号' },
    driving_license: { required: true, message: '请选择准驾车型' },
  };

  /**
 * 点击有效期 确定事件
 */
  validPeriodAffirm(val) {
    this.peopleCar.useful_time = this.$filter.dateFormat(val, "yyyy-MM-dd")
    this.validPeriod = false
  }
  /**
   * 点击有效期取消事件
   */
  validPeriodCancel() {
    this.validPeriod = false
  }

  @Mutation choosePeople
  @Mutation tenantImg
  @State intoA
  @Mutation selectCity
  @State IntoACity

  /**
  * 点击准驾车型确定事件
  */

  private onConfirm(val) {
    this.peopleCar.driving_license = val.value
    this.drivingType = this.$dict.getDictName(Number(this.peopleCar.driving_license))
    this.pickerDialog = false
  }
  /**
   * 点击下一步
   */
  nextStep() {
    this.$validator.validate(this.peopleCar, this.rules).then(error => {
      if (!error) {
        for (let i in this.arrAll) {
          if (this.arrAll[i].typeName == 1371) {
            this.peopleCar.driverPhoto = this.arrAll[i].materialUrl
          } else if (this.arrAll[i].typeName == 1372) {
            this.peopleCar.driverVicePhoto = this.arrAll[i].materialUrl
          }
        }
        if (this.peopleCar.driverPhoto == '') {
          this.$toast('请先上传驾驶证正面');
          return
        }
        if (this.peopleCar.driverVicePhoto == '') {
          this.$toast('请先上传驾驶证负面');
          return
        }

        this.$router.push('/upload-id-photo-three')
        this.choosePeople(this.peopleCar)

      } else {
        this.$toast(error);
      }
    });

  }
  //图片上传
  onRead(val, number) {
    return ({ file }) => {
      NetService.upload(file).then(x => {
        console.log(x)
        this[val] = x.url
        for (let i in this.arrAll) {
          if (this.arrAll[i].typeName == number) {
            this.arrAll.splice(i, 1)
          }
        }
        this.arrAll.push({
          uploadName: x.realName,
          materialType: x.type,
          dataSize: x.size,
          materialUrl: x.url,
          uploadTime: x.createTime,
          typeName: number,
        })
      })
    }
  }

  /**
    * 图片删除
    */
  closeIdentityCard(val, number) {
    this[val] = ''
    for (let i in this.arrAll) {
      if (this.arrAll[i].typeName == number) {
        this.arrAll.splice(i, 1)
      }
    }
  }
  /**
 * 图片预览
 */
  lookIdentityCard(val) {
    ImagePreview([this[val]]);
  }

  mounted() {
    let els: any = document.getElementsByName("center")
    els.forEach(v => {
      v.onclick = () => {
        setTimeout(() => {
          (v as HTMLElement).scrollIntoView(true)
        }, 300);
      }
    })
    this.arrAll = this.intoA.PersonalAdditional
    this.columns = this.$dict.getDictData('0478').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // console.log(this.IntoACity)
  }

}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoTwo {
  .nextStepSty {
    margin-top: 30px;
  }
  .lookiconHead {
    position: relative;
    top: -105px;
    left: -65px;
    color: cornflowerblue;
    font-size: 25px;
  }
  .deleteiconHead {
    position: relative;
    top: -105px;
    left: 65px;
    color: cornflowerblue;
    font-size: 20px;
  }
  .headPortrait {
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .vanIcon {
    font-size: 40px;
    line-height: 150px;
    color: #bebebe;
  }
  .imgList {
    text-align: center;
    display: flex;
    justify-content: center;
    height: 120px;
    .imgSize {
      height: 110px;
      border: 1px solid #6666;
      width: 90%;
      margin-top: 10px;
      background: #e7e7e7;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: bottom 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    bottom: -388px;
  }

  .base-info-title {
    color: gray;
    padding: 12px;
    font-size: 0.8rem;
    border-bottom: 1px solid #e8e8e8;
  }

  .photo_container {
    display: flex;
  }
  .photo_content {
    flex: 1;
    display: flex;
    justify-content: space-around;
    img {
      width: 100%;
      height: 124px;
    }
  }
  p {
    margin: 0;
  }
}
</style>
<style lang="less">
.page.uploadIdPhotoTwo {
  .van-step--horizontal.van-step--finish .van-step__circle,
  .van-step--horizontal.van-step--finish .van-step__line {
    background-color: #ffe44d;
  }
  .van-step--horizontal.van-step--finish {
    color: #ffe44d;
  }
  .van-step--horizontal:last-child .van-step__title {
    color: gray;
  }
  .van-cell--required::before {
    left: -0.3rem;
    bottom: 0.3rem;
    font-size: 36px;
    color: #ffe44d;
  }
  .van-cell {
    margin: 0 auto 0 3%;
    border-bottom: 1px solid #e8e8e8;
    width: 97%;
  }
  .van-button--bottom-action.van-button--primary {
    background-color: #ffe44d;
  }
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }
  .icon.iconfont.icon-jiahao.add.van-icon.van-icon-undefined {
    font-size: 60px;
    line-height: 150px;
  }
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
  .van-field__control {
    text-align: right;
    padding-left: 24px;
    box-sizing: border-box;
  }
}
</style>

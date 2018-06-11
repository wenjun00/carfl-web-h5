<template>
  <section class="page uploadIdPhotoFirst">
    <van-row>
      <van-steps :active="0" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请扫描上传承租人身份证照片</p>
    <van-row>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead('photo',1369)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img width="100%" v-else :src="photo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photo',1369)" v-if="!photo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photo')" v-if="!photo == ''" class="lookiconHead" name="password-view" />
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead('photoTwo',1370)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img width="100%" v-else :src="photoTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photoTwo',1370)" v-if="!photoTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photoTwo')" v-if="!photoTwo == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
      <van-row style="text-align: center">
        <van-col span="12">
          <p style="font-size:14px">头像页</p>
        </van-col>
        <van-col span="12">
          <p style="font-size:14px">国徽页</p>
        </van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">请确认身份证信息是否一致</p>
      <van-cell-group>
        <van-field v-model="idcard.name" placeholder="请输入证件姓名" required label="证件姓名" />
        <van-field v-model="idcard.id_card" placeholder="请输入证件号码" required label="证件号码" />
        <van-field v-model="nation" label="民族" placeholder="请选择民族" required @click="pickerDialog=true" />
        <!-- <van-field v-model="idcard.id_card_address" placeholder="请输入户籍信息" required label="户籍信息" /> -->
        <van-cell title="户籍信息" required is-link :value="idcard.id_card_address | cityConvert " @click="$refs['cityPicker'].show()" />
        <city-picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></city-picker>

        <van-field v-model="idcard.id_card_validity_period_section" placeholder="请输入有效期" required label="有效期限" />
      </van-cell-group>
    </van-row>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>
    <van-row>
      <van-button type="primary" @click="addAffirm" bottom-action>下一步</van-button>
    </van-row>
  </section>
</template>

<script lang="ts"> 
import Vue from "vue";
import Component from "vue-class-component";
import { NetService } from "~/utils/net.service";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
import CityPicker from "~/components/common/city-picker.vue";

@Component({
  components: {
    CityPicker,
  }
})
export default class Login extends Vue {
  private value: any = null;
  private arrImg: any = [];
  private photo: any = "";
  private photoTwo: any = "";
  private pickerDialog: boolean = false;
  private nation: string = ''
  private columns: any = [];
  private type: any;
  private idcard: any = {
    id_card: '',  // 身份证号码
    nation: '',   // 民族
    id_card_validity_period_section: '', //身份证有效区间
    name: '',    // 户名
    id_card_address: '', // 身份证地址
    headPhoto: '', // 身份证头像地址
    nationalPhoto: '', // 身份证国徽地址
    province: '',  // 身份证省份
    city: '',    // 身份证城市
  }

  @Mutation idcCard
  @Mutation tenantImg
  @State intoA

  // 验证规则
  private rules = {
    name: { required: true, message: '请输入用户姓名' },
    id_card: [{ required: true, message: "请输入正确的身份证号码" }, { validator: this.$validator.idCard }],
    nation: { required: true, message: '请选择民族' },
     id_card_address: { required: true, message: '请选择户籍信息' },
    id_card_validity_period_section: { required: true, message: '请输入身份证有效区间', },
  };
  // 选择城市点击事件
  private onCityPickerConfirm(currentCitys) {
    console.log(currentCitys)
    this.idcard.province = currentCitys[0]
    this.idcard.city = currentCitys[1]
    this.idcard.id_card_address = currentCitys
  }


  /**
   * 点击下一步
   */
  addAffirm() {

    this.$validator.validate(this.idcard, this.rules).then(error => {
      if (!error) {
        for(let i in this.arrImg){
          if(this.arrImg[i].typeName == 1369){
            this.idcard.headPhoto = this.arrImg[i].materialUrl
          } else if (this.arrImg[i].typeName == 1370){
            this.idcard.nationalPhoto = this.arrImg[i].materialUrl
          }
        }
        this.$router.push('/upload-id-photo-two')
        this.idcCard(this.idcard)
        this.tenantImg(this.arrImg)

      } else {
        this.$toast(error);
      }
    });
  }

  /**
   * 点击下拉确定事件
   */

  private onConfirm(val) {
    this.idcard.nation = val.value
    this.nation = this.$dict.getDictName(Number(this.idcard.nation))
    this.pickerDialog = false
  }
  //测试图片上传
  onRead(val, number) {
    return ({ file }) => {
      NetService.upload(file).then(x => {
        console.log(x)
        this[val] = x.localUrl
        for (let i in this.arrImg) {
          if (this.arrImg[i].typeName == number) {
            this.arrImg.splice(i, 1)
          }
        }
        this.arrImg.push({
          // personalId: x.id,
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
    for (let i in this.arrImg) {
      if (this.arrImg[i].typeName == number) {
        this.arrImg.splice(i, 1)
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
    this.columns = this.$dict.getDictData('0486').map(v => {
      return Object.assign({ text: v.label }, v)
    })

  }
}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoFirst {
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
    .imgSize {
      height: 110px;
      border: 1px solid #6666;
      width: 90%;
      margin-top: 10px;
    }
  }
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
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
</style>
<style lang="less">
.page.uploadIdPhotoFirst {
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
    position: fixed;
    bottom: 0rem;
  }
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
}
</style>
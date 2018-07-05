<template>
  <section class="page contactInformation">
    <van-row>
      <p class="base-info-title">联系人一</p>
      <van-cell-group>
        <van-cell title="与承租人关系" required is-link :value="contactModel.falseRelation" @click="relationBot=true" />
        <van-field name="center" v-model="contactModel.username" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field name="center" maxlength="11" v-model="contactModel.phone" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
    </van-row>
    <van-row>
      <p class="base-info-title">联系人二</p>
      <van-cell-group>
        <van-cell title="与承租人关系" required is-link :value="contactModel.falseRelationTwo" @click="relationBotTwo=true" />
        <van-field name="center" v-model="contactModel.usernameTwo" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field name="center" maxlength="11" v-model="contactModel.phoneTwo" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
    </van-row>

    <!-- 与承租人关系 -->
    <transition name="fade">
      <van-picker :columns="relations" v-show="relationBot" show-toolbar ref="vanpicker" @confirm="relationfirm" @cancel="relationBot=false" />
    </transition>

    <transition name="fade">
      <van-picker :columns="relationsTwo" v-show="relationBotTwo" show-toolbar ref="vanpicker" @confirm="relationfirmTwo" @cancel="relationBotTwo=false" />
    </transition>

    <van-button type="primary" class="nextStepSty" @click="relationAffirm" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";

@Component({})
export default class Login extends Vue {
  @Mutation linkman
  @State intoA
  // 联系人1
  private relationBot: boolean = false
  private relations: any = []
  // 联系人2
  private relationBotTwo: boolean = false
  private relationsTwo: any = []


  private contactModel = {
    phone: "",    // 手机号
    username: "",  // 姓名
    relation: '',  // 与承租人关系id
    falseRelation: '', // 承租人关系文字
    phoneTwo: "",
    usernameTwo: "",
    relationTwo: '',  // 与承租人关系id
    falseRelationTwo: '', // 承租人关系文字
  }


  private value: any = null;
  private type: any;

  /**
   * 联系人1 下拉点击确定
   */
  relationfirm(val) {
    this.contactModel.relation = val.value
    this.contactModel.falseRelation = this.$dict.getDictName(Number(this.contactModel.relation))
    this.relationBot = false
  }
  relationfirmTwo(val) {
    this.contactModel.relationTwo = val.value
    this.contactModel.falseRelationTwo = this.$dict.getDictName(Number(this.contactModel.relationTwo))
    this.relationBotTwo = false
  }
  // 验证规则
  private rules = {
    falseRelation: { required: true, message: '请选择与承租人关系' },
    username:[ { required: true, message: '请输入联系人姓名' },{ validator: this.$validator.CharacterName }],
    phone: [{ required: true, message: "请输入正确的联系人手机号" }, { validator: this.$validator.phoneNumber }],
    falseRelationTwo: { required: true, message: '请选择与承租人关系' },
    usernameTwo:[{ required: true, message: '请输入联系人姓名' },{ validator: this.$validator.CharacterName }], 
    phoneTwo: [{ required: true, message: "请输入正确的联系人手机号" }, { validator: this.$validator.phoneNumber }],


  };

  /**
   * 联系人点击下一步
   */
  relationAffirm() {
    this.$validator.validate(this.contactModel, this.rules).then(error => {
      if (!error) {
        this.$router.push('/add-information')
        this.linkman(this.contactModel)
      } else {
        this.$toast(error);
      }
    });

  }

  mounted() {

    if (!!this.intoA.PersonalContact) {
      this.contactModel = this.intoA.PersonalContact
    }
    // 承租人关系 直系亲属
    this.relations = this.$dict.getDictData('0015').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 承租人关系 非直系亲属
    this.relationsTwo = this.$dict.getDictData('0016').map(v => {
      return Object.assign({ text: v.label }, v)
    })

    let els: any = document.getElementsByName("center")
    els.forEach(v => {
      v.onclick = () => {
        setTimeout(() => {
          (v as HTMLElement).scrollIntoView(true)
        }, 300);
      }
    })



  }


}
</script>
<style lang="less" scoped>
.nextStepSty {
  margin-top: 30px;
}
.van-picker {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 100;
}
.base-info-title {
  color: gray;
  padding: 12px;
  font-size: 0.8rem;
  border-bottom: 1px solid #e8e8e8;
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
</style>

<style  lang="less">
.page.contactInformation {
  .van-field__control {
    text-align: right;
    padding-left: 24px;
    box-sizing: border-box;
  }
}
</style>

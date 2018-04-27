<!--添加收款项-->
<template>
  <section class="component add-people">
    <i-form :model="peopleModel" :rules="peopleRules" :label-width="150" ref="people-form">
      <i-form-item label="与本人关系" prop="relation">
        <i-select v-model="peopleModel.relation">
          <template v-if="family">
            <i-option label="配偶" :value="56"></i-option>
            <i-option label="父母" :value="57"></i-option>
            <i-option label="子女" :value="58"></i-option>
            <i-option label="亲属" :value="59"></i-option>
          </template>
          <template v-else>
            <i-option label="同事" :value="60"></i-option>
            <i-option label="朋友" :value="61"></i-option>
            <i-option label="其他" :value="62"></i-option>
          </template>
        </i-select>
      </i-form-item>
      <i-form-item label="姓名" prop="name">
        <i-input v-model="peopleModel.name"></i-input>
      </i-form-item>
      <i-form-item label="联系方式" prop="phone">
        <i-input v-model="peopleModel.phone"></i-input>
      </i-form-item>
      <i-form-item label="单位名称" prop="employer">
        <i-input v-model="peopleModel.employer"></i-input>
      </i-form-item>
      <i-form-item label="家庭地址" prop="address">
        <i-input v-model="peopleModel.address"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FormatInputPathObject } from "path";
import { Form } from "iview";
@Component({
  components: {}
})
export default class addPeople extends Vue {
  @Prop({
    default: false
  })
  family;

  @Prop() model;

  public peopleModel = {
    relation: "",
    name: "",
    phone: "",
    employer: "",
    address: ""
  };

  private peopleRules: any = {
    relation: [
      {
        required: true,
        message: "与本人关系不能为空",
        trigger: "change",
        type: "number"
      }
    ],
    name: [
      {
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
      }
    ],
    phone: [
      {
        required: true,
        message: "电话不能为空",
        trigger: "blur"
      },
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ]
  };

  public validate() {
    let peopleForm = this.$refs["people-form"] as Form;
    return peopleForm.validate();
  }

  mounted() {
    if (this.model) {
      this.peopleModel = Object.assign({}, this.model);
    }
  }
}
</script>

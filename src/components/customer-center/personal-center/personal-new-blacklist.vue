<!--新增黑名单-->
<template> 
  <section class="component personal-new-blacklist">
    <i-form :rules="ruleValidateRule" :model="blackListModel" ref="form-item" :label-width="90">
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="客户姓名" prop="name">
            <i-input  placeholder="请输入客户姓名" v-model="blackListModel.name"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="手机号码" prop="telephone">
            <i-input  placeholder="请输入手机号码" v-model="blackListModel.telephone"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="证件类型" prop="certificateType">
            <i-select placeholder="请选择证件类型" v-model="blackListModel.certificateType">
              <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="证件号码" prop=" idCard">
            <i-input placeholder="请输入证件号码"  v-model="blackListModel.idCard"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Dependencies } from '~/core/decorator'
  import { PersonalService} from "~/services/manage-service/personal.service";
  import { Form } from 'iview'

  @Component({
    components: {}
  })
  export default class PersonalNewBlacklist extends Vue {
    @Dependencies(PersonalService) private personalService: PersonalService
    private blackListModel:any = {
      name:'',
      telephone:'',
      certificateType:'',
       idCard:''
    }
    private ruleValidateRule: any = {
      name: [{required: true, message: "请输入客户姓名", trigger: 'blur'} ],
      telephone: [{required: true, message: "请输入手机号码", trigger: "blur"},{validator: this.$validator.phoneNumber,trigger: "blur"}],
      certificateType:[{required: true, message: "请输入证件类型", trigger: "change",type: 'number'}],
       idCard:[{required: true, message: "请输入证件号码", trigger: 'blur'}, {validator: this.$validator.idCard,trigger: "blur"}]
    }

    /**
     *  保存黑名单
     */
    saveList(){
      let form = <Form>this.$refs['form-item']
      form.validate(valid => {
        if (!valid) return false
        this.personalService.createBlacklistCustomer(this.blackListModel)
          .subscribe( data => {
            this.$Message.success("保存成功!")
            this.$emit('close');
          },({msg}) => {
            this.$Message.error(msg)
          })
      })
    }
    reset(){
      let productForm = this.$refs["form-item"] as Form;
      productForm.resetFields();
    }
  }
</script>
<style lang="less" scoped>

</style>

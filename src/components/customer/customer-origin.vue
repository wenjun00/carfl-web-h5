<!--客户职业-->
<template>
  <section class="component customer-origin">
    <i-card title="客户来源">
      <i-form ref="job-form" :model="introduceModel" :label-width="120">
        <i-form-item label="来源方式:">
          <i-radio-group v-model="originType" @on-change="onOriginTypeChange">
            <i-radio :label="1">通过宣传</i-radio>
            <i-radio :label="2">通过介绍</i-radio>
          </i-radio-group>
        </i-form-item>
        <template v-if="originType === 1">
          <i-form-item label="通过宣传:">
            <i-checkbox-group v-model="publicityModel">
              <i-checkbox v-for="(item,index) in publicResource" :key="index" :label="item.resourceType">{{item.label}}</i-checkbox>
            </i-checkbox-group>
          </i-form-item>
        </template>
        <template v-if="originType === 2">
          <i-form-item label="通过介绍:">
            <i-radio-group v-model="introduceModel.resourceType" @on-change="introduceTypeChange">
              <i-radio :label="81" :value="81" :key="81">同行推荐</i-radio>
              <i-radio :label="82" :value="82" :key="82">客户转介绍</i-radio>
              <i-radio :label="83" :value="83" :key="83">分支机构推荐</i-radio>
            </i-radio-group>
          </i-form-item>
          <!--同行推荐-->
          <template v-if="introduceModel.resourceType===81">
            <i-form-item label="同行姓名:" prop="peerName">
              <i-input type="text" v-model="introduceModel.peerName"></i-input>
            </i-form-item>
            <i-form-item label="同行公司:" prop="peerCompany">
              <i-input type="text" v-model="introduceModel.peerCompany"></i-input>
            </i-form-item>
            <i-form-item label="同行联系方式:" prop="peerPhone">
              <i-input type="text" v-model="introduceModel.peerPhone"></i-input>
            </i-form-item>
          </template>
          <!--客户转介绍-->
          <template v-if="introduceModel.resourceType===82">
            <i-form-item label="客户姓名" prop="customerName">
              <i-input type="text" v-model="introduceModel.customerName"></i-input>
            </i-form-item>
            <i-form-item label="联系方式" prop="customerPhone">
              <i-input type="text" v-model="introduceModel.customerPhone"></i-input>
            </i-form-item>
            <i-form-item label="在我司是否成功购车" prop="isBuyCar">
              <i-radio-group v-model="introduceModel.isBuyCar">
                <i-radio :label="0" :value="0" :key="0">是</i-radio>
                <i-radio :label="1" :value="1" :key="1">否</i-radio>
              </i-radio-group>
            </i-form-item>
          </template>
          <!--分支机构推-->
          <template v-if="introduceModel.resourceType===83">
            <i-form-item label="机构名称" prop="organizationNames">
              <i-input type="text" v-model="introduceModel.organizationNames"></i-input>
            </i-form-item>
            <i-form-item label="推荐人" prop="referrer">
              <i-input type="text" v-model="introduceModel.referrer"></i-input>
            </i-form-item>
          </template>
        </template>

      </i-form>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Form } from "iview";

// 通过宣传资源
const PUBLIC_TYPE = [
  { label: '宣传页', resourceType: 65 },
  { label: '网络推广', resourceType: 66 },
  { label: '电销', resourceType: 67 },
  { label: '营销活动', resourceType: 68 },
  { label: '到店经营', resourceType: 69 },
  { label: '总部推荐', resourceType: 70 },
  { label: '其他', resourceType: 80 }
]

@Component({})
export default class CustomerOrigin extends Vue {
  public originType = 1; // 来源类型
  private publicityModel = [];

  public introduceModel: any = {
    resourceType: "", // 来源

    peerName: "", // 同行姓名
    peerCompany: "", // 同行公司
    peerPhone: "", // 同行联系方式

    customerName: "", // 客户姓名
    customerPhone: "", // 联系方式
    isBuyCar: "", // 在我司是否成功购车

    organizationNames: "", // 机构名称
    referrer: "" // 推荐人
  };

  // 通过宣传数据来源
  private publicityDataResource: Array<any> = []
  private publicResource = PUBLIC_TYPE

  // 接口返回的数据。用于获取id。personalId
  private personalResourcePublicity: Array<any> = []


  onOriginTypeChange() {
    this.reset()
  }

  revert(data) {
    if (data.personal && data.personal.personalResourcePublicity) {
      this.personalResourcePublicity = data.personal.personalResourcePublicity
      // 获取返回的Type 用于显示
      this.publicityModel = this.personalResourcePublicity.map(v => v.resourceType)
      this.originType = 1;
    }
    if (data.personal && data.personal.personalResourceIntroduce) {
      this.introduceModel = data.personal.personalResourceIntroduce;
      this.originType = 2;
    }
  }

  /**
   * 获取公共推荐对象列表
   */
  getPublicityModel() {
    return this.publicityModel.map(v => {
      let current = this.publicityDataResource.find(k => k.resourceType === v)
      // 如果在回填数据中找到了当前选中项目。就原分不动的返回去
      // 否则，只返回一个带有resourceType 的对象
      return current || { resourceType: v }
    })
  }


  reset() {
    this.publicityModel = []
    this.introduceModel.resourceType = "";
    this.$common.reset(this.introduceModel)
  }

  introduceTypeChange(value) {
    let form = this.$refs['job-form'] as Form;
    form.resetFields();
    this.originType = 2;
    this.introduceModel.resourceType = value;
  }

  async validate() {
    return Promise.resolve().then(() => {
      if (
        this.originType &&
        (this.publicityModel.length || this.introduceModel.resourceType)
      ) {
        return true;
      }

      this.$Message.error("请选择客户来源方式");
    });
  }
}
</script>

<style lang="less" scoped>

</style>

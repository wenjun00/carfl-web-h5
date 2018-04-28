<!--确认开票-->
<template>
  <div class="component confirm-make-invoice">
    <i-form :label-width="110">
      <i-row>
        <i-col :span="12">
          <i-form-item label="开票金额">
            <i-input class="modal-item-input"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item class="modal-item-input" label="发票抬头">
            <i-input class="modal-item-input"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开票日期">
            <i-date-picker size="default"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发票号">
            <i-input class="modal-item-input"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <!--发票-->
    <i-row class="modal-item">
      <div>
        <div class="modal-item-fapiao"></div>
        <span>发票</span>
      </div>
      <i-row class="modal-item-fujian">
        <i-col :span="12">
          <div class="modal-item-fujian-div">
            <Icon type="plus-circled" class="modal-item-fujian-icon" size="40"></Icon>
            <div>点击添加附件</div>
            <span class="modal-item-fujian-text">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div class="modal-item-div">
          </div>
        </i-col>
      </i-row>
    </i-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({})
export default class ConfirmMakeInvoice extends Vue {
  private single: Boolean = false;
}

</script>

<style scoped lang="less">
.confirm-make-invoice {
  .ivu-form {
    position: relative;
    right: 30px;
  }
}

.component.confirm-make-invoice {
  .modal-item {
    margin-top: 20px;
  }
  .modal-item-fapiao {
    width: 7px;
    height: 20px;
    background: #265ea2;
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
  .modal-item-fujian {
    margin-top: 10px;
  }
  .modal-item-fujian-div {
    height: 200px;
    width: 200px;
    border: 1px solid #c2c2c2;
    cursor: pointer;
    text-align: center;
    position: relative;
    left: 40px;
  }
  .modal-item-fujian-icon {
    display: block;
    margin-top: 53px;
    color: #265ea2;
  }
  .modal-item-fujian-text {
    color: gray;
  }
  .modal-item-div {
    height: 200px;
    width: 200px;
    border: 1px solid #c2c2c2;
    background-image: url("/static/images/common/invoice2.png");
    background-repeat: no-repeat;
    position: relative;
    left: 72px;
  }
  .modal-item-input {
    width: 200px;
  }
}
</style>

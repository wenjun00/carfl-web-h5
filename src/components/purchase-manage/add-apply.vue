<!--添加新申请-->
<template>
  <section class="component add-apply">
    <!--销售收款申请-->
    <i-row>
      <i-form :label-width="100" style="margin-top:20px;">
        <i-col :span="12">
          <i-form-item label="客户姓名">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="收款类型">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="身份证号">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="选择订单">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <span class="title">收款明细</span>
      <data-box :columns="columns1" :data="data1"></data-box>
      <span class="title">账户信息</span>
      <data-box :columns="columns3" :data="data3"></data-box>
      <span class="title">附件</span>
      <i-row>
        <i-col :span="12">
          <div style="height:300px;width:300px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
            @click="addAttachment">
            <Icon type="plus-circled" style="display:block;margin-top:100px;" size="40"></Icon>
            <div>点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div style="height:300px;width:300px;border:1px solid #C2C2C2;background:url();position:relative;left:40px;">

          </div>
        </i-col>
      </i-row>
    </i-row>
    <!--提前结清申请-->
    <!--<i-row v-if="applyType==='提前结清申请'">
      
    </i-row>-->
    <!--提前收回申请-->
    <!--<i-row v-if="applyType==='提前收回申请'">
      
    </i-row>-->
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <data-box :columns="columns2" :data="data2"></data-box>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    
    components: {
      DataBox
    }
  })
  export default class AddApply extends Vue {
    private applyType: String = '销售收款申请'
    private data1: Array < Object > = [];
    private columns1: any;
    private openColumnsConfig: Boolean = false
    private columns2: any;
    private data2: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];

    /**
     * 添加附件
     */
    addAttachment() {}
    created() {
      this.columns1 = [{
        align: 'center',
        width: 60,
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  // this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "plus",
                  size: "20"
                }
              })
            ]
          );
        },
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (row.projectName !== '合计') {
            return h('Icon', {
              props: {
                type: 'trash-b',
                size: "20"
              }
            })
          }
        }
      }, {
        title: '项目名称',
        key: 'projectName',
        align: 'center'
      }, {
        title: '金额',
        key: 'money',
        align: 'center'
      }]

      this.data1 = [{
        projectName: '首付金额',
        money: '80000'
      }, {
        projectName: '首付月供',
        money: '10000'
      }, {
        projectName: '保证金',
        money: '8000'
      }, {
        projectName: '路桥费',
        money: '0'
      }, {
        projectName: '合计',
        money: '98000'
      }]
      this.columns2 = [{

      }]
      this.data2 = [{

      }]

      this.columns3 = [{
        title: "户名",
        align: 'center',
        key: 'accountName'
      }, {
        title: "开户银行",
        align: 'center',
        key: 'accountBank'
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'bankCardId'
      }, {
        title: "支行名称",
        align: 'center',
        key: 'branchBankName'
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'thirdCustomerId'
      }]
      this.data3 = [{
        accountName: '胡开甲',
        accountBank: '中国建设银行',
        bankCardId: '6227004171150135894',
        branchBankName: '大雁塔分行',
        thirdCustomerId: '853654689213'
      }]
    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
  }
</script>
<style lang="less" scope>
  .title {
    font-size: 14px;
    font-weight: bold;
  }
</style>
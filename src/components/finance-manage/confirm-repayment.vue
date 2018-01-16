<!--确认还款-->
<template>
  <section class="component confirm-repayment">
    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>客户信息</span>
    </div>
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>韩冰</div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="4">
        <template>
          <div>610525199312061245</div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额（元）" :span="2">
        <template>
          <div>1500</div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>12期</div>
        </template>
      </data-grid-item>
      <data-grid-item label="利率%/月" :span="2">
        <template>
          <div>4.35</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table border="1" width="868" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">本金</td>
        <td>应付本金</td>
        <td>800</td>
        <td>已还本金</td>
        <td>0</td>
        <td>剩余本金</td>
        <td>800</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>200</td>
        <td>已还利息</td>
        <td>100</td>
        <td>剩余利息</td>
        <td>200</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应付罚息</td>
        <td>10</td>
        <td>已还罚息</td>
        <td>0</td>
        <td>剩余罚息</td>
        <td><span style="color:red;text-decoration:line-through;margin-right:6px;">10.00</span><span>0</span></td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>1010</td>
        <td>已还本金</td>
        <td>0</td>
        <td>剩余本金</td>
        <td>1010</td>
      </tr>
    </table>

    <div style="margin-top:10px;">
      <!--<span style="font-size:14px;font-weight:bold;position:relative;top:20px;">还款总额：1010<span></span></span>-->
      <i-button class="blueButton" style="float:right;margin-bottom:10px;" @click="checkDeductRecord">查看划扣记录</i-button>
    </div>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款方式</span>
    </div>
    <table border="1" width="868" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="2">收款方式</td>
        <td bgcolor="#F2F2F2" colspan="1">金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40">
        <td>
          <i-icon type="plus" style="color:#199ED8"></i-icon>
          <i-icon type="minus" style="margin-left:10px;color:#199ED8"></i-icon>
        </td>
        <td>
          <i-select placeholder="选择收款方式" style="display:inline-block;width:90%">
            <i-option label="汇付" value="汇付" key="汇付"></i-option>
            <i-option label="支付宝" value="支付宝" key="支付宝"></i-option>
            <i-option label="现金" value="现金" key="现金"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px"></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" style="margin-left:6px;cursor:pointer"></i-icon>
        </td>
      </tr>
    </table>
    <i-form>
      <i-form-item label="备注">
        <i-input type="textarea" v-model="remark"></i-input>
      </i-form-item>
    </i-form>

    <div style="margin-top:10px;margin-bottom:10px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款凭证</span>
      </div>
      <!--<i-button class="blueButton" style="float:right">凭证上传</i-button>
      <i-button class="blueButton" style="float:right">全部下载</i-button>-->

      <i-row style="margin-top:20px">
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;">
            <Icon type="plus-circled" style="display:block;margin-top:53px;" color="#265ea2" size="40"></Icon>
            <div>点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;right:140px;">
          </div>
        </i-col>
      </i-row>
    </div>
    <!--<data-box :columns="columns1" :data="data1"></data-box>-->

    <template>
      <i-modal title="划扣记录" v-model="deductRecordModal" width="1200">
        <deduct-record></deduct-record>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  import {
    Dependencies
  } from "~/core/decorator";


  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      DeductRecord
    }
  })
  export default class ConfirmRepayment extends Vue {
    private columns1: any;
    private data1: Array < Object >= [];
    private data2: Array < Object >= [];
    private deductRecordModal: Boolean = false
    private remark: String = ''


    checkDeductRecord() {
      console.log(123)
      this.deductRecordModal = true
    }
    created() {
      this.columns1 = [{
          title: '操作',
          width: '200',
          align: 'center',
          render: (h, params) => {

            return h('div', [
              h('Icon', {
                props: {
                  type: 'archive',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'eye',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  marginRight: '15px',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'trash-a',
                  size: '20'
                },
                style: {
                  cursor: 'pointer',
                  color: '#199ED8'
                },
                on: {
                  click: () => {

                  }
                }
              })
            ])

          }
        },
        {
          title: '附件信息',
          align: 'center',
          key: 'attachmentName'
        },
        {
          align: 'center',
          title: '上传日期',
          key: 'uploadTime'
        },
        {
          align: 'center',
          title: '上传人',
          key: 'uploadPerson'
        }
      ]

      this.data1 = [{
        attachmentName: 'kb0917',
        uploadTime: '2017-12-03 14:56:25',
        uploadPerson: '胡开甲'
      }]

    }

  }

</script>

<style lang="less" scope>


</style>

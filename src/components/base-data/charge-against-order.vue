<!--冲抵顺序配置-->
<template>
  <section class="component charge-against-order">
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataGrid,
      DataGridItem,
      DataBox
    }
  })
  export default class ChargeAgainstOrder extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 160
      }, {
        title: '审批流',
        align: 'center',
        key: 'approvalFlow',
        width: 400
      }, {
        align: 'center',
        title: '操作',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("div", [
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？',
                      onOk: () => {
                        this.data1.forEach((x, i) => {
                          if (i === index) {
                            this.data1.splice(i, 1)
                          }
                        })
                      }
                    })
                  }
                }
              },
              "删除"
            ),
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {}
                }
              },
              "上移"
            ),
            h(
              "i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {}
                }
              },
              "下移"
            )
          ]);
        }
      }]

      this.data1 = [{
        approvalFlow: '面审'
      }, {
        approvalFlow: '复审'
      }, {
        approvalFlow: '终审'
      }, {
        approvalFlow: '合规'
      }]
    }

  }

</script>

<style lang="less">
  .addPeriodsItem {
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
  }

</style>

<!--客户联系人-->
<template>
  <section class="component customer-contacts">
    <span class="form-title">客户联系人</span>
    <div style="margin-left:10px;">直系亲属（提示：配偶(已婚必填)+必填2个直系亲属）</div>
    <data-box :columns="columns1" :data="data1"></data-box>
    <div style="margin-left:10px;">其他联系人（提示：必填3个其他联系人）</div>
    <data-box :columns="columns1" :data="data2"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import EditRelation from "~/components/purchase-manage/edit-relation.vue"
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";

  @Component({
    components: {
      DataBox,
      EditRelation
    }
  })
  export default class CustomerContacts extends Vue {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object >= [];
    private data2: Array < Object >= [];

    created() {
      this.columns1 = [{
        title: '操作',
        align: 'center',
        width: '60',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('div', {
            on: {
              click: () => {
                this.editModalOpen(row)
              }
            },
            style: {
              cursor: 'pointer'
            }
          }, [h('Icon', {
            props: {
              type: 'edit',
              size: '20'
            }
          })])
        }
      }, {
        title: '与本人关系',
        key: 'relation',
        align: 'center'
      }, {
        title: '姓名',
        key: 'relationName',
        align: 'center'
      }, {
        title: '联系方式',
        key: 'phone',
        align: 'center'
      }, {
        title: '单位名称',
        key: 'firmName',
        align: 'center'
      }, {
        title: '家庭住址',
        key: 'address',
        align: 'center'
      },{
        title: '操作',
        align: 'center',
        width: '60',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('div', {
            on: {
              click: () => {
                this.deleteRelation(row)
              }
            },
            style: {
              cursor: 'pointer'
            }
          }, [h('Icon', {
            props: {
              type: 'android-delete',
              size: '20'
            }
          })])
        }
      }]
      // 获取客户联系人直系亲属
      this.orderService.getContactsInfo().subscribe(({
        val
      }) => {
        this.data1 = val
      })
      // 获取客户联系人其他联系人
      this.orderService.getContactsRelationInfo().subscribe(({
        val
      }) => {
        this.data2 = val
      })

    }
    editModalOpen(row) {
      this.$Modal.info({
        title:'编辑联系人',
        render:h=>h(EditRelation,{
          props:{
            row
          }
        })
      })
    }
    deleteRelation(row){

    }
  }
</script>

<style lang="less" scope>

</style>

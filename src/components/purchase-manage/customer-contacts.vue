<!--客户联系人-->
<template>
  <section class="component customer-contacts">
    <div class="form-title">客户联系人</div>
    <i-button @click="addNewContacts" style="margin:10px 0" class="blueButton">添加联系人</i-button>
    <div style="margin-left:10px;display:inline-block">直系亲属（提示：配偶(已婚必填)+必填2个直系亲属）</div>
    <i-table :columns="columns1" :data="data1"></i-table>
    <i-button @click="addNewContacts2" style="margin:10px 0" class="blueButton">添加联系人</i-button>
    <div style="margin-left:10px;margin-top:20px;display:inline-block">其他联系人（提示：必填3个其他联系人）</div>
    <i-table :columns="columns1" :data="data2"></i-table>

    <template>
      <i-modal :title="addNew?'添加联系人':'编辑联系人'" v-model="editOrAddContactsModal">
        <i-form :label-width="100">
          <i-form-item label="与本人关系">
            <i-select v-model="contactsModel.relation">
              <i-option label="配偶" value="配偶" key="配偶"></i-option>
              <i-option label="父母" value="父母" key="父母"></i-option>
              <i-option label="子女" value="子女" key="子女"></i-option>
              <i-option label="朋友" value="朋友" key="朋友"></i-option>
              <i-option label="同事" value="同事" key="同事"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="姓名">
            <i-input v-model="contactsModel.name"></i-input>
          </i-form-item>
          <i-form-item label="联系方式">
            <i-input v-model="contactsModel.phone"></i-input>
          </i-form-item>
          <i-form-item label="单位名称">
            <i-input v-model="contactsModel.companyName"></i-input>
          </i-form-item>
          <i-form-item label="家庭地址">
            <i-input v-model="contactsModel.address"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="saveAndBack">保存并返回</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal :title="addNew?'添加联系人':'编辑联系人'" v-model="editOrAddContactsModal2">
        <i-form :label-width="100">
          <i-form-item label="与本人关系">
            <i-select v-model="contactsModel.relation">
              <i-option label="配偶" value="配偶" key="配偶"></i-option>
              <i-option label="父母" value="父母" key="父母"></i-option>
              <i-option label="子女" value="子女" key="子女"></i-option>
              <i-option label="朋友" value="朋友" key="朋友"></i-option>
              <i-option label="同事" value="同事" key="同事"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="姓名">
            <i-input v-model="contactsModel.name"></i-input>
          </i-form-item>
          <i-form-item label="联系方式">
            <i-input v-model="contactsModel.phone"></i-input>
          </i-form-item>
          <i-form-item label="单位名称">
            <i-input v-model="contactsModel.companyName"></i-input>
          </i-form-item>
          <i-form-item label="家庭地址">
            <i-input v-model="contactsModel.address"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="saveAndBack2">保存并返回</i-button>
        </div>
      </i-modal>
    </template>
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
    private editOrAddContactsModal: Boolean = false;
    private editOrAddContactsModal2: Boolean = false;
    private addNew: Boolean = false; //根据此判断是编辑还是新增
    private contactsModel: Object = {
      relation: '',
      name: '',
      phone: '',
      companyName: '',
      address: ''
    }

    created() {
      this.columns1 = [{
        title: '操作',
        align: 'center',
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('i-button', {
            props: {
              type: 'text'
            },
            style: {
              color: 'blue'
            },
            on: {
              click: () => {
                this.editContacts(row)
                this.addNew = false
                this.editOrAddContactsModal = true
              }
            }
          }, '编辑')
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
      }]
      // 获取客户联系人直系亲属
      // this.orderService.getContactsInfo().subscribe(({
      //   val
      // }) => {
      //   this.data1 = val
      // })

      this.data1 = []
      this.data2 = []
      // 获取客户联系人其他联系人
      // this.orderService.getContactsRelationInfo().subscribe(({
      //   val
      // }) => {
      //   this.data2 = val
      // })

    }
    editContacts(row) {
      this.contactsModel = {
        relation: row.relation,
        name: row.relationName,
        phone: row.phone,
        companyName: row.firmName,
        address: row.address
      }
    }
    deleteRelation(row) {

    }
    saveAndBack() {
      this.editOrAddContactsModal = false
      this.orderService.getContactsInfo().subscribe(({
        val
      }) => {
        this.data1 = val
      })
    }
    saveAndBack2() {
      this.editOrAddContactsModal2 = false
      // 获取客户联系人其他联系人
      this.orderService.getContactsRelationInfo().subscribe(({
        val
      }) => {
        this.data2 = val
      })
    }
    addNewContacts() {
      this.addNew = true
      this.editOrAddContactsModal = true
      this.contactsModel = {
        relation: '',
        name: '',
        phone: '',
        companyName: '',
        address: ''
      }
    }

    addNewContacts2() {
      this.addNew = true
      this.editOrAddContactsModal2 = true
      this.contactsModel = {
        relation: '',
        name: '',
        phone: '',
        companyName: '',
        address: ''
      }
    }
  }

</script>

<style lang="less" scope>


</style>

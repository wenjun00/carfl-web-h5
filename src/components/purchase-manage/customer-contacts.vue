<!--客户联系人-->
<template>
  <section class="component customer-contacts">
    <div class="form-title">客户联系人</div>
    <div style="margin-left:10px;">直系亲属（提示：配偶(已婚必填)+必填2个直系亲属）</div>
    <i-table :columns="columns1" :data="data1" width="1100"></i-table>
    <!--<i-button @click="addNewContacts" style="margin:10px 0" class="blueButton">添加联系人</i-button>-->
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addNewContacts" style="margin-left:10px;color:#265ea2" type="text">添加联系人</i-button>
    </div>
    <div style="margin-left:10px;margin-top:20px;">其他联系人（提示：必填3个其他联系人）</div>
    <i-table :columns="columns2" :data="data2" width="1100"></i-table>
    <!--<i-button @click="addNewContacts2" style="margin:10px 0" class="blueButton">添加联系人</i-button>-->
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addNewContacts2" style="margin-left:10px;color:#265ea2" type="text">添加联系人</i-button>
    </div>

    <template>
      <i-modal :title="addNew?'添加联系人':'编辑联系人'" v-model="editOrAddContactsModal">
        <i-form :rules="rules" :label-width="110" ref="contacts" :model="contactsModel">
          <i-form-item label="与本人关系" prop="relation">
            <i-select v-model="contactsModel.relation" clearable>
              <i-option label="配偶" :value="56"></i-option>
              <i-option label="父母" :value="57"></i-option>
              <i-option label="子女" :value="58"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="姓名" prop="name">
            <i-input v-model="contactsModel.name"></i-input>
          </i-form-item>
          <i-form-item label="联系方式" prop="phone">
            <i-input v-model="contactsModel.phone"></i-input>
          </i-form-item>
          <i-form-item label="单位名称" prop="employer">
            <i-input v-model="contactsModel.employer"></i-input>
          </i-form-item>
          <i-form-item label="家庭地址" prop="address">
            <i-input v-model="contactsModel.address"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="saveAndBack" class="blueButton">保存并返回</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal :title="addNew?'添加联系人':'编辑联系人'" v-model="editOrAddContactsModal2">
        <i-form :rules="rules" :label-width="110" ref="other-contacts" :model="contactsModel">
          <i-form-item label="与本人关系" prop="relation">
            <i-select v-model="contactsModel.relation">
              <i-option label="亲属" :value="59"></i-option>
              <i-option label="同事" :value="60"></i-option>
              <i-option label="朋友" :value="61"></i-option>
              <i-option label="其他" :value="62"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="姓名" prop="name">
            <i-input v-model="contactsModel.name"></i-input>
          </i-form-item>
          <i-form-item label="联系方式" prop="phone">
            <i-input v-model="contactsModel.phone"></i-input>
          </i-form-item>
          <i-form-item label="单位名称" prop="employer">
            <i-input v-model="contactsModel.employer"></i-input>
          </i-form-item>
          <i-form-item label="家庭地址" prop="address">
            <i-input v-model="contactsModel.address"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="saveAndBack2" class="blueButton">保存并返回</i-button>
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
    private columns2: any;
    private data1: Array < Object >= [];
    private data2: Array < Object >= [];
    private editOrAddContactsModal: Boolean = false;
    private editOrAddContactsModal2: Boolean = false;
    private rowData: any;
    private addNew: Boolean = false; //根据此判断是编辑还是新增
    private contactsModel: any = {
      relation: '',
      name: '',
      phone: '',
      employer: '',
      address: ''
    };
    private rules: any = {
      relation: [{
        required: true,
        message: "与本人关系不能为空",
        trigger: "change",
        type: 'number'
      }],
      name: [{
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
      }],
      phone: [{
        required: true,
        message: "电话不能为空",
        trigger: "blur"
      }],
    }
    // private othercontactsModel: any = {
    //   relation: '',
    //   name: '',
    //   phone: '',
    //   employer: '',
    //   address: ''
    // }

    created() {
      this.columns1 = [{
        title: '操作',
        align: 'center',
        render: (h, {
          row,
          columns,
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
                    this.editContacts(row)
                    this.addNew = false
                    this.editOrAddContactsModal = true
                  }
                }
              },
              "编辑"
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
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？',
                      onOk: () => {
                        this.data1.splice(index, 1);
                      }
                    })
                  }
                }
              },
              "删除"
            )
          ]);
        }
      }, {
        title: '与本人关系',
        key: 'relation',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.relation));
        }
      }, {
        title: '姓名',
        key: 'name',
        align: 'center'
      }, {
        title: '联系方式',
        key: 'phone',
        align: 'center'
      }, {
        title: '单位名称',
        key: 'employer',
        align: 'center'
      }, {
        title: '家庭住址',
        key: 'address',
        align: 'center'
      }]
      this.columns2 = [{
        title: '操作',
        align: 'center',
        render: (h, {
          row,
          columns,
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
                    this.editContacts(row)
                    this.addNew = false
                    this.editOrAddContactsModal2 = true
                  }
                }
              },
              "编辑"
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
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？',
                      onOk: () => {
                        this.data2.splice(index, 1);
                      }
                    })
                  }
                }
              },
              "删除"
            )
          ]);
        }
      }, {
        title: '与本人关系',
        key: 'relation',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h("span", {}, this.$dict.getDictName(row.relation));
        }
      }, {
        title: '姓名',
        key: 'name',
        align: 'center'
      }, {
        title: '联系方式',
        key: 'phone',
        align: 'center'
      }, {
        title: '单位名称',
        key: 'employer',
        align: 'center'
      }, {
        title: '家庭住址',
        key: 'address',
        align: 'center'
      }]
      this.data1 = []
      this.data2 = []
    }
    /**
     * 客户联系人反显
     */
    Reverse(data) {
      let personalContactsData1: any = data.personal.personalContacts.filter(v => v.relation === 56 || v.relation ===
        57 || v.relation === 58)
      let personalContactsData2: any = data.personal.personalContacts.filter(v => v.relation === 59 || v.relation ===
        60 || v.relation === 61 || v.relation === 62)
      this.data1 = personalContactsData1
      this.data2 = personalContactsData2
    }
    editContacts(row) {
      this.rowData = row
      this.contactsModel = {
        relation: row.relation,
        name: row.name,
        phone: row.phone,
        employer: row.employer,
        address: row.address
      }
    }
    deleteRelation(row) {

    }
    /**
     * 添加直系联系人
     */
    saveAndBack() {
      let registerForm: any = this.$refs["contacts"];
      registerForm.validate(valid => {
        if (!valid) {
          return false
        }
        if (this.addNew) {
          this.data1.push({
            relation: this.contactsModel.relation,
            name: this.contactsModel.name,
            phone: this.contactsModel.phone,
            employer: this.contactsModel.employer,
            address: this.contactsModel.address
          })
        } else {
          this.rowData.relation = this.contactsModel.relation
          this.rowData.name = this.contactsModel.name
          this.rowData.phone = this.contactsModel.phone
          this.rowData.employer = this.contactsModel.employer
          this.rowData.address = this.contactsModel.address
        }
        //   let contacts_ref = this.$refs['contacts']
        //   contacts_ref.resetFields()
        this.editOrAddContactsModal = false
      })
    }
    /**
     * 添加其他联系人
     */
    saveAndBack2() {
      let registerForm: any = this.$refs["other-contacts"];
      registerForm.validate(valid => {
        if (!valid) {
          return false
        }
        if (this.addNew) {
          this.data2.push({
            relation: this.contactsModel.relation,
            name: this.contactsModel.name,
            phone: this.contactsModel.phone,
            employer: this.contactsModel.employer,
            address: this.contactsModel.address
          })
        } else {
          this.rowData.relation = this.contactsModel.relation
          this.rowData.name = this.contactsModel.name
          this.rowData.phone = this.contactsModel.phone
          this.rowData.employer = this.contactsModel.employer
          this.rowData.address = this.contactsModel.address
        }
        //   let other_ref = this.$refs['other-contacts']
        //   other_ref.resetFields()
        this.editOrAddContactsModal2 = false
      })
    }
    addNewContacts() {
      let form: any = this.$refs['contacts'];
      form.resetFields();
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
      let form: any = this.$refs['other-contacts'];
      form.resetFields();
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

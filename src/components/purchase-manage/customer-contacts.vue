<!--客户联系人-->
<template>
  <section class="component customer-contacts">
    <i-card title="直系亲属">
      <div slot="extra">
        <i-button icon="plus" @click="onAddPeople(true)" class="form-button" type="text">添加联系人</i-button>
      </div>
      <i-table :columns="familyColumns" :data="familyDataSet"></i-table>
      <p class="tip">提示：配偶(已婚必填)+必填2个直系亲属</p>
    </i-card>

    <i-card title="其他联系人">
      <div slot="extra">
        <i-button icon="plus" @click="onAddPeople()" class="form-button" type="text">添加联系人</i-button>
      </div>
      <i-table :columns="friendColumns" :data="friendDataSet"></i-table>
      <p class="tip">提示：必填3个其他联系人</p>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import AddPeople from "~/components/purchase-manage/add-people.vue";
@Component({
  components: {
    DataBox,
    AddPeople
  }
})
export default class CustomerContacts extends Vue {
  @Dependencies(OrderService) private orderService: OrderService;

  private editOrAddContactsModal: Boolean = false;
  private editOrAddContactsModal2: Boolean = false;
  private rowData: any;
  private addNew: Boolean = false; //根据此判断是编辑还是新增
  public familyDataSet: Array<any> = [];
  public friendDataSet: Array<any> = [];
  private familyColumns = [
    {
      title: "操作",
      align: "center",
      render: (h, { row, columns, index }) => {
        return h("div", [
          h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.onEditPeople(true, index);
                }
              }
            },
            "编辑"
          ),
          h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除吗？",
                    onOk: () => {
                      this.familyDataSet.splice(index, 1);
                    }
                  });
                }
              }
            },
            "删除"
          )
        ]);
      }
    },
    {
      title: "与本人关系",
      key: "relation",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.relation));
      }
    },
    {
      title: "姓名",
      key: "name",
      align: "center"
    },
    {
      title: "联系方式",
      key: "phone",
      align: "center"
    },
    {
      title: "单位名称",
      key: "employer",
      align: "center"
    },
    {
      title: "家庭住址",
      key: "address",
      align: "center"
    }
  ];

  private friendColumns = [
    {
      title: "操作",
      align: "center",
      render: (h, { row, columns, index }) => {
        return h("div", [
          h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.onEditPeople(false, index);
                }
              }
            },
            "编辑"
          ),
          h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除吗？",
                    onOk: () => {
                      this.friendDataSet.splice(index, 1);
                    }
                  });
                }
              }
            },
            "删除"
          )
        ]);
      }
    },
    {
      title: "与本人关系",
      key: "relation",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.relation));
      }
    },
    {
      title: "姓名",
      key: "name",
      align: "center"
    },
    {
      title: "联系方式",
      key: "phone",
      align: "center"
    },
    {
      title: "单位名称",
      key: "employer",
      align: "center"
    },
    {
      title: "家庭住址",
      key: "address",
      align: "center"
    }
  ];

  // 自定义校验规则
  customRules = {
    familyDataSetCount: [
      {
        type:'number',
        min: 2,
        message: "直系亲属不能少于2个"
      }
    ],
    friendDataSetCount: [
      {
        type:'number',
        min: 3,
        message: "其他联系人不能少于3个"
      }
    ]
  };

  onAddPeople(family) {
    let dataSet = family ? this.familyDataSet : this.friendDataSet;
    this.openPeopleDialog(family, dataSet);
  }

  onEditPeople(family, index) {
    let dataSet = family ? this.familyDataSet : this.friendDataSet;
    let model = index < 0 ? null : dataSet[index];
    this.openPeopleDialog(family, dataSet, model);
  }

  /**
   * 打开联系人页面
   */
  openPeopleDialog(family, dataSet, model?) {
    let dialog = this.$dialog.show({
      title: model ? "添加联系人" : "编辑联系人",
      footer: true,
      onOk: addPeople => {
        addPeople
          .validate()
          .then(() => {
            if (model) {
              Object.assign(model, addPeople.peopleModel);
            } else {
              dataSet.push(addPeople.peopleModel);
            }
          })
          .catch(() => {});
      },
      render: h => {
        return h(AddPeople, {
          props: {
            family,
            model
          }
        });
      }
    });
  }

  reset() {}

  validate() {
    return this.$validator
      .validate(
        {
          familyDataSetCount: this.familyDataSet.length,
          friendDataSetCount: this.friendDataSet.length
        },
        this.customRules
      )
      .then(error => {
        if (!error) {
          return true;
        }

        this.$Message.error(error);
      });
  }
  /**
   * 客户联系人反显
   */
  // Reverse(data) {
  //   let personalContactsData1: any = data.personal.personalContacts.filter(
  //     v => v.relation === 56 || v.relation === 57 || v.relation === 58
  //   );
  //   let personalContactsData2: any = data.personal.personalContacts.filter(
  //     v =>
  //       v.relation === 59 ||
  //       v.relation === 60 ||
  //       v.relation === 61 ||
  //       v.relation === 62
  //   );
  //   this.familyDataSet = personalContactsData1;
  //   this.data2 = personalContactsData2;
  // }
}
</script>

<style lang="less" scoped>
.component.customer-contacts {
  .tip {
    font-size: 10px;
    padding: 10px 0;
    color: #aeaeae;
  }

  .form-button {
    margin-left: 10px;
    color: #265ea2;
  }
}
</style>

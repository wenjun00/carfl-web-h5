<template>
  <div class="component columns-config">
    <i-table :columns="columns" :data="configData"></i-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import { UserService } from "~/services/manage-service/user.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {}
})
export default class ColumnsConfig extends Vue {
  @Dependencies(UserService) private userService: UserService;

  private columns: any = [];
  private configData: Array<any> = [];

  created() {}
  getColumnsData(row) {
    let userId = this.$store.state.userData.id;
    this.userService
      .findListboxByUserIdAndResoPid({
        userId: userId,
        resoPid: 69
      })
      .subscribe(
        data => {
          if (data === [20]) {
            // this.configData =
          } else {
            this.configData = data;
            console.log(data, 989);
          }
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
}
</script>

<style lang="less" scoped>

</style>

<template> 
  <section class="component polis-picker">
    <van-popup v-model="visible" position="bottom" :overlay="false">
      <van-picker @cancel="onCancel" @confirm="onConfirm" value-key="label" show-toolbar :columns="columns" @change="onChange" />
    </van-popup>
  </section>
</template>

<script lang="ts">
import Vue from "vue";  
import Component from "vue-class-component";
import { Prop, Model, Emit, Watch } from "vue-property-decorator";
import { PolisService } from "~/utils/polis.service";
const polisData = PolisService.getCityData();

@Component({
  components: {}
})
export default class CityPicker extends Vue {
  @Emit("on-confirm")
  emitConfirm(currentCitys) { }

  @Emit("on-cancel")
  emitCancel() { }

  private visible = false;
  private columns: any = [];

  onChange(picker, value, index) {
    for (let i = index + 1; i <= 2; i++) {
      let data = picker.getColumnValue(i - 1);
      picker.setColumnValues(i, data.children);
    }
  }

  onConfirm(data) {
    this.emitConfirm(data.map(x => x.value));
    this.visible = false;
  }

  onCancel() {
    this.reset();
    this.emitCancel()
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  mounted() {
    console.log(polisData,1111)
    this.reset();
  }

  reset() {
    // 默认选择城市
    let currentProvince = polisData[0];
    let currentCity = currentProvince.children[0];
    // let currentCounty = currentCity.children[0];

    this.columns = [
      {
        values: polisData
      },
      {
        values: currentProvince.children
      },
      // {
      //   values: currentCity.children
      // }
    ];
  }
}
</script>

<style lang="less" scoped>
.component.city-picker {
}
</style>

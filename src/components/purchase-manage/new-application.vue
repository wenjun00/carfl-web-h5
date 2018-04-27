<template>
  <section class="component new-application">

  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Dependencies } from '~/core/decorator'
  import Component from "vue-class-component";
  import { CityService } from '~/utils/city.service'
  import { Form } from 'iview'

  @Component({
    components: {}
  })
  export default class NewApplication extends Vue {

  }
</script>

<style lang="less" scoped>
  .component.new-application{

  }

</style>

<!--个人黑名单-->
<template>
  <section class="page personal-blacklist">

  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  @Layout("workspace")
  @Component({
    components: {}
  })
  export default class PersonalBlacklist extends Page{
    @Dependencies(PageService) private pageService: PageService;

  }
</script>

<style lang="less" scoped>

</style>


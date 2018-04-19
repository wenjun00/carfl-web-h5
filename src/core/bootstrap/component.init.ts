import Vue from 'vue'
import SvgIcon from "~/components/common/svg-icon.vue";
import PageHeader from "~/components/common/page-header.vue"
import CommandButton from "~/components/common/command-button.vue"
import DataForm from "~/components/common/data-form.vue"
import DataBox from "~/components/common/data-box.vue"

export default async function () {
  Vue.component('svg-icon', SvgIcon)
  Vue.component('page-header', PageHeader)
  Vue.component('command-button', CommandButton)
  Vue.component('data-box', CommandButton)
  Vue.component('data-form', CommandButton)
}

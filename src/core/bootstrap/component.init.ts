import Vue from 'vue'
import SvgIcon from "~/components/common/svg-icon.vue";
import PageHeader from "~/components/common/page-header.vue"
import CommandButton from "~/components/common/command-button.vue"

export default async function () {
  Vue.component('svg-icon', SvgIcon)
  Vue.component('page-header', PageHeader)
  Vue.component('command-button', CommandButton)
}

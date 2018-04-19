import Vue from 'vue';
import { CityService } from '~/utils/city.service';
export default {
    install: function () {
        Vue.prototype.$city = CityService;
    }
};

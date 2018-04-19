import cityPlugin from './city.plugin';
import dictPlugin from './dict.plugin';
import filterPlugin from './filter.plugin';
import helperPlugin from './helper.plugin';
import validatorPlugin from './validator.plugin';
export default (function (_a) {
    var store = _a.store;
    return ({
        cityPlugin: cityPlugin,
        dictPlugin: dictPlugin,
        filterPlugin: filterPlugin,
        helperPlugin: helperPlugin,
        validatorPlugin: validatorPlugin
    });
});

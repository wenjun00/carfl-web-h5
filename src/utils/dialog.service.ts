import validator from 'async-validator'
import DialogBox from '~/components/common/dialog-box.vue'
import Vue from 'vue'

export class DialogService {
  /**
   * 显示弹出框
   * @param type 
   * @param option 
   */
  static show(option) {
    const Instance = new Vue({
      render(h) {
        let bodyVNodes = [option.render(h)]
        let footerVNodes = []
        if (option.footer) {
          footerVNodes.push(h('div', { slot: 'footer' }, [option.footer(h)]))
        }
        return h(DialogBox, {
          props: {
            title: option.title,
          }
        }, [
            ...bodyVNodes,
            ...footerVNodes
          ])
      },
      computed: {

      },
      methods: {

      }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal: any = Instance.$children[0];
    console.log(modal)
    // modal.$parent.onRemove = props.onRemove;

    modal.show()

  }
}

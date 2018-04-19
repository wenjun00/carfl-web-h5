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
        if (option.footer && typeof option.footer === 'function') {
          footerVNodes.push(h('template', { slot: 'footer' }, [option.footer(h)]))
        }

        let vnode = h(DialogBox, {
          props: {
            title: option.title,
            footer: !!option.footer,
            value: true,
            onOk: option.onOk,
            onCancel: option.onCancel
          },
          on: {
            "on-remove": () => {
              let instance: any = vnode.componentInstance
              if (instance) {
                instance.remove()
              }
            }
          }
        }, [
            ...bodyVNodes,
            ...footerVNodes
          ])

        return vnode
      },
      computed: {

      },
      methods: {
        remove() {
          setTimeout(() => {
            this.destroy();
          }, 300);
        },
        destroy() {
          this.$destroy();
          document.body.removeChild(this.$el);
          this.onRemove();
        },
        onOk() { },
        onCancel() { },
        onRemove() { }
      }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal: any = Instance.$children[0];

    modal.remove = () => {
      modal.$parent.remove()
    }

    return modal
  }

  remove(modal) {
    modal.visible = false;
    modal.$parent.remove();
  }
}

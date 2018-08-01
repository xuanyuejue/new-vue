import Vue from 'vue'
let Utilities = {
  /**
   * 根据传入的模态弹窗模版新建模态弹窗
   *
   * 说明：传入的模态弹窗必须在调用者内部被import过并且包含在调用者的component中
   *
   * @param modalName 模态弹窗的名字
   * @param parent 模态弹窗的调用者的this指针
   * @param propsData 要传入模态弹窗组件的props
   * @param _parentListeners 模态弹窗组件将要往调用者发的事件的监听者
   */
  newModal: function (modalName, parent, propsData = {},  _parentListeners = {}) {
    console.log('new modal ' + modalName)
    let ModalComponent = Vue.extend(parent.$options.components[modalName])
    let newHowseModal = new ModalComponent({
      el: document.createElement('div'),
      propsData,
      parent,
      _parentListeners
    })
  }
}

let toast = (that, msgText) => {
  that.$vux.toast.show({
    value: false,
    type: 'text',
    text: msgText,
    time: '2200',
    position: 'middle',
    width: '150px'
  })
}

Utilities.install = function (Vue, options) {
  Vue.Utilities = Utilities
  Vue.prototype.Utilities = Utilities
  Vue.prototype.toast = toast
}

export default Utilities

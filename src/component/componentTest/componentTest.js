Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [],
  properties: {},
  data: {},
  methods: {
    emitEvent() {
      this.triggerEvent('myevent', {num: 2});
    }
  }
});

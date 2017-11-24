Component({
	properties: {
		myOwn: {
			type: String,
			value: 'hello',
			observer: () => {
				console.log('changed');
			}
		}
	},
	data: {
		name: 'eg: hello'
	},
	methods: {
		clickMe() {
			this.setData({
				name: 'name is changed!'
			});
			this.triggerEvent('myevent', {});
		}
	},
	behaviors: [],
	options: {
		multipleSlots: true
	},
	created() {
	// can't setData
	},
	attached() {},
	ready() {},
	moved() {},
	detached() {}
});

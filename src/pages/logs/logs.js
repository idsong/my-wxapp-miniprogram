import { formatTime } from '../../utils/util.js';

Page({
  data: {
    logs: [],
    lists: [1, 2, 3]
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return formatTime(new Date(log));
      }),
    });

    this.setData({
      lists: this.data.lists.map(val => val * val)
    });
  }
});

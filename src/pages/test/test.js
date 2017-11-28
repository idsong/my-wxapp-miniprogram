
import { formatTime } from '../../utils/util.js';

Page({
  data: {
    logs: [],
  },
  onMyEvent(num) {
    console.log(num);
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return formatTime(new Date(log));
      }),
    });
  }
});

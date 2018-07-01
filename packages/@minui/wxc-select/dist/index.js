'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    items: {
      type: Array,
      value: []
    },
    checked: {
      type: [String, Number],
      value: ''
    },
    color: {
      type: String,
      value: '#ff5777'
    }
  },
  data: {},
  methods: {
    radioChange: function radioChange(e) {
      this.setData({
        checked: e.detail.value
      });
      var detail = e.detail || {};
      var option = {};
      this.triggerEvent('change', detail, option);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwiaXRlbXMiLCJ0eXBlIiwiQXJyYXkiLCJ2YWx1ZSIsImNoZWNrZWQiLCJTdHJpbmciLCJOdW1iZXIiLCJjb2xvciIsImRhdGEiLCJtZXRob2RzIiwicmFkaW9DaGFuZ2UiLCJlIiwic2V0RGF0YSIsImRldGFpbCIsIm9wdGlvbiIsInRyaWdnZXJFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBTUVBLGFBQVcsRTtBQUNYQyxjQUFZO0FBQ1ZDLFdBQU87QUFDTEMsWUFBTUMsS0FERDtBQUVMQyxhQUFPO0FBRkYsS0FERztBQUtWQyxhQUFTO0FBQ1BILFlBQU0sQ0FBQ0ksTUFBRCxFQUFTQyxNQUFULENBREM7QUFFUEgsYUFBTztBQUZBLEtBTEM7QUFTVkksV0FBTztBQUNMTixZQUFNSSxNQUREO0FBRUxGLGFBQU87QUFGRjtBQVRHLEc7QUFjWkssUUFBTSxFO0FBQ05DLFdBQVM7QUFDUEMsZUFETyx1QkFDS0MsQ0FETCxFQUNRO0FBQ2IsV0FBS0MsT0FBTCxDQUFhO0FBQ1hSLGlCQUFTTyxFQUFFRSxNQUFGLENBQVNWO0FBRFAsT0FBYjtBQUdBLFVBQUlVLFNBQVNGLEVBQUVFLE1BQUYsSUFBWSxFQUF6QjtBQUNBLFVBQUlDLFNBQVMsRUFBYjtBQUNBLFdBQUtDLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEJGLE1BQTVCLEVBQW9DQyxNQUFwQztBQUNEO0FBUk0iLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nXG4gICAgfVxuICB9LFxuICBiZWhhdmlvcnM6IFsgXSxcbiAgcHJvcGVydGllczoge1xuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbHVlOiBbXVxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnI2ZmNTc3NydcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHsgfSxcbiAgbWV0aG9kczoge1xuICAgIHJhZGlvQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNoZWNrZWQ6IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KTtcbiAgICAgIGxldCBkZXRhaWwgPSBlLmRldGFpbCB8fCB7fTtcbiAgICAgIGxldCBvcHRpb24gPSB7fTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdjaGFuZ2UnLCBkZXRhaWwsIG9wdGlvbik7XG4gICAgfVxuICB9XG59Il19
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    scroll: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: true
    },
    notice: {
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: '#ff5777' // 通告栏背景色
    },
    color: {
      type: String,
      value: '#fff' // 文字颜色
    },
    showIcon: {
      type: Boolean,
      value: false
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    close: {
      type: Boolean,
      value: false
    },
    bgRgba: {
      type: String,
      value: 'rgba(255, 85, 119, 0)' // 背景颜色的rgba形式，a的值为0，配合close使用
    }
  },
  data: {},
  methods: {
    onDismissNotice: function onDismissNotice(event) {
      this.setData({
        isShow: false
      });
      var detail = event.detail;
      var option = {};
      this.triggerEvent('close', detail, option);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwic2Nyb2xsIiwidHlwZSIsIkJvb2xlYW4iLCJ2YWx1ZSIsImlzU2hvdyIsIm5vdGljZSIsIlN0cmluZyIsImJnQ29sb3IiLCJjb2xvciIsInNob3dJY29uIiwiaWNvbkNvbG9yIiwiY2xvc2UiLCJiZ1JnYmEiLCJkYXRhIiwibWV0aG9kcyIsIm9uRGlzbWlzc05vdGljZSIsImV2ZW50Iiwic2V0RGF0YSIsImRldGFpbCIsIm9wdGlvbiIsInRyaWdnZXJFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBTUVBLGFBQVcsRTtBQUNYQyxjQUFZO0FBQ1ZDLFlBQVE7QUFDTkMsWUFBTUMsT0FEQTtBQUVOQyxhQUFPO0FBRkQsS0FERTtBQUtWQyxZQUFRO0FBQ05ILFlBQU1DLE9BREE7QUFFTkMsYUFBTztBQUZELEtBTEU7QUFTVkUsWUFBUTtBQUNOSixZQUFNSyxNQURBO0FBRU5ILGFBQU87QUFGRCxLQVRFO0FBYVZJLGFBQVM7QUFDUE4sWUFBTUssTUFEQztBQUVQSCxhQUFPLFNBRkEsQ0FFVTtBQUZWLEtBYkM7QUFpQlZLLFdBQU87QUFDTFAsWUFBTUssTUFERDtBQUVMSCxhQUFPLE1BRkYsQ0FFUztBQUZULEtBakJHO0FBcUJWTSxjQUFVO0FBQ1JSLFlBQU1DLE9BREU7QUFFUkMsYUFBTztBQUZDLEtBckJBO0FBeUJWTyxlQUFXO0FBQ1RULFlBQU1LLE1BREc7QUFFVEgsYUFBTztBQUZFLEtBekJEO0FBNkJWUSxXQUFPO0FBQ0xWLFlBQU1DLE9BREQ7QUFFTEMsYUFBTztBQUZGLEtBN0JHO0FBaUNWUyxZQUFRO0FBQ05YLFlBQU1LLE1BREE7QUFFTkgsYUFBTyx1QkFGRCxDQUV5QjtBQUZ6QjtBQWpDRSxHO0FBc0NaVSxRQUFNLEU7QUFDTkMsV0FBUztBQUNQQyxtQkFETywyQkFDU0MsS0FEVCxFQUNnQjtBQUNyQixXQUFLQyxPQUFMLENBQWE7QUFDWGIsZ0JBQVE7QUFERyxPQUFiO0FBR0EsVUFBSWMsU0FBU0YsTUFBTUUsTUFBbkI7QUFDQSxVQUFJQyxTQUFTLEVBQWI7QUFDQSxXQUFLQyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCRixNQUEzQixFQUFtQ0MsTUFBbkM7QUFDRDtBQVJNIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgYmVoYXZpb3JzOiBbIF0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBzY3JvbGw6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGlzU2hvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICBub3RpY2U6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgYmdDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjZmY1Nzc3JyAvLyDpgJrlkYrmoI/og4zmma/oibJcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJyNmZmYnIC8vIOaWh+Wtl+minOiJslxuICAgIH0sXG4gICAgc2hvd0ljb246IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGljb25Db2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcjZmZmJ1xuICAgIH0sXG4gICAgY2xvc2U6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGJnUmdiYToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdyZ2JhKDI1NSwgODUsIDExOSwgMCknIC8vIOiDjOaZr+minOiJsueahHJnYmHlvaLlvI/vvIxh55qE5YC85Li6MO+8jOmFjeWQiGNsb3Nl5L2/55SoXG4gICAgfVxuICB9LFxuICBkYXRhOiB7IH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkRpc21pc3NOb3RpY2UoZXZlbnQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgbGV0IGRldGFpbCA9IGV2ZW50LmRldGFpbDtcbiAgICAgIGxldCBvcHRpb24gPSB7fTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdjbG9zZScsIGRldGFpbCwgb3B0aW9uKTtcbiAgICB9XG4gIH1cbn0iXX0=
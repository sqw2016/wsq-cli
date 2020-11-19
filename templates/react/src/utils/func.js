export const getStyle = (ele, attr) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[attr];
  } else {
    return ele.currentStyle[attr];
  }
}
import * as _ from 'lodash';

const color = [
  '#17E2F5',
  '#F7B500',
  '#2B7AFF',
  '#9999ff',
  '#eb5f04',
  '#33ffad',
];

export default function getColor(len = 3) {
  // 超出数组的长度页面崩溃
  if (len > 6) {
    len = 6;
  }
  let result = [],
    arr = [];
  for (; len > result.length; ) {
    let item = color[_.random(0, color.length - 1)];
    arr.push(item);
    result = [...new Set(arr)];
  }
  return result;
}

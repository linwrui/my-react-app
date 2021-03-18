/**
 * 根据颜色的人眼感知亮度，计算前景色
 *
 * @private
 * @param {number[]} color [R,G,B]
 * @returns
 * @memberof Home
 */
export function getReverseForegroundColor(color: number[]) {
  const grayLevel = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
  return grayLevel > 0.5 ? '#333' : '#D2D2D2';
}

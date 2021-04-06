import rgba from 'color-rgba';

export interface GradientTransformParams {
    angle?: number;
    lighting?: number; // from 0 to 255. The larger the number is the brighter second color
}

export const defaultTransformParams: GradientTransformParams = {
    angle: 135,
    lighting: 255
};

export function colorToGradient(basicColor: string, transformParams?: GradientTransformParams) {
  const params = Object.assign(defaultTransformParams, transformParams || {});
  const rgbaArr = rgba(basicColor);
  if (rgbaArr != null) {
    const red = rgbaArr[0];
    const green = rgbaArr[1];
    const blue = rgbaArr[2];
    const alpha = rgbaArr[3];

    let secondColor = "rgba(0, 0, 0, 0)";
    const lighting = Number(params.lighting); 

    if (red > green && red > blue) secondColor = `rgba(${red}, ${Math.abs(green - lighting)}, ${Math.abs(blue - lighting)}, ${alpha})`;
    else if (green > red && green > blue) secondColor = `rgba(${Math.abs(red - lighting)}, ${green}, ${Math.abs(blue - lighting)}, ${alpha})`;
    else if (blue > red && blue > green) secondColor = `rgba(${Math.abs(red - lighting)}, ${Math.abs(green - lighting)}, ${blue}, ${alpha})`;
    return `linear-gradient(${params.angle}deg, ${basicColor}, ${secondColor})`;
  }
  return basicColor;
}

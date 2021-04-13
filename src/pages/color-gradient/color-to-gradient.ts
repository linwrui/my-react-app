import { hsl } from 'd3-color';

export interface GradientTransformParams {
  angle?: number;
  lighting?: number; // from 0 to 255. The larger the number is the brighter second color
  colorStops?: Array<{
    h?: number | string;
    s?: number | string;
    l?: number | string;
    opacity?: number | string;
  }>;
}

export const defaultTransformParams: GradientTransformParams = {
  angle: 135,
  lighting: 255,
};

export function colorToLinearGradient(basicColor: string, transformParams?: GradientTransformParams) {
  const params = Object.assign(defaultTransformParams, transformParams || {});
  const color = hsl(basicColor);
  if (color != null) {
    const transform = (source: number, to: number | string | undefined) => {
      if (typeof to === 'string') {
        if (to.startsWith('+')) {
          return source + Number(to.match(/\+(.*)/)?.[1]);
        }
        if (to.startsWith('-')) {
          return source - Number(to.match(/-(.*)/)?.[1]);
        }
      } else if (typeof to === 'number') {
        return to;
      }
      return source;
    };
    let colorStops: string[] | undefined = transformParams?.colorStops
      ?.map(x =>
        hsl(
          transform(color.h, x.h),
          transform(color.s, x.s),
          transform(color.l, x.l),
          transform(color.opacity, x.opacity)
        )
      )
      .map(x => x.toString());
    if (colorStops == null) {
      const red = color.rgb().r;
      const green = color.rgb().g;
      const blue = color.rgb().b;
      const alpha = color.opacity;

      let secondColor = 'rgba(0, 0, 0, 0)';
      const lighting = Number(params.lighting);

      if (red > green && red > blue)
        secondColor = `rgba(${red}, ${Math.abs(green - lighting)}, ${Math.abs(blue - lighting)}, ${alpha})`;
      else if (green > red && green > blue)
        secondColor = `rgba(${Math.abs(red - lighting)}, ${green}, ${Math.abs(blue - lighting)}, ${alpha})`;
      else if (blue > red && blue > green)
        secondColor = `rgba(${Math.abs(red - lighting)}, ${Math.abs(green - lighting)}, ${blue}, ${alpha})`;
      colorStops = [basicColor, secondColor];
    }
    return `linear-gradient(${params.angle}deg, ${colorStops?.join(', ')})`;
  }
  return basicColor;
}

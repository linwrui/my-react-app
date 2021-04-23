import { Form, InputNumber } from 'antd';
import { rgb } from 'd3-color';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { colorToLinearGradient, LinearGradientConvertOptions } from "color-gradient-converter/dist";
import './style.less';

export const defaultTransformParams: LinearGradientConvertOptions = {
  angle: 135,
  colorStopTransformTargets: []
};

interface ColorGradientState {
  backgroundColor: string;
  backgroundblur: number;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  transformParams: LinearGradientConvertOptions;
}

export class ColorGradient extends React.Component<unknown, ColorGradientState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      backgroundColor: 'rgba(45, 85, 170, 1)',
      borderColor: 'rgba(0, 210, 255, 1)',
      backgroundblur: 3,
      borderWidth: 2,
      borderRadius: 4,
      transformParams: Object.assign(defaultTransformParams, {}),
    };
  }
  render() {
    const { backgroundColor, transformParams, backgroundblur, borderColor, borderWidth, borderRadius } = this.state;
    const backgroundRgb = rgb(backgroundColor);
    const borderRgb = rgb(borderColor);
    return (
      <div style={{ padding: 10 }} className="color-gradient">
        <div className="basic-color">
          <div className="gradient-params">
            <div style={{ padding: 10 }}>
              background: <span>{backgroundColor}</span>
              <RgbaColorPicker
                color={{ r: backgroundRgb.r, g: backgroundRgb.g, b: backgroundRgb.b, a: backgroundRgb.opacity }}
                onChange={c => this.setState({ backgroundColor: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a || 0.01})` })}
              />
              <Form style={{ padding: 10 }} layout="inline">
                <Form.Item initialValue={transformParams.angle} name="angle" label="angle">
                  <InputNumber
                    min={-180}
                    max={180}
                    onChange={e => this.setState({ transformParams: Object.assign(transformParams, { angle: e }) })}
                  />
                </Form.Item>
                <Form.Item initialValue={backgroundblur} name="blur" label="blur">
                  <InputNumber
                    min={1}
                    onChange={e => this.setState({ backgroundblur: e as number })}
                  />
                </Form.Item>
              </Form>
            </div>
            <div style={{ padding: 10 }}>
              border: <span>{borderColor}</span>
              <RgbaColorPicker
                color={{ r: borderRgb.r, g: borderRgb.g, b: borderRgb.b, a: borderRgb.opacity }}
                onChange={c => this.setState({ borderColor: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a || 0.01})` })}
              />
              <Form style={{ padding: 10 }} layout="inline">
                <Form.Item initialValue={borderWidth} name="borderWidth" label="borderWidth">
                  <InputNumber
                    min={1}
                    onChange={e => this.setState({ borderWidth: e as number })}
                  />
                </Form.Item>
                <Form.Item initialValue={borderRadius} name="borderRadius" label="borderRadius">
                  <InputNumber
                    min={1}
                    onChange={e => this.setState({ borderRadius: e as number })}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="gradient-preview">
          <div
            style={{
              backdropFilter: `blur(${backgroundblur}px)`,
              borderWidth,
              borderStyle: `solid`,
              borderRadius,
              clipPath: `inset(0 round ${borderRadius}px)`,
              borderImage: `${colorToLinearGradient(borderColor, {
                ...transformParams,
                colorStopTransformTargets: [
                  { opacity: 0.1 },
                  { opacity: 0.6 },
                  { opacity: 0.2 },
                  { opacity: 0.2 },
                  { opacity: 0.6 },
                  { opacity: 0.1 },
                ].map(x => ({ opacity: Number((x.opacity * borderRgb.opacity).toFixed(2)) })),
              })} 10`,
              background: colorToLinearGradient(backgroundColor, {
                ...transformParams,
                colorStopTransformTargets: [
                  { opacity: Number((0.4 * backgroundRgb.opacity).toFixed(2)) },
                  { opacity: Number((0.2 * backgroundRgb.opacity).toFixed(2)), markPercent: '25%' },
                  { opacity: Number((0.1 * backgroundRgb.opacity).toFixed(2)) },
                ],
              }),
            }}
            className="gradient-grid"
          />
        </div>
      </div>
    );
  }
}

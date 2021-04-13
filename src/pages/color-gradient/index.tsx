import { Divider, Form, InputNumber } from 'antd';
import rgba from 'color-rgba';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { colorToLinearGradient, defaultTransformParams, GradientTransformParams } from './color-to-gradient';
import './style.less';

interface ColorGradientState {
  color: string;
  blur: number;
  transformParams: GradientTransformParams;
}

export class ColorGradient extends React.Component<unknown, ColorGradientState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      color: 'rgba(255, 0, 0, 1)',
      blur: 3,
      transformParams: Object.assign(defaultTransformParams, {}),
    };
  }
  render() {
    const { color, transformParams, blur } = this.state;
    const rgbaArr = rgba(color) as number[];
    return (
      <div style={{ padding: 10 }} className="color-gradient">
        <div className="basic-color">
          <div style={{ padding: 10 }}>
            color: <span>{color}</span>
          </div>
          <div className="gradient-params">
            <RgbaColorPicker
              color={{ r: rgbaArr[0], g: rgbaArr[1], b: rgbaArr[2], a: rgbaArr[3] }}
              onChange={c => this.setState({ color: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})` })}
            />
            <Form style={{ padding: 10 }} layout="inline">
              <Form.Item name="angle" label="angle">
                <InputNumber
                  defaultValue={transformParams.angle}
                  min={-180}
                  max={180}
                  onChange={e => this.setState({ transformParams: Object.assign(transformParams, { angle: e }) })}
                />
              </Form.Item>
              <Form.Item name="blur" label="blur">
                <InputNumber defaultValue={blur} min={1} onChange={e => this.setState({ blur: e as number })} />
              </Form.Item>
            </Form>
          </div>
        </div>
        <Divider />
        <div className="gradient-preview">
          <div style={{ padding: 10 }}>
            gradient preview: <br /> <span>{colorToLinearGradient(color, transformParams)}</span>
          </div>
          <div
            style={{
              backdropFilter: `blur(${blur}px)`,
              border: '2px solid',
              borderImage: `${colorToLinearGradient('#2B56AB', {
                ...transformParams,
                colorStops: [
                  { opacity: 0.1 },
                  { opacity: 0.6 },
                  { opacity: 0.2 },
                  { opacity: 0.2 },
                  { opacity: 0.6 },
                  { opacity: 0.1 },
                ],
              })} 10`,
              background: colorToLinearGradient(color, {
                ...transformParams,
                colorStops: [{ opacity: 0.4 }, { opacity: 0.2, position: '25%' }, { opacity: 0.1 }],
              }),
            }}
            className="gradient-grid"
          />
        </div>
      </div>
    );
  }
}

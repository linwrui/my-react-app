import { Divider, Form, InputNumber } from 'antd';
import rgba from 'color-rgba';
import React from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { colorToGradient, defaultTransformParams, GradientTransformParams } from './color-to-gradient';

interface ColorGradientState {
  color: string;
  transformParams: GradientTransformParams;
}

export class ColorGradient extends React.Component<unknown, ColorGradientState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      color: 'rgba(255, 0, 0, 1)',
      transformParams: Object.assign(defaultTransformParams, {}),
    };
  }
  render() {
    const { color, transformParams } = this.state;
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
          </div>
        </div>
        <Divider />
        <div className="gradient-preview">
          <div style={{ padding: 10 }}>
            gradient preview: <span>{colorToGradient(color, transformParams)}</span>
          </div>
          <Form style={{padding: 10}} layout="inline">
            <Form.Item name="angle" label="angle">
              <InputNumber
                defaultValue={transformParams.angle}
                min={-180}
                max={180}
                onChange={(e) => this.setState({ transformParams: Object.assign(transformParams, {angle: e}) })}
              />
            </Form.Item>
            <Form.Item validateStatus="validating" help="from 0 to 255. The larger the number is the brighter second color" name="lighting" label="lighting">
              <InputNumber
                defaultValue={transformParams.lighting}
                min={1}
                max={255}
                onChange={(e) => this.setState({ transformParams: Object.assign(transformParams, {lighting: e}) })}
              />
            </Form.Item>
          </Form>
          <div
            style={{
              border: '1px solid #BFBFBF',
              width: 200,
              height: 150,
              background: colorToGradient(color, transformParams),
            }}
            className="gradient-grid"
          />
        </div>
      </div>
    );
  }
}

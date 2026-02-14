import { Card, Row, Col, Progress, Tag } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import React from 'react';
import { AirQualityData } from '../../utils/weather-service';
import './air-quality.less';

interface AirQualityProps {
  data: AirQualityData;
}

export class AirQuality extends React.Component<AirQualityProps> {
  private getAqiColor(aqi: string): string {
    const value = parseInt(aqi, 10) || 0;
    if (value <= 50) return '#52c41a';
    if (value <= 100) return '#faad14';
    if (value <= 150) return '#fa8c16';
    if (value <= 200) return '#f5222d';
    if (value <= 300) return '#722ed1';
    return '#8c0000';
  }

  private getAqiLevel(aqi: string): string {
    const value = parseInt(aqi, 10) || 0;
    if (value <= 50) return '优';
    if (value <= 100) return '良';
    if (value <= 150) return '轻度污染';
    if (value <= 200) return '中度污染';
    if (value <= 300) return '重度污染';
    return '严重污染';
  }

  render() {
    const { data } = this.props;

    if (!data || !data.aqi) {
      return null;
    }

    const pollutants = [
      { key: 'pm25', label: 'PM2.5', value: data.pm25 },
      { key: 'pm10', label: 'PM10', value: data.pm10 },
      { key: 'o3', label: 'O₃', value: data.o3 },
      { key: 'no2', label: 'NO₂', value: data.no2 },
      { key: 'so2', label: 'SO₂', value: data.so2 },
      { key: 'co', label: 'CO', value: data.co },
    ];

    const suggestions = [
      { key: 'kouzhao', label: '戴口罩', value: data.kouzhao },
      { key: 'yundong', label: '运动', value: data.yundong },
      { key: 'kaichuang', label: '开窗', value: data.kaichuang },
      { key: 'jinghuaqi', label: '净化器', value: data.jinghuaqi },
    ];

    return (
      <Card className="air-quality-card" bordered={false} title="空气质量">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="aqi-main">
              <div className="aqi-circle" style={{ color: this.getAqiColor(data.aqi) }}>
                <div className="aqi-value">{data.aqi}</div>
                <div className="aqi-level">{this.getAqiLevel(data.aqi)}</div>
              </div>
              {data.aqi_level && (
                <div className="aqi-desc">
                  <BulbOutlined />
                  <span>{data.aqi_level}</span>
                </div>
              )}
              {data.aqi_desc && (
                <div className="aqi-tips">{data.aqi_desc}</div>
              )}
            </div>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div className="pollutants-section">
              <h4 className="section-title">污染物浓度</h4>
              <Row gutter={[16, 16]}>
                {pollutants.map((item) => (
                  item.value && (
                    <Col xs={12} sm={8} md={8} lg={8} xl={8} key={item.key}>
                      <div className="pollutant-item">
                        <div className="pollutant-label">{item.label}</div>
                        <div className="pollutant-value">{item.value}</div>
                      </div>
                    </Col>
                  )
                ))}
              </Row>
            </div>

            <div className="suggestions-section">
              <h4 className="section-title">生活建议</h4>
              <Row gutter={[8, 8]}>
                {suggestions.map((item) => (
                  item.value && (
                    <Col key={item.key}>
                      <Tag color="blue">{item.label}：{item.value}</Tag>
                    </Col>
                  )
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

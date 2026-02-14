import {
  EnvironmentOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  FallOutlined,
  ThunderboltFilled,
  EyeOutlined,
  DashboardOutlined,
  AlertOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { Card, Row, Col } from 'antd';
import React from 'react';
import { WeatherIcon } from './weather-icon';
import { WeatherData } from '../../utils/weather-service';
import './current-weather.less';

interface CurrentWeatherProps {
  data: WeatherData;
}

export class CurrentWeather extends React.Component<CurrentWeatherProps> {
  private getAirQualityColor(airLevel: string): string {
    const level = (airLevel || '').toLowerCase();
    if (level.includes('优')) return '#52c41a';
    if (level.includes('良')) return '#73d13d';
    if (level.includes('轻度')) return '#faad14';
    if (level.includes('中')) return '#fa8c16';
    if (level.includes('重度')) return '#f5222d';
    if (level.includes('严重')) return '#8c0000';
    return '#1890ff';
  }

  render() {
    const { data } = this.props;

    return (
      <Card className="current-weather-card" bordered={false}>
        <Row gutter={[20, 0]}>
          <Col xs={24} sm={24} md={7} lg={6} xl={5} className="weather-main">
            <div className="location">
              <EnvironmentOutlined />
              <span className="city-name">{data.city}</span>
            </div>
            <div className="weather-icon-wrapper">
              <WeatherIcon wea={data.wea} weaImg={data.wea_img} size={80} />
            </div>
            <div className="weather-type">{data.wea}</div>
            <div className="temperature">
              <span className="temp-value">{data.tem}</span>
              <span className="temp-unit">°C</span>
            </div>
            <div className="temp-range">
              {data.tem1}° / {data.tem2}°
            </div>
            {(data.sun_rise || data.sun_set) && (
              <div className="sun-time">
                <span className="sun-item">
                  <RiseOutlined /> {data.sun_rise}
                </span>
                <span className="sun-item">
                  <FallOutlined /> {data.sun_set}
                </span>
              </div>
            )}
          </Col>

          <Col xs={24} sm={24} md={17} lg={18} xl={19}>
            <Row gutter={[12, 12]} className="weather-details-grid">
              {data.tem1 && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="tem1">
                  <div className="detail-card">
                    <div className="detail-icon"><ArrowUpOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.tem1}°C</div>
                      <div className="detail-label">最高温度</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.tem2 && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="tem2">
                  <div className="detail-card">
                    <div className="detail-icon"><ArrowDownOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.tem2}°C</div>
                      <div className="detail-label">最低温度</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.humidity && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="humidity">
                  <div className="detail-card">
                    <div className="detail-icon"><CloudOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.humidity}</div>
                      <div className="detail-label">湿度</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.pressure && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="pressure">
                  <div className="detail-card">
                    <div className="detail-icon"><DashboardOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.pressure}</div>
                      <div className="detail-label">气压</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.win && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="win">
                  <div className="detail-card">
                    <div className="detail-icon"><ThunderboltOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.win}</div>
                      <div className="detail-label">风向</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.win_speed && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="win_speed">
                  <div className="detail-card">
                    <div className="detail-icon"><ThunderboltFilled /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.win_speed}</div>
                      <div className="detail-label">风速</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.win_meter && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="win_meter">
                  <div className="detail-card">
                    <div className="detail-icon"><AlertOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.win_meter}</div>
                      <div className="detail-label">风力</div>
                    </div>
                  </div>
                </Col>
              )}
              {data.visibility && (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key="visibility">
                  <div className="detail-card">
                    <div className="detail-icon"><EyeOutlined /></div>
                    <div className="detail-info">
                      <div className="detail-value">{data.visibility}</div>
                      <div className="detail-label">能见度</div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>

            {(data.air || data.air_level || data.air_tips) && (
              <div className="air-quality-card">
                <div className="air-left">
                  <div className="air-aqi-circle" style={{ borderColor: this.getAirQualityColor(data.air_level) }}>
                    <span className="air-aqi-value" style={{ color: this.getAirQualityColor(data.air_level) }}>
                      {data.air || '--'}
                    </span>
                    <span className="air-aqi-label">AQI</span>
                  </div>
                </div>
                <div className="air-right">
                  <div className="air-status">
                    <span className="air-level-text" style={{ color: this.getAirQualityColor(data.air_level) }}>
                      {data.air_level || '未知'}
                    </span>
                    <span className="air-level-desc">空气质量</span>
                  </div>
                  {data.air_tips && (
                    <div className="air-suggestion">
                      {data.air_tips}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="update-time">
              更新时间: {data.update_time}
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

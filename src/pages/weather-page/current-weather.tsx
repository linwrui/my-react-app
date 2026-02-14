import { EnvironmentOutlined, CloudOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Row, Col } from 'antd';
import React from 'react';
import { WeatherIcon } from './weather-icon';
import { WeatherData } from '../../utils/weather-service';
import './current-weather.less';

/* eslint-disable react/prefer-stateless-function */

interface CurrentWeatherProps {
  data: WeatherData;
}

export class CurrentWeather extends React.Component<CurrentWeatherProps> {
  render() {
    const { data } = this.props;

    return (
      <Card className="current-weather-card" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8} className="weather-main">
            <div className="location">
              <EnvironmentOutlined />
              <span className="city-name">{data.city}</span>
            </div>
            <div className="weather-icon-wrapper">
              <WeatherIcon wea={data.wea} weaImg={data.wea_img} size={120} />
            </div>
            <div className="weather-type">{data.wea}</div>
            <div className="temperature">
              <span className="temp-value">{data.tem}</span>
              <span className="temp-unit">°C</span>
            </div>
            <div className="temp-range">
              最高: {data.tem1}°C / 最低: {data.tem2}°C
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={16} xl={16}>
            <Row gutter={[16, 16]} className="weather-details">
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <CloudOutlined className="detail-icon" />
                  <div className="detail-label">湿度</div>
                  <div className="detail-value">{data.humidity}</div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <ThunderboltOutlined className="detail-icon" />
                  <div className="detail-label">风向</div>
                  <div className="detail-value">{data.win}</div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <CloudOutlined className="detail-icon" />
                  <div className="detail-label">风速</div>
                  <div className="detail-value">{data.win_speed}</div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <CloudOutlined className="detail-icon" />
                  <div className="detail-label">空气质量</div>
                  <div className="detail-value">{data.air}</div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <CloudOutlined className="detail-icon" />
                  <div className="detail-label">气压</div>
                  <div className="detail-value">{data.pressure}</div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                <div className="detail-item">
                  <CloudOutlined className="detail-icon" />
                  <div className="detail-label">能见度</div>
                  <div className="detail-value">{data.visibility}</div>
                </div>
              </Col>
            </Row>
            <div className="update-time">
              更新时间: {data.update_time}
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

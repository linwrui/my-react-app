import { Card, Row, Col } from 'antd';
import React from 'react';
import { WeatherIcon } from './weather-icon';
import { HourlyData } from '../../utils/weather-service';
import './hourly-forecast.less';

interface HourlyForecastProps {
  hourly: HourlyData[];
}

/* eslint-disable react/prefer-stateless-function */
export class HourlyForecast extends React.Component<HourlyForecastProps> {
  render() {
    const { hourly } = this.props;

    if (!hourly || hourly.length === 0) {
      return null;
    }

    return (
      <Card className="hourly-forecast-card" bordered={false} title="24小时逐小时预报">
        <div className="hourly-scroll-container">
          <Row className="hourly-list" gutter={[16, 16]}>
            {hourly.map((hour) => (
              <Col key={hour.hours || `${hour.tem}-${hour.wea}`} className="hourly-item">
                <div className="hour">{hour.hours}</div>
                <div className="icon">
                  <WeatherIcon wea={hour.wea} weaImg={hour.wea_img} size={36} />
                </div>
                <div className="weather">{hour.wea}</div>
                <div className="temp">{hour.tem}°</div>
                <div className="wind">{hour.win} {hour.win_speed}</div>
                {hour.aqi && (
                  <div className="aqi">
                    <span className="aqi-label">AQI:</span>
                    <span className="aqi-value">{hour.aqi}</span>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    );
  }
}

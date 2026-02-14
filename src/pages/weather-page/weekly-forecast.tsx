import { Card, Row, Col } from 'antd';
import React from 'react';
import { WeatherIcon } from './weather-icon';
import { WeatherData } from '../../utils/weather-service';
import './weekly-forecast.less';

interface WeeklyForecastProps {
  data: WeatherData;
}

export class WeeklyForecast extends React.Component<WeeklyForecastProps> {
  private getWeekdayName(dateStr: string): string {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  render() {
    const { data } = this.props;
    const forecast = data.forecast || [];

    return (
      <Card className="weekly-forecast-card" bordered={false} title="未来7天天气预报">
        <Row gutter={[16, 16]}>
          {forecast.map((day) => (
            <Col xs={12} sm={8} md={6} lg={3} xl={3} key={day.date}>
              <div className="forecast-item">
                <div className="forecast-date">
                  <div className="weekday">{this.getWeekdayName(day.date)}</div>
                  <div className="date">{this.formatDate(day.date)}</div>
                  {day.week && <div className="week">{day.week}</div>}
                </div>
                <div className="forecast-icon">
                  <WeatherIcon wea={day.wea} weaImg={day.wea_img} size={48} />
                </div>
                <div className="forecast-weather">{day.wea}</div>
                <div className="forecast-temp">
                  <span className="temp-high">{day.tem1}°</span>
                  <span className="temp-divider">/</span>
                  <span className="temp-low">{day.tem2}°</span>
                </div>
                {(day.win || day.win_speed) && (
                  <div className="forecast-wind">
                    {day.win && <span>{day.win}</span>}
                    {day.win_speed && <span> {day.win_speed}</span>}
                  </div>
                )}
                {(day.air || day.air_level) && (
                  <div className="forecast-air">
                    {day.air && <span>AQI: {day.air}</span>}
                    {day.air_level && <span> {day.air_level}</span>}
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

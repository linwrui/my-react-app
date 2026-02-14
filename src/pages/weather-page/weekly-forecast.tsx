import { Card, Row, Col, Spin } from 'antd';
import React from 'react';
import { WeatherIcon } from './weather-icon';
import { WeatherV9Service, V9DailyForecast } from '../../utils/weather-v9-service';
import './weekly-forecast.less';

/* eslint-disable react/sort-comp */

interface WeeklyForecastState {
  forecast: V9DailyForecast[];
  loading: boolean;
}

export class WeeklyForecast extends React.Component<Record<string, never>, WeeklyForecastState> {
  private willUnmounted = false;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      forecast: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchWeeklyForecast();
  }

  componentWillUnmount() {
    this.willUnmounted = true;
  }

  private fetchWeeklyForecast = async () => {
    try {
      const forecast = await WeatherV9Service.getWeeklyForecast();
      if (this.willUnmounted) return;
      this.setState({
        forecast,
        loading: false,
      });
    } catch (error) {
      console.error('获取七日预报失败:', error);
      if (this.willUnmounted) return;
      this.setState({
        loading: false,
      });
    }
  };

  private getWeekdayName(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return weekdays[date.getDay()];
    } catch {
      return '';
    }
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } catch {
      return '';
    }
  }

  render() {
    const { forecast, loading } = this.state;

    return (
      <Card className="weekly-forecast-card" bordered={false} title="未来7天天气预报">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" tip="正在加载七日预报..." />
          </div>
        ) : (
          <Row gutter={[12, 12]} justify="space-around" align="stretch">
            {forecast.map((day, index) => {
              const key = day.date || `day-${index}`;
              const colSpan = Math.max(1, Math.floor(24 / forecast.length));
              return (
                <Col 
                  xs={24} 
                  sm={12} 
                  md={8} 
                  lg={colSpan} 
                  xl={colSpan}
                  key={key}
                >
                  <div className="forecast-item">
                    <div className="forecast-date">
                      <div className="weekday">{this.getWeekdayName(day.date || '')}</div>
                      <div className="date">{this.formatDate(day.date || '')}</div>
                      {day.week && <div className="week">{day.week}</div>}
                    </div>
                    <div className="forecast-icon">
                      <WeatherIcon wea={day.wea || ''} weaImg={day.wea_img || ''} size={48} />
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
              );
            })}
          </Row>
        )}
      </Card>
    );
  }
}

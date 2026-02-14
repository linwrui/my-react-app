import { Layout, Spin, Alert, Collapse } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { CurrentWeather } from './current-weather';
import { WeeklyForecast } from './weekly-forecast';
import { HourlyForecast } from './hourly-forecast';
import { WeatherAlert } from './weather-alert';
import { LifeIndex } from './life-index';
import { WeatherDetails } from './weather-details';
import { WeatherService } from '../../utils/weather-service';
import './style.less';

interface StateType {
  weatherData: any;
  loading: boolean;
  error: string | null;
}

export class WeatherPage extends React.Component<any, StateType> {
  private willUnmounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      weatherData: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  componentWillUnmount() {
    this.willUnmounted = true;
  }

  private fetchWeatherData = async () => {
    try {
      const data = await WeatherService.getWeatherData();
      if (this.willUnmounted) return;
      this.setState({
        weatherData: data,
        loading: false,
      });
    } catch (error) {
      if (this.willUnmounted) return;
      this.setState({
        error: '获取天气数据失败，请稍后重试',
        loading: false,
      });
    }
  };

  private handleRetry = () => {
    this.setState({ loading: true, error: null });
    this.fetchWeatherData();
  };

  render() {
    const { weatherData, loading, error } = this.state;

    return (
      <Layout className="app-weather-page">
        <Content className="layout-content">
          {loading && (
            <div className="loading-container">
              <Spin size="large" tip="正在加载天气数据..." />
            </div>
          )}
          {error && (
            <Alert
              message="加载失败"
              description={error}
              type="error"
              showIcon
              action={
                <button
                  type="button"
                  onClick={this.handleRetry}
                  style={{
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    color: '#1890ff',
                    padding: 0,
                    fontSize: '14px',
                  }}
                >
                  重试
                </button>
              }
            />
          )}
          {!loading && !error && weatherData && (
            <div className="page-content">
              <WeatherAlert alerts={weatherData.alerts} />
              <CurrentWeather data={weatherData} />
              <HourlyForecast hourly={weatherData.hourly} />
              <WeeklyForecast data={weatherData} />
              <LifeIndex data={weatherData} />
              <WeatherDetails data={weatherData} />
              <div className="debug-section">
                <Collapse defaultActiveKey={[]}>
                  <Collapse.Panel header="调试信息 (API原始数据)" key="1">
                    <pre style={{ fontSize: '12px', maxHeight: '400px', overflow: 'auto', background: '#f5f5f5', padding: '16px', borderRadius: '4px' }}>
                      {JSON.stringify(weatherData, null, 2)}
                    </pre>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    );
  }
}

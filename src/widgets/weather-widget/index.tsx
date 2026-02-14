import { EnvironmentOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { WeatherIconFont } from '../../components/iconfont';
import { WeatherService } from '../../utils/weather-service';
import './style.less';

function WeatherIcon(props: { wea: string; weaImag: string }) {
  // xue、lei、shachen、wu、bingbao、yun、yu、yin、qing
  const now = new Date();
  const useMoon = now.getHours() > 18;
  const weatherTypes: { [key: string]: string } = {
    xue: 'iconSnow1',
    lei: 'iconThunder1',
    yun: useMoon ? 'iconCloudy-Moon1' : 'iconCloudy-Sun1',
    yu: 'iconRain1',
    yin: 'iconCloudy21',
    qing: useMoon ? 'iconMoon31' : 'iconSun1',
  };
  const { wea, weaImag } = props;
  return (
    <Tooltip placement="bottom" title={wea}>
      <WeatherIconFont style={{ fontSize: '36px' }} type={weatherTypes[weaImag] || 'iconCloud'} />
    </Tooltip>
  );
}
interface WeatherWidgetProps {
  color: string;
}
interface WeatherWidgetState {
  weatherData: {
    city?: string;
    wea?: string;
    wea_img?: string;
    tem?: string;
  };
}
export class WeatherWidget extends React.Component<WeatherWidgetProps, WeatherWidgetState> {
  private _isMounted = false;

  constructor(props: WeatherWidgetProps) {
    super(props);
    this._isMounted = false;
    this.state = {
      weatherData: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    WeatherService.getWeatherData()
      .then(weatherData => {
        if (!this._isMounted) return;
        this.setState({
          weatherData,
        });
      })
      .catch(error => {
        console.error('Failed to fetch weather data:', error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { weatherData } = this.state;
    const { color } = this.props;
    return weatherData?.wea_img == null ? null : (
      <div style={{ color }} className="weather-widget">
        <div className="weather-icon">
          <WeatherIcon wea={weatherData.wea as string} weaImag={weatherData.wea_img as string} />
        </div>
        <div className="weather-info">
          <span className="location">
            {weatherData.city} <EnvironmentOutlined />
          </span>
          <span className="temperature">
            {weatherData.tem} <WeatherIconFont type="iconCelcius1" />
          </span>
        </div>
      </div>
    );
  }
}

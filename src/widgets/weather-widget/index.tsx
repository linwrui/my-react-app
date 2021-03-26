import { EnvironmentOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import { WeatherIconFont } from '../../components/iconfont';
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
  private willUnmounted = false;

  constructor(props: WeatherWidgetProps) {
    super(props);
    this.state = {
      weatherData: {},
    };
  }

  componentDidMount() {
    axios.get('/weather/api?version=v6&appid=42734629&appsecret=MA2q7dbR').then(weather => {
      if (this.willUnmounted) return;
      console.log(weather.data);
      this.setState({
        weatherData: weather.data,
      });
    });
  }

  componentWillUnmount() {
    this.willUnmounted = true;
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

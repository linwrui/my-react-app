import { EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { IconFont } from '../../elements/iconfont';
import './style.less';

function WeatherIcon(props: { weaImag: string }) {
  // xue、lei、shachen、wu、bingbao、yun、yu、yin、qing
  const weatherTypes: { [key: string]: string } = {
    xue: 'iconSnow',
    lei: 'iconThunder',
    yun: 'iconCloud',
    yu: 'iconRain',
    yin: 'iconCloudy2',
    qing: 'iconSun',
  };
  const { weaImag } = props;
  return (
    <IconFont
      style={{ fontSize: '36px' }}
      type={weatherTypes[weaImag] || 'iconCloud'}
    />
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
export class WeatherWidget extends React.Component<
  WeatherWidgetProps,
  WeatherWidgetState
> {
  private willUnmounted = false;

  constructor(props: WeatherWidgetProps) {
    super(props);
    this.state = {
      weatherData: {},
    };
  }

  componentDidMount() {
    axios
      .get('/weather/api?version=v6&appid=42734629&appsecret=MA2q7dbR')
      .then(weather => {
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
          <WeatherIcon weaImag={weatherData.wea_img as string} />
        </div>
        <div className="weather-info">
          <span className="location">
            {weatherData.city} <EnvironmentOutlined />
          </span>
          <span className="temperature">
            {weatherData.tem} <IconFont type="iconCelcius" />
          </span>
        </div>
      </div>
    );
  }
}

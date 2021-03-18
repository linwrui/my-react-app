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
interface WeatherWidgetPropType {
  color: string;
}
interface WeatherWidgetStateType {
  weatherData: {
    city?: string;
    wea?: string;
    wea_img?: string;
    tem?: string;
  };
}
export class WeatherWidget extends React.Component<
  WeatherWidgetPropType,
  WeatherWidgetStateType
> {
  constructor(props: WeatherWidgetPropType) {
    super(props);
    this.state = {
      weatherData: {},
    };
  }

  componentDidMount() {
    axios
      .get('/weather/api?version=v6&appid=42734629&appsecret=MA2q7dbR')
      .then(weather => {
        console.log(weather.data);
        this.setState({
          weatherData: weather.data,
        });
      });
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

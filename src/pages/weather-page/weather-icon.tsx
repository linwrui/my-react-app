import { Tooltip } from 'antd';
import React from 'react';
import { WeatherIconFont } from '../../components/iconfont';

interface WeatherIconProps {
  wea: string;
  weaImg: string;
  size?: number;
}

export class WeatherIcon extends React.Component<WeatherIconProps> {
  private getWeatherIconType(): string {
    const { weaImg } = this.props;
    const now = new Date();
    const useMoon = now.getHours() >= 18 || now.getHours() < 6;

    const weatherTypes: { [key: string]: string } = {
      xue: 'iconSnow1',
      lei: 'iconThunder1',
      shachen: 'iconSandstorm1',
      wu: 'iconFog1',
      bingbao: 'iconHail1',
      yun: useMoon ? 'iconCloudy-Moon1' : 'iconCloudy-Sun1',
      yu: 'iconRain1',
      yin: 'iconCloudy21',
      qing: useMoon ? 'iconMoon31' : 'iconSun1',
    };

    return weatherTypes[weaImg] || 'iconCloud';
  }

  render() {
    const { wea, size = 80 } = this.props;
    const iconType = this.getWeatherIconType();

    return (
      <Tooltip placement="bottom" title={wea}>
        <WeatherIconFont style={{ fontSize: `${size}px` }} type={iconType} />
      </Tooltip>
    );
  }
}

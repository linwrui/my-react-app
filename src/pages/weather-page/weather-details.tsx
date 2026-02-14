import { Card, Descriptions } from 'antd';
import React from 'react';
import { WeatherData } from '../../utils/weather-service';
import './weather-details.less';

interface WeatherDetailsProps {
  data: WeatherData;
}

/* eslint-disable react/prefer-stateless-function */
export class WeatherDetails extends React.Component<WeatherDetailsProps> {
  render() {
    const { data } = this.props;

    const basicInfo = [
      { key: 'city', label: '城市', value: data.city },
      { key: 'cityid', label: '城市ID', value: data.cityid },
      { key: 'wea', label: '天气', value: data.wea },
      { key: 'tem', label: '当前温度', value: data.tem ? `${data.tem}°C` : '' },
      { key: 'tem1', label: '最高温度', value: data.tem1 ? `${data.tem1}°C` : '' },
      { key: 'tem2', label: '最低温度', value: data.tem2 ? `${data.tem2}°C` : '' },
      { key: 'humidity', label: '湿度', value: data.humidity },
      { key: 'win', label: '风向', value: data.win },
      { key: 'win_speed', label: '风速', value: data.win_speed },
      { key: 'win_meter', label: '风力', value: data.win_meter },
      { key: 'pressure', label: '气压', value: data.pressure },
      { key: 'visibility', label: '能见度', value: data.visibility },
      { key: 'sun_rise', label: '日出', value: data.sun_rise },
      { key: 'sun_set', label: '日落', value: data.sun_set },
      { key: 'uv', label: '紫外线', value: data.uv ? `${data.uv} ${data.uv_desc || ''}` : '' },
      { key: 'rain', label: '降雨量', value: data.rain },
      { key: 'air', label: '空气质量指数', value: data.air },
      { key: 'air_level', label: '空气质量等级', value: data.air_level },
      { key: 'air_tips', label: '空气质量提示', value: data.air_tips },
      { key: 'update_time', label: '更新时间', value: data.update_time },
    ].filter(item => item.value);

    return (
      <Card className="weather-details-card" bordered={false} title="天气详细参数">
        <h4 className="detail-section-title">基本信息</h4>
        <Descriptions
          bordered
          column={2}
          size="small"
          className="detail-descriptions"
        >
          {basicInfo.map((item) => (
            <Descriptions.Item key={item.key} label={item.label}>
              {item.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    );
  }
}


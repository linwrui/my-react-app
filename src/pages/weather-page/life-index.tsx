import { Card, Row, Col } from 'antd';
import { SunOutlined, SkinOutlined, CarOutlined, CarryOutOutlined, ThunderboltOutlined } from '@ant-design/icons';
import React from 'react';
import { WeatherData } from '../../utils/weather-service';
import './life-index.less';

interface LifeIndexProps {
  data: WeatherData;
}

export class LifeIndex extends React.Component<LifeIndexProps> {
  private getIconByType(type: string): React.ReactNode {
    const iconMap: { [key: string]: React.ReactNode } = {
      uv: <SunOutlined />,
      dress: <SkinOutlined />,
      wash_car: <CarOutlined />,
      travel: <CarryOutOutlined />,
      exercise: <ThunderboltOutlined />,
    };
    return iconMap[type] || <SunOutlined />;
  }

  private getIndexItems() {
    const { data } = this.props;
    const lifeIndex = data.life_index;

    return [
      {
        type: 'uv',
        title: '紫外线指数',
        value: lifeIndex.uv,
        desc: lifeIndex.uv_desc,
      },
      {
        type: 'dress',
        title: '穿衣指数',
        value: lifeIndex.dress,
        desc: lifeIndex.dress_desc,
      },
      {
        type: 'wash_car',
        title: '洗车指数',
        value: lifeIndex.wash_car,
        desc: lifeIndex.wash_car_desc,
      },
      {
        type: 'travel',
        title: '旅游指数',
        value: lifeIndex.travel,
        desc: lifeIndex.travel_desc,
      },
      {
        type: 'exercise',
        title: '运动指数',
        value: lifeIndex.exercise,
        desc: lifeIndex.exercise_desc,
      },
    ];
  }

  render() {
    const indexItems = this.getIndexItems();

    return (
      <Card className="life-index-card" bordered={false} title="生活指数建议">
        <Row gutter={[16, 16]}>
          {indexItems.map((item) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} key={item.type}>
              <div className="index-item">
                <div className="index-icon">{this.getIconByType(item.type)}</div>
                <div className="index-content">
                  <div className="index-title">{item.title}</div>
                  <div className="index-value">{item.value}</div>
                  <div className="index-desc">{item.desc}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

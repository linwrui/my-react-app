import { Card, Row, Col } from 'antd';
import {
  SunOutlined,
  SkinOutlined,
  CarOutlined,
  CarryOutOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { WeatherData } from '../../utils/weather-service';
import './life-index.less';

interface LifeIndexProps {
  data: WeatherData;
}

export class LifeIndex extends React.Component<LifeIndexProps> {
  private getIconByTitle(title: string): React.ReactNode {
    const iconMap: { [key: string]: React.ReactNode } = {
      紫外线: <SunOutlined />,
      穿衣: <SkinOutlined />,
      洗车: <CarOutlined />,
      旅游: <CarryOutOutlined />,
      运动: <ThunderboltOutlined />,
      晨练: <ThunderboltOutlined />,
      舒适度: <HomeOutlined />,
      感冒: <MedicineBoxOutlined />,
      空气污染扩散: <CarryOutOutlined />,
      约会: <CarryOutOutlined />,
      逛街: <ShoppingOutlined />,
    };
    for (const key in iconMap) {
      if (title.includes(key)) {
        return iconMap[key];
      }
    }
    return <SunOutlined />;
  }

  private getIndexItems() {
    const { data } = this.props;
    const forecast = data.forecast || [];
    const today = forecast[0];
    const indexes = today?.index || [];

    return indexes;
  }

  render() {
    const indexItems = this.getIndexItems();

    if (!indexItems || indexItems.length === 0) {
      return null;
    }

    return (
      <Card className="life-index-card" bordered={false} title="生活指数建议">
        <Row gutter={[16, 16]}>
          {indexItems.map((item) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} key={item.title}>
              <div className="index-item">
                <div className="index-icon">{this.getIconByTitle(item.title)}</div>
                <div className="index-content">
                  <div className="index-title">{item.title}</div>
                  <div className="index-value">{item.level}</div>
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

import { Card, Alert, Row, Col } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import React from 'react';
import { AlertData } from '../../utils/weather-service';
import './weather-alert.less';

interface WeatherAlertProps {
  alerts: AlertData[];
}

export class WeatherAlert extends React.Component<WeatherAlertProps> {
  private getAlertTypeColor(level: string): 'success' | 'info' | 'warning' | 'error' {
    const levelLower = (level || '').toLowerCase();
    if (levelLower.includes('红') || levelLower.includes('紧急')) {
      return 'error';
    }
    if (levelLower.includes('橙')) {
      return 'warning';
    }
    if (levelLower.includes('黄')) {
      return 'info';
    }
    return 'success';
  }

  render() {
    const { alerts } = this.props;

    if (!alerts || alerts.length === 0) {
      return null;
    }

    return (
      <Card className="weather-alert-card" bordered={false} title="气象预警">
        <Row gutter={[16, 16]}>
          {alerts.map((alert) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={12} key={alert.alert_title || alert.alert_type}>
              <Alert
                message={
                  <div className="alert-header">
                    <WarningOutlined className="alert-icon" />
                    <span className="alert-title">{alert.alert_title}</span>
                    {alert.alert_level && (
                      <span className="alert-level">{alert.alert_level}</span>
                    )}
                  </div>
                }
                description={
                  <div className="alert-content">
                    {alert.alert_type && (
                      <div className="alert-type">预警类型：{alert.alert_type}</div>
                    )}
                    {alert.alert_content && (
                      <div className="alert-desc">{alert.alert_content}</div>
                    )}
                  </div>
                }
                type={this.getAlertTypeColor(alert.alert_level)}
                showIcon={false}
                className="alert-item"
              />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

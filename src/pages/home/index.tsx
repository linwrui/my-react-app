import { Layout, Tooltip } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import { average } from 'color.js';
import React from 'react';
import { getReverseForegroundColor } from '../../utils/color-util';
import { TimeWidget } from '../../widgets/time-widget';
import { WeatherWidget } from '../../widgets/weather-widget';
import './style.less';

interface StateType {
  backgroundUrl: string;
  imgLoaded: boolean;
  foreColor: string;
  todyBingImage: {
    url?: string;
    copyright?: string;
    copyrightlink?: string;
  };
}

export class Home extends React.Component<any, StateType> {
  private _isMounted = false;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      backgroundUrl: '',
      imgLoaded: false,
      foreColor: '#D2D2D2',
      todyBingImage: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('Home component mounted');
    axios
      .get('/bing-api/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(todyBing => {
        console.log('Bing API response:', todyBing.data);
        if (!this._isMounted) return;
        this.setState({
          backgroundUrl: `/bing-api/${todyBing.data.images[0].url}`,
          todyBingImage: todyBing.data.images[0],
        });
      })
      .catch(error => {
        console.error('Failed to fetch Bing image:', error);
        if (!this._isMounted) return;
        this.setState({
          backgroundUrl: '',
          imgLoaded: true,
        });
      });
  }
    
  componentWillUnmount() {
    this._isMounted = false;
  }

  private handleImgLoaded(event: React.SyntheticEvent<HTMLImageElement>) {
    average(event.currentTarget).then((color: any) => {
      const foreColor = getReverseForegroundColor(color);
      this.setState({
        foreColor,
        imgLoaded: true,
      });
    });
  }

  render() {
    const { backgroundUrl, todyBingImage, imgLoaded, foreColor } = this.state;
    return (
      <Layout className="app-home">
        <Content className="layout-content">
          <div className="main-content">
            {imgLoaded ? <WeatherWidget color={foreColor} /> : null}
            {imgLoaded ? <TimeWidget color={foreColor} /> : null}
            {backgroundUrl ? (
              <img
                onLoad={e => this.handleImgLoaded(e)}
                alt=""
                src={backgroundUrl}
              />
            ) : (
              <div className="loading">加载图片中...</div>
            )}
          </div>
        </Content>
        <Footer>
          <div>{todyBingImage?.copyright}</div>
          <div>
            <Tooltip placement="bottom" title="点击查看图片详细信息">
              <a
                target="_blank"
                rel="noreferrer"
                href={todyBingImage.copyrightlink}>
                图片来源：https://www.bing.com
              </a>
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    );
  }
}

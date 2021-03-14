import { Layout, Tooltip } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import React from 'react';
import { Container } from '../../elements/container';
import './style.less';

export class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      backgroundUrl: '',
      todyBingImage: {},
    };
  }

  componentDidMount() {
    axios
      .get('/bing-api/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(todyBing => {
        console.log(todyBing.data);
        this.setState({
          backgroundUrl: `/bing-api/${todyBing.data.images[0].url}`,
          todyBingImage: todyBing.data.images[0],
        });
      });
  }

  render() {
    const { backgroundUrl, todyBingImage } = this.state;
    return (
      <Container xAttr="home">
        <Layout>
          <Content>
            <img alt="" src={backgroundUrl} />
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
      </Container>
    );
  }
}

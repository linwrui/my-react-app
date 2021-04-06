import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Dropdown, Select, Space, Tooltip } from 'antd';
import React from 'react';
import { PokerWidget } from '../../../widgets/poker-widget';
import { calcExpectationResult } from './calc-expectation-result';
import './style.less';

const { Option } = Select;
interface Poker24PointGameState {
  pokerCards: React.ReactNodeArray;
  specifiedCards: string[];
  expectationCalculateResult: {
    results: string[];
    message?: string;
  };
  resultsCollaged: boolean;
}
export class Poker24PointGame extends React.Component<unknown, Poker24PointGameState> {
  private readonly availablePoints = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  private currentCards: Array<{ point: string; [key: string]: string }> = [];

  constructor(props: unknown) {
    super(props);
    this.state = {
      pokerCards: [],
      specifiedCards: [],
      expectationCalculateResult: { results: [] },
      resultsCollaged: true,
    };
  }

  componentDidMount() {
    this.randomCards([]);
  }

  private randomCards(points: string[]) {
    const availablePic = ['spades', 'clubs', 'diamonds', 'hearts'];
    const cards: any[] = [];
    while (cards.length < 4) {
      const card = {
        point: points[cards.length] || (this.availablePoints[Math.floor(Math.random() * 13)] as any),
        pic: availablePic[Math.floor(Math.random() * 10) % 4] as any,
        key: '',
      };
      card.key = `${card.point}-${card.pic}`;
      if (!cards.some(x => x.key === card.key)) {
        cards.push(card);
      }
    }
    this.currentCards = cards;
    this.setState({
      pokerCards: cards.map(card => <PokerWidget key={card.key} point={card.point} pic={card.pic} />),
      expectationCalculateResult: { results: [] },
      resultsCollaged: true,
    });
  }

  private calcResult() {
    this.setState({
      expectationCalculateResult: calcExpectationResult(
        this.currentCards.map(x => {
          const cardNum = this.availablePoints.indexOf(x.point) + 1;
          return cardNum > 10 ? 10 : cardNum;
        })
      ),
    });
  }

  render() {
    const { pokerCards, expectationCalculateResult, resultsCollaged, specifiedCards } = this.state;
    const submitCards = (values: any) => {
      this.randomCards(values);
    };
    const hasResult = expectationCalculateResult.results.length > 0 || expectationCalculateResult.message;
    const cardSelectorFormItem = (index: number) => {
      return (
        <div>
          <span style={{paddingRight: 10}}>Card{index + 1}</span>
          <Select
            allowClear
            placeholder="随机出牌"
            style={{ width: 100 }}
            onClick={e => e.stopPropagation()}
            onChange={v => {
              specifiedCards[index] = v?.toString();
            }}>
            {this.availablePoints.map(x => (
              <Option key={x} value={x}>
                {x}
              </Option>
            ))}
          </Select>
        </div>
      );
    };
    const cardSelectors = (
      <Space direction="vertical">
        <span>请选择指定卡牌点数</span>
        {cardSelectorFormItem(0)}
        {cardSelectorFormItem(1)}
        {cardSelectorFormItem(2)}
        {cardSelectorFormItem(3)}
      </Space>
    );
    return (
      <div className="poker24Point-game">
        <Card
          className="post-cards"
          title={
            <div className="post-cards-title">
              <Dropdown.Button
                type="primary"
                htmlType="submit"
                placement="bottomCenter"
                trigger={['click']}
                onClick={() => submitCards(specifiedCards)}
                overlay={
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #d7d7d7',
                      boxShadow: '10px 10px 10px #d2d2d2',
                      padding: 10,
                    }}>
                    {cardSelectors}
                  </div>
                }>
                出牌
              </Dropdown.Button>
            </div>
          }>
          <div className="poker-cards">{pokerCards.map(card => card)}</div>
        </Card>
        <Divider />
        <Card
          style={{ height: 'calc(100% - 280px)', overflow: 'auto', minHeight: 280 }}
          bodyStyle={{ height: 'calc(100% - 65px)', overflow: 'auto' }}
          title={
            <div className="calc-results-title">
              <Space size="small" align="start">
                {hasResult ? (
                  <Tooltip title="再次点击查看结果">
                    <Button type="primary" onClick={() => this.setState({ resultsCollaged: false })}>
                      查看结果（共 {expectationCalculateResult.results.length} 个）
                    </Button>
                  </Tooltip>
                ) : (
                  <Button type="primary" onClick={() => this.calcResult()}>
                    计算结果
                  </Button>
                )}
                {hasResult ? (
                  <Tooltip title="清除结果">
                    <Button
                      onClick={() =>
                        this.setState({ expectationCalculateResult: { results: [] }, resultsCollaged: true })
                      }>
                      <CloseOutlined />
                    </Button>
                  </Tooltip>
                ) : null}
              </Space>
            </div>
          }>
          <div className="calc-results">
            <span className="calc-message">{expectationCalculateResult.message}</span>
            {resultsCollaged ? (
              <div>{hasResult ? '请点击 查看结果 按钮展开计算结果' : '请点击 计算结果 开始运算'}</div>
            ) : (
              expectationCalculateResult.results.map(result => (
                <div key={result} className="calc-result">
                  {result}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    );
  }
}

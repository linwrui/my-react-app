import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, FormInstance, Select, Space, Tooltip } from 'antd';
import React from 'react';
import { PokerWidget } from '../../../widgets/poker-widget';
import { calcExpectationResult } from './calc-expectation-result';
import './style.less';

const { Option } = Select;
interface Poker24PointGameState {
  pokerCards: React.ReactNodeArray;
  expectationCalculateResult: {
    results: string[];
    message?: string;
  };
}
export class Poker24PointGame extends React.Component<unknown, Poker24PointGameState> {
  private readonly availablePoints = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  private currentCards: Array<{ point: string; [key: string]: string }> = [];
  private readonly formRef = React.createRef<FormInstance>();

  constructor(props: unknown) {
    super(props);
    this.state = {
      pokerCards: [],
      expectationCalculateResult: { results: [] },
    };
  }

  componentDidMount() {
    this.randomCards([]);
  }

  private randomCards(points: string[]) {
    const availableColor = ['red', 'dark'];
    const availablePic = ['spades', 'clubs', 'diamonds', 'hearts'];
    const cards = Object.assign([undefined, undefined, undefined, undefined], points).map(point => ({
      point: point || (this.availablePoints[Math.floor(Math.random() * 13)] as any),
      color: availableColor[Math.floor(Math.random() * 10) % 2] as any,
      pic: availablePic[Math.floor(Math.random() * 10) % 4] as any,
      key: '',
    }));
    cards.forEach((card, index) => {
      const c = card;
      c.key = `${card.point}-${card.color}-${card.pic}-${index}`;
    });
    this.currentCards = cards;
    this.setState({
      pokerCards: cards.map(card => (
        <PokerWidget key={card.key} point={card.point} color={card.color} pic={card.pic} />
      )),
      expectationCalculateResult: { results: [] },
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
    const { pokerCards, expectationCalculateResult } = this.state;
    const submitCards = (values: any) => {
      this.randomCards([values.card1, values.card2, values.card3, values.card4]);
    };
    const cardSelectorFormItem = (index: number) => {
      const itemName = `card${index}`;
      return (
        <Form.Item name={itemName}>
          <Select allowClear placeholder="随机">
            {this.availablePoints.map(x => (
              <Option key={x} value={x}>
                {x}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    };
    return (
      <div className="poker24Point-game">
        <Card
          className="post-cards"
          title={
            <div className="post-cards-title">
              <Form size="small" layout="inline" ref={this.formRef} name="control-ref" onFinish={v => submitCards(v)}>
                {cardSelectorFormItem(1)}
                {cardSelectorFormItem(2)}
                {cardSelectorFormItem(3)}
                {cardSelectorFormItem(4)}
                <Form.Item>
                  <Button value="small" htmlType="submit">
                    出牌
                  </Button>
                </Form.Item>
              </Form>
            </div>
          }>
          <div className="poker-cards">{pokerCards.map(card => card)}</div>
        </Card>
        <Divider />
        <Card
          style={{ height: 'calc(100% - 280px)', overflow: 'auto', minHeight: 200 }}
          bodyStyle={{ height: 'calc(100% - 65px)', overflow: 'auto' }}
          title={
            <div className="calc-results-title">
              <Space size="large" align="start">
                <Button onClick={() => this.calcResult()} value="small">
                  计算结果
                </Button>
                {expectationCalculateResult.results.length > 0 || expectationCalculateResult.message ? (
                  <Tooltip title="清除结果">
                    <Button
                      onClick={() => this.setState({ expectationCalculateResult: { results: [] } })}
                      value="small">
                      <CloseOutlined />
                    </Button>
                  </Tooltip>
                ) : null}
              </Space>
            </div>
          }>
          <div className="calc-results">
            <span className="calc-message">{expectationCalculateResult.message}</span>
            {expectationCalculateResult.results.map(result => (
              <div key={result} className="calc-result">
                {result}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

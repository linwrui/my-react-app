import React from 'react';
import './style.less';

interface TimeWidgetStateType {
  now: Date;
}
export class TimeWidget extends React.Component<any, TimeWidgetStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        now: new Date(),
      });
    }, 100);
  }

  render() {
    const { now } = this.state;
    const numberToString = (num: number) =>
      num >= 10 ? num.toString() : `0${num}`;
    return (
      <div className="time-widget">
        <div className="time">
          <span>
            {numberToString(now.getHours())}:{numberToString(now.getMinutes())}:{numberToString(now.getSeconds())}
          </span>
        </div>
        <div className="date">
          <span>
            {numberToString(now.getFullYear())} / {numberToString(now.getMonth())} / {numberToString(now.getDate())}
          </span>
        </div>
      </div>
    );
  }
}

import React from 'react';
import { BoardGame } from './board-game';
import './style.less';

export class Game extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render(): any {
    return (
      <div className="game">
        <BoardGame/>
      </div>
    );
  }
}

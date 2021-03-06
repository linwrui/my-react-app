import { Button } from 'antd';
import React from 'react';
import './style.less';

function Square(props: any) {
  const { onClick, value } = props;
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component<any> {
  renderSquare(i: number) {
    const { squares, onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export class Game extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number): void {
    let { history } = this.state;
    const { stepNumber, xIsNext } = this.state;
    history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step: number): void {
    const { history } = this.state;
    this.setState({
      history: history.splice(0, step + 1),
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render(): any {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step: number, move: number) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';

      // 每当一个列表重新渲染时，React 会根据每一项列表元素的 key 来检索上一次渲染时与每个 key 所匹配的列表项。
      // 组件的 key 值并不需要在全局都保证唯一，只需要在当前的同一级元素之前保证唯一即可。
      return (
        <li style={{ margin: '5px' }} key={move.toString()}>
          <Button onClick={() => this.jumpTo(move)}>{desc}</Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          {winner ? <div className="winner">{`winner: ${winner}`}</div> : null}
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div style={{ fontWeight: 'bold' }}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

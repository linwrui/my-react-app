import { RocketOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React from 'react';
import { PokerIconFont } from '../../elements/iconfont';
import { Poker24PointGame } from './24-point-game';
import { BoardGame } from './board-game';
import './style.less';

interface GameItem {
  game: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
}
interface GameState {
  games: GameItem[];
  selectedGame: GameItem;
}

export class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props);
    const games = [
      {
        game: 'Poker24Point',
        component: <Poker24PointGame />,
        icon: <PokerIconFont type="icon-icon_poker"/>
      },
      {
        game: 'BoardGame',
        component: <BoardGame />,
      },
    ];
    this.state = {
      games,
      selectedGame: games[0],
    };
  }

  render(): any {
    const { games, selectedGame } = this.state;
    return (
      <div className="app-game">
        <Menu
          mode="horizontal"
          onSelect={e => this.setState({ selectedGame: games.find(g => g.game === e.key) as GameItem })}
          defaultSelectedKeys={[selectedGame.game]}>
          {games.map(g => (
            <MenuItem key={g.game} icon={g.icon || <RocketOutlined />}>
              {g.game}
            </MenuItem>
          ))}
        </Menu>
        <div className="game">{selectedGame.component}</div>
      </div>
    );
  }
}

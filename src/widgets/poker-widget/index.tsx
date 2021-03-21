import React from 'react';
import { PokerIconFont } from '../../elements/iconfont';
import './style.less';

interface PokerWidgetProps {
  point: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  color: 'red' | 'dark';
  pic: 'spades' | 'clubs' | 'diamonds' | 'hearts';
}
export function PokerWidget(props: PokerWidgetProps) {
  const { point, color, pic } = props;
  let cardColor;
  switch (pic) {
    case 'spades':
      cardColor = 'dark';
      break;
    case 'hearts':
      cardColor = 'red';
      break;
    default:
      cardColor = color;
      break;
  }
  const pokerIconType = `icon-poker-${pic}`;
  return (
    <div className="poker-widget" style={{ color: cardColor || 'red' }}>
      <div className="card">
        <div className="card-top">
          <span className="card-point">{point}</span>
          <span className="card-pic">
            <PokerIconFont type={pokerIconType} />
          </span>
        </div>
        <div className="card-content">
          <span className="card-pic">
            <PokerIconFont type={pokerIconType} />
          </span>
        </div>
      </div>
    </div>
  );
}

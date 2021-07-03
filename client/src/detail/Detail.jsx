import React from "react";
import playerImage from '../img/player-img.jpg';
import { Link } from 'react-router-dom';
import './Detail.css';

export default function Detail({ player }) {
  return (
    <div className="playerDetail">
      <Link to={'/'}><button className='returnLink'>Return home</button></Link>
        <h2 className='detailPlayerName'>{player.name}</h2>
        <img className='detailPlayerImage' src={playerImage} alt='Player'></img>
        <div className='detailInfo'>
          <div>Position: {player.position}</div>
          <div>Nation: {player.nation}</div>
          <div>Club: {player.club}</div>
        </div>
    </div>
  )
}
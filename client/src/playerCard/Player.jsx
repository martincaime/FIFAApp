import React from 'react';
import { Link } from 'react-router-dom';
import playerImage from '../img/player-img.jpg';
import './Player.css';

export default function Player(props) {
  return (
    <div className='playerCard'>
      <Link className='playerNameLink' to={`/player/${props.id}`}>
        <h4 className='playerName'>{props.name}</h4>
      </Link>
      <p className='playerPosition'>{props.position}</p>
      <img className='playerImage' src={playerImage} alt='Player'></img>
    </div>
  )
};
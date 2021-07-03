import React from 'react';
import Player from '../playerCard/Player';
import SearchBar from '../searchBar/SearchBar.jsx';
import './Home.css';
import axios from 'axios';

export default function Home( {players, setPlayers, page, setPage, totalPages} ) {
  async function getPlayers(name, order = 'asc', page = 1) {
    return await axios.get(`http://localhost:3001/api/v1/players?search=${name}&order=${order}&page=${page}`)
      .then(res => setPlayers(res.data.Players))
  }
  async function getTeam(name, page = 1) {
    return await axios.post('http://localhost:3001/api/v1/team', { name, page })
      .then(res => setPlayers(res.data.Players))
  }
  if (players.length > 0) {
    return (
      <div className='home'>
        <div className='searchBars'>
          <SearchBar className='playersSearchBar' label='Player' onSearch={getPlayers} />
          <SearchBar className='teamSearchBar' label='Team' onSearch={getTeam} />
        </div>
        <div className='players'>
          {players.map(p => <Player
            key={p.name + p.id}
            name={p.name}
            position={p.position}
            id={p.id}
          />)}
        </div>
       { page !== 1 ? <button className='paginationButton' onClick={ () => setPage(page-1)}>{'<'}</button> : null}
      {page !== totalPages ? <button className='paginationButton' onClick={ () => setPage(page+1)}>{'>'}</button> : null}
      </div>
    );
  }
  else {
    return (
      <div className='noPlayers'>No players</div>
    )
  }
}
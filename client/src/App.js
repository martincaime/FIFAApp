import React, {useState, useEffect} from 'react';
import Home from './home/Home';
import Detail from './detail/Detail';
import {Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/players?search=&order=asc&page=${page}`)
      .then(res => {setPlayers(res.data.Players); setTotalPages(res.data.totalPages); window.scrollTo(0,0)})
  }, [page])
  function onFilter(playerId) {
    let player = players.filter(p => p.id === parseInt(playerId));
    if(player.length > 0) {
        return player[0];
    } else {
        return null;
    }
  }
  return (
    <div className="App">
      <Route
      exact path='/'
      render={() => <Home
        players={players} setPlayers={setPlayers} page={page} setPage={setPage} totalPages={totalPages} />}
      />
      <Route
      exact path='/player/:playerId'
      render={({match}) => <Detail player={onFilter(match.params.playerId)}/>}
      />
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const [player, setPlayer] = useState('');
  return (
    <div className= 'searchBar'>
      <form className='searchPlayerBar' onSubmit= {(e) => {
        e.preventDefault();
        props.onSearch(player);
        setPlayer('');
        }}>
          <input className= 'searchInput' type= 'text' 
          placeholder= {props.label} 
          value= {player} 
          onChange= {(e) => setPlayer(e.target.value)}/>
          <input className= 'searchButton' type= 'submit' 
          value= 'Search'/>
      </form>
    </div>
  )
};
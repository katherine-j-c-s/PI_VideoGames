import React,{useEffect} from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../Cards/Cards'
import {
  getGames,
  orderByRank,
  resetGames,
  orderByAlfb,
  handleNumber,
  getGamesByGenre
} from '../../redux/actions/actions'


export default function Home() {
  const { games ,numPage, genres} = useSelector((state) => state);

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getGames())
  },[])
  function handleOrderRank(e) {
    const { name } = e.target;
    dispatch(orderByRank(name))
    dispatch(handleNumber(1))
  }
  function handleOrderAlf() {
    dispatch(orderByAlfb())
    dispatch(handleNumber(1))
  }
  function resetBtton() {  
    dispatch(resetGames());
    dispatch(handleNumber(1))
  }
  function handleFilterGamesByGenre(event) {
    event.preventDefault();
    dispatch(getGamesByGenre(event.target.value));
    dispatch(handleNumber(1))
  }
  return (
    <div className='home'>
      <h1 className='title'>Games You Might Like</h1>
      {console.log(games)}
        <div className='btnsBox'>
          <button className='btns' onClick={handleOrderRank} name='Highest'>Highest Rank</button>
          <button className='btns' onClick={handleOrderRank} name='Lowest'>Lowest Rank</button>
          <button className='btns' onClick={handleOrderAlf} name='alphabetical order'>alphabetical order</button>
          <button className='btns' onClick={resetBtton} name='Reset'>reset</button>
          <select className='btns' defaultValue={"sinFiltro"} onChange={(event) => handleFilterGamesByGenre(event)}>
            <option value="sinFiltro">Genres</option>
              {genres?.map((g, i) => {
                return (
                  <option className='btnsGenres' value={g.name} key={i}>{g.name}</option>
                );
              })}
          </select>
        </div>
        <Cards className='containerCards' games={games} numPage={numPage}></Cards>
    </div>
  )
}

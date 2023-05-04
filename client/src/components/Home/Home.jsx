import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../Cards/Cards'
import {
  orderByRank,
  resetGames,
  orderByAlfb,
  handleNumber
} from '../../redux/actions/actions'


export default function Home() {
  const { games ,gamesOrigin,numPage} = useSelector((state) => state);
  const dispatch = useDispatch()
  function handleOrderRank(e) {
    const { name } = e.target;
    dispatch(orderByRank(name,"games"))
    dispatch(handleNumber(1))
  }
  function handleOrderAlf() {
    dispatch(orderByAlfb())
    dispatch(handleNumber(1))
  }
  function resetBtton() {
    console.log(gamesOrigin);
    dispatch(resetGames());
    dispatch(handleNumber(1))
  }
  return (
    <div>
        <div>
          <button onClick={handleOrderRank} name='Highest'>Highest Rank</button>
          <button onClick={handleOrderRank} name='Lowest'>Lowest Rank</button>
          <button onClick={handleOrderAlf} name='alphabetical order'>alphabetical order</button>
          <button onClick={resetBtton} name='Reset'>reset</button>
        </div>
        <h1>this is home</h1>
        <Cards games={games} numPage={numPage}></Cards>
    </div>
  )
}

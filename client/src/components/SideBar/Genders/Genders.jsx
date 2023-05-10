import React, { useEffect, useState } from 'react'
import CardsG from '../CardsG/CardsG'
import Cards from '../../Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import {getGamesByGenre} from '../../../redux/actions/actions'
import './Genre.css'

export default function Genders() {
  let {genres, gamesByGenre ,numPage,showGamesByGenre} = useSelector((state)=>state)
  let [showGamesG,setShowGamesG] = useState()
  const dispatch = useDispatch()
  useEffect(()=>{
    setShowGamesG(showGamesByGenre);
  },[showGamesByGenre])
  function goBack() {
    dispatch(getGamesByGenre(false,"Action"))
  }
  return (
    <div className='alingGenres'>
        {showGamesG === true ? 
        <p onClick={goBack}>back</p>
        :null}
        <h1 className='title'>This are the Genres</h1>
        {showGamesG === false ?
          <div className='containerCardsG'>
          {genres &&
            genres.map(g=>{
              return(
                <CardsG 
                key={g.id}
                id = {g.id}
                name = {g.name}
                image = {g.image}
                games_count = {g.games_count}
                />
              )
            })
          }
        </div>:null}
        {showGamesG === true ? 
        <p>in games</p>
        :null}
    </div>
  )
}

import React from 'react'
import CardsG from '../CardsG/CardsG'
import {useSelector } from 'react-redux'
import './Genre.css'

export default function Genders() {
  let {genres} = useSelector((state)=>state)
  return (
    <div className='alingGenres'>
        <h1 className='title'>This are the Genres</h1>
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
        </div>
    </div>
  )
}

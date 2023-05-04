import React from 'react'
import CardsG from '../CardsG/CardsG'


export default function Genders({genres}) {
  return (
    <div>
        <h1>This are the Genres</h1>
        {genres &&
          genres.map(g=>{
            return(
              <CardsG 
              id = {g.id}
              name = {g.name}
              image = {g.image}
              games_count = {g.games_count}
              />
            )
          })

        }
        
    </div>
  )
}

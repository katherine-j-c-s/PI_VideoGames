import React from 'react'
import './Cards.css'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'

export default function Cards({games,numPage}) {
  
  let desde = (numPage - 1) * 15;
  let hasta = numPage * 15;

  let cantPages = Math.floor(games.length / 8);

  let viewGames = games?.slice(desde, hasta);
  
  return (
    <div className='container'>
      <div className='cardsContainer'>
        {viewGames &&
          viewGames.map((v)=>{
            return(
              <Card
                key={v.id}
                id={v.id}
                name={v.name}
                image={v.image}
                genres={v.Genres}
                rating={v.rating}
                releaseDate={v.releaseDate}
                platforms={v.ParentPlatforms}
              />
            )
          })
        }
      </div>
      <Paginate cantPages={cantPages}></Paginate>
    </div>
    
  )
}

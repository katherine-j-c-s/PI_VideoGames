import React from 'react'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'

import { useSelector } from 'react-redux'

export default function Cards({games,numPage}) {
  
  let desde = (numPage - 1) * 15;
  let hasta = numPage * 15;

  let cantPages = Math.floor(games.length / 8);

  let viewGames = games?.slice(desde, hasta);

  return (
    <div>
      {/* {console.log(games)} */}
        {viewGames &&
          viewGames.map((v)=>{
            return(
              <Card
                key={v.id}
                id={v.id}
                name={v.name}
                image={v.image}
                genres={v.Genres}
                platforms={v.ParentPlatforms}
              />
            )
          })
        }
        <Paginate cantPages={cantPages}></Paginate>
    </div>
  )
}

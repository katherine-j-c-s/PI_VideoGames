import React from 'react'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'

import { useSelector } from 'react-redux'

export default function Cards({games}) {
  
  const {numPage} = useSelector((state)=>state)
  
  let desde = (numPage - 1) * 4;
  let hasta = numPage * 4;

  let cantPages = Math.floor(games.length / 4);

  let viewGames = games?.slice(desde, hasta);

  return (
    <div>
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
                description={v.description}
              />
            )
          })
        }
        <Paginate cantPages={cantPages}></Paginate>
    </div>
  )
}

import React from 'react'
import Card from '../Card/Card'

export default function Cards({videogames}) {
  return (
    <div>
        {videogames &&
          videogames.map((v,i)=>{
            return(
              <Card
                id={i}
                name={v.name}
                image={v.image}
                genres={v.Genres}
                platforms={v.ParentPlatforms}
                description={v.description}
              />
            )
          })
        }
    </div>
  )
}

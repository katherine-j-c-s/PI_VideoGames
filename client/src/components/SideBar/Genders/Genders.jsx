import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardS from '../CardS/CardS'

export default function Genders() {
  let [genders,setGenres] = useState()
  useEffect(()=>{
    axios.get("http://localhost:3001/genres")
    .then(({data})=>{
      setGenres(data)
    })
  },[]) 
  
  return (
    <div>
        <h1>This are the Genres</h1>
        {genders && 
          genders.map((g,i)=>{
            return(
              <CardS
                key={i}
                id={g.id}
                name={g.name}
                image={g.image}
                games_count={g.games_count}
              />
            )
          })
        }
    </div>
  )
}

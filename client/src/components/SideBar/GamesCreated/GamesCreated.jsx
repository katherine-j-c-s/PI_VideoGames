import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../../Cards/Cards'
import { useSelector } from 'react-redux'

export default function GamesCreated() {
    let [games,setGames] = useState()
    const {numPage} = useSelector((state)=>state)
    useEffect(()=>{
        axios.get("http://localhost:3001/videogames/gamesCreated")
        .then(({data})=>{
            setGames(data);
        })
    },[])
  return (
    <div>
        <h1 className='title'>games created</h1>
        {games !== undefined ?
            <Cards className='containerCards' games={games} numPage={numPage}></Cards>
        :null}
    </div>
  )
}

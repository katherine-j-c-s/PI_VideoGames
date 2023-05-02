import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from '../Cards/Cards'

export default function SearchBar({ onSearch }) {

  let [name,setname] = useState("")
  let [games,setGames] = useState(false)
  let [search,setSearch] = useState(false)

  const { gamesFound } = useSelector((state)=> state)

  function handleChange(event) {
    setname(event.target.value)
    if (name.length > 1) {
      setSearch(true)
    }else{
      setSearch(false)
    }
  }

  function submit() {
    onSearch(name)
    setGames(gamesFound)
  }
  return (
    <div>
      <input onChange={handleChange} type="search" name="search" value={name} />
      {search === true ? 
        <button onClick={submit}>Search</button>
      : null}
      { games !== false ?  
        <div>
          <Cards games={games} ></Cards>
        </div>
       : null}
    </div>

  )
}

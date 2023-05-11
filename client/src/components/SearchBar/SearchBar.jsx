import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {searchGame} from '../../redux/actions/actions'
import Cards from '../Cards/Cards'
import './SearchBar.css'

export default function SearchBar() {

  let [name,setname] = useState("")
  let [games,setGames] = useState(false)
  let [search,setSearch] = useState(false)
  const dispatch = useDispatch()

  const { gamesFound, numPage } = useSelector((state)=> state)

  function handleChange(event) {
    setname(event.target.value)
    dispatch(searchGame(name))
    if (name.length > 1) {
      setSearch(true)
    }else{
      setSearch(false)
    }
  }
  function submit() {
    setGames(gamesFound)
  }
  return (
    <div className='searchContainer'>
      <div className='search'>
        <input className='inputSearch' onChange={handleChange} type="search" name="search"/>
        {search === true ? 
          <button className='btnSearch' onClick={submit}>Search</button>
        : null}
      </div>
      { games !== false ?  
        <div>
          <Cards games={games} numPage={numPage} ></Cards>
        </div>
       : null}
    </div>

  )
}

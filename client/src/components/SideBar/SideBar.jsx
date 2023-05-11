import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Platforms from './Platforms/Platforms'
import './SideBar.css'

export default function SideBar() {
  let [showP,setShowP] = useState(false)
  
  function showPlatforms() {
    if (showP) {
      setShowP(false)
    }
    if (!showP) {
      setShowP(true)
    }
  }
  return (
    <div className='sideBar'>
        <Link className='textSideBar' to={'/genres'}>
          <p>Gender</p>
        </Link>
        <Link className='textSideBar' to={'/addGame'}>
          <p>Add Game</p>
        </Link>
        <Link className='textSideBar' to={'/gamesCreated'}>
          <p>Games Created</p>
        </Link>
        <div className='textSideBar' onClick={showPlatforms}>
          <p>Platforms</p>
        </div>
        {showP === true ? <Platforms/> : null}
    </div>
  )
}

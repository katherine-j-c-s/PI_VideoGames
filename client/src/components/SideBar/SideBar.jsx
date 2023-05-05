import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Platforms from './Platforms/Platforms'


export default function SideBar({platforms}) {
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
    <div>
        <Link to={'/genres'}>
          <p>Gender</p>
        </Link>
        <Link to={'/addGame'}>
          <p>Add Game</p>
        </Link>
        <div onClick={showPlatforms}>
          <p>Platforms</p>
        </div>
        {showP === true ? <Platforms platforms={platforms}/> : null}
    </div>
  )
}

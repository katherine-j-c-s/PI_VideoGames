import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Platforms from './Platforms/Platforms'

export default function SideBar() {
  let [showP,setShowP] = useState(false)
  function showPlatforms() {
    if (showP) {
      setShowP(false)
      console.log(showP);
    }
    if (!showP) {
      setShowP(true)
      console.log(showP);
    }
  }
  return (
    <div>
        <Link to={'/genres'}>
            <p>Gender</p>
        </Link>
        <Link to={'/rating'}>
            <p>Rating</p>
        </Link>
        <div>
          <p >Platforms</p>
          {/* {setShowP ? <Platforms></Platforms> : null} */}
        </div>
    </div>
  )
}

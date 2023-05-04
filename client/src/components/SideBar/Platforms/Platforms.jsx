import React from 'react'
import { useState} from 'react'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Platforms({platforms}) {
  let [allPlatforms,setAllPlatforms] = useState([
    <FaLaptop/>,
    <FaPlaystation/>,
    <FaXbox/>,
    <BsApple/>,
    <BsAndroid2/>,
    <GrArchlinux/>,
    <BsNintendoSwitch/>,
    <FaAppStoreIos/>,
    <TbWorld/>
  ])
  return (
    <div>
      <ul>
        {platforms &&
          platforms.map(p=>{
              let icon = allPlatforms[p.id - 1]
              return(
              <li>{icon} {p.name} </li>
              )
          })
        }
      </ul>
    </div>
  )
}

import React from 'react'
import './Platforms.css'
import { useState} from 'react'
import { useSelector } from 'react-redux'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'


export default function Platforms() {
  const {platforms} = useSelector((state)=>state)
  let [allPlatforms] = useState([
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
      <ul className='platfItems'>
        {platforms &&
          platforms.map(p=>{
              let icon = allPlatforms[p.id - 1]
              return(
              <li className='platfLi' key={p.id}>{icon}__{p.name}</li>
              )
          })
        }
      </ul>
    </div>
  )
}

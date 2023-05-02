import React, { useState } from 'react'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Card({name,image,genres,platforms}) {
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
            <h1>{name}</h1>
            <img src={image} alt={name} />
             <ul>
                {genres &&
                genres.map(g=>{
                    return(
                        <li>{g.name}</li>
                    )
                })
            }
            </ul>
            <ul>
                {platforms &&
                platforms.map(p=>{
                   let icon = allPlatforms[p.id - 1]
                   return(
                    <li>{icon}</li>
                   )
                })
            }
          </ul>
      </div>
    )
}

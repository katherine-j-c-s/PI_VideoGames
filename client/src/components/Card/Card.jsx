import React, { useState } from 'react'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Card({name,image,genres,platforms}) {
    let [allPlatforms,setAllPlatforms] = useState([
        {name:"PC", icon: <FaLaptop/>},
        {name:"PlayStation", icon: <FaPlaystation/>},
        {name:"Xbox", icon: <FaXbox/>},
        {name:"Apple", icon: <BsApple/>},
        {name:"Android", icon: <BsAndroid2/>},
        {name:"Linux", icon: <GrArchlinux/>},
        {name:"Nintendo", icon: <BsNintendoSwitch/>},
        {name:"iOS", icon: <FaAppStoreIos/>},
        {name:"Web", icon: <TbWorld/>}
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
                    let platform = allPlatforms.find(pf => pf.name === p.name)
                    
                    
                })
            }
          </ul>
          <p></p>
      </div>
    )
}

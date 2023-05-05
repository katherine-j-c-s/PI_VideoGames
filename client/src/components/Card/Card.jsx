import React, { useState } from 'react'
import './Card.css'
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
      <div className='cardContainer'>
            <img className='image' src={image} alt={name} />
            <div className='containerPG'>
                <ul className='platf'>
                    {platforms &&
                    platforms.map(p=>{
                    let icon = allPlatforms[p.id - 1]
                    return(
                        <li className='icon'>{icon}</li>
                    )
                    })
                }
                </ul>
                <ul className='generos'>
                    {genres &&
                    genres.map(g=>{
                        return(
                            <li className='genre'>{g.name}</li>
                        )
                    })
                }
                </ul>
            </div>
            <h1 className='name'>{name}</h1>
      </div>
    )
}

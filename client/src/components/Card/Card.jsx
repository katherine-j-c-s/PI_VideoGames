import imageN from '../../img/heart.png'
import imageS from '../../img/heartS.png'
import './Card.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Card({id,name,image,genres,platforms,releaseDate,rating}) {
    let [showD,setShoeD]= useState()
    
    let rate = rating.toString()[0]

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
    function MouseOver(event) {
        setShoeD(true)
    }
    function MouseOut(event) {
        setShoeD(false)
    }
    return (
      <div onMouseOver={MouseOver} onMouseOut={MouseOut} className='cardContainer'>
            <img className='image' src={image} alt={name} />
            <ul className='platf'>
                {platforms &&
                platforms.map(p=>{
                let icon = allPlatforms[p.id - 1]
                console.log(platforms);
                return(
                    <li className='icon'>{icon}</li>
                )
                })
            }
            </ul>
            <h1 className='name'>{name}</h1>
            {showD === true ? 
            <div className='containerPG'>
                <div>
                    <p>genres</p>
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
                <div>
                    <p>date:</p>
                    <p>{releaseDate}</p>
                </div>
                <div>
                    {rate >= 1 ? (<img className='imgHeart' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 2 ? (<img className='imgHeart' src={imageN} alt="Rating"/>) : null}
                    {rate >= 2 ? (<img className='imgHeart' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 3 ? (<img className='imgHeart' src={imageN} alt="Rating"/>) : null}
                    {rate >= 3 ? (<img className='imgHeart' src={imageS} alt="Rating"/>): null}

                    {rate < 4 ? (<img className='imgHeart' src={imageN} alt="Rating"/>) : null}
                    {rate >= 4 ? (<img className='imgHeart' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 5 ? (<img className='imgHeart' src={imageN} alt="Rating"/>) : null}
                    {rate >= 5 ? (<img className='imgHeart' src={imageS} alt="Rating"/>): null}
                </div>
                <Link to={`/detail/${id}`}>
                    <p>Details</p>
                </Link>
            </div>
            : null}
      </div>
    )
}

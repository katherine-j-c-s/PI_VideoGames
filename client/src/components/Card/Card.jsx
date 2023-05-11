import imageN from '../../img/heart.png'
import imageS from '../../img/heartS.png'
import './Card.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux, GrLogin} from 'react-icons/gr'

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
      <div onMouseOver={MouseOver} onMouseOut={MouseOut} className={showD === false ? 'cardContainer' : 'cardContainerHover'}>
            <img className='image' src={image} alt={name} />
            <div className='titleBox'>
                <ul className='platf'>
                    {platforms &&
                    platforms.map(p=>{
                    let icon = allPlatforms[p.platform.id - 1]
                    return(
                        <li key={p.platform.id} className='icon'>{icon}</li>
                    )
                    })
                }
                </ul>
                <h1 className='name'>{name}</h1>
            </div>
            
            {showD === true ? 
            <div className='containerPG'>
                <div className='info'>
                    {rate >= 1 ? (<img className='imgHeartH' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 2 ? (<img className='imgHeartH' src={imageN} alt="Rating"/>) : null}
                    {rate >= 2 ? (<img className='imgHeartH' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 3 ? (<img className='imgHeartH' src={imageN} alt="Rating"/>) : null}
                    {rate >= 3 ? (<img className='imgHeartH' src={imageS} alt="Rating"/>): null}

                    {rate < 4 ? (<img className='imgHeartH' src={imageN} alt="Rating"/>) : null}
                    {rate >= 4 ? (<img className='imgHeartH' src={imageS} alt="Rating"/>): null}
                    
                    {rate < 5 ? (<img className='imgHeartH' src={imageN} alt="Rating"/>) : null}
                    {rate >= 5 ? (<img className='imgHeartH' src={imageS} alt="Rating"/>): null}
                </div>
                <div className='info'>
                    <p>Genres:</p>
                    <ul className='generos'>
                        {genres &&
                        genres.map(g=>{
                            return(
                                <li key={g.id} className='genre'>{g.name}</li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div className='info'>
                    <p>Date:</p>
                    <p>{releaseDate}</p>
                </div>
                <Link className='detailsLink' to={`/detail/${id}`}>
                    <p className='detailsText'>Details</p>
                </Link>
            </div>
            : null}
      </div>
    )
}

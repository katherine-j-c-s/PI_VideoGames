import axios from 'axios';
import './Detail.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld,TbPointFilled,TbPoint} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Detail() {
    const { id } = useParams();
    let [carrusel,setCarrusel]= useState({
        first:true,
        second:false,
    })

    const [game, setGame] = useState({});

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
    useEffect(()=>{
        async function inEffect() {
            try {
              const { data } = await axios(
                `http://localhost:3001/videogames/${id}`
              );
                setGame(data)
            } catch (error) {
              console.log("game update in useeffect in component Detail", error);
            }
          }
          inEffect();
          return setGame({});
    },[id])
    function handleCarusel(){
        if (carrusel.first) {
            setCarrusel({
                first:false,
                second:true
            })
        }else{
            setCarrusel({
                first:true,
                second:false
            })
        }
    }
  return (
    <div className='containerDetails'>
        <div className='position'>
            <p>HOME / GAMES / {game.name}</p>
        </div>
        <div className='leftSide'>
            <div className='carruselBox'>
                <div className='carrusel'>
                    <div>
                        {carrusel.first === true ? <img src={game.image} alt={game.name} />:null}
                        {carrusel.second === true ? <img src={game.image2} alt={game.name}/>:null}
                    </div>
                </div>
                <div className='carruselPosition'>
                    {carrusel.first === true || carrusel.second === true ?  <TbPointFilled onClick={handleCarusel}/>:null}

                    {carrusel.second === true ?  <TbPointFilled onClick={handleCarusel}/>:null}
                    {carrusel.first === true ? <TbPoint onClick={handleCarusel}/>:null}
                </div>
            </div>
            <div className='textContent'>
                <h1 className='titleG'>{game.name}</h1>
                <p>{game.description}</p>
            </div> 
        </div>
        <div className='ritghSide'>
            <div>
                <ul>
                    {game.ParentPlatforms &&
                        game.ParentPlatforms.map(p=>{
                            let icon = allPlatforms[p.id - 1]
                            return(
                            <li>{icon}</li>
                            )
                        })
                    }
                </ul>
                <ul>
                    {game.Genres &&
                        game.Genres.map(p=>{
                            return(
                            <li>{p.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <div>
                    <p>Date Released:</p>
                    <p>{game.releaseDate}</p>
                </div>
                <div>
                    <p>Rating:</p>
                    <p>{game.rating}</p>
                </div>
                <div>
                    <p>Website:</p>
                    <a href={game.website}>{game.website}</a>
                </div>
                <div>
                    <p>Publishers:</p>
                    <ul>
                        {game.publishers && game.publishers.map(p=>{
                            return(<li>{p.name}</li>)
                        })}
                    </ul>
                </div>
                <div>
                    <p>Developers:</p>
                    <ul>
                        {game.developers && game.developers.map(d=>{
                            return(<li>{d.name}</li>)
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

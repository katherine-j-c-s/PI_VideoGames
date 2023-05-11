import axios from 'axios';
import './Detail.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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
                    {carrusel.first === true ?  <p onClick={handleCarusel}><TbPointFilled/></p> :null}
                    {carrusel.second === true ?  <p onClick={handleCarusel}><TbPoint/></p> :null}

                    {carrusel.second === true ? <p onClick={handleCarusel}><TbPointFilled/></p> :null}
                    {carrusel.first === true ? <p onClick={handleCarusel}><TbPoint/></p> :null}
                </div>
            </div>
            <div className='textContent'>
                <ul className='platfiIcons'>
                    {game.platforms &&
                        game.platforms.map(p=>{
                            let icon = allPlatforms[p.platform.id - 1]
                            return(
                            <li key={p.id}>{icon}</li>
                            )
                        })
                    }
                </ul>
                <h1 className='titleG'>{game.name}</h1>
                <p>{game.description}</p>
            </div> 
        </div>
        <div className='ritghSide'>
            <div className='infoDetails'>
                <p>Platforms:</p>
                <ul className='ulNames'>
                {game.platforms &&
                    game.platforms.map(p=>{
                        return(
                        <li className='liText' key={p.id}>{p.platform.name}</li>
                        )
                    })
                }
                </ul>
            </div>
            <div className='infoDetails'>
                <p>Genres:</p>
                <ul className='ulNames'>
                    {game.genres &&
                        game.genres.map(g=>{
                            return(
                            <li className='liText' key={g.id}>{g.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='infoDetails'>
                <p>Date Released:</p>
                <p>{game.releaseDate}</p>
            </div>
            <div className='infoDetails'>
                <p>Rating:</p>
                <p>{game.rating}</p>
            </div>
            <div className='infoDetails'>
                <p>Website:</p>
                <a href={game.website}>{game.website}</a>
            </div>
            <div className='infoDetails'>
                <p>Publishers:</p>
                <ul className='ulNames'>
                    {game.publishers && game.publishers.map(p=>{
                        return(<li className='liText' key={p.id}>{p.name}</li>)
                    })}
                </ul>
            </div>
            <div className='infoDetails'>
                <p>Developers:</p>
                <ul className='ulNames'>
                    {game.developers && game.developers.map(d=>{
                        return(<li className='liText' key={d.id}>{d.name}</li>)
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

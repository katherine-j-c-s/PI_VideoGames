import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {FaLaptop ,FaAppStoreIos,FaPlaystation,FaXbox} from 'react-icons/fa'
import {BsAndroid2, BsApple,BsNintendoSwitch} from 'react-icons/bs'
import {TbWorld} from 'react-icons/tb'
import {GrArchlinux} from 'react-icons/gr'

export default function Detail() {
    const { id } = useParams();
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
  return (
    <div>
        <div>
            <p>HOME/GAMES/{game.name}</p>
        </div>
        <h1>{game.name}</h1>
        <p>{game.description}</p>
        {console.log(game)}
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
        
      <div>
        <img src={game.image} alt={game.name} />
        <img src={game.image2} alt={game.name} />
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
    </div>
  )
}

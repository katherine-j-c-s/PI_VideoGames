import axios from 'axios'
import './CardsG.css'
import React, { useEffect, useState } from 'react'
import {getGamesByGenre} from '../../../redux/actions/actions'
import { useDispatch, useSelector} from 'react-redux'
import {BsArrowDownRightCircleFill,BsArrowDownRightCircle} from 'react-icons/bs'

export default function CardsG({id,name,image,games_count}) {

    const { games, gamesByGenre } = useSelector((state) => state);

    let [description,setDescription] = useState()
    let [show,setShow] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(`http://localhost:3001/genres/${id}`)
        .then(({data})=>{
            let d = data.description.split("<p>")
            let desc = d[1].split("</p>")
            setDescription(desc[0])
        })
    },[])
    function showDesc() {
        if(show){
            setShow(false)
        }
        if(!show){
            setShow(true)
        }
    }
    async function showGames() {
        dispatch(getGamesByGenre(true,"Action"))
    }
    return (
        <div className={show === false ? 'containerGenreC' : 'containerGenreO'}>
            <img src={image} alt={name} />
            <h1 onClick={()=>showGames()} className='name' >{name}</h1>
            <div className='countsG'>
                <p>Games Count:</p>
                <p>{games_count}</p>
            </div>
            <div className='iconsOCBox' onClick={showDesc}>
                {show === false ? <BsArrowDownRightCircleFill className='iconOC'/> : <BsArrowDownRightCircle className='iconOC'/>}
            </div>
            {show === true ? <p>{description}</p> : null}
        </div>
      )
}

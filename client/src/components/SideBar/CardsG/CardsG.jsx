import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BsArrowDownRightCircleFill,BsArrowDownRightCircle} from 'react-icons/bs'
export default function CardsG({id,name,image,games_count}) {
    let [description,setDescription] = useState()
    let [show,setShow] = useState(false)
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
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name} />
            <p>{games_count}</p>
            <div onClick={showDesc}>
                {show === false ? <BsArrowDownRightCircleFill/> : <BsArrowDownRightCircle/>}
            </div>
            {show === true ? <p>{description}</p> : null}
        </div>
      )
}

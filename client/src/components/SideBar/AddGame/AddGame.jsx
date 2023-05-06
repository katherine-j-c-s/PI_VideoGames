import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import imageN from '../../../img/heart.png'
import imageS from '../../../img/heartS.png'
import './AddGame.css'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;

export default function AddGame() {

    let {genres,platforms}= useSelector((state)=>state)

    let [addGenre,setaddGenre] = useState({})
    let [addPlatform,setaddPlatform] = useState([])
    let [inputs,setInputs] = useState({
        name: '',
        image: '',
        description: '',
        releaseDate: '',
        rating: '',
        genres: [],
        platforms: []
    })
    let [errors,setErrors] = useState({
        name: '',
        image: '',
        description: '',
        releaseDate: '',
        rating: '',
        genres: [],
        platforms: []
    })
    function handleChange(event) {
    setInputs({
        ...inputs,
        [event.target.name]: event.target.value
    })
    setErrors(validate({
        ...inputs,
        [event.target.name]: event.target.value,
    }))
    }
    function handleRating(e) {
    let value = e.target.__reactProps$yzcojv04ioj.value
    setInputs({
        ...inputs,
        [e.target.name] : value
    })
    setErrors(validate({
        ...inputs,
        [e.target.name] : value,
    }))
    }
    function handleGenres(e) {
        let id = e.target.value
        let name = e.target.name
        let repited = Object.keys(addGenre).find(g => g === name)
        if (repited) {
            let delate = {}
            for (const prop in addGenre) {
                if (prop !== repited) {
                    delate[prop]=addGenre[prop]
                }
            }
            setaddGenre(delate)
            setErrors(validate({
                ...inputs,
                genres: delate,
            }))
            
        }else{
            setaddGenre({...addGenre, [name]:id})
            setErrors(validate({
                ...inputs,
                genres: addGenre,
            }))
        }
    }
    function handleplatforms(e) {
        let name = e.target.name
        let repited = addPlatform.find( g => g === name )
        if (repited) {
            let delate = addPlatform.filter( p => p !== name ) 
            setaddPlatform(delate)
            setErrors(validate({
                ...inputs,
                platforms: delate,
            }))
        }else{
            setaddPlatform([...addPlatform,name])
            setErrors(validate({
                ...inputs,
                platforms: addPlatform,
            }))
        }
    }
    function validate(i) {
        console.log(i);
        var errors = {}
        // if (!inputs.name) {
        //     errors.name = "Most Have A Name";
        // }else if (!inputs.name.lenght < 3) {
        //     errors.name = "The Name Most Have A Minimum Of 3 Letters";
        // } 
        // else if (reguexURL.test(inputs.image)) {
        //     errors.password = "The Image Most Be An URL";
        // }
        return errors;
    }
    function handleSubmit(event) {
        let contentPlatf = addPlatform.map(p=>{
            let add = {
                platform:{
                    name:p
                }
            }
            return add
        })
        let contentGern= Object.values(addGenre).map((g)=>{
            let add= {
                id:g
            }
            return add
        })
        inputs.platforms=contentPlatf
        inputs.genres=contentGern
        event.preventDefault()
        setaddGenre({})
        setaddPlatform([])
        setInputs({
            name: '',
            image: '',
            description: '',
            releaseDate: '',
            rating: '',
            genres: [],
            platforms: []
        })
    }
    return (
    <div className='containerForm'>
        <form onSubmit={handleSubmit} className='forms'>
        <div className='inputs' >
            <label>Name:</label>
            <p>Write Your Game's Name Here...</p>
            <input 
            className={errors.name && 'warning'}
            type="text" 
            name="name"
            value={inputs.name} 
            placeholder="Name" 
            onChange={handleChange}/>
        </div>
        <p className='danger'>{errors.name}</p>
        <div className='inputs' >
            <label>Image:</label>
            <p>Add An URL For Your Game Here...</p>
            <input 
            className={errors.image && 'warning'}
            type="text" 
            name="image"
            value={inputs.image} 
            placeholder="image(URL)" 
            onChange={handleChange}/>
        </div>
        <p className='danger'>{errors.image}</p>
        <div className='inputs'>
            <label>Description:</label>
            <p>Games Description:</p>
            <input 
            type="textarea"
            name="description"
            value={inputs.description}  
            placeholder='Description' 
            onChange={handleChange}/>
        </div>
        <div className='inputs' >
            <label>ReleaseDate:</label>
            <p>Add The Date Your Game Was Realised:</p>
            <input 
                type="date" 
                className={errors.releaseDate && 'warning'}
                name="releaseDate"
                onChange={handleChange}
            />
            {/* <input 
            
            type="text" 
            
            value={inputs.releaseDate} 
            placeholder="ReleaseDate" 
            /> */}
        </div>
        <p className='danger'>{errors.image}</p>
        <div>
            <label className='selectedR'>rating:</label>
            <p>How Much Do You Rate Your Game?</p>
            <div>
                {inputs.rating === '' || inputs.rating < 1 ? (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='1' 
                />) : null
                }
                {inputs.rating >= 1 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='1' 
                />)
                : null}
                {inputs.rating === "1"?  
                    (<label>Not Good At All</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 2 ? (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='2' 
                />) : null
                }
                {inputs.rating >= 2 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='2' 
                />)
                : null}
                {inputs.rating === "2"?  
                    (<label>Not So bad</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 3 ? (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='3' 
                />) : null
                }
                {inputs.rating >= 3 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='3' 
                />)
                : null}
                {inputs.rating === "3" ? 
                    (<label>It's nice</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 4 ? (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='4' 
                />) : null
                }
                {inputs.rating >= 4 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='4' 
                />)
                : null}
                {inputs.rating === "4" ? 
                    (<label>It's Amazing</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 5 ? (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='5' 
                />) : null
                }
                {inputs.rating >= 5 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleRating} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='5' 
                />)
                : null}
                {inputs.rating === "5" ?
                    (<label>The Best Game Ever</label>)
                : null}
            </div>
        </div>
        <div>
            <label>Add Genres</label>
            <div className='boxGenres'>
                {genres && 
                    genres.map(g=>{
                        return(
                            <div className='btnGenreBox'>
                                <button
                                type='button' 
                                onClick={handleGenres} 
                                name={g.name}
                                value={g.id} 
                                className={addGenre[g.name] !== undefined ? 'selected' : 'noSelected'}
                                >{g.name}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div>
            <label>Add Platforms</label>
            <div className='boxPlatf'>
                {platforms && 
                    platforms.map(g=>{
                        return(
                            <div className='btnPlatfBox'>
                                <button
                                type='button' 
                                onClick={handleplatforms} 
                                name={g.name}
                                className={addPlatform.find(p=>p===g.name) !== undefined ? 'selected' : 'noSelected'}
                                >{g.name}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <button type='submit'>Enviar</button>
        </form>
    </div>
    ) 
}
    
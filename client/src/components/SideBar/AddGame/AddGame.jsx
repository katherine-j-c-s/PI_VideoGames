import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addGame} from '../../../redux/actions/actions'
import imageN from '../../../img/heart.png'
import imageS from '../../../img/heartS.png'
import './AddGame.css'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;

export default function AddGame() {

    let {genres,platforms,games}= useSelector((state)=>state)
    const dispatch = useDispatch()

    let [showError,setShowError] = useState(false)

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
    })
    function validate(i) {
        var errors = {}
        if (i.name.length < 3) {
            errors.name = "The Name Most Have A Minimum Of 3 Letters";
        }else if (!i.name) {
            errors.name = "Most Have A Name";
        }else if (!reguexURL.test(i.image)) {
            errors.image = "The Image Most Be An URL";
        }else if (!i.description) {
            errors.description = "Most Add The Description To Your Game";
        }else if (!i.releaseDate) {
            errors.releaseDate = "Most Select The Date Your Game Was Made";
        }else if (!i.rating) {
            errors.rating = "Select A Rating To Your Game";
        }
        return errors;
    }

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
        let value = e.target.name
        setInputs({
            ...inputs,
            rating : value
        })
        setErrors(validate({
            ...inputs,
            rating : value,
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
        }else{
            setaddGenre({...addGenre, [name]:id})
        }
        setErrors(validate({
            ...inputs,
            genres : [...Object.keys(addGenre)],
        }))
    }
    function handleplatforms(e) {
        let name = e.target.name
        let repited = addPlatform.find( g => g === name )
        if (repited) {
            let delate = addPlatform.filter( p => p !== name ) 
            setaddPlatform(delate)
        }else{
            setaddPlatform([...addPlatform,name])
        }
        setErrors(validate({
            ...inputs,
            platforms : addPlatform,
        }))
    } 
    function handleSubmit(event) {
        event.preventDefault()
        if ( addPlatform.length > 0 && Object.keys(addGenre).length > 0 && Object.keys(errors).length === 0) {
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
            inputs.genres = contentGern
            inputs.platforms = contentPlatf
            dispatch(addGame(inputs)).then((data)=>console.log(data.payload))
            setaddGenre({})
            setaddPlatform([])
            setInputs({
                name: '',
                image: '',
                description: '',
                releaseDate: '',
                rating: '',
            })
            setErrors({
                name: '',
                image: '',
                description: '',
                releaseDate: '',
                rating: '',
            })
            setShowError(false)
        }else{
            setShowError(true)
        }
    }
    return (
    <div className='containerForm'>
        <form onSubmit={handleSubmit} className='forms'>
        <div className='inputs' >
            <label>Name:</label>
            <p>Write Your Game's Name Here...</p>
            <input 
            className='inputSmalls'
            type="text" 
            name="name"
            value={inputs.name} 
            placeholder="Name" 
            onChange={handleChange}/>
            {showError === true  ?  
                <p className='danger'>{errors.name}</p>
            : null}
        </div>
        <div className='inputs' >
            <label>Image:</label>
            <p>Add An URL For Your Game Here...</p>
            <input 
            className='inputSmalls'
            type="text" 
            name="image"
            value={inputs.image} 
            placeholder="image(URL)" 
            onChange={handleChange}/>
            {showError === true  ?  
                <p className='danger'>{errors.image}</p>
            : null}
        </div>
        <div className='inputs'>
            <label>Description:</label>
            <p>Games Description:</p>
            <input 
            type="textarea"
            name="description"
            className='inputSmalls'
            value={inputs.description}  
            placeholder='Description' 
            onChange={handleChange}/>
            {showError === true  ?  
                <p className='danger'>{errors.description}</p>
            : null}
        </div>
        <div className='inputs' >
            <label>ReleaseDate:</label>
            <p>Add The Date Your Game Was Realised:</p>
            <input 
                type="date" 
                className='inputSmalls'
                name="releaseDate"
                onChange={handleChange}
            />
            <p className='danger'>{errors.releaseDate}</p>
            {showError === true  ?  
                <p className='danger'>{errors.releaseDate}</p>
            : null}        
        </div>
        <div className='RatingContainer'>
            <label className='selectedR'>Rating:</label>
            <p>How Much Do You Rate Your Game?</p>
            <div className='heartsContainer'>
                <div className='heart'>
                    {inputs.rating === '' || inputs.rating < 111 ? (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageN} 
                        alt="Rating" 
                        name='111' 
                    />) : null
                    }
                    {inputs.rating >= 111 && inputs.rating !== '' ? 
                        (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageS} 
                        alt="Rating" 
                        name='111'  
                    />)
                    : null}
                    {inputs.rating === "111"?  
                        (<label>Not Good At All</label>)
                    : null}
                </div>
                <div className='heart'>
                    {inputs.rating === '' || inputs.rating < 222 ? (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageN} 
                        alt="Rating" 
                        name='222' 
                    />) : null
                    }
                    {inputs.rating >= 222 && inputs.rating !== '' ? 
                        (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageS} 
                        alt="Rating" 
                        name='222' 
                    />)
                    : null}
                    {inputs.rating === "222"?  
                        (<label>Not So bad</label>)
                    : null}
                </div>
                <div className='heart'>
                    {inputs.rating === '' || inputs.rating < 333 ? (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageN} 
                        alt="Rating" 
                        name='333' 
                    />) : null
                    }
                    {inputs.rating >= 333 && inputs.rating !== '' ? 
                        (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageS} 
                        alt="Rating" 
                        name='333' 
                    />)
                    : null}
                    {inputs.rating === "333" ? 
                        (<label>It's nice</label>)
                    : null}
                </div>
                <div className='heart'>
                    {inputs.rating === '' || inputs.rating < 444 ? (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageN} 
                        alt="Rating" 
                        name='444' 
                    />) : null
                    }
                    {inputs.rating >= 444 && inputs.rating !== '' ? 
                        (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageS} 
                        alt="Rating" 
                        name='444' 
                    />)
                    : null}
                    {inputs.rating === "444" ? 
                        (<label>It's Amazing</label>)
                    : null}
                </div>
                <div className='heart'>
                    {inputs.rating === '' || inputs.rating < 555 ? (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageN} 
                        alt="Rating" 
                        name='555' 
                    />) : null
                    }
                    {inputs.rating >= 555 && inputs.rating !== '' ? 
                        (<img 
                        className='imgHeart' 
                        onClick={handleRating} 
                        src={imageS} 
                        alt="Rating" 
                        name='555' 
                    />)
                    : null}
                    {inputs.rating === "555" ?
                        (<label>The Best Game Ever</label>)
                    : null}
                </div>
                
            </div>
            {showError === true  ?  
                <p className='danger'>{errors.rating}</p>
            : null}
        </div>
        <div className='GenresContainer'>
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
            {showError === true && Object.keys(addGenre).length === 0 ?  
                <p className='danger'>Most Choose The Genres Of Your Game</p>
            : null}
        </div>
        <div className='PlatformsContainer'>
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
            {showError === true && addPlatform.length === 0 ?
            <p className='danger'>Most Choose The Platform To Play Your Game</p>
            : null}
        </div>
        <div className='btnSubmti'>
            <button type='submit'>Enviar</button>
        </div>
        
        </form>
    </div>
    ) 
}
    
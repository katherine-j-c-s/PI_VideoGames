import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import imageN from '../../../img/heart.png'
import imageS from '../../../img/heartS.png'
import './AddGame.css'



export default function AddGame() {
    let {genres}= useSelector((state)=>state)
    let [addGenres,setAddGenres] = useState([])
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
    function validate(inputs) {
    var errors = {}
    for (const prop in inputs) {
        if (inputs[prop] === '') {
            errors[prop] = `Require a ${prop}`;
        }
        if (inputs[prop] === []) {
            errors[prop] = `You most choose any ${prop}`;
        }
    }
    return errors
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
    function handleSelected(e) {
    let value = e.target.__reactProps$rfcpmhqifde.value
    setInputs({
        ...inputs,
        [e.target.name] : value
    })
    }
    function handleGenres(e) {
        let id = e.target.name
        setAddGenres([...addGenres, id])
        console.log(addGenres);
        console.log(id);
    }
    function handleSubmit(event) {
    event.preventDefault()
    // console.log(inputs);
    setAddGenres([])
    setInputs({
        name: '',
        image: '',
        description: '',
        releaseDate: '',
        rating: '',
        genres: [],
        platforms: []
    })
    // console.log(inputs);
    // for (let i = 0; i < Object.values(inputs).length; i++) {
    //   if (Object.values(inputs)[i].length === 0) {
    //     return alert("Debe llenar todos los campos")
    //   }
    // }
    // if (Object.keys(errors).length === 0) {
    //   alert('Datos completos')
    //   setInputs({
    //     name: '',
    //     image: '',
    //     description: '',
    //     releaseDate: '',
    //     rating: '',
    //     genres: [],
    //     platforms: []
    //   })
    //   setErrors({
    //     name: '',
    //     image: '',
    //     description: '',
    //     releaseDate: '',
    //     rating: '',
    //     genres: [],
    //     platforms: []
    //   })
    // }
    }
    return (
    <div className='container'>
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
            className={errors.releaseDate && 'warning'}
            type="text" 
            name="releaseDate"
            value={inputs.releaseDate} 
            placeholder="ReleaseDate" 
            onChange={handleChange}/>
        </div>
        <p className='danger'>{errors.image}</p>
        <div>
            <label className='selectedR'>rating:</label>
            <p>How Much Do You Rate Your Game?</p>
            <div>
                {inputs.rating === '' || inputs.rating < 1 ? (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='1' 
                />) : null
                }
                {inputs.rating >= 1 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='1' 
                />)
                : null}
                {inputs.rating >= 1 && inputs.rating !== '' ?  
                    (<label>Not Good At All</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 2 ? (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='2' 
                />) : null
                }
                {inputs.rating >= 2 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='2' 
                />)
                : null}
                {inputs.rating >= 2 && inputs.rating !== '' ?  
                    (<label>Not So bad</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 3 ? (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='3' 
                />) : null
                }
                {inputs.rating >= 3 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='3' 
                />)
                : null}
                {inputs.rating >= 3 && inputs.rating !== '' ? 
                    (<label>It's nice</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 4 ? (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='4' 
                />) : null
                }
                {inputs.rating >= 4 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='4' 
                />)
                : null}
                {inputs.rating >= 4 && inputs.rating !== '' ? 
                    (<label>It's Amazing</label>)
                : null}
            </div>
            <div>
                {inputs.rating === '' || inputs.rating < 5 ? (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageN} 
                    alt="Rating" 
                    name='rating' 
                    value='5' 
                />) : null
                }
                {inputs.rating >= 5 && inputs.rating !== '' ? 
                    (<img 
                    className='imgHeart' 
                    onClick={handleSelected} 
                    src={imageS} 
                    alt="Rating" 
                    name='rating' 
                    value='5' 
                />)
                : null}
                {inputs.rating >= 5 && inputs.rating !== '' ?
                    (<label>The Best Game Ever</label>)
                : null}
            </div>
        </div>
        <div>
            <h1>Add Genres</h1>
            {genres && 
                genres.map(g=>{
                    return(
                        <button onClick={handleGenres} name={g.id}>{g.name}</button>
                    )
                })
            }
        </div>
        
        <button type='submit'>Enviar</button>
        </form>
    </div>
    ) 
}
    
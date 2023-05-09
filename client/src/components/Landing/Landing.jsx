import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing({videogames,genres}) {
  return (
    <div>
      
      <Link to={'/home'}>
        <p>home</p>
      </Link>
    </div>
  )
}

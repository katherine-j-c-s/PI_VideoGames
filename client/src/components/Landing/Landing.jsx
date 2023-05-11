import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className='login'>
      <Link  className='loginText' to={'/home'}>
        <p>logIn</p>
      </Link>
    </div>
  )
}

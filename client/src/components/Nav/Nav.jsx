import React from 'react'
import './Nav.css'
import {TbSearch} from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='nav'>
        <Link className='items' to={'/home'}>
            Home
        </Link>
        <Link className='items' to={'/search'}>
            Search <TbSearch/>
        </Link>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <Link to={'/home'}>
            <p>home</p>
        </Link>
        <Link to={'/search'}>
            <p>search</p>
        </Link>
    </div>
  )
}

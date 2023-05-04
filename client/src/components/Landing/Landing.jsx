import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing({videogames,genres}) {
  return (
    <div>
      <h1>Welcome this is my VideoGame Page</h1>
      <h2>my name is Katherine Contreras</h2>
      <h3>in this page you can find all kind of videogames</h3>
      <p>if you want to see somenting expecific, there are option for you to find it, such as:</p>
      <ul>
        <li>By gender</li>
        <li>By name</li>
        <li>by rating starting with the heights</li>
        <li>and even you can look for those games the are disponible on the platform your using, like playStation and more</li>  
      </ul>
      <p>and if there's a chance that the game you want it's not there... There is no problem!!</p>
      <p>you can add it to the page by creating it</p>
      <p>Press home to go to the page</p>
      <Link to={'/home'}>
        <p>home</p>
      </Link>
    </div>
  )
}

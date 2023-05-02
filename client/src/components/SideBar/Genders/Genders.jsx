import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../../Cards/Cards'


export default function Genders({genres}) {
  return (
    <div>
        <h1>This are the Genres</h1>
        <Cards games={genres}></Cards>
    </div>
  )
}

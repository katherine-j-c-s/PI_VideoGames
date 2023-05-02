import React, { useEffect, useState } from 'react'

import Cards from '../Cards/Cards'
import axios from 'axios'

export default function Home({videogames}) {
  return (
    <div>
        <h1>this is home</h1>
        <Cards videogames={videogames}></Cards>
    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import Cards from '../Cards/Cards'


export default function Home() {
  const { games } = useSelector((state) => state);
  return (
    <div>
        <h1>this is home</h1>
        <Cards games={games}></Cards>
    </div>
  )
}

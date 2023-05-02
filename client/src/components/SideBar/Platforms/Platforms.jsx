import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import Card from '../../Card/Card'

export default function Platforms() {
  let [platforms,setplatforms] = useState()
  useEffect(()=>{
    axios.get('http://localhost:3001/platforms')
    .then(({data})=>{
      setplatforms(data)
    })
  },[])
  return (
    <div>
        {platforms && 
          platforms.map((p,i)=>{
            return(
              <Card
                key={i}
                id={p.id}
                name={p.name}
                platforms={p.name}
              />
            )
          })
        }
    </div>
  )
}

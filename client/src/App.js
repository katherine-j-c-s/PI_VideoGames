import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from 'react';
import axios from 'axios'

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import Genders from './components/SideBar/Genders/Genders';
import Platforms from './components/SideBar/Platforms/Platforms';
import Rating from './components/SideBar/Rating/Rating';


function App() {
  let currentLocation = useLocation()
  let [videogames,setVideoGames]= useState()
  useEffect(()=>{
    axios.get('http://localhost:3001/videogames')
    .then(({data})=>{
      setVideoGames(data)
    })
  },[])
  return (
    <div>
      <nav>
        { currentLocation.pathname === "/" ? null : <Nav/>}
      </nav>
      <aside>
        { currentLocation.pathname === "/" ? null : <SideBar/>}
      </aside>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home videogames={videogames}/>}/>
        <Route path='/search' element={<SearchBar/>}/>
        <Route path='/genres' element={<Genders/>}/>
        <Route path='/platforms' element={<Platforms/>}/>
        <Route path='/rating' element={<Rating/>}/>
      </Routes>
    </div>
  )
}

export default App;
 
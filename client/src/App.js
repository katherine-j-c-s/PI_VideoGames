import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {
  getGames, 
  getGenres, 
  getPlatforms,
} from './redux/actions/actions'

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import Genders from './components/SideBar/Genders/Genders';
import Platforms from './components/SideBar/Platforms/Platforms';
import AddGame from './components/SideBar/AddGame/AddGame';
import Detail from './components/Detail/Detail';


function App() {
  let currentLocation = useLocation()

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGames())

    dispatch(getGenres())

    dispatch(getPlatforms())
  },[])

  return (
    <body className='body'>
      {/* {console.log(genres)}
      {console.log(platforms)} */}
      <nav>
        { currentLocation.pathname === "/" ? null : <Nav/>}
      </nav>
      <div className='showOf'>
        <aside>
          { currentLocation.pathname === "/" ? null : <SideBar/>}
        </aside>
        <div className='cards'>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/search' element={<SearchBar/>}/>
            <Route path='/genres' element={<Genders/>}/>
            <Route path='/addGame' element={<AddGame/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
          </Routes>
        </div>
      </div>
    </body>
  )
}

export default App;
 
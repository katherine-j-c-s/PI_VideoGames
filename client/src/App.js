import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {
  getGames, 
  getGenres, 
  getPlatforms,
  searchGame
} from './redux/actions/actions'

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import Genders from './components/SideBar/Genders/Genders';
import Platforms from './components/SideBar/Platforms/Platforms';
import AddGame from './components/SideBar/AddGame/AddGame';


function App() {
  let currentLocation = useLocation()

  let [genresL, setGenresL] = useState()
  let [platformsL, setplatformsL] = useState()

  const dispatch = useDispatch();
  const { genres, platforms} = useSelector((state) => state);

  useEffect(()=>{
    dispatch(getGames())

    dispatch(getGenres())
    setGenresL(genres)

    dispatch(getPlatforms())
    setplatformsL(platforms)
  },[])

  function onSearch(name){
    dispatch(searchGame(name))
  }

  return (
    <body className='body'>
      {/* {console.log(genres)}
      {console.log(platforms)} */}
      <nav>
        { currentLocation.pathname === "/" ? null : <Nav/>}
      </nav>
      <div className='showOf'>
        <aside>
          { currentLocation.pathname === "/" ? null : <SideBar platforms={platformsL} />}
        </aside>
        <div className='cards'>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/search' element={<SearchBar onSearch={onSearch} />}/>
            <Route path='/genres' element={<Genders genres={genresL}/>}/>
            <Route path='/platforms' element={<Platforms/>}/>
            <Route path='/addGame' element={<AddGame/>}/>
          </Routes>
        </div>
      </div>
    </body>
  )
}

export default App;
 
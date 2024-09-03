// import { useState } from "react";
//import ReactMapGL from 'react-map-gl';
import Map , {Marker,Popup}  from 'react-map-gl';

import maplibregl from 'maplibre-gl';      
import 'maplibre-gl/dist/maplibre-gl.css';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FlagIcon from '@mui/icons-material/Flag';
import { useEffect, useState } from 'react';
import "./App.css" ;
import axios from 'axios';
import {format} from 'timeago.js';
import Register from './components/Register';
import Login from './components/Login';
import UserGuide from './components/UserGuide';
import SearchBar from './components/SearchBar';
import ZoomButtons from './components/ZoomButtons';
import { styles } from './components/styles';



function App() {


  const myStorage = window.localStorage;



  const [viewState,setViewState] = useState({
    longitude: -3.688344,
    latitude: 40.453053,
    zoom: 16,
  })

  const [pins,setPins]=useState([]);


  const[currentLocationId,setCurrentLocationId]= useState(null);

  const [mapClick, setMapClick] = useState(null)
  const [searchLocationEntered,setSearchLocationEntered] = useState(null)

  const [selectedUser, setSelectedUser] = useState(null)
  const [currentUser,setCurrentUser] = useState(myStorage.getItem('user'))


  const [title,setTitle] = useState(null);
  const [description,setDescription] = useState(null);
  const [rating ,setRating] = useState(1);

  const [shouldShowLogin,setShouldShowLogin] = useState(false)
  const [shouldShowRegister,setShouldShowRegister] = useState(false)


  useEffect(()=>{ 
    const getPins = async()=>{
      try {
        const res = await axios.get("https://prod-mapapp-1.onrender.com/api/pins");
        setPins(res.data);               
      } catch (error) {
        console.log(error)                    
      }
    };
    getPins()
  },[pins])
  
  
  const handleRenderedPinClick = (id,longitude,latitude) => {
    setCurrentLocationId(id);
    setMapClick(null)
    setViewState({...viewState, longitude:longitude, latitude:latitude})
  }

  console.log(viewState)


  const handleMapClick = (e) =>{
    console.log(e)
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;
    setViewState({...viewState,latitude:latitude,longitude:longitude})
    setMapClick(
      {
        latitude:latitude,
        longitude:longitude

      },
    )
  }



  const handleDeletePin = async(id) =>{
    try{
      const res = await axios.delete(`https://prod-mapapp-1.onrender.com/api/pins/${id}`)
      console.log(res) 
    }
    catch(err){
      console.log(err)
    }
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title:title,
      description:description,
      rating:rating,
      latitude:mapClick.latitude,
      longitude:mapClick.longitude
    }
    try{
      const res = await axios.post('https://prod-mapapp-1.onrender.com/api/pins',newPin) 
      console.log(res)
      setPins([...pins,res.data])
      setMapClick(null)
      setRating(1)
    }
    catch(err){
      console.log(err)
    }
  }


  const logout = () => {
    myStorage.removeItem('user')
    setCurrentUser(null)
  }





  console.log(currentLocationId)
 
  return (
    <>
    <div>
    <Map className='z-10' mapLib={maplibregl} //source : https://docs.maptiler.com/react/?key=vAsertEZRQsrU8mup6qW&mapId=streets-v2
    {...viewState}
    onMove={e => setViewState(e.viewState)}   //https://visgl.github.io/react-map-gl/docs/get-started/state-management
    style={{width: "100vw", height: "100vh"}}
    mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=vAsertEZRQsrU8mup6qW" //source : https://cloud.maptiler.com/maps/streets-v2/
    onClick={handleMapClick}
    >


    {/* All markers will be rendered (both green and violet) however popup will render only for the one which clicked because conditionally rendered thanks to mongodb id  */}
    {pins.map((p)=>
    (
    
    <>
    <Marker key={p.createdAt} longitude={p.longitude} latitude={p.latitude} anchor="bottom" onClick={ (e) =>{e.originalEvent.stopPropagation();handleRenderedPinClick(p._id,p.longitude,p.latitude);setSelectedUser(p.username)} }>  {/* iss location pr mark hoga jo bhi iske andar wrapped hai (here '' from materialUI is wrapped inside it) */}
      <RoomIcon key={p.latitude} style = {{fontSize:7*viewState.zoom, color:p.username === selectedUser ?"tomato" : p.username === currentUser ? 'teal' : 'slateblue', cursor:"pointer"}}  />
    </Marker>
    
    {p._id===currentLocationId && 
      <Popup key={p._id} longitude={p.longitude} latitude={p.latitude} onClose={()=>{setCurrentLocationId(null);setSelectedUser(null)}}
        anchor="right" 
        >
        <div className='container p-[10px] '>
          <label>Place</label>
          <h4 className='location'>{p.title}</h4>
          <label>Review</label>
          <p className='about'>{p.description}</p>
          <label>Rating</label>
          <div>            
            {Array(p.rating).fill(<StarIcon className="star"/>)}    
          </div>
          <label>Information</label>
          {p.username===currentUser ? (<span className = "username">Added by <b>You</b> </span>) : (<span className = "username">Added by <b>{p.username}</b> </span>)} 
          <span className = "date">{format(p.createdAt)}</span>
          {p.username===currentUser && (<button onClick={()=>handleDeletePin(p._id)} className={styles.deletePin}>Delete Pin</button>)}
        </div>
      </Popup>
    }
      
    </>
    )
    )}



    
    {mapClick &&  (
    <>
    <Marker longitude={mapClick.longitude} latitude={mapClick.latitude} anchor='bottom' >
      <PinDropIcon className='text-red-500'/>
    </Marker>
    <Popup longitude={mapClick.longitude} latitude={mapClick.latitude} onClose={()=>setMapClick(null)} anchor="left" >
      <div className={styles.popupMainDiv}>

        <form onSubmit={handleSubmit} className={styles.popupForm}>
          <label className={styles.popupLabel} >Title</label>
          <input required className={styles.popupTitle} onChange={(e)=>setTitle(e.target.value)} placeholder='Enter Title' />
          <label className={styles.popupLabel}>Review</label>
          <textarea className={styles.popupTitle} onChange={(e)=>setDescription(e.target.value)} placeholder= 'Give suggestions about this place'/>
          <label className={styles.popupLabel}>Rating</label>
          <select onChange={(e)=>{setRating(e.target.value)}}>
            <option selected value='1'>⭐</option>
            <option value='2'>⭐⭐</option>
            <option value='3'>⭐⭐⭐</option>
            <option value='4'>⭐⭐⭐⭐</option>
            <option value='5'>⭐⭐⭐⭐⭐</option>
          </select>
          <button className={styles.addPin}>Add Pin</button>
        </form>

        <div className='flex flex-col'>
            <h1 className='text-[10px] '>Latitude : {mapClick.latitude}</h1>
            <h1 className='text-[10px] '>Longitude : {mapClick.longitude}</h1>
        </div>

      </div>
    </Popup>
    </>)
    }

    {
    searchLocationEntered && (<>
      <Marker longitude={searchLocationEntered.longitude} latitude={searchLocationEntered.latitude} anchor='bottom'>
          <FlagIcon className='text-red-500'/>
      </Marker>
      <Popup longitude={searchLocationEntered.longitude} latitude={searchLocationEntered.latitude} onClose={()=>setSearchLocationEntered(null)} anchor='left'  >
        <div className='flex gap-[10px] '>
          <h1 className='font-bold'>Here We Go!</h1>
        </div>
      </Popup>
      </>
      )
    }



    {
      currentUser ? (<button onClick={logout} className={styles.logOut}>LOG OUT</button>) 
      : (<div className={styles.verifDiv}>
          <button onClick={()=>setShouldShowLogin(true)} className={`${styles.verifButton} bg-blue-600 hover:bg-blue-500`}>LOG IN</button>
          <button onClick={()=>setShouldShowRegister(true)} className={`${styles.verifButton} bg-yellow-500 hover:bg-yellow-600`}>REGISTER</button>
        </div>)
    }

    <UserGuide/>
    <ZoomButtons setViewState={setViewState} viewState={viewState}/>
    <SearchBar setViewState={setViewState} viewState={viewState} setSearchLocationEntered={setSearchLocationEntered} />
    
    {shouldShowRegister && <Register setShouldShowRegister={setShouldShowRegister} myStorage={myStorage} setCurrentUser={setCurrentUser} /> }
    {shouldShowLogin && <Login setShouldShowLogin={setShouldShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} setShouldShowRegister={setShouldShowRegister} /> }
    
  </Map>
  </div>
  </>
    );
    
  
}

export default App;
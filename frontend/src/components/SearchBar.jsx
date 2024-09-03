import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styles } from './styles';

const SearchBar = ({setViewState,viewState,setSearchLocationEntered,setLocationSingleClicked}) => {
  

  const [shouldShowSearchBar,setShouldShowSearchBar] = useState(false)
  console.log(shouldShowSearchBar)
  
  const latitudeRef = useRef()
  const longitudeRef = useRef()

  const submit = (e) =>{
    e.preventDefault()
    const latitude = latitudeRef.current.value
    const longitude = longitudeRef.current.value
    setViewState({...viewState, longitude:longitude , latitude:latitude})
    setSearchLocationEntered({
        latitude: latitude,
        longitude: longitude
    })
    
  }

  return (
    <div>
    {!shouldShowSearchBar ? (
        <div onClick={()=>setShouldShowSearchBar(true)} className={styles.searchBox}>
            <h1>Search Location</h1>
            <SearchIcon />
        </div>
    )
      
      :(
        <div className={styles.searchMainDiv}>

            <div className={styles.subDiv1}>
                <form onSubmit={submit} className={styles.searchForm}>
                    <input required ref={latitudeRef} type='number' step={0.000001} min={-85} max={85} className={styles.searchInputBox}  placeholder='Enter Latitude'></input>
                    <input required ref={longitudeRef} type='number' step={0.000001} min={-180} max={180} className={styles.searchInputBox}  placeholder='Enter Longitude'></input>
                    <button className={styles.searchButton}>Search</button>
                </form>
            </div>
            <div onClick={()=>setShouldShowSearchBar(false)} className={styles.subDiv2}><h1 className='relative font-bold left-[105px]'>X</h1></div>      
      
        </div>
    ) 

    }
    
    </div>
  )
}

export default SearchBar

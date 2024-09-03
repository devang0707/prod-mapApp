import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import { styles } from './styles'

const UserGuide = () => {
  return (
    <div className={styles.userGuideDiv}>

      <h1 className='font-bold'>Tap on map to add your Pin</h1>

      <div className='flex gap-[10px] '>
        <span className='text-teal-500'><RoomIcon/></span>
        <span className='font-bold'>Your Pins</span>
      </div>

      <div className='flex gap-[10px] '>
        <span className='text-violet-500'><RoomIcon/></span>
        <span className='font-bold'>Pins by Other Users</span>
      </div>

      <div className='flex gap-[10px] '>
        <span className='text-orange-500'><RoomIcon/></span>
        <span className='font-bold'>Pins by Selected User</span>
      </div>

      
    </div>
  )
}

export default UserGuide

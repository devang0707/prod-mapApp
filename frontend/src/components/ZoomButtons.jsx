import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import React, { useState } from 'react'
import { styles } from './styles';


const ZoomButtons = ({setViewState,viewState}) => {


    const [shouldShowZoomControls,setShouldShowZoomControls] = useState(false)


return (

<div>
    {!shouldShowZoomControls ? (
        <div onClick={()=>setShouldShowZoomControls(true)} className={styles.zoomBox}>
            <h1>Show Zoom Controls</h1>
            <CenterFocusStrongIcon/>
        </div>) : 


(
<div className={styles.zoomMainDiv}>

    <div className={styles.zoomSubDiv}>

            <div onClick={()=>setShouldShowZoomControls(false)} className={styles.closeDiv}>
                <h1 className={styles.closeX}>X</h1>
            </div>


            {viewState.zoom>=22 ? (
                <div className='flex gap-[10px]'>
                    <ReportGmailerrorredIcon/>
                    <h1 className='font-bold'>Maxed In</h1>
                </div>) :
                (
                <div className={styles.controlDiv} onClick={()=>setViewState({...viewState,zoom:viewState.zoom+1})}>
                    <ZoomInIcon/>
                    <h1 className='font-bold'>ZoomIn</h1>
                </div>
            ) 
            }
        

            {viewState.zoom > 0 ? (
                <div className={styles.controlDiv} onClick={()=>setViewState({...viewState,zoom:viewState.zoom-1})}>
                    <ZoomOutIcon/>
                    <h1 className='font-bold'>ZoomOut</h1>
            </div>
            ) : (<div className='flex gap-[10px]'>
                    <ReportGmailerrorredIcon/>
                    <h1 className='font-bold'>Maxed Out</h1>
                </div>)
            }



        

            
            <div className={styles.controlDiv} onClick={()=>setViewState({...viewState,zoom:15})}>
                <ZoomInMapIcon/>
                <h1 className='font-bold'>ZoomInPlace</h1>
            </div>
            
        

            <div className={styles.controlDiv} onClick={()=>setViewState({...viewState,zoom:4})}>
                <ZoomOutMapIcon/>
                <h1 className='font-bold'>ZoomOutPlace</h1>
            </div>
            
        
        
    </div>


</div> 
)

} 

</div>
)
}

export default ZoomButtons

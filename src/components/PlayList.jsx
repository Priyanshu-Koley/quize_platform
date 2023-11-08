import React from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuizeList from './QuizeList';

const PlayList=({open,handleClose})=>
{
  return (
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modalPlay-title"
            aria-describedby="modalPlay-description"
        >
        <div className='modalPlay'>
            <div id='modalPlay-title'><span>Play Quize</span> <button onClick={handleClose}><CloseIcon/></button></div>
            <div id='modalPlay-description'>
                <QuizeList modal='1'/>
            </div>
        </div>
    </Modal>
  )
}

export default PlayList
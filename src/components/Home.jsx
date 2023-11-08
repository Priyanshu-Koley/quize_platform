import React from 'react';
import Nav from './Nav';
import PlayList from './PlayList';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Home.css';
import create from '../images/create.png';
import quizes from '../images/quizzes.png';
import play from '../images/play.jpg';
import { Link } from 'react-router-dom';

const page=1;
const Home = ()=>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [openPlay, setOpenPlay] = React.useState(false);
    const handleOpenPlay = () => setOpenPlay(true);
    const handleClosePlay = () => setOpenPlay(false);

    return(
        <div >
            <Nav active={page} />
            <div className='body'>
                {/* eslint-disable-next-line */}
                <a href="#">
                    <div className='create' onClick={handleOpen}>
                        <div className='b-image-container'>
                            <img src={create} alt="" className='b-image-create'/>
                        </div>
                        
                        <div className='c-text'> 
                            Create New Quiz
                        </div>
                    </div>
                </a>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modalH-title"
                    aria-describedby="modalH-description"
                >
                    <div className='modalH'>
                        <div id='modalH-title'>
                            <span>Select Question Type</span> 
                            <button onClick={handleClose}>
                                <CloseIcon/>
                            </button>
                        </div>
                        <div id='modalH-description'>
                            <Link to='/mcq-single'>
                                <button className='types' value='1'>
                                    <span>MCQ</span> (Single Correct)
                                </button>
                            </Link>
                            
                            <button className='types' value='2'>
                                <span>MCQ</span> (Multi Correct)
                            </button>
                            <button className='types' value='3'>
                                <span>Short Answer</span> (with two words)
                            </button>
                            <button className='types' value='4'>
                                <span>Description</span> (with 2 or 4 sentences)
                            </button>

                        </div>
                    </div>
                </Modal>


                <Link to='/quizes'>
                    <div className='my-quizesH'>
                        <div className='b-image-container'>
                            <img src={quizes} alt="" className='b-image-quize'/>
                        </div>
                        
                        <div className='c-text'> 
                            My Quizzes
                        </div>
                    </div>
                </Link>

                {/* eslint-disable-next-line */}
                <a href="#">
                <div className='play' onClick={handleOpenPlay}>
                    <div className='b-image-container'>
                        <img src={play} alt="" className='b-image-play'/>
                    </div>
                     
                    <div className='c-text'> 
                        Play Quiz
                    </div>
                </div>
                </a>
                <PlayList open={openPlay} handleClose={handleClosePlay}/>
    
            </div>
            
        </div>
    );
}

export default Home;
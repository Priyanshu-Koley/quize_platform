import React from 'react';
import '../styles/Nav.css';
import PlayList from './PlayList';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = ({active})=>{

    // flag for playlist modal
    const [openPlay, setOpenPlay] = useState(false);
    const handleOpenPlay = () => setOpenPlay(true);
    const handleClosePlay = () => setOpenPlay(false);

    return(
        // if active = 0 then navbar will be hided
        <div className={active==='0'?"hide":"nav"}>
            <div>
                <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
            </div>
            <div className='menu'>
                {/* Home button */}
                <Link to='/' className='home-link'>
                    <div className={active===1?"home active":"home"}>Home</div>
                </Link>
                {/* My quizzes button */}
                <Link to='/quizzes' className='quizzes-link'>
                    <div className={active===2?"quizzes active":"quizzes"}>My Quizzes</div>
                </Link>
                {/* Playable quizzes list modal open button */}
                <div className='play-link' onClick={handleOpenPlay}>
                    <div>Play Quizzes</div>
                </div>
            </div>
            {/* Playable quizzes list modals */}
            <PlayList open={openPlay} handleClose={handleClosePlay}/>
        </div>
    );
}

export default Nav;
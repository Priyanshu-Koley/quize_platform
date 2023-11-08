import React from 'react';
import '../styles/Nav.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import PlayList from './PlayList';

const Nav = ({active})=>{

    const [openPlay, setOpenPlay] = React.useState(false);
    const handleOpenPlay = () => setOpenPlay(true);
    const handleClosePlay = () => setOpenPlay(false);

    return(
        <div className={active==='0'?"hide":"nav"}>
            <div>
            <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
            </div>
            <div className='menu'>
                <Link to='/' className='home-link'>
                    <div className={active===1?"home active":"home"}>Home</div>
                </Link>

                <Link to='/quizes' className='quizes-link'>
                    <div className={active===2?"quizes active":"quizes"}>My Quizzes</div>
                </Link>

                <a className='play-link' onClick={handleOpenPlay}>
                    <div>Play Quizzes</div>
                </a>
            </div>
            <PlayList open={openPlay} handleClose={handleClosePlay}/>
        </div>
    );
}

export default Nav;
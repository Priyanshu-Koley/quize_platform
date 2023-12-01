import Nav from './Nav'
import  '../styles/QuizeList.css';
import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toggleStatus,}  from '../service/Actions/action';
import { Link } from 'react-router-dom';
import { dltQ } from '../service/Actions/action';
import CreateMcqSingle from './CreateMcqSingle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {Button} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) =>
({
  width: 38,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#65ceb5' : '#65ceb5',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#b7b7b7' : '#b7b7b7',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export const QuizeList = (props) => 
{
  
    const isModal = Object.keys(props).length !== 0;


    const [openDlt, setOpenDlt] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdt, setOpenEdt] = useState(false);
    const [dltIndex, setDltIndex] = useState();
    const [edtIndex, setEdtIndex] = useState();
    const [showList, setShowList] = useState(false);
    const page=2;
    let noOfNotActive = 0;
    let noOfQuizzes = 0;
    const quizes = useSelector(state=>state.quizes);
    const dispatch = useDispatch();


    const handleOpenDlt = () => setOpenDlt(true);
    const handleCloseDlt = () => setOpenDlt(false);
    
    const handleOpenEdt = () => setOpenEdt(true);
    const handleCloseEdt = () => setOpenEdt(false);

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);
    noOfQuizzes=quizes.length;
    useEffect(()=>{
      quizes.forEach((quize)=>{
        if(!quize.status)
        noOfNotActive++;
      })
      if(isModal)
      {
        if(noOfNotActive===noOfQuizzes)
        {
          setShowList(false);
        }
        else
        {
          setShowList(true);
        }
      }
      else
      {
        setShowList(true);
      }
       // eslint-disable-next-line
    },[]);
    return (
      <div className='quizes-page'>
        <Nav  active={isModal?'0':page}/>
        <div className={isModal?"hide":"quize-top-container"}>
          <div className='quize-top'>
            <div className='quize-head'>My Quizzes</div>
              <div className='create-quize-link' onClick={handleOpenCreate}>
                Create New Quiz
              </div>
            <Modal
              open={openCreate}
              onClose={handleCloseCreate}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
            <div className='modalH'>
                <div id='modalH-title'><span>Select Question Type</span> <button onClick={handleCloseCreate}><CloseIcon/></button></div>
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
          </div>
        </div>
        
        <div className={isModal?"table-container-modal":"table-container"}>
        {noOfQuizzes===0?<div className='empty-quizes'>No quizzes to show , Please create one first</div>:
        !showList?<div className='empty-quizes'>No quizzes are ACTIVE to Play</div>:
          <TableContainer component={Paper} className="table-modal" >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '25px'}}>Quiz No.</TableCell>
                  <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '25px'}}>Title</TableCell>
                  <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '25px'}} className={isModal?"hide":""} >Status</TableCell>
                  <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '25px'}}>Created on</TableCell>
                  <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '25px'}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizes.map((quize,i) => {
                  return (
                    <TableRow
                      key={i}
                      className={quize.status?"":isModal?"hide":"inactive"}
                    >
                    
                    <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '20px'}}>{i+1}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '20px'}}>{quize.title}</TableCell>
                    <TableCell align="left" sx={{display:"flex",alignItems:"center",fontFamily:"BrandonGrotesque-Bold",fontSize: '20px'}} className={isModal?"hide":""}>
                      <span className='status' style={{fontSize: '20px'}}>{quize.status?"Active":"Inactive"}</span>
                        <span>
                        {<IOSSwitch 
                          sx={{ m: 1 }}
                          checked={quize.status}
                          onChange={async (e)=>{
                            dispatch(toggleStatus(e.target.checked, i));
                            // const stats=[...status];
                            // stats.splice(i,1,e.target.checked);
                            // setStatus(stats)
                          }} />
                        }
                        </span>
                      </TableCell>
                    <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '20px'}}>{quize.date}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"BrandonGrotesque-Bold",fontSize: '20px'}}>
                      
                      <Link to="/play" state={{id:i}}>
                        <button title='Play' className={!quize.status?"hide":"actions"}>
                          <PlayCircleOutlineIcon  sx={{color:"green"}}/>
                        </button>
                      </Link>

                      <button title='Edit' className={isModal?"hide":"actions"} id='editBtn' onClick={()=>{
                        handleOpenEdt();
                        setEdtIndex(i);
                        }}>
                        <BorderColorOutlinedIcon sx={{color:"green"}}/>
                      </button>
                      
                      <button title='Delete' className={isModal?"hide":"actions"} onClick={()=>{
                        handleOpenDlt();
                        setDltIndex(i);
                      }}>
                        <DeleteOutlinedIcon  sx={{color:"crimson"}}/>
                      </button>
                      
                      
                    </TableCell>
                  </TableRow>
                  )})}
              </TableBody>
            </Table>
          </TableContainer>
        }
        </div>
        <Modal
          open={openEdt}
          onClose={handleCloseEdt}
          aria-labelledby="modal-title-edt"
          aria-describedby="modal-description-edt"
          >
            <div>
              <CreateMcqSingle editId={edtIndex} handleCloseEdt={handleCloseEdt}/>
            </div>
        </Modal>
        <Modal
          open={openDlt}
          onClose={handleCloseDlt}
          aria-labelledby="modal-title-dlt"
          aria-describedby="modal-description-dlt"
          >
          <div className='modal-dlt'>
            <div id='modal-title-dlt'>
              <div className='modal-head-dlt'>
                Are you sure you want to Delete 
              </div> 
                <button onClick={handleCloseDlt} className='close-btn'><CloseIcon/></button>
            </div>
            <div id='modal-description-dlt'>
                <div>
                  Deleting this quize will result in loosing the quize permanently and is not recoverable
                </div>
                <div>
                <Button
                  sx={{
                    backgroundColor:"crimson",
                    float:"right",
                    marginLeft:"20px",
                    marginTop:"20px",
                    fontFamily:"BrandonGrotesque-Bold"
                  }}
                  onClick={handleCloseDlt}
                  color='error'
                  size='large'
                  variant='contained'>
                        No
                </Button>
                <Button
                    sx={{
                        backgroundColor:"crimson",
                        float:"right",
                        marginTop:"20px",
                        fontFamily:"BrandonGrotesque-Bold"
                    }}
                    onClick={()=>{
                      dispatch(dltQ(dltIndex));
                      setDltIndex(null);
                      handleCloseDlt();
                    }}
                    color='error'
                    size='large'
                    variant='contained'>
                        Yes
                </Button>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  )
}


export default QuizeList
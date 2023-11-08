import '../styles/CreateMcqSingle.css';
import Nav from './Nav'
import {addQ,editQ} from '../service/Actions/action';
import congratulations from '../images/congratulations.gif'
import sad from '../images/sad.gif'
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function CreateMcqSingle(propsData) 
{
    
    // variable to store questions
    const [inputFields, setInputFields] = useState([{
        question:'',
        options:[''],
        answer:'',
        answerIndex:null,
    } ]);
    
    // variable to the title of the quiz
    const [title, setTitle] = useState('');
    // variable to the description of the quiz
    const [desc, setDesc] = useState('');
    // flag for all the quiz constraints
    const [flag, setFlag] = useState(false);
    
    // flag to open quiz saved modal
    const [open, setOpen] = useState(false);
    // flag to open quiz save failure modal
    const [openSad, setOpenSad] = useState(false);

    const dispatch=useDispatch();
    // const location = useLocation();
    // const propsData = location.state;
    const quizeList=useSelector(state=>state.quizes);

    // console.log(Object.keys(props).length !== 0);
    // console.log(propsData);
    const isProps = Object.keys(propsData).length !== 0 ? true:false;
    

    useEffect(()=>{
        if(isProps)
        {
            // console.log(propsData.editId);
            setTitle(quizeList[propsData.editId].title);
            setDesc(quizeList[propsData.editId].desc);
            setInputFields(quizeList[propsData.editId].que);
        }
        // eslint-disable-next-line
    },[])

    useEffect(() => 
    {
        inputFields.forEach((data,index)=>
        {
            let helper = document.getElementById(`helperOpt${index}`);
            const {options,answerIndex} = data;
            if(options.length<2)
            {
                setFlag(false);
                helper.style.display='block';
            }
            else if(answerIndex==null)
            {
                setFlag(false);
                helper.style.display='block';
            }
            else
            {
                setFlag(true);
                helper.style.display='none';
            }
        })
    }, [inputFields])

    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpenSad = () => setOpenSad(true);
    const handleCloseSad = () => setOpenSad(false);


    const  handleChangeTitle = async (event)=>{
        setTitle(event.target.value);
        const titleRegex = /^.{10,30}$/;
        const helper = document.getElementById('titleHelper')

        if(!(titleRegex.test(event.target.value)))
        {
            setFlag(false);
            helper.style.display='block';
        }
        else
        {
            setFlag(true);
            helper.style.display='none';
        }
    }

    const addInputField = ()=>
    {
        let newip = inputFields;
        newip = [...newip,{question:'', options:[''], answer:'', answerIndex:null}];
        setInputFields(newip)
    }
    const removeInputFields = (index)=>
    {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }
    
    const handleChange = (index, event)=>
    {
    
    const queRegex = /^.{10,200}$/;
    const helper = document.getElementById(`helper${index}`)
    const { value } = event.target;
    const list = [...inputFields];
    list[index].question = value;
    setInputFields(list);
    if(!(queRegex.test(value)))
    {
        setFlag(true);
        helper.style.display='block';
    }
    else
    {
        setFlag(false);
        helper.style.display='none';
    }
}

const addOptionField = (index)=>
{
    const data = inputFields.slice();
    const oldOptions = data[index].options;
    data[index].options = [...oldOptions,''];
    setInputFields(data);
    
    //     const data={
    //         ...inputFields[index].question,
    //         options:[...inputFields[index].options,
    //         {
    //             ans:'',
    //             flag:false
    //         }
    //     ]
    // } 
    // const newOptionData = inputFields;
    // const oldOptions = newOptionData[index].options;
    // newOptionData[index].options=[...oldOptions,{ans:'',flag:false}];

    // console.log("od-",newOptionData[index]);
    // const data = inputFields;
    // data[index]=newOptionData;
    
    // setInputFields(data);
    // console.log("IF-",inputFields[index]);
    
    // console.log("data1-",inputFields);
    // data[index].answer = [...data[index].answer,'a'];
    // console.log("data2-",data);
    // console.log("IF-",inputFields);
    
    
    // const opt=options;
    // opt[index]=[...opt,index];
    // setOptions(opt);
    // console.log("optopt-",options);
    
    

    }

    const removeOptionFields = (indexQue,indexOpt)=>
    {
        let list =[...inputFields];
        if(indexOpt===list[indexQue].answerIndex)
        {
            list[indexQue].answerIndex=null;
        }
        else if(indexOpt<list[indexQue].answerIndex)
        {
            list[indexQue].answerIndex-=1;
        }
        list[indexQue].options.splice(indexOpt,1);        
        setInputFields(list);
        // const rows = [inputFields[indexQue].options];
        // rows.splice(indexOpt, 1);
        // list[indexQue].options=rows;
    }
    
    const handleChangeOpt = (index,indexOpt,evnt)=>
    {
    
        const { value } = evnt.target;
        const list = [...inputFields];
        list[index].options[indexOpt] = value;
        setInputFields(list);
    
    }

    const setCorrect=(index,indexOpt)=>
    {
        const data = inputFields.slice();
        data[index].answer = data[index].options[indexOpt];
        data[index].answerIndex = indexOpt;
        setInputFields(data);
    }

    const onSave= (e)=>
    {

        e.preventDefault();
        let tempFlag;
        quizeList.forEach((data,index)=>{
            if(data.title===title)
            {
                if(isProps && index===propsData.editId)
                    tempFlag=true;
                else
                    tempFlag=false;
            }
        })
        if(tempFlag===false)
        {
            setFlag(false);
            document.getElementById("sameTitleError").style.display="block";
        }
        else
        {
            document.getElementById("sameTitleError").style.display="none";
            
        }

        if(flag===true&&tempFlag!==false)
        {
            // alert("QUIZE Created Sucessfully !");
            if(isProps)
            {
                dispatch(editQ(title,desc,inputFields,propsData.editId));
                
            }
            else
            {
                dispatch(addQ(title,desc,inputFields));
            }
            handleOpen();

            
        }
        else
        {
            // alert("Please fill up according to the instructions !");
            handleOpenSad();
        }

        
    }

// ----------------------------------        Render function           ---------------------------------------------------
  return (
    <div className='create-new-quize' id={isProps?"modal-edt":""}>
      <Nav active={isProps?"0":""}/>
      <form onSubmit={(e)=>onSave(e)}>
      <div className='heading-div'>
        <div className='heading-container'>
          <h2 className='heading'id={isProps?"modal-title-edt":""}>{isProps?"Edit Quiz":"Create New Quiz"}</h2>
        </div>
      </div>

        <div>
          <div className='outer-top' >
            <div className='top'>
                <input
                    required
                    value={title}
                    onChange={(e)=>handleChangeTitle(e)} 
                    className='title' 
                    type="text" 
                    name="title" 
                    id="title" 
                    spellCheck="false"
                    placeholder='Add Title'/>
                <span className='titleHelper' id='titleHelper'>Title length should be minimum 10 and maximum 30</span>
                <textarea
                    required
                    onChange={(e)=>{setDesc(e.target.value)}}
                    value={desc}  
                    className='desc' 
                    type="text" 
                    name="description" 
                    id="description"  
                    spellCheck="false"
                    placeholder='Add Description'/>
            </div>
          </div>
          <div>
          <div className="container">
                {/* {console.log("ip--",inputFields)} */}
                {
                    inputFields.map((data, index)=>
                    {
                        const {question,options} = data;
                        // console.log(index,"data - ",data)
                        // console.log(index,"question - ",question)
                        // console.log(index,"option - ",options)
                        return(

                        <div className="question-container" key={index}>
                            <div className='qno'>Question {index+1}</div>
                            <div className="question">
                                <input 
                                    required
                                    type="text" 
                                    onChange={(evnt)=>handleChange(index, evnt)} 
                                    value={question} 
                                    name="question" 
                                    className="question-input"  
                                    spellCheck="false" 
                                    placeholder="New Question" />
                            </div>
                            <span id={`helper${index}`} className='helper'>Question length should be minimum 10 & maximum 200</span>
                            <div className='option-container'>
                                {
                                    
                                    options.map((ans,indexOpt)=>{
                                        
                                        // console.log("opts--",options)
                                        return(
                                            <div className='option' key={indexOpt}>
                                                <div className='up'>
                                                    <div>
                                                        <input 
                                                            type="text" 
                                                            required
                                                            onChange={(evnt)=>handleChangeOpt(index,indexOpt,evnt)} 
                                                            name="options" 
                                                            className="option-input"   
                                                            spellCheck="false"
                                                            placeholder={`Option ${indexOpt+1}`} 
                                                            value={ans}/>
                                                    </div>
                                                    <div>
                                                    {
                                                        (options.length>1) ? 
                                                            <DeleteForeverOutlinedIcon 
                                                                sx={{
                                                                    cursor:'pointer',
                                                                    color:'darkRed'
                                                                }}
                                                                onClick={()=>removeOptionFields(index,indexOpt)}/> 
                                                        :''
                                                    }
                                                    </div>
                                                </div>
                                                <div className='down' onClick={()=>setCorrect(index,indexOpt)}>
                                                    {
                                                        <Button 
                                                            variant='text'
                                                            sx={{
                                                                color: 'grey',
                                                                textTransform:'none',
                                                                fontWeight:600
                                                            }} 
                                                            endIcon={inputFields[index].answerIndex===indexOpt?<CheckBoxIcon />:""}
                                                            className={inputFields[index].answerIndex===indexOpt?"c-green":""} >
                                                                Correct Answer
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="add-opt" onClick={()=>addOptionField(index)}>
                                    <div className='up'>
                                        <div className="new-option-input">    
                                            New Answer
                                        </div>

                                    </div>
                                    <div className='down'></div>
                                </div>
                            </div>

                            
                            <div className="dlt-qs">
                                <div className='helperOpt' id={`helperOpt${index}`}>
                                    There should be atleat two options and one should be correct
                                </div>
                                <div className='dlt-qs-btn'>
                                    {
                                        (inputFields.length!==1)?
                                        <DeleteOutlinedIcon
                                            sx={{
                                                color:'darkRed',
                                                cursor:'pointer',
                                                justifySelf:'flex-end'
                                            }}
                                            onClick={()=>removeInputFields(index)} />
                                        :''
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    })
                }

                <div className="add-qs">
                    <Button 
                        sx={{
                            textTransform:'none',
                            fontWeight:600,
                            borderWidth:'2px',
                            borderColor:'primary.main',
                            width:'180px',
                            margin:'30px 0px 20px 0px'
                        }}
                        startIcon={<LibraryAddOutlinedIcon/>}
                        variant='outlined'
                        size='small'
                        className="" 
                        onClick={addInputField}>
                            Add Question
                    </Button>
                </div>
                <div className='save'>
                    <div className='sameTitleError' id='sameTitleError'>
                        Same title exists ! Please change the title
                    </div>

                    <Button
                        sx={{
                            width:'100px',
                            margin:'30px',
                            marginRight:'80px',
                            fontFamily:"BrandonGrotesque-Bold"
                        }}
                        type='submit'
                        size='large'
                        variant='contained'>
                            Save
                    </Button>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                <div className='modal'>
                    <div id='modal-title'>
                        <div className='modal-head'>
                            <img src={congratulations} 
                                alt="" className='congoImg'/>
                            <span className='modal-msg'>
                                {isProps?"Quize Edited Sucessfully":"Quize Created Sucessfully"}
                            </span>
                        </div> 
                        <button 
                        onClick={()=>{
                            handleClose();
                            if(isProps)
                                propsData.handleCloseEdt();}} 
                            className='close-btn'>
                                <CloseIcon/>
                        </button>
                    </div>
                    <div id='modal-description'>
                        <Link to='/quizes'>
                        {!isProps?
                            <button className='my-quizes'>
                                My Quizes
                            </button>:
                            <></>}
                        </Link>
                    </div>
                </div>
                </Modal>
                <Modal
                    open={openSad}
                    onClose={handleCloseSad}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                <div className='modal'>
                    <div id='modal-title'>
                        <div className='modal-head'>
                            <img src={sad} 
                                alt="" className='congoImg'/>
                            <span className='modal-msg'>
                                Please fill up according to the instructions !
                            </span>
                        </div> 
                        <button onClick={handleCloseSad} className='close-btn'><CloseIcon/></button>
                    </div>
                    <div id='modal-description'>
                        <Link to='/quizes'>
                            <button className='my-quizes' onClick={handleCloseSad}>
                                My Quizes
                            </button>
                        </Link>
                    </div>
                </div>
                </Modal>

            </div>
          </div>

        </div>
      </form>
    </div>
  )
}


export default CreateMcqSingle
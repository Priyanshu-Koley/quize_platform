import React from 'react'
import { useState } from 'react';
import '../styles/CreateMcqSingle.css'
import {Button} from '@mui/material';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



function InputFields() 
{

    const [inputFields, setInputFields] = useState([{
        question:'',
        options:[''],
        answer:'',
        answerIndex:null
    } ]);

    // const [options,setOptions] = useState(['']);
    
    const addInputField = ()=>{

        let newip = inputFields;
        newip = [...newip,{question:'', options:[''], answer:'', answerIndex:null}];
    
        setInputFields(newip)
      
    }
    const removeInputFields = (index)=>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        // console.log(index);
        // console.log(rows.splice(index, 1));
        // console.log(rows);
        setInputFields(rows);
    }
    
    const handleChange = (index, event)=>{
    
    const { value } = event.target;
    const list = [...inputFields];
    list[index].question = value;
    setInputFields(list);
    
    }
    const addOptionField = (index)=>{
        console.log("add opt");
        
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
    
    const data = inputFields.slice();
    // console.log("data1-",inputFields);
    const oldOptions = data[index].options;
    data[index].options = [...oldOptions,''];
    // data[index].answer = [...data[index].answer,'a'];
    // console.log("data2-",data);
    setInputFields(data);
    console.log("IF-",inputFields);
    
    
    // const opt=options;
    // opt[index]=[...opt,index];
    // setOptions(opt);
    // console.log("optopt-",options);
    
    

    }

    const removeOptionFields = (indexQue,indexOpt)=>{
        let list =[...inputFields];
        if(indexOpt===list[indexQue].answerIndex)
        {
            list[indexQue].answerIndex=null;
        }
        else if(indexOpt<list[indexQue].answerIndex)
        {
            list[indexQue].answerIndex-=1;
        }
        const rows = [inputFields[indexQue].options];

        list[indexQue].options.splice(indexOpt,1);

        console.log("rows-",rows);

        // rows.splice(indexOpt, 1);
        // list[indexQue].options=rows;

        console.log("list-",list);

        setInputFields(list);
    }
    
    const handleChangeOpt = (index,indexOpt,evnt)=>{
    
    const { value } = evnt.target;
    const list = [...inputFields];
    list[index].options[indexOpt] = value;
    setInputFields(list);
    // console.log(value,index,indexOpt,list[index].options[indexOpt].ans);
    // console.log(inputFields);
    }

    const setCorrect=(index,indexOpt)=>{
        const data = inputFields.slice();
        data[index].answer = data[index].options[indexOpt];
        data[index].answerIndex = indexOpt;
        setInputFields(data);
    }


  return (
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
                                    type="text" 
                                    onChange={(evnt)=>handleChange(index, evnt)} 
                                    value={question} 
                                    name="question" 
                                    className="question-input"  
                                    placeholder="New Question" />
                            </div>
                            <div className='option-container'>
                                {
                                    
                                    options.map((ans,indexOpt)=>{
                                        
                                        // console.log("opts--",options)
                                        return(
                                            <div className='option' key={indexOpt}>
                                                <div className='up'>
                                                    <div>
                                                        <input type="text" 
                                                            onChange={(evnt)=>handleChangeOpt(index,indexOpt,evnt)} 
                                                            name="options" 
                                                            className="option-input"  
                                                            placeholder={`Option ${indexOpt+1}`} 
                                                            value={ans}/>
                                                    </div>
                                                    <div>
                                                    {
                                                        (options.length!==1) ? 
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
                                                            className={inputFields[index].answerIndex===indexOpt?"c-green":""} 
                                                            x>
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
                                        <input 
                                            disabled
                                            className="option-input" 
                                            placeholder='New Answer'>    
                                        </input>

                                    </div>
                                    <div className='down'></div>
                                </div>
                            </div>

                            
                            <div className="dlt-qs">
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

                    <Button 
                        sx={{
                            width:'100px',
                            margin:'30px',
                            marginRight:'80px'
                        }}
                        size='large'
                        variant='contained'>
                            Save
                    </Button>
                </div>

            </div>
  )
}

export default InputFields
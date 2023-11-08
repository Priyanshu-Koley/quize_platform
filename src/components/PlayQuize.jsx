import '../styles/PlayQuize.css';
import {Button} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import good from '../images/quiz_finish.gif';
import bad from '../images/quiz_finish_sad.gif';

const PlayQuize = ()=>{
    
    
    const [name,setName]=useState('');
    const [quizeStarted,setQuizeStarted]=useState('1');
    const [queNo,setQueNo]=useState(0);
    const [answers,setAnswers]=useState([]);
    const [correctAnswers,setCorrectAnswers]=useState([]);
    // eslint-disable-next-line
    const [score,setScore]=useState([]);
    const [total,setTotal]=useState(0);
    const [percentage,setPercentage]=useState(0);

    const location = useLocation();
    const props = location.state;

    const navigate = useNavigate();

    const quizes = useSelector(state=>state.quizes);
    const quize = quizes[props.id];
    
    
    useEffect(()=>{

        let correct_ans = [];
        let ans = [];
        quize.que.forEach((que,i)=>{
            correct_ans.push(que.answerIndex);
            ans.push(-1);
        })
        setCorrectAnswers(correct_ans);
        setAnswers(ans);
         // eslint-disable-next-line
    },[])

    const  changeHandlerName= (e)=>
    {
        setName(e.target.value);
        if(e.target.value.length>=5 && e.target.value.length<=50)
        {
            document.getElementById('helper-name').style.display="none";
        }
        else
        {
            document.getElementById('helper-name').style.display="block";
        }
    }

    const startQuize = ()=>{
        if(name.length>=5 && name.length<=50)
        {
            document.getElementById('helper-name').style.display="none";
            
            setQuizeStarted('0');
        }
        else
        {
            document.getElementById('helper-name').style.display="block";
        }
    }
    const prev = (indexQ)=>{
        const query =`option${indexQ}`;
        let val;
        const choosedOption = document.querySelector(`input[name=${query}]:checked`);
        if(choosedOption)
        {
            val = Number(choosedOption.value);
            let ans = answers;
            ans[indexQ]=val;
            setAnswers(ans);
        }
        setQueNo(queNo-1);
    }
    const next = (indexQ)=>
    {
        const query =`option${indexQ}`;
        const choosedOption = document.querySelector(`input[name=${query}]:checked`);
        if(choosedOption)
        {
            let val,ansTemp;
            val = Number(choosedOption.value);
            ansTemp=answers;
            ansTemp[indexQ]=val;
            setAnswers(ansTemp);
            if(indexQ===quize.que.length-1)
            {  
                let score = [];
                for (let i = 0; i < correctAnswers.length; i++) 
                {
                    if(ansTemp[i]===correctAnswers[i])
                    {
                        score.push(1);
                    }
                    else
                    {
                        score.push(0);
                        
                    }
                    
                }
                setScore(score);
                let total = score.reduce(function (x, y) {
                    return x + y;
                }, 0);
                setTotal(total);
                setQuizeStarted('5')
            }
            setQueNo(queNo+1);
        }
        else
        {
            const helper = document.getElementById("helper-ans-"+indexQ);
            helper.style.display="block";
            setTimeout(() => {     
                helper.style.display="none";
            }, 3000);
        }

        
    }

    const finishMessage = ()=>
    {
        let percent = (total/correctAnswers.length)*100;
        setPercentage(percent);
        if(percentage>90)
        {
            return "Outstanding Performance !!"
        }
        else if(percentage>75)
        {
            return "Excellent Performance !!"
        }
        else if(percentage>60)
        {
            return `Good Performance ${name}`
        }
        else if(percentage>45)
        {
            return `Average Performance ${name}`
        }
        else if(percentage>35)
        {
            return `Bad Performance ${name}`
        }
        else
        {
            return `Better luck next time ${name}, You need Practice`
        }
        
    }

    const tryAgain = ()=>
    {
        setTotal(0);
        setScore([]);
        setPercentage(0);
        let ans = [];
        quize.que.forEach(()=>{
            ans.push(-1);
        })
        setAnswers(ans);
        setQueNo(0);
        setQuizeStarted('1');
    }

    const goToHome = ()=>
    {
        navigate("/");
    }

    const RenderQuestions = ()=>
    {
        return(
            <div className={queNo===correctAnswers.length?"score-card":'play-container'}>
                <div className={quizeStarted!=='1' && queNo!==correctAnswers.length?"play_title_started":"hide"}>
                    {quizes[props.id].title}
                </div>
        {quize.que.map((questionObj,indexQ)=>{
            return(

            <div className={indexQ!==queNo?"hide":''} id={`question${indexQ}`} key={indexQ}>
                <div className='play_que_no'>Question {indexQ+1}/{correctAnswers.length}</div>
                <div className='play-question'>
                    {questionObj.question}
                </div>
                <div className='play-options'>
                    {questionObj.options.map((option, index) => {
                        const uniqueId = `option${indexQ}_${index}`;
                        return (
                            <label htmlFor={uniqueId}  className="radio-card">
                                <input 
                                        type="radio" 
                                        name={`option${indexQ}`}
                                        id={uniqueId}
                                        value={index}
                                        defaultChecked={answers[indexQ]===index?true:false}  
                                    />
                                <div className="card-content-wrapper" key={uniqueId}>
                                    <span className='check-icon'></span>
                                    <div className="play-option card-content">
                                        {option}
                                    </div>
                                </div>
                            </label>
                        )
                    })}
            </div>
                <div className='play_nav_btns'>
                {indexQ===0?<div></div>:
                    <div>
                        <Button
                                sx={{
                                    width:'100px',
                                    fontFamily:"BrandonGrotesque-Bold"
                                }}
                                size='large'
                                onClick={()=>{prev(indexQ)}}
                                variant='contained'>
                                    Previous
                        </Button>
                    </div>
                }
                <div className='helper-ans' id={"helper-ans-"+indexQ} >
                    Answer this question to proceed
                </div>
                <div>
                    <Button
                            sx={{
                                width:'100px',
                                fontFamily:"BrandonGrotesque-Bold"
                            }}
                            size='large'
                            onClick={()=>{next(indexQ)}}
                            variant='contained'>
                                {indexQ===quize.que.length-1?"Finish":"Next"}
                    </Button>
                </div>
                </div>
            </div>
            )
        })}
        {/* rendering the Message page/Congratulations for playing the quizzes */}
        <div className={queNo===correctAnswers.length?"":"hide"}>
            <div className='wish-img-container'>
                <img src={percentage>45?good:bad} alt="Wish" className='wish-img'/>
            </div>
            <h1 >{finishMessage()}</h1>
            <h2 className={percentage>75?"congrats":"hide"}>{`Congratulations ${name}`}</h2>

            <div className='score'>
                You get {total} correct out of {correctAnswers.length}
            </div>
            <div className='percent'>
                Your Percentage is {percentage.toFixed(2)}%
            </div>

            <div className='play_nav_btns'>
                
                <div>
                    <Button
                            sx={{
                                width:'135px',
                                fontFamily:"BrandonGrotesque-Bold",
                                backgroundColor:'green'
                            }}
                            size='large'
                            onClick={()=>{tryAgain()}}
                            variant='contained'>
                                {percentage>35?"Play again":"Try Again"}
                    </Button>
                </div>

                <div>
                    <Button
                            sx={{
                                width:'135px',
                                fontFamily:"BrandonGrotesque-Bold",
                                backgroundColor:'green'
                            }}
                            size='large'
                            onClick={()=>{goToHome()}}
                            variant='contained'>
                                Home
                    </Button>
                </div>
            </div>

        </div>
        </div>
        )
    }


    //rendering the home page for playing the quizzes
    return(<>
        <div className='play-body'>
            
            {
            quizeStarted!=='1'?
            <RenderQuestions/>
            :
            <div className='play-container'>
                <div className='back-btn-div'>
                    <button onClick={goToHome} className='back-btn'>
                    <span className='back-btn-img'>&lt;</span>Back
                    </button>
                </div>
                <div className='play-title'>
                    {quizes[props.id].title}
                </div>
                <div className='play-desc'>
                    {quizes[props.id].desc}
                </div>
                <div className='play-name-input'>
                    <label htmlFor="name">Enter your name</label>
                    <br />
                    <input 
                        type="text" 
                        id='name' 
                        spellCheck='false'
                        onChange={(e)=>changeHandlerName(e)}/>
                        <br />
                        <small id='helper-name'>Name should be between 5 to 50 letters</small>
                </div>
                <div>
                <Button
                        sx={{
                            width:'140px',
                            fontFamily:"BrandonGrotesque-Bold",
                            marginTop:'10px'
                        }}
                        type='submit'
                        size='large'
                        onClick={startQuize}
                        variant='contained'>
                            Start Quize
                </Button>
                </div>
            </div>
            }
        </div>
    </>);
}

export default PlayQuize;
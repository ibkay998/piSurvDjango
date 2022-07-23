import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useNavigate } from 'react-router-dom';
import "./user_form.css"
import { useStateValue } from '../components/StateProvider';
import axios from "axios"
import { useParams } from 'react-router-dom';
import {useCookie, useCookies} from 'react-cookie'
import { actionTypes } from "../components/reducer";
import ApiService from './ApiService'


function Userform() {
    var quest = [];
        var post_answer = [];
        var history = useNavigate()
        const [answer,setAnswer] = useState([])
        const [token,setToken] = useCookies(["mytoken"])
        const [questionType, setType] = useState("radio")
        var [{question_set,title,description},dispatch] = useStateValue()
        let { id } = useParams()
        
        useEffect(()=>{
            
    },[])
        

        useEffect(()=>{
            fetch(`http://127.0.0.1:8000/company/available-survey/${id}/`,{
            'method':'GET',
            headers : {
            'Content-Type':'application/json',
            }
      }).then(resp => resp.json()).then(request => {
          
        
        let question_data = request.question_set;
        let doc_name = request.title;
        let doc_descip = request.description;
        question_data.map((q)=>{
            answer.push({
            "answer" : " "
            })
            
        })
        
        dispatch({
            type: actionTypes.SET_QUESTIONS,
            question_set: question_data,
        })
        console.log("request succesful");
        })
    },[id,dispatch])
       console.log(answer)

    function select(index,que,option){
        answer[index].answer=option
        setAnswer(answer)
        console.log(answer)
}





   var  post_answer_data = {}

function selectinput(index,que,option){
    console.log("this plsa")
    
    answer[index].answer=option
    setAnswer(answer)
    console.log(answer)
}

   

function selectcheck(e,que,option){
    var d =[]
    var k =answer.findIndex((ele)=>(ele.question === que))
    if(answer[k].answer){
    d=answer[k].answer.split(",")
        }
    if(e === true){
        d.push(option)
    }
    else{
        var n=d.findIndex((el)=>(el.option === option))
        d.splice(n,1)

    }
    answer[k].answer=d.join(",")
    setAnswer(answer)
}


function submit(){
    ApiService.SubmitAnswer({"answer" :answer},
    token["mytoken"],id).then(resp => console.log("success"))

  

}
    return (  
      <div className="submit mt-[70px]">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >{title}</Typography>
                    <Typography style={{fontSize:"15px"}} >{description}</Typography>

                </div>
              
                {
                question_set.map((question,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",}} >{qindex+1}.  {question.questionText}</Typography>
                    {
                            question.option.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    
                                      {

                                        question.questionType !== "radio" ? (  
                                          question.questionType !== 'text' ? (
                                        <label>
                                        <input
                                        
                                        type={question.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectcheck(qindex,e.target.checked,question.questionText,ques.optionText)}}
                                        /> {ques.optionText}
                                        </label>): (

                                        <label>
                                        <input

                                        type={question.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectinput(index,question.questionText,e.target.value)}}
                                        /> {ques.optionText}
                                        </label>
                                        )
                                        
                                        )
                                        
                                        :(  <label>
                                          <input
                                            
                                            type={question.questionType}
                                            name={qindex}
                                            value= {ques.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={()=>{select(qindex,question.questionText,ques.optionText)}}
                                          />
                                      {ques.optionText}
                                        </label>)

                                      }
                                  
                                  </div>
                                  </div>
                                </div>
                            ))
                    }
                    </div>
                ))
                
                }         
                 
            <div className="user_form_submit">
              <Button onClick={()=> {submit()}}  variant="contained" color="primary"  style={{fontSize:"14px"}}>Submit</Button>

            </div>
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
    )
}

export default Userform
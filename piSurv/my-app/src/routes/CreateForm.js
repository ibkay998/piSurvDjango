import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import { useHistory } from "react-router-dom";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BsQuestionSquareFill, BsTrash } from "react-icons/bs";
import { IconButton, setRef } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { ToastContainer, toast } from "react-toastify";
import { BsFileText } from "react-icons/bs";
import { Paper, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import { FcRightUp } from "react-icons/fc";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import axios from "axios";
import { useStateValue } from "../components/StateProvider";
import { actionTypes } from "../components/reducer";
import {useCookie, useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import ApiService from './ApiService'



function CreateForm(props) {
    const [{}, dispatch] = useStateValue();
    const [amount,setAmount] = useState(0)
    const [question, setQuestion] = useState([]);
    const [documentName, setDocName] = useState("Untitled Document");
    const [documentDesc, setDocDesc] = useState("Add Description");
    const [questionType, setType] = useState("radio")
    const [token,setToken] = useCookies(["mytoken"])
    const [isSubmit,setIsSubmit] = useState(false)
    let history = useNavigate()
    let { id } = useParams();

    
    useEffect(() => {
      var newQuestion = {
        questionText: "Question",
        answer: "",
        questionType: "radio",
        option: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      };
  
      setQuestion([...question, newQuestion]);
    }, []);

    // useEffect(()=>{
    //   fetch(`http://127.0.0.1:8001/company/company-list/38/`,{
    //     'method':'GET',
    //     headers : {
    //       'Content-Type':'application/json',
    //       'Authorization':`Token ${token["mytoken"]}`
    //     }
    //   }).then(resp => resp.json()).then(resp => {
    //     console.log(resp)
    //     setQuestion(resp.data.question_set[0])
    //   })

    // },[token])

    useEffect(() => {
      function data_adding() {
        axios
          .get(`http://127.0.0.1:8000/company/company-list/${id}/`, { 

            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token["mytoken"]}`,
            },
          })
          .then((request) => {
            
            let question_data = request.data.question_set;
            let doc_name = request.data.title;
            let doc_descip = request.data.description;
            console.log(request.data.question_set)
            setDocName(doc_name);
            setDocDesc(doc_descip);
            setQuestion(request.data.question_set);
            dispatch({
              type: actionTypes.SET_DOC_NAME,
              title: doc_name,
            });
  
            dispatch({
              type: actionTypes.SET_DOC_DESC,
              description: doc_descip,
            });
            dispatch({
              type: actionTypes.SET_QUESTIONS,
              question_set: question_data,
            })
            console.log("request succesful");
          })
          .catch((err) => {
            if (err.message)
              err.response
                ? toast.error(
                    err.response.data.msg
                      ? err.response.data.msg
                      : err.response.statusText
                  )
                : toast.error("Network error");
            else toast.error("Unknown error");
          });
      }
        if (props.call){
        data_adding()};
      
      
    }, [dispatch,token]);

    function changeType(e) {
      setType(e.target.id);
    }

   

    useEffect(() => {
      setType(questionType);
    }, [changeType]);
    console.log(question)
    function changeAmount(val){
      var amount = val
      setAmount(amount)
      console.log(amount)
    }
    function saveQuestions() {
      var data = {
        formId: "1256",
        title: "My-new_file",
        description: "first file",
        question_set: question,
      };
  
      setQuestion(question);
    }

    function commitToDB() {
      dispatch({
        type: actionTypes.SET_QUESTIONS,
        question_set: question,
      });
      
      ApiService.PostSurveyData({
        title: documentName,
        description: documentName,
        question_set: question},token["mytoken"]).then(resp=>console.log(resp)).then((result) => {
          toast.success(result.data);
        }).then(resp=>history("/company/overview"))
        .catch((err) => {
          if (err.message)
            err.response
              ? toast.error(
                  err.response.data.msg
                    ? err.response.data.msg
                    : err.response.statusText
                )
              : toast.error("Network error");
          else toast.error("Unknown error");
        })
      
    }
    
   
    function changeQuestion(text,i){
      var newQuestion = [...question]
      newQuestion[i].questionText = text
      setQuestion(newQuestion)
      console.log(newQuestion)
    }

    function addMoreQuestionField() {

      expandCloseAll()
      setQuestion((question) => [
        ...question,
        {
          questionText: "Question",
          questionType: "radio",
          option: [{ optionText: "Option 1" }],
          open: true,
          required: false,
        },
      ]);
    }

    function addQuestionType(i,type){
      let qs = [...question]
      console.log(type)
      qs[i].questionType = type
      setQuestion(qs)
    }

    function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
      var itemgg = [...question];
      const itemF = reorder(
        itemgg,
        result.source.index,
        result.destination.index
      );
      setQuestion(itemF);
    }
  
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };


    function handleOptionValue(text,i,j){
      var optionsQuestion = [...question]
      optionsQuestion[i].option[j].optionText = text
      setQuestion(optionsQuestion)
    }

    function removeOption(i,j){
      var removeOptionQuestion = [...question]
      if(removeOptionQuestion[i].option.length > 1){
        removeOptionQuestion[i].option.splice(j,1)
        setQuestion(removeOptionQuestion)

      }
    
      
    }
    function addOption(i){
      var addOptionQuestion = [...question]
      addOptionQuestion[i].option.push({optionText:"Enter New Option "})
      setQuestion(addOptionQuestion)
    }

    function deleteQuestion(i) {
      let qs = [...question];
      if (question.length > 1) {
        qs.splice(i, 1);
      }
      setQuestion(qs);
    }

    function expandCloseAll() {
      let qs = [...question];
      for (let j = 0; j < qs.length; j++) {
        qs[j].open = false;
      }
      setQuestion(qs);
    }
  
    function handleExpand(i) {
      let qs = [...question];
      for (let j = 0; j < qs.length; j++) {
        if (i === j) {
          qs[i].open = true;
        } else {
          qs[j].open = false;
        }
      }
      setQuestion(qs);
    }

    function requiredQuestion(i) {
      var requiredQuestion = [...question];
      requiredQuestion[i].required = !requiredQuestion[i].required;
      setQuestion(requiredQuestion);
    }  

    function copyQuestion(i) {
      expandCloseAll()
      let qs = [...question];
      var newQuestion = {...qs[i]}
      setQuestion((question) => [
        ...question,
        newQuestion
      ]);
    }
    

    function questionUI(){
        return (
          question.map((ques,i)=>(
            <Draggable key={i} draggableId={i+"id"} index={i}>
              {(provided,snapshot) =>(
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div>
                  <div style={{ marginBottom: "0px" }}>
                    <div style={{ width: "100%", marginBottom: "0px" }}>
                      <DragIndicatorIcon
                        style={{
                          transform: "rotate(-90deg)",
                          color: "#DAE0E2",
                          position: "relative",
                          left: "300px",
                        }}
                        fontSize="small"
                      />
                    </div>
                    <Accordion expanded={ques.open } onChange={()=>handleExpand(i)} className={question[i].open ? "add_border border-solid border-blue-600" : ""}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1}
                    style={{ width: "100%" }}
                  >
                      {!question[i].open ? (
                      <div className="saved_questions">
                        <Typography
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            letterSpacing: ".1px",
                            lineHeight: "24px",
                            paddingBottom: "8px",
                          }}
                        >
                          {i + 1}.{ques.questionText}
                        </Typography>

                        {ques.option.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                style={{
                                  marginLeft: "5px",
                                  marginBottom: "5px",
                                }}
                                disabled
                                control={
                                  <input
                                    type={ques.questionType}
                                    color="primary"
                                    style={{ marginRight: "3px" }}
                                    required={ques.type}
                                  />
                                }
                                label={
                                  <Typography
                                    style={{
                                      fontFamily: " Roboto,Arial,sans-serif",
                                      fontSize: " 13px",
                                      fontWeight: "400",
                                      letterSpacing: ".2px",
                                      lineHeight: "20px",
                                      color: "#202124",
                                    }}
                                  >
                                    {ques.option[j].optionText}
                                  </Typography>
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>
                  {question[i].open?(
                    <div className="question_boxes flex justify-center ">
                    <AccordionDetails className="add_question bg-white rounded-lg px-6 py-5 capitalize flex flex-col pt-0 w-[93%] ml-[10px]">
                          <div>
                            <div className="add_question_top flex items-center justify-between">
                              <input
                                type="text"
                                className="question box-border mt-[10px] font-sans text-xl font-normal flex-1 leading-10 w-[40%] border-none outline-none text-black h-[40px] mr-[10px] p-[10px] focus:border-b-[1px] focus:border-b-purple-600 bg-[#f4f4f9]"
                                placeholder="Question"
                                value={ques.questionText}
                                onChange={(e)=>{changeQuestion(e.target.value, i)}}
                              //   onChange={(e) => {
                              //     handleQuestionValue(e.target.value, i);
                              //   }}
                              ></input>
                              <CropOriginalIcon
                                className="cropImg"
                                style={{ color: "#5f6368" }}
                              />
  
                              <Select
                                className="select h-[40px] w-[230px] border-solid border-[0.5px] px-[5px] py-[15px] rounded-sm mx-[10px] text-black border-white bg-transparent"
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                <MenuItem
                                  id="text"
                                  value="Text"
                                  className="menuitem text-gray-800"
                                  onClick={() => {
                                    addQuestionType(i, "text");
                                  }}
                                >
                                  {" "}
                                  <SubjectIcon
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Paragraph
                                </MenuItem>
  
                                <MenuItem
                                  id="checkbox"
                                  value="Checkbox"
                                  className="menuitem"
                                  onClick={() => {
                                    addQuestionType(i, "checkbox");
                                  }}
                                >
                                  <CheckBoxIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Checkboxes
                                </MenuItem>
                                <MenuItem
                                  id="radio"
                                  value="Radio"
                                  className="menuitem"
                                  onClick={() => {
                                    addQuestionType(i, "radio");
                                  }}
                                >
                                  {" "}
                                  <Radio
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Multiple Choice
                                </MenuItem>
                              </Select>
                            </div>
  
                            {ques?.option.length > 0 &&
                              ques.option.map((op, j) => (
                                <div className="add_question_body flex items-center" key={j}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {ques.questionType !== "text" ? (
                                      <input
                                        className="question_text_input"
                                        type={ques.questionType}
                                        style={{ marginRight: "10px" }}
                                      />
                                    ) : (
                                      <ShortTextIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                    )}
  
                                    <input
                                      type="text"
                                      className="text_input border-none outline-none h-[40px] w-[490px] font-serif text-[13px] font-normal tracking-[.2px] text-black focus:border-b-purple-500 focus:border-b-[1.5px]" 
                                      placeholder="option"
                                      value={ques.option[j].optionText}
                                      onChange={(e) => {
                                        handleOptionValue(e.target.value, i, j);
                                      }}
                                    ></input>
                                  </div>
  
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <CropOriginalIcon
                                      style={{ color: "#5f6368" }}
                                    />
  
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => {
                                        removeOption(i, j);
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              ))}
  
                            {ques.option.length < 5 ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    ques.questionType !== "text" ? (
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        inputProps={{
                                          "aria-label": "secondary checkbox",
                                        }}
                                        style={{
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                        }}
                                        disabled
                                      />
                                    ) : (
                                      <ShortTextIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                    )
                                  }
                                  label={
                                    <>
                                      <input
                                        type="text"
                                        className="text_input"
                                        style={{
                                          fontSize: "13px",
                                          width: "60px",
                                        }}
                                        placeholder="Add other"
                                      ></input>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          addOption(i);
                                        }}
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Add Option
                                      </Button>
                                    </>
                                  }
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="add_footer flex justify-between">
                              <div className="add_question_bottom_left flex h-[40px] w-[490px] mt-[12px]  items-center border-t-[2px]">
                                <Button
                                  className="leftPadding flex flex-start"
                                  size="small"
                                  // onClick={() => {
                                  //   addAnswer(i);
                                  // }}
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {" "}
                                  <FcRightUp
                                    style={{
                                      border: "2px solid #4285f4",
                                      padding: "2px",
                                      marginRight: "8px",
                                    }}
                                  />{" "}
                                  Answer key
                                </Button>
                              </div>
  
                              <div className="add_question_bottom flex ">
                                <IconButton
                                  aria-label="Copy"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={"Copy question"}
                                  onClick={() => {
                                    copyQuestion(i);
                                  }}
                                >
                                  <FilterNoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={"Delete question"}
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <BsTrash />
                                </IconButton>
                                <div>
                                  <span
                                    style={{ color: "#5f6368", fontSize: "13px" }}
                                  >
                                    Required{" "}
                                  </span>{" "}
                                  <Switch
                                    name="checkedA"
                                    color="primary"
                                    checked={ques.required}
                                    onClick={() => {
                                      requiredQuestion(i);
                                    }}
                                  />
                                </div>
  
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
  
                        <div className="question_edit bg-gray-200 flex flex-col mr-[12px] mt-[10px] mb-[0] p-[1px] rounded-[3px] h-[100px] w-[35px]">
                          <AddCircleOutlineIcon
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Add question"}
                            onClick={addMoreQuestionField}
                            className="edit text-[#5f6368] "
                          />
                          <OndemandVideoIcon className="edit text-[#5f6368]" />
                          <CropOriginalIcon className="edit text-[#5f6368]" />
                          <TextFieldsIcon className="edit text-[#5f6368]" />
                        </div>
                    </div>
                  ):" "}
                  
            </Accordion>
    
                    </div>
                    </div>
                    </div>
              )}

            </Draggable>
        ))
        )
    }
  return (
    <div className='mt-[100px]'>
      <div className='question_form bg-[#f4f4f9] h-full pb-8 '>
          <br/>
          <div className='section m-auto w-1/2'>
              <div className='question_title_section'>
                  <div className='question_form_top bg-white border-t-[8px] border-fuchsia-600 rounded-lg px-[30px] py-[25px] capitalize '>
                      <input type="text" className='text-black text-3xl box-border font-sans font-normal leading-snug w-full border-b-[1px] border-[#f4f4f9] h-[35px]' value={documentName}
                
                onChange={(e) => {
                  setDocName(e.target.value);
                }} placeholder={
                  documentName
                    ? documentName
                    : "Untitled Document"
                }/>
                      <input type="text" className='text-black mt-[10px] box-border font-sans font-normal leading-snug w-full border-b-[1px] border-[#f4f4f9] h-[20px] text-sm' placeholder={documentDesc}
                      onChange={(e) => {
                        setDocDesc(e.target.value);
                      }} placeholder={
                        documentDesc
                          ? documentDesc
                          : "Add Description"
                      }/>

                  </div>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questionUI()}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="save_form">
            <Button
              variant="contained"
              color="primary"
              onClick={commitToDB}
              style={{ fontSize: "14px" }}
            >
              Save
            </Button>
          </div>
           
            {/* <input onChange={(e)=>{changeAmount(e.target.value)}}/> */}
          
            
          </div>
      </div>
    </div>
  )
}

export default CreateForm

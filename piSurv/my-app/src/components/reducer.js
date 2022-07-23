export const initialState = {
    question_set:[{questionText: "Question", questionType:"radio", option : [{optionText: "Option 1"}], open: true, required:false}],
    title:"Untitled form ",
    description:" add the description "

}

export const actionTypes = {
      SET_QUESTIONS:"SET_QUESTIONS",
      SET_DOC_NAME:"SET_DOC_NAME",
      SET_DOC_DESC:"SET_DOC_DESC"
      
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.SET_QUESTIONS : 
            return {
                ...state, question_set:action.question_set,
            };
        case actionTypes.SET_DOC_NAME : 
            return {
                ...state, title:action.title,
            };
            
        case actionTypes.SET_DOC_DESC: 
            return {
                ...state, description:action.description,
            };     
        default:
            return state;    
    }
}

export default reducer;
export default class ApiService{
    static LoginUser(body){
        return fetch("http://127.0.0.1:8000/auth",{
            method:'POST',
            headers: {
                'Content-Type':"application/json"
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static LogoutUser(){
        return fetch("http://127.0.0.1:8000/company/logout",{
            method:'POST',
            headers: {
                'Content-Type':"application/json"
            },
        }).then(resp => resp.json())
    }

    static RegisterUser(body){
        return fetch("http://127.0.0.1:8000/company/register/",{
            method:'POST',
            headers: {
                'Content-Type':"application/json"
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static PostSurveyData(body,token){
        return fetch("http://127.0.0.1:8000/company/available-survey/",{
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                "Authorization":`Token ${token}`
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static FetchSurveyData(token){
        return fetch("http://127.0.0.1:8000/company/company-list/",{
            method:'GET',
            headers: {
                'Content-Type':"application/json",
                "Authorization":`Token ${token}`
            },
            
        }).then(resp => resp.json())
    }
    static FetchHistoryData(token){
        return fetch("http://127.0.0.1:8000/company/history/",{
            method:'GET',
            headers: {
                'Content-Type':"application/json",
                "Authorization":`Token ${token}`
            },
            
        }).then(resp => resp.json())
    }

    static FetchAllSurvey(token){
        return fetch("http://127.0.0.1:8000/company/available-survey/",{
            method:'GET',
            headers: {
                'Content-Type':"application/json",
                "Authorization":`Token ${token}`
            },
            
        }).then(resp => resp.json())
    }
    static SubmitAnswer(body,token,id){
        return fetch(`http://127.0.0.1:8000/company/available-survey/${id}/submit_answers/`,{
            method:'POST',
            headers: {
                'Content-Type':"application/json",
                "Authorization":`Token ${token}`
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json()).then(resp=>console.log(body))
    }

}
import { postWithAuthAPI, putAPI, deleteAPI , getAPI} from "../helpers/apiHelper"

class QuestionService{

BASEURL=process.env.REACT_APP_API_BASE_URL

fetchQuestionsByDeptId=(departmentId)=>{
    const url = this.BASEURL+`/QuestionsByDepartmentId/${departmentId}`
    return getAPI(url)
}


createMultipleChoiceQuestions=(request)=>{
    const url = this.BASEURL+'/CreateMultipleChoiceQuestions'
    return postWithAuthAPI(url,request)
}

createTextQuestions=(request)=>{
    const url = this.BASEURL+'/CreateTextQuestions'
    return postWithAuthAPI(url,request)
}

updateMultipleChoiceQuestions = (request, questionId) => {
    const url = this.BASEURL + `/updateMultipleChoiceQuestions/${questionId}`;
    console.log("URL:", url, "Request:", request);
    return putAPI(url, request);
}

updateTextQuestions = (request, questionId) => {
    const url = this.BASEURL + `/updateTextQuestion/${questionId}`;
    console.log("URL:", url, "Request:", request);
    return putAPI(url, request);
}

deleteQuestions=(questionId)=>{
    const url = this.BASEURL+`/deleteQuestionById/${questionId}`
    return deleteAPI(url)
}

}
export default QuestionService
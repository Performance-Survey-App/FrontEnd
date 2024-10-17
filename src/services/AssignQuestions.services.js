import { postWithAuthAPI,  getAPI} from "../helpers/apiHelper"

class AssignQuestionsService{

BASEURL=process.env.REACT_APP_API_BASE_URL

fetchQuestionsByDeptId=(departmentId)=>{
    const url = this.BASEURL+`/QuestionsByDepartmentId/${departmentId}`
    return getAPI(url)
}


AssignQuestionsToSingleUser=(request)=>{
    const url = this.BASEURL+'/AssignQuestionsToSingleUser'
    return postWithAuthAPI(url,request)
}

AssignQuestionsToMultipleUsers=(request)=>{
    const url = this.BASEURL+'/AssignQuestionsToMultipleUsers'
    return postWithAuthAPI(url,request)
}

AssignQuestionsToDepartment=(request)=>{
    const url = this.BASEURL+'/AssignQuestionsToDepartment'
    return postWithAuthAPI(url,request)
}

AssignDifferentQuestionsToDepartment=(request)=>{
    const url = this.BASEURL+'/AssignDifferentQuestionsToDepartment'
    return postWithAuthAPI(url,request)
}

AssignDiffQuestionsToDiffDepartment=(request)=>{
    const url = this.BASEURL+'/AssignDiffQuestionsToDiffDepartment'
    return postWithAuthAPI(url,request)
}


GetAssignmentQuestionsByUserId = (userId) => {
    const url = this.BASEURL + `/AssignedQuestionByUserID/${userId}`;
    return getAPI(url);
}

GetAssignmentQuestionsByUserIds=(userId)=>{
    const url = this.BASEURL+`/AssignedQuestionByUserIDs/${[userId]}`
    return getAPI(url)
}

}
export default AssignQuestionsService
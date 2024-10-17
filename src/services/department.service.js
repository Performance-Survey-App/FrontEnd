import { postWithAuthAPI, putAPI, deleteAPI , getAPI} from "../helpers/apiHelper"

class DeptService{

BASEURL=process.env.REACT_APP_API_BASE_URL

fetchDepartments=()=>{
    const url = this.BASEURL+'/getAllDepartment'
    return getAPI(url)
}


createDepartment=(request)=>{
    const url = this.BASEURL+'/CreateDepartment'
    return postWithAuthAPI(url,request)
}

updateDepartmentDetails = (request, departmentId) => {
    const url = this.BASEURL + `/updateDepartmentById/${departmentId}`;
    console.log("URL:", url, "Request:", request);
    return putAPI(url, request);
}


deleteDepartment=(departmentId)=>{
    const url = this.BASEURL+`/disableDepartmentById/${departmentId}`
    return deleteAPI(url)
}

}
export default DeptService
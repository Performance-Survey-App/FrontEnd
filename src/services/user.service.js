import { postWithAuthAPI, putAPI, deleteAPI , getAPI} from "../helpers/apiHelper"

class UserService{

BASEURL=process.env.REACT_APP_API_BASE_URL

fetchAllUsers=()=>{
    const url = this.BASEURL+'/getAllUsers'
    return getAPI(url)
}

fetchUsers=(departmentId)=>{
    const url = this.BASEURL+`/userByDepartmentId/${departmentId}`;
    return getAPI(url)
}

fetchUsersByDeptIds=(departmentId)=>{
    const url = this.BASEURL+`/UsersByDepartmentIds/${[departmentId]}`;
    return getAPI(url)
}

createUser=(request)=>{
    const url = this.BASEURL+'/CreateUsers'
    return postWithAuthAPI(url,request)
}

updateUserDetails = (request, userId) => {
    const url = this.BASEURL + `/updateUserById/${userId}`;
    console.log("URL:", url, "Request:", request);
    return putAPI(url, request);
}


deleteUser=(userId)=>{
    const url = this.BASEURL+`/disableUsersById/${userId}`
    return deleteAPI(url)
}

}
export default UserService
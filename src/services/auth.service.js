import { postAPI } from "../helpers/apiHelper"

class AuthService{

BASEURL=process.env.REACT_APP_API_BASE_URL
login=(request)=>{
    const url = this.BASEURL+'/Adminlogin'
    return postAPI(url,request)
}

}
export default AuthService
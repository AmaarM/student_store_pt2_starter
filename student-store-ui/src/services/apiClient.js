import axios from "axios"
 
class ApiClient {
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "student_store_token"
    }

    //Sets the token
    setToken(token){
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }


    //Issues axios requests
    async request({endpoint, method = "GET", data = {}}){
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const request = await axios({url, method, data, headers});
            return {data: request.data, error:null};
        }
        catch(err){
            console.log(err)
            return {data:null, error:err};
        }
    }

    async fetchUserFromToken(){
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    //Sends a request to Auth/Login
     async login(loginData){
        return await this.request({endpoint: `auth/login`, method:`POST`, data:loginData})
    }

   async signup(loginData){
    console.log(loginData);    
    return await this.request({endpoint: `auth/register`, method:`POST`, data:loginData})
    }

    logoutUser(){
        localStorage.removeItem("student_store_token");
        window.location.reload();
        return false;
    }
} 


export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001");
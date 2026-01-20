import { httpClient } from "../config/AxiosHelper";
export const registerUser= async (user) =>{
   const respone = await httpClient.post('/api/auth/register',user);
   return respone.data;
}
export const loginUser = async (user)=>{
   const respone = await httpClient.post('api/auth/login',user);
   console.log(respone)
   return respone.data;
}
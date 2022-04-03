import axios from "axios";
import FingerPrint from "@/service/FingerPrint";
export const API_URL = "http://localhost:5000/api"
import $refreshRequest from "./apirequest";
const $api = axios.create({
    withCredentials:true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    
    return config;
})

$api.interceptors.response.use((config)=>{
    return config;
}, async (error)=>{
    const originalRequest = error.config;

    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {
            const fingerprint = await FingerPrint.getUserID() 
            
            const response = await $refreshRequest.post(`${API_URL}/refresh`, {fingerprint:fingerprint})
            console.log('refreshtoken')
            localStorage.getItem('token',response.data.accessToken)
            return $api.request(originalRequest) 
        } catch (e) {
            console.log('Пользователь не авторизован')
        }
        
    }
    throw error;

})

export default $api;
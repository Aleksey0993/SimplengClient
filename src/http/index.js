import axios from "axios";
import store from '@/store/index'
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
            console.log('401 finngerprint - ', store.state.auth.fingerprint)
           const response = await $refreshRequest.post(`${API_URL}/auth/refresh`, {fingerprint:store.state.auth.fingerprint})
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
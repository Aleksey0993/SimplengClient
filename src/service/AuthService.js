import $api from "@/http";

export default class AuthService{
    static async login(email, password, fingerprint){
        return $api.post('/auth/login', {email,password,fingerprint})
    }
    static async registration(email, password){
        return $api.post('/auth/registration', {email,password})
    }
    static async activation(activation_token){
        return $api.post('/auth/activation', {activation_token})
    }
    static async logout(){
        return $api.post('/auth/logout')
    }
    static async forgotPassword(email){
        return $api.post('/auth/forgot',{email})
    }
    static async resetPassword(password){
        return $api.post('/auth/reset',{password})
    }
    
    
}
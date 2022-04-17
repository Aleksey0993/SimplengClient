import $api from "@/http";

export default class GrammarService{
    static async listUser(){
        return $api.get('/user')
    }
    static async addUser(){
        return $api.post('/user')
    }
       
}
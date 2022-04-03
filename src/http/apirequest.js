import axios from "axios";

const $refreshRequest = axios.create({
    withCredentials:true
})

export default $refreshRequest
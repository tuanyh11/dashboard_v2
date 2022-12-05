import axios from 'axios';
const URL = "https://food-express-server.onrender.com/"

export const API = axios.create({
    baseURL: `${URL}api`,
})


export const login = async (data, useState, nav) => {
    try {
       const {data: user} = await API.post('/auth/login', {...data})
       localStorage.setItem("user", JSON.stringify(user?.data))
       nav("/")
    } catch (error) {
        useState(error?.response?.data?.message ? error.response?.data?.message : "something went wrong!")
    }
 }

 export const uploadMultipleImage = (data) => {
    return API.post('/upload/multiple_image', data)
 }

 
 export const uploadSigleImage = (data) => {
    return API.post('/upload/single_image', data)
 }


export const delImage = (id) => {
   return API.delete('/upload/delete_image/'+id)
}


export const getORderStats = () => {
   return API.get('/order/stats')
}

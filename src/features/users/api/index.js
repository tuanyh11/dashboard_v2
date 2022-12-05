import { API } from "../../../api"

export const createUserRole= (data) => {
    return API.post('/role', {...data})
  }
  
  export const getUserRoles = () => {
    return API.get('/role/')
  }
  
  export const getUserRole = (id) => {
    return API.get('/role/'+id)
  }
  
  export const delUserRole = (id) => {
    return API.delete('/role/'+id)
  }
  
  export const updateUserRole = (id, data) => {
    return API.put('/role/'+id, data)
  }

  export const getUserStats = () => {
    return API.get('/user/stats')
  }

  export const delUser = (id) => {
    return API.delete('/user/'+id)
  }
  
import { API } from "../../../api";

export const createProcuct = (data) => {
  return API.post("/product", { ...data });
};

export const getProducts = () => {
  return API.get("/product/");
};

export const getProduct = (id) => {
  return API.get("/product/" + id);
};

export const delProduct = (id) => {
  return API.delete("/product/" + id);
};

export const updateProduct = (id, data) => {
  return API.put("/product/" + id, data);
};

export const delCategory = (id) => {
  return API.delete("/category/" + id);
};

export const updateCategory = (id, data) => {
  return API.put("/category/" + id, data);
};

// user
export const createUser= (data) => {
  return API.post('/user', {...data})
}

export const getUsers = (query) => {
   return query ? API.get(`/user/by_position?name=${query}`) : API.get(`/user/by_position`)
}

export const getUser = (id) => {
  return API.get('/user/'+id)
}

export const delUser = (id) => {
  return API.delete('/user/'+id)
}

export const updateUser = (id, data) => {
  return API.put('/user/'+id, data)
}

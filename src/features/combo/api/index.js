import { API } from "../../../api";

export const createCombo = (data) => {
  return API.post("/combo", data);
};

export const getCombos = () => {
  return API.get("/combo");
};

export const delCombo = (id) => {
  return API.delete("/combo/" + id);
};

export const updateCombo = (id, data) => {
  return API.put("/combo/" + id, data);
};

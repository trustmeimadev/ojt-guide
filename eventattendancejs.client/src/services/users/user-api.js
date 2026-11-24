import api from "../api";

export const getAllUsers = () =>
  api.get("/users").then((response) => response.data);

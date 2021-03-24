import axios from "axios"
import { API_URL } from "../actions/types"

const loginService = (email, password) => {
  return axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logoutService = () => {
  localStorage.removeItem("user");
}

export {
  loginService,
  logoutService,
}

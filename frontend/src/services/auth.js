import axios from "axios"
import { API_URL } from "../actions/types"

const login = (username, password) => {
  return axios
    .post(`${API_URL}/login`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user");
}

export {
  login,
  logout,
}

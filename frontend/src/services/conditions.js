import axios from "axios"
import authHeader from "./auth-header"
import { API_URL } from "../actions/types"

const getConditions = () => {
  return axios.get(`${API_URL}/conditions`, { headers: authHeader() })
}

export {
  getConditions,
}
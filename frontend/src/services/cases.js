import axios from "axios"
import authHeader from "./auth-header"
import { API_URL } from "../actions/types"

const getCases = () => {
  return axios.get(`${API_URL}/cases?withoutdecisions=true`, { headers: authHeader() })
}

export {
  getCases,
}

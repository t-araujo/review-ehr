import axios from "axios"
import authHeader from "./auth-header"
import { API_URL } from "../actions/types"

const getDecisions = () => {
  return axios.get(`${API_URL}/decisions`, { headers: authHeader() })
}

const createDecision = (data) => {
  return axios.post(`${API_URL}/decisions`, data, { headers: authHeader() })
}

export {
  getDecisions,
  createDecision,
}

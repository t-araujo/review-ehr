import axios from "axios"
import authHeader from "./auth-header"
import { API_URL } from "../actions/types"

const getDecisions = () => {
  return axios.get(`${API_URL}/conditions`, { headers: authHeader() })
}

const createDecision = (data) => {
  return axios.post(`${API_URL}/conditions`, data, { headers: authHeader() })
}

export {
  getDecisions,
  createDecision,
}

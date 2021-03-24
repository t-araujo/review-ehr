import { combineReducers } from "redux"
import auth from "./auth"
import message from "./message"
import cases from "./cases"
import conditions from "./conditions"
import decisions from "./decisions"

const rootReducer = combineReducers({
  auth,
  message,
  cases,
  conditions,
  decisions,
})

export default rootReducer

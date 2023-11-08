import reducer from "./reducer";
import { combineReducers } from "redux";
// combining all the reducers in root reducer and exporting it to use it for creating the store
const rootReducer = combineReducers({
    quizes: reducer
})

export default rootReducer;
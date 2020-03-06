import { combineReducers } from "redux";

//local imports
import authReducer from "../reducers/authReducer";
import reviewReducer from "../reducers/reviewReducer";
import companyReducer from "../reducers/companyReducer";

// combineReducers is a function from redux that joins all of our reducers together
export const rootReducer = combineReducers({
  auth: authReducer,
  review: reviewReducer,
  company: companyReducer
});

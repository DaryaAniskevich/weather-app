import { setCityType } from "./setCityActions";

const initialState = {
  city: "Минск",
};

const setCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case setCityType: {
      return {
        ...state,
        city: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default setCityReducer;

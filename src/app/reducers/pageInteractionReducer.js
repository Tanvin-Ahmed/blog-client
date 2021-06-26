import { CLICK_TO_OPEN_SIDEBAR } from "../type";

const initialState = {
  isSideBarOpen: false,
};

const pageInteractionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_TO_OPEN_SIDEBAR:
      return {
        ...state,
        isSideBarOpen: action.payload,
      };

    default:
      return state;
  }
};

export default pageInteractionReducer;

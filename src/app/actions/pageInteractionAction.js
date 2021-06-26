import { CLICK_TO_OPEN_SIDEBAR } from "../type";

export const getSideBarToggle = (toggle) => {
  return {
    type: CLICK_TO_OPEN_SIDEBAR,
    payload: toggle,
  };
};

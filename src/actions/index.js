import API from "../utils/API";

import * as T from "./constants";
import BannersList from "../reducers/banners";

export const DisplayNotification = (message) => {
  return {
    type: T.DISPLAY_NOTIFICATION,
    payload: message,
  };
};

const BannerList = (bannerList) => {
  return {
    type: T.BANNER_LIST,
    payload: bannerList,
  };
};

const UserDetails = (user) => {
  return {
    type: T.USER_DETAILS,
    payload: user,
  };
};

export const FetchBannerList = () => async (dispatch) => {
  const response = await API.get("banners");
  switch (response.status) {
    case 200: {
      dispatch(BannerList(response.data.data));
      //   dispatch(
      //     DisplayNotification({
      //       message: response.data.message,
      //       status: response.status,
      //     })
      //   );
      return;
    }
    default:
      return dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
  }
};

export const UpdatePriority = (id, priority) => async (dispatch) => {
  console.log("HEHR");
  const response = await API.patch(`banners/update_priority_banner/${id}`, {
    priority,
  });
  console.log(response.data.message);
  switch (response.status) {
    case 200: {
      // dispatch(BannerList(response.data.data));
      dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
      return;
    }
    default:
      return dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
  }
};

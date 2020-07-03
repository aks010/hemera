import API from "../utils/API";

import * as T from "./constants";
import BannersList from "../reducers/bannerList";

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

const CategoryList = (categoryList) => {
  return {
    type: T.CATEGORY_LIST,
    payload: categoryList,
  };
};

const ModelList = (modelList) => {
  return {
    type: T.MODEL_LIST,
    payload: modelList,
  };
};

const UserDetails = (user) => {
  return {
    type: T.USER_DETAILS,
    payload: user,
  };
};

export const SelectBanner = (select) => {
  return {
    type: T.SELECT_BANNER,
    payload: select,
  };
};
export const SelectCategory = (select) => {
  return {
    type: T.SELECT_CATEGORY,
    payload: select,
  };
};
export const SelectType = (select) => {
  return {
    type: T.SELECT_TYPE,
    payload: select,
  };
};
export const SelectModel = (select) => {
  return {
    type: T.SELECT_MODEL,
    payload: select,
  };
};

/// BANNER APIs

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

export const UpdateBannerPriority = (id, priority) => async (dispatch) => {
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

/// CATEGORY APIs

export const FetchCategoryList = (BID) => async (dispatch) => {
  const response = await API.get(`category/list/${BID}`);
  switch (response.status) {
    case 200: {
      dispatch(CategoryList(response.data.data));
      //   dispatch(
      //     DisplayNotification({
      //       message: response.data.message,
      //       status: response.status,s
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

export const UpdateCategoryPriority = (BID, CID, priority) => async (
  dispatch
) => {
  console.log("HEHR");
  const response = await API.patch(
    `category/update_category_priority/${BID}/${CID}`,
    {
      priority,
    }
  );
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

/// MODEL APIs
export const FetchItemList = (EID, model) => async (dispatch) => {
  const response = await API.get(`${model}/list/${EID}`);
  switch (response.status) {
    case 200: {
      dispatch(ModelList(response.data.data));
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

export const UpdateModelPriority = (
  EID,
  id,
  priority,
  model,
  type = ""
) => async (dispatch) => {
  console.log("HEHR");
  const response = await API.patch(
    `${model}/update_model_priority/${EID}/${id}/${type}`,
    {
      priority,
    }
  );
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

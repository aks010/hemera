import API from "../utils/API";

import * as T from "./constants";

import { getToken, authenticateUser, deauthenticateUser } from "../utils/Auth";

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

const ModelTypes = (modelTypes) => {
  console.log("IN ASCTION");
  console.log(T.MODEL_TYPES);
  console.log(modelTypes);
  return {
    type: T.MODEL_TYPES,
    payload: modelTypes,
  };
};

const UserDetails = (user) => {
  return {
    type: T.USER_DETAILS,
    payload: user,
  };
};

const Specification = (specs) => {
  return {
    type: T.SPECIFICATIONS,
    payload: specs,
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

/// USER

export const FetchUserDetails = () => async (dispatch) => {
  const token = getToken();
  console.log("FETCHING DETAILS");
  console.log(token);
  const response = await API.get(`users/me`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  switch (response.status) {
    case 200: {
      dispatch(UserDetails(response.data));
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

export const LoginUser = (data) => async (dispatch) => {
  const response = await API.post(`users/login`, data);
  switch (response.status) {
    case 200: {
      console.log(response.data);
      dispatch(UserDetails(response.data.user));
      authenticateUser(response.data.token);
      dispatch(
        DisplayNotification({
          message: `Welcome ${response.data.user.name}!`,
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

export const LogoutUser = () => async (dispatch) => {
  const token = getToken();
  const response = await API.get(`users/logout`, {
    headers: {
      Authorization: token,
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(UserDetails({}));
      deauthenticateUser();
      dispatch(
        DisplayNotification({
          message: "Successfully Logged Out!",
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
/// BANNER APIs

export const GetBannerDetails = (id) => async (dispatch) => {
  const response = await API.get(`banners/read/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(SelectBanner(response.data.data));
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

export const FetchBannerList = () => async (dispatch) => {
  const response = await API.get("banners", {
    headers: {
      Authorization: getToken(),
    },
  });
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

export const FetchModelTypes = () => async (dispatch) => {
  const response = await API.get("/banners/models", {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      // dispatch(BannerList(response.data.data));
      dispatch(ModelTypes(response.data.data));
      // console.log("COOLSLSLLS");
      // console.log(response.data);
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

export const CreateBanner = (data) => async (dispatch) => {
  console.log("HEHR");
  const response = await API.post(`banners/create`, data, {
    headers: {
      Authorization: getToken(),
    },
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
      await FetchBannerList()(dispatch);
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

export const UpdateBanner = (id, data) => async (dispatch) => {
  const response = await API.patch(`banners/update/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
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
      await FetchBannerList()(dispatch);
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
  const response = await API.patch(
    `banners/update_priority_banner/${id}`,
    {
      priority,
    },
    {
      headers: {
        Authorization: getToken(),
      },
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

export const RemoveBanner = (id) => async (dispatch) => {
  const response = await API.delete(`banners/remove/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  console.log(response.status);
  switch (response.status) {
    case 200: {
      // dispatch(BannerList(response.data.data));
      dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
      await FetchBannerList()(dispatch);
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

export const GetCategoryDetails = (id) => async (dispatch) => {
  const response = await API.get(`category/read/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(SelectCategory(response.data.data));
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

export const FetchCategoryList = (BID) => async (dispatch) => {
  const response = await API.get(`category/list/${BID}`, {
    headers: {
      Authorization: getToken(),
    },
  });
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

export const CreateCategory = (EID, data) => async (dispatch) => {
  console.log("HEHR");
  const response = await API.post(`category/create/${EID}`, data, {
    headers: {
      Authorization: getToken(),
    },
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
      await FetchCategoryList(EID)(dispatch);
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

export const UpdateCategory = (id, EID, data) => async (dispatch) => {
  const response = await API.patch(`category/update/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
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
      await FetchCategoryList(EID)(dispatch);
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
    `category/update_category_priority/${BID}/${CID},  {
    headers: {
      Authorization: getToken(),
    },
  }`,
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

export const RemoveCategory = (id, BID) => async (dispatch) => {
  const response = await API.delete(`category/remove/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  console.log(response.status);
  switch (response.status) {
    case 200: {
      // dispatch(BannerList(response.data.data));
      dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
      await FetchCategoryList(BID)(dispatch);
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

export const FetchSelectedItem = (id, EID, model) => async (dispatch) => {
  const response = await API.get(`${model}/item/${EID}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(SelectModel(response.data.data));
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

export const FetchItemList = (EID, model) => async (dispatch) => {
  const response = await API.get(`${model}/list/${EID}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  console.log("FETCHING ITEMS");
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

export const AddModel = (EID, model, data) => async (dispatch) => {
  console.log("HEHR");
  console.log(EID);
  const response = await API.post(
    `${model}/create/${EID}/${data.type ? data.type : ""},  {
    headers: {
      Authorization: getToken(),
    },
  }`,
    data
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
      await FetchItemList(EID, model)(dispatch);
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

export const UpdateModel = (id, EID, model, data) => async (dispatch) => {
  console.log("HEHR");
  console.log(EID);
  const response = await API.patch(`${model}/update/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
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
      await FetchItemList(EID, model)(dispatch);
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
    `${model}/update_model_priority/${EID}/${id}/${type},  {
    headers: {
      Authorization: getToken(),
    },
  }`,
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

export const RemoveModelItem = (id, model, EID) => async (dispatch) => {
  const response = await API.delete(`${model}/remove/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  console.log(response.status);
  switch (response.status) {
    case 200: {
      // dispatch(BannerList(response.data.data));
      dispatch(
        DisplayNotification({
          message: response.data.message,
          status: response.status,
        })
      );
      await FetchItemList(EID, model)(dispatch);
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

// SPECIFICATIONS

export const FetchModelSpecs = (EID, model) => async (dispatch) => {
  const response = await API.get(`specs/list/${EID}/${model}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(Specification(response.data.data));
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

export const ViewModelSpecs = (model) => async (dispatch) => {
  const response = await API.get(`specs/${model}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  switch (response.status) {
    case 200: {
      dispatch(Specification(response.data.data));
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

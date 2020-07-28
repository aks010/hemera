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
  try {
    const response = await API.get(`users/me`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch(UserDetails(response.data));
  } catch (e) {
    dispatch(
      DisplayNotification({
        message: "Something Went Wrong",
        status: 500,
      })
    );
  }
};

export const LoginUser = (data) => async (dispatch) => {
  console.log("Clicked");
  try {
    const response = await API.post(`users/login`, data);
    switch (response.status) {
      case 200: {
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
      case 400: {
        dispatch(
          DisplayNotification({
            message: "Incorrect Email or Password",
            status: 400,
          })
        );
        return;
      }
    }
  } catch (e) {
    console.log(e);
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const LogoutUser = () => async (dispatch) => {
  const token = getToken();
  console.log(token);
  try {
    const response = await API.get(`users/logout`, {
      headers: {
        Authorization: token,
      },
    });
    switch (response.status) {
      case 200 || 403: {
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
    }
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

/// BANNER APIs

export const GetBannerDetails = (id) => async (dispatch) => {
  try {
    const response = await API.get(`banners/read/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(SelectBanner(response.data.data));
        return;
      }
      default: {
        return dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
      }
    }
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const FetchBannerList = () => async (dispatch) => {
  try {
    const response = await API.get("banners", {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(BannerList(response.data.data));
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const FetchModelTypes = () => async (dispatch) => {
  try {
    const response = await API.get("/banners/models", {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(ModelTypes(response.data.data));
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const CreateBanner = (data) => async (dispatch) => {
  let success = false;
  try {
    const response = await API.post(`banners/create`, data, {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        await FetchBannerList()(dispatch);
        success = true;
        break;
      }
      default: {
        success = false;
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        break;
      }
    }
    return success;
  } catch (e) {
    dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
  }
};

export const UpdateBanner = (id, data) => async (dispatch) => {
  let success = false;
  try {
    const response = await API.patch(`banners/update/${id}`, data, {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        success = true;
        await FetchBannerList()(dispatch);
        break;
      }
      default:
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        success = false;
    }
    return success;
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
  }
};

export const UpdateBannerPriority = (id, priority) => async (dispatch) => {
  try {
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
    dispatch(
      DisplayNotification({
        message: response.data.message,
        status: response.status,
      })
    );
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const RemoveBanner = (id) => async (dispatch) => {
  try {
    const response = await API.delete(`banners/remove/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

/// CATEGORY APIs

export const GetCategoryDetails = (id) => async (dispatch) => {
  try {
    const response = await API.get(`category/read/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    switch (response.status) {
      case 200: {
        dispatch(SelectCategory(response.data.data));
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

export const FetchCategoryList = (BID) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const CreateCategory = (EID, data) => async (dispatch) => {
  console.log("HEHR");
  let success = false;
  try {
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
        success = true;
        await FetchCategoryList(EID)(dispatch);
        break;
      }
      default: {
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        success = false;
        break;
      }
    }
    return success;
  } catch (e) {
    dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
  }
};
export const UpdateCategory = (id, EID, data) => async (dispatch) => {
  let success = false;
  try {
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
        success = true;
        await FetchCategoryList(EID)(dispatch);
        break;
      }
      default: {
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        break;
      }
    }
    return success;
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
  }
};
export const UpdateCategoryPriority = (BID, CID, priority) => async (
  dispatch
) => {
  console.log("HEHR");

  try {
    const response = await API.patch(
      `category/update_category_priority/${BID}/${CID}`,
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const RemoveCategory = (id, BID) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
/// MODEL APIs
export const FetchSelectedItem = (id, EID, model) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const FetchItemList = (EID, model) => async (dispatch) => {
  try {
    const response = await API.get(`${model}/list/${EID}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    console.log("FETCHING ITEMS");
    switch (response.status) {
      case 200: {
        dispatch(ModelList(response.data.data));
        // dispatch(
        //   DisplayNotification({
        //     message: response.data.message,
        //     status: response.status,
        //   })
        // );
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const AddModel = (EID, model, data) => async (dispatch) => {
  console.log("HEHR");
  console.log(EID);
  let success = false;
  try {
    const response = await API.post(
      `${model}/create/${EID}/${data.type ? data.type : ""}`,
      data,
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
        success = true;
        await FetchItemList(EID, model)(dispatch);
        break;
      }
      default: {
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        success = false;
        break;
      }
    }
    return success;
  } catch (e) {
    dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
  }
};
export const UpdateModel = (id, EID, model, data) => async (dispatch) => {
  let success = false;
  try {
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
        success = true;
        await FetchItemList(EID, model)(dispatch);
        break;
      }
      default:
        dispatch(
          DisplayNotification({
            message: response.data.message,
            status: response.status,
          })
        );
        success = false;
        break;
    }
    return success;
  } catch (e) {
    dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
    return false;
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

  try {
    const response = await API.patch(
      `${model}/update_model_priority/${EID}/${id}/${type}`,
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const RemoveModelItem = (id, model, EID) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
// SPECIFICATIONS
export const FetchModelSpecs = (EID, model) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};
export const ViewModelSpecs = (model) => async (dispatch) => {
  try {
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
  } catch (e) {
    return dispatch(
      DisplayNotification({
        message: "Something went wrong",
        status: 500,
      })
    );
  }
};

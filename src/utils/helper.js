/* eslint no-useless-escape:0 */

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const isEmpty = (obj) => obj === "" || obj === null || obj === 0;

export const isLengthBetween = (obj, range) =>
  obj.length >= range.min && obj.length <= range.max;

export const isEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export const isAllowedPassword = (password) =>
  password !== null && password.toString().length >= 8;

export const isMobilePhone = (phone) =>
  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[2-9]\d{9}$/.test(phone);

export const isURL = (url) =>
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
    url
  );

export const isPincode = (pincode) => /\d[0-9]{5}/.test(pincode);

export const isUserOnMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

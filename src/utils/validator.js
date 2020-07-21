import * as VALIDATORS from "./helper";

export const ModelCreateFormValidator = (specs, data) => {
  const errors = {};
  specs.forEach((spec) => {
    if (!data[spec] || data[spec] == "") {
      errors[spec] = `This field is required.`;
    } else if (spec == "link" || spec == "imgLink") {
      if (!VALIDATORS.isURL(data[spec])) errors[spec] = "Enter a valid URL";
    }
  });
  return errors;
};

export const BannerCreateFormValidator = (specs, data) => {
  const errors = {};
  specs.forEach((spec) => {
    if (!data[spec] || data[spec] == "") {
      errors[spec] = `This field is required.`;
    } else if (spec == "link" || spec == "imgLink") {
      if (!VALIDATORS.isURL(data[spec])) errors[spec] = "Enter a valid URL";
    }
  });
  return errors;
};

export const CategoryCreateFormValidator = (specs, data) => {
  const errors = {};
  specs.forEach((spec) => {
    if (!data[spec] || data[spec] == "") {
      errors[spec] = `This field is required.`;
    } else if (spec == "link" || spec == "imgLink") {
      if (!VALIDATORS.isURL(data[spec])) errors[spec] = "Enter a valid URL";
    }
  });
  return errors;
};

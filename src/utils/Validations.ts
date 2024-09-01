export const validateMobile = (mobile: string): boolean => {
  const regex = /^[0-9][0-9]{9}$/;
  return regex.test(mobile);
};

export const validateEmail = (email: string) => {
  const regex =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
  return regex.test(email);
};

export const validateName = (name: string) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name);
};

export const validateNumber = (name: string) => {
  const regex = /^\d+$/;
  return regex.test(name);
};

export const greaterThanZero = (value: any) => {
  const regex = /^0*?[1-9]\d*$/;
  return regex.test(value);
};

export const validateGstNumber = (value: string) => {
  const regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  return regex.test(value);
};

export const validatePanNumber = (value: string) => {
  const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  return regex.test(value);
};

export const validateCinNumber = (value: any) => {
  const regex =
    /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
  return regex.test(value);
};

export const validateAlphaNumeric = (value: any) => {
  const regex = /^[0-9a-zA-Z]+$/;
  return regex.test(value);
};

export const capitalizeFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};

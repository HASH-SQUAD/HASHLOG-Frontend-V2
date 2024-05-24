import { DefaultInstance } from "./Axios";

export const AuthSignIn = async (param) => {
  const { data } = await DefaultInstance.post(`/auth/signin`, param);
  return data;
};

export const AuthSignUp = async (param) => {
  const { data } = await DefaultInstance.post(`/auth/signup`, param);
  return data;
};
const isProduction = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);
export const API_URL = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL;

export const API_TOKEN = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_TOKEN
  : process.env.REACT_APP_DEV_API_TOKEN;

export const AUTH_HEADER = {
  Authorization: `Bearer ${API_TOKEN}`,
};

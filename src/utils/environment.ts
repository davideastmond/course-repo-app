const isProduction = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);
export const API_URL = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL;

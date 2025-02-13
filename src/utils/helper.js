import { setCookie, getCookie, deleteCookie } from "cookies-next";

// Function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^(01[3-9]\d{8}|8801[3-9]\d{8})$/;
  return regex.test(phoneNumber);
};

// Function to parse the expiresIn value (e.g., "7d" to milliseconds)
const parseExpiresIn = (expiresIn) => {
  if (!expiresIn) return 0;

  const unit = expiresIn.slice(-1); // Get the last character (e.g., "d" for days)
  const value = parseInt(expiresIn.slice(0, -1), 10); // Get the numeric value (e.g., 7)

  switch (unit) {
    case "d": // Days
      return value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    case "h": // Hours
      return value * 60 * 60 * 1000; // Convert hours to milliseconds
    case "m": // Minutes
      return value * 60 * 1000; // Convert minutes to milliseconds
    case "s": // Seconds
      return value * 1000; // Convert seconds to milliseconds
    default:
      return 0; // Invalid unit
  }
};

// Function to set access token in cookies with expiration timestamp
export const setAccessToken = (token, refreshToken, expiresIn, req, res) => {
  const currentTime = Date.now();

  // Set the cookies for access token, refresh token, expiration time, and token set time
  setCookie("accessToken", token, {
    req,
    res,
    maxAge: 7 * 24 * 60 * 60, // Expires in 7 days (in seconds)
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax", // Use "lax" for better compatibility
  });
  setCookie("refreshToken", refreshToken, {
    req,
    res,
    maxAge: 7 * 24 * 60 * 60, // Expires in 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  setCookie("expiresIn", expiresIn, {
    req,
    res,
    maxAge: 7 * 24 * 60 * 60, // Expires in 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  setCookie("tokenSetTime", currentTime, {
    req,
    res,
    maxAge: 7 * 24 * 60 * 60, // Expires in 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

// Function to get the access token from cookies and check if it's expired
export const getAccessToken = (req, res) => {
  const token = getCookie("accessToken", { req, res });
  const tokenSetTime = getCookie("tokenSetTime", { req, res });
  const expiresIn = getCookie("expiresIn", { req, res }); // e.g., "7d"

  if (token && tokenSetTime && expiresIn) {
    const tokenAge = Date.now() - parseInt(tokenSetTime, 10); // Time since token was set
    const tokenExpirationTime = parseExpiresIn(expiresIn); // Convert expiresIn to milliseconds

    // Check if the token is expired
    if (tokenAge > tokenExpirationTime) {
      removeAccessToken(req, res); // Remove token if it's expired
      return null; // Token is expired
    }

    return token; // Token is still valid
  }

  return null; // No token found
};

// Function to remove access token and related data from cookies
export const removeAccessToken = (req, res) => {
  deleteCookie("accessToken", { req, res, path: "/" });
  deleteCookie("tokenSetTime", { req, res, path: "/" });
  deleteCookie("refreshToken", { req, res, path: "/" });
  deleteCookie("expiresIn", { req, res, path: "/" });
  deleteCookie("categoryId", { req, res, path: "/" });
  deleteCookie("quizId", { req, res, path: "/" });
  deleteCookie("userData", { req, res, path: "/" });
  console.log("Access token removed from cookies after expiration.");
};
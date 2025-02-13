import { BASE_URL } from "@/config/constants/apiConstants";
import axios from "axios";
import { getCookie } from "cookies-next";

const apihelper = {
  get: async (endpoint) => {
    try {
      const accessToken = getCookie("accessToken");

      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        headers: {
          "Content-Type" : "application/json",
          "x-access-token": accessToken,
        },
        withCredentials: false,
      });

      return response.data;
    } catch (error) {
      console.log("🚀 ~ get: ~ error:", error)
      return handleError(error, endpoint);
    }
  },

  post: async (endpoint, data) => {
    try {
      const accessToken = getCookie("accessToken");

      const response = await axios.post(
        `${BASE_URL}/${endpoint}`,
        { ...data },
        {
          headers: {
            "Content-Type" : "application/json",
            "x-access-token": accessToken,
          },
          withCredentials: false,
        }
      );

      return response.data;
    } catch (error) {
      console.log("🚀 ~ post: ~ error:", error)
      return handleError(error, endpoint);
    }
  },

  put: async (endpoint, data) => {
    try {
      const accessToken = getCookie("accessToken");

      const response = await axios.put(
        `${BASE_URL}/${endpoint}`,
        { ...data },
        {
          headers: {
            "Content-Type" : "application/json",
            "x-access-token": accessToken,
          },
          withCredentials: false,
        }
      );

      return response.data;
    } catch (error) {
      console.log("🚀 ~ put: ~ error:", error)
      return handleError(error, endpoint);
    }
  },
};

const handleError = (error, endpoint) => {
  if (error.response) {
    // console.error(`Error response from ${endpoint}:`, error.response.data);
    return {
      error: {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      },
    };
  } else if (error.request) {
    // console.error(`No response received from ${endpoint}:`, error.request);
    return {
      error: {
        message: "No response received from the server",
      },
    };
  } else {
    // console.error(`Error setting up request to ${endpoint}:`, error.message);
    return {
      error: {
        message: error.message,
      },
    };
  }
};

export default apihelper;

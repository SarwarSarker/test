import { BASE_URL } from "@/config/constants/apiConstants";
import axios from "axios";

const apiHelperWithoutToken = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);

      return response.data;
    } catch (error) {
      // console.error(`Error fetching data from ${endpoint}:`, error);
      return { error: error.message };
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, {
        ...data,
      });

      return response.data;
    } catch (error) {
      // console.error(`Error fetching data from ${endpoint}:`, error);
      return { error: error.message };
    }
  },
};

export default apiHelperWithoutToken;

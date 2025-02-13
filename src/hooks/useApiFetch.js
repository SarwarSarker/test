"use client";

import apihelper from "@/utils/apiHelper";
import { getAccessToken } from "@/utils/helper";
import { useEffect, useState } from "react";

const useApiFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const token = getAccessToken(); 
        
        const response = await apihelper.get(url, {
          headers: {
            "x-access-token": token,
          },
        });

        if (response.success && response.statusCode === 200) {
          setData(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useApiFetch;

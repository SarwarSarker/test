"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./loader/loader";
import { getAccessToken } from "@/utils/helper";

const PrivateRoute = (WrappedComponent) => {
  return function ProtectedPage(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = getAccessToken();

      if (!token) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <Loader size="12" color="text-red-500" border="border-4" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default PrivateRoute;

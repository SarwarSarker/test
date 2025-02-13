import Link from "next/link";
import React from "react";
import CategoryCard from "./categoryCard";
import { GET_ALL_CATEGORY } from "@/config/constants/apiConstants";
import apiHelperWithoutToken from "@/utils/apiHelperWithoutToken";

const CategoryList = async() => {
  const categories = [];
  const errorMessage = "";

  try {
    const response = await apiHelperWithoutToken.get(GET_ALL_CATEGORY);

    if (response.success && response.statusCode === 200) {
      categories = response.data;
    } else {
      errorMessage = response.message;
    }
  } catch (err) {
    errorMessage = "Error fetching categories.";
  }

  return (
    <>
      <div className="bg-[#FFFFFF05] py-6 px-4">
        <div className="flex justify-between items-center pb-3">
          <p className="font-passionOne text-2xl font-bold text-white">
            Categories
          </p>
          <Link
            href="/categories"
            className="text-base font-normal text-[#FFC003] underline"
            prefetch={false}
          >
            See all
          </Link>
        </div>
        <CategoryCard  categories={categories} errorMessage={errorMessage} />
      </div>
    </>
  );
};

export default CategoryList;

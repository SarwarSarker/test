import CategoryCard from "@/components/category/categoryCard";
import NavMenu from "@/components/menu/navMenu";
import { GET_ALL_CATEGORY } from "@/config/constants/apiConstants";
import apiHelperWithoutToken from "@/utils/apiHelperWithoutToken";

// Metadata for the page (static data, doesn't change on every request)
export const metadata = {
  title: "Categories | Premium Online Quizzes & Trivia Challenges",
  description:
    "Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!",
};

export default async function CategoriesPage() {
  const categories = null;
  const errorMessage = null;

  try {
    const response = await apiHelperWithoutToken.get(GET_ALL_CATEGORY);

    if (response.success && response.statusCode === 200) {
      categories = response.data;
    } else {
      errorMessage = response.message;
    }
  } catch (err) {
    console.log("🚀 ~ CategoriesPage ~ err:", err);
    errorMessage = "Error fetching categories.";
  }

  return (
    <div>
      <NavMenu name="Categories" />
      {categories ? (
        <CategoryCard categories={categories} errorMessage={errorMessage} />
      ) : (
        <p className="col-span-2 text-center text-lg text-gray-500">
          {errorMessage || "No categories found."}
        </p>
      )}
    </div>
  );
}

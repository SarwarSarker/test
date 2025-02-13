import { GET_ALL_CATEGORY } from "@/config/constants/apiConstants";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const categoryId = cookieStore.get("categoryId")?.value;

  if (!categoryId) {
    return {
      title: "Category | Quizmuiz",
    };
  }

  try {
    const response = await apiHelperWithoutToken.get(
      `${GET_ALL_CATEGORY}/${categoryId}`
    );

    // If data is successfully fetched
    if (response.success && response.statusCode === 200) {
      const categoryName = response.data.name || "Category";

      return {
        title: `${categoryName} | Quizmuiz`,
        description: `${categoryName}`,
      };
    } else {
      return {
        title: "Category",
      };
    }
  } catch (error) {
    return {
      title: "Error Loading Category",
    };
  }
}

// SubCategoryId Component
import NavMenu from "@/components/menu/navMenu";
import SubCategoryCard from "@/components/category/subCategoryCard";
import apiHelperWithoutToken from "@/utils/apiHelperWithoutToken";
import { cookies } from "next/headers";

const SubCategoryId = async ({ params }) => {
  const { slug } = await params;
  const cookieStore = await cookies();
  const categoryId = cookieStore.get("categoryId")?.value;

  const categoryName = slug.replace(/-/g, " ");

  let subcategories = null;
  let errorMessage = null;

  try {
    // Fetch subcategories
    const subcategoryResponse = await apiHelperWithoutToken.get(
      `${GET_ALL_CATEGORY}/${categoryId}/subcategories`
    );

    if (subcategoryResponse.success && subcategoryResponse.statusCode === 200) {
      subcategories = subcategoryResponse.data;
    } else {
      errorMessage = subcategoryResponse.message;
    }
  } catch (err) {
    console.log("🚀 ~ SubCategoryId ~ err:", err)
    errorMessage = "Error fetching category or subcategories.";
  }

  return (
    <div>
      <NavMenu name={categoryName || " Sub-Categories"} />
      {subcategories? (<SubCategoryCard
        subcategories={subcategories}
        errorMessage={errorMessage}
      />) : (
        <p className="col-span-2 text-center text-lg text-gray-500">
          {errorMessage || "No Subcategories found."}
        </p>
      )}
      
    </div>
  );
};

export default SubCategoryId;

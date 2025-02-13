import NavMenu from "@/components/menu/navMenu";
import SubscriptionPackageCard from "@/components/subscription/subscriptionPackageCard";
import {GET_ALL_PACKAGE } from "@/config/constants/apiConstants";

export const metadata = {
  title: "Subcription Package | Premium Online Quizzes & Trivia Challenges",
  description:
    "Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!",
};

export default async function Subscription() {
  let packages = [];
  let error = "";

  try {
    const response = await apihelper.get(GET_ALL_PACKAGE);

    if (response.success && response.statusCode === 200) {
      packages = response.data;
    } else {
      error = response.message;
    }
  } catch (err) {
    console.log("🚀 ~ Subscription ~ err:", err)
    error = "Error fetching packages.";
  }

  return (
    <div>
      <NavMenu name="Subscription Package" />
      {packages ? (
        <SubscriptionPackageCard packages={packages} error={error} />
      ) : (
        <p className="col-span-2 text-center text-lg text-gray-500">
        {errorMessage || "No packages found."}
      </p>
      )}
    </div>
  );
}

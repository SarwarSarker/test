import NavMenu from "@/components/menu/navMenu";
import SubscriptionStatusCard from "@/components/subscription/subscriptionStatusCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Subcription Status | Premium Online Quizzes & Trivia Challenges",
  description:
    "Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!",
};

const SubscriptionStatus = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userData = cookieStore.get("userData")?.value;

  const subscription = userData?.subscription || {};
  const status = subscription?.validTill;

  if (!accessToken) {
    redirect("/signin");
    return;
  }

  const today = new Date();

  if (new Date(status) < today) {
    redirect("/subscription-package");
    return;
  }

  return (
    <div>
      <NavMenu name="Subscription Status" />

      <SubscriptionStatusCard />
    </div>
  );
};

export default SubscriptionStatus;

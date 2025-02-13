import NavMenu from "@/components/menu/navMenu";
import ProfileDetails from "@/components/profile/profileDetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'My Account | Premium Online Quizzes & Trivia Challenges',
  description: 'Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!',
}

const MyAccount = async () => {
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
    <div className="p-4">
      <NavMenu name="My Account" />

      <ProfileDetails />
    </div>
  );
};

export default MyAccount;

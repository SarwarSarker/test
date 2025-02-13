import QuizOverview from "@/components/quiz/quizOverview";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Quiz Overview | Premium Online Quizzes & Trivia Challenges',
  description: 'Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!',
}

const QuizOverviewpage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/signin");
  }

  return <QuizOverview />;
};

export default QuizOverviewpage;

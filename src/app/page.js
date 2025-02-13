import Header from "@/components/header";
import Banner from "@/components/banner";
import CategoryList from "@/components/category/categoryList";

export const metadata = {
  title: "QuizMuiz | Premium Online Quizzes & Trivia Challenges",
  description:
    "Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!",
};

export default function Home() {
  return (
    <div className="">
      <div className="relative">
        <Header />
        <main className="">
          {/* banner section */}
          <Banner />
          {/* categories section */}
          <CategoryList />
          {/* subscriptionPackage section */}
        </main>
      </div>
    </div>
  );
}

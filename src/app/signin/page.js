import NavMenu from "@/components/menu/navMenu";
import Signinform from "@/components/signin/signinform";

export const metadata = {
  title: 'Signin | Premium Online Quizzes & Trivia Challenges',
  description: 'Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!',
}

const Registration = () => {

  return (
    <>
      <NavMenu />
      <Signinform />
    </>
  );
};

export default Registration;

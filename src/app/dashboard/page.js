import Banner from '@/components/banner'
import CategoryList from '@/components/category/categoryList'
import Header from '@/components/header'
import React from 'react'

export const metadata = {
  title: 'QuizMuiz | Premium Online Quizzes & Trivia Challenges',
  description: 'Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!',
}

const Dashboard = () => {
  return (
    <div>
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
  )
}

export default Dashboard
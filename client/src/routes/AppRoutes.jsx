import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryDetailsPage from "../pages/CategoryDetailsPage";
import QuizSetupPage from "../pages/QuizSetupPage";
import QuizPlayPage from "../pages/QuizPlayPage";
import QuizResultPage from "../pages/QuizResultPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutPage from "../pages/AboutPage";
import TermsPage from "../pages/TermsPage";
import PrivacyPage from "../pages/PrivacyPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category/:slug" element={<CategoryDetailsPage />} />
      <Route path="/quiz/setup" element={<QuizSetupPage />} />
      <Route path="/quiz/play" element={<QuizPlayPage />} />
      <Route path="/quiz/result" element={<QuizResultPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
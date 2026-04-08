import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/home/HeroSection";
import FeaturedCategories from "../components/home/FeaturedCategories";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedCategories />
    </MainLayout>
  );
}
import MainLayout from "../components/layout/MainLayout";
import { dummyCategories } from "../data/dummyCategories";
import CategoryCard from "../components/category/CategoryCard";

export default function CategoriesPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-14 md:pt-36 md:pb-18">
        <div className="container-app">
          <h1 className="section-title">All Quiz Categories</h1>
          <p className="section-subtitle">
            Explore categories and start a fun learning journey with Quizivo.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dummyCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
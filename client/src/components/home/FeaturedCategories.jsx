import { dummyCategories } from "../../data/dummyCategories";
import CategoryCard from "../category/CategoryCard";

export default function FeaturedCategories() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-app">
        <h2 className="section-title">Choose your favorite category</h2>
        <p className="section-subtitle">
          Quizivo offers colorful and engaging categories for every learner.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dummyCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
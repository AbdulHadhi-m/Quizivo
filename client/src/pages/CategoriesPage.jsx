import MainLayout from "../components/layout/MainLayout";
import CategoryCard from "../components/category/CategoryCard";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Loader from "../components/common/Loader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await axios.get("/categories");
        if (!mounted) return;
        setCategories(data);
      } catch (e) {
        console.error("Failed to load categories", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <section className="pt-32 pb-14 md:pt-36 md:pb-18 bg-[#fffaf3]">
        <div className="container-app">
          <h1 className="section-title">All Quiz Categories</h1>
          <p className="section-subtitle">
            Explore categories and start a fun learning journey with Quizivo.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <Loader />
            ) : (
              categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
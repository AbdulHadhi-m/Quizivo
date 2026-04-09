import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CategoryCard from "../category/CategoryCard";
import Loader from "../common/Loader";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await axios.get("/categories");
        if (!mounted) return;
        setCategories(data.slice(0, 6));
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
    <section className="py-10 md:py-16 ">
      <div className="container-app " >
        <h2 className="section-title">Choose your favorite category</h2>
        <p className="section-subtitle">
          Quizivo offers colorful and engaging categories for every learner.
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
  );
}
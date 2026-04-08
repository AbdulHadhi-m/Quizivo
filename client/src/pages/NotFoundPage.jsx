import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="container-app text-center">
          <div className="text-8xl">😵</div>
          <h1 className="mt-6 text-5xl font-black text-slate-900">404</h1>
          <p className="mt-3 text-lg text-slate-600">
            Oops! This Quizivo page does not exist.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            Go Home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
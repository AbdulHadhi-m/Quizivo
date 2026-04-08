import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/layout/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#111827",
            color: "#fff",
          },
        }}
      />
    </ErrorBoundary>
  );
}
import { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Providers from "@/app/context/Providers";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import AuthLayout from "@/app/components/Layouts/AuthLayout";
import AuthorizedLayout from "@/app/components/Layouts/AuthorizedLayout";
import SimplePreloader from "@/app/components/SimplePreloader";
import FatalError from "@/app/components/FatalError";
import ScrollToTop from "./ScrollToTop";

const LandingPage = lazy(() => import("@/app/pages/LandingPage"));
const LoginPage = lazy(() => import("@/app/pages/LoginPage"));
const HomePage = lazy(() => import("@/app/pages/HomePage"));
const SearchPage = lazy(() => import("@/app/pages/SearchPage"));
const DetailsPage = lazy(() => import("@/app/pages/DetailsPage"));
const WatchPage = lazy(() => import("@/app/pages/WatchPage"));
const PageNotFound = lazy(() => import("@/app/pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary fallback={<FatalError />}>
      <Suspense fallback={<SimplePreloader />}>
        <Providers>
          <Router>
            <ScrollToTop />
            <Suspense fallback={<SimplePreloader />}>
              <Routes>
                <Route index element={<LandingPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route element={<AuthorizedLayout />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="movie">
                      <Route path="details/:id" element={<DetailsPage />} />
                    </Route>
                  </Route>
                  <Route path="movie/watch/:id" element={<WatchPage />} />
                </Route>

                <Route element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </Providers>
      </Suspense>
    </ErrorBoundary>
  );
}

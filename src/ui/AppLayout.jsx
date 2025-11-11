import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./FooterComponent";
import LoadingSpinner from "./LoadingSpinner";

export default function AppLayout() {
  const navigation = useNavigation();
  const isBusy =
    navigation.state === "loading" || navigation.state === "submitting";

  return (
    <div className="relative">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {isBusy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          aria-live="polite"
          aria-busy="true"
        >
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

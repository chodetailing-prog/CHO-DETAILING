/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import PaymentPolicy from "./pages/PaymentPolicy";
import GeneralTerms from "./pages/GeneralTerms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import PortfolioDetail from "./pages/PortfolioDetail";
import { seedPortfolioItems } from "./lib/store";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  useEffect(() => {
    seedPortfolioItems();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="payment-policy" element={<PaymentPolicy />} />
            <Route path="general-terms" element={<GeneralTerms />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:id" element={<PortfolioDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

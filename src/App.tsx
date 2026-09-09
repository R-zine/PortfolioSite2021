import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Landing = lazy(() => import("./components/Landing"));
const Projects = lazy(() => import("./components/Projects"));
const Tech = lazy(() => import("./components/Tech"));
const Contact = lazy(() => import("./components/Contact"));
const Error = lazy(() => import("./components/Error"));

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || undefined}>
      <div className="App">
        <Navbar />
        <Suspense
          fallback={
            <main className="route-loading" role="status" aria-live="polite">
              Loading page…
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

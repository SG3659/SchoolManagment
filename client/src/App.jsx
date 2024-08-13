import { useState, lazy, Suspense } from "react";
// import "./App.css";
import PrivateRoute from "./components/privateRoute";

import Header from "./components/header";
const Home = lazy(() => import("./pages/home"));
const SignUp = lazy(() => import("./pages/signup"));
const LogIn = lazy(() => import("./pages/login"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const DashBoard = lazy(() => import("./pages/dashBoard"));
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Route>
          <Route>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

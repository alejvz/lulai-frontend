import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Dashboard, CreatePost } from "./pages";


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#E6EBF4]">
        <Link to="/">
          <img src={logo} alt={logo} className="w-28 object-contain" />
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="font-inter font-medium bg-[#FF31A0] text-white px-4 py-2 rounded-md"
          >
            Inicio
          </Link>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#FF31A0] text-white px-4 py-2 rounded-md"
          >
            Crear
          </Link>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#F9F9F9] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

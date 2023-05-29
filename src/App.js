import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Kasir from './pages/Kasir';
import Products from './pages/Products'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/kasir" />} replace="true" />
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
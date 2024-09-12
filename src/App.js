import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customer from "./pages/Customer";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/dictionary/:search" element={<Definition />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}
export default App;

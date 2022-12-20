
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Swap from "./pages/Swap";
import Loan from "./pages/Loan";
import Single from "./pages/Single"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route index element={<Swap />} />
          <Route path="loan" element={<Loan />} />
          <Route path="loan/:id" element={<Single />} />
          
          
       
      </Routes>
    </BrowserRouter>
  );
}


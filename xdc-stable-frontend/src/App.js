
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Swap from "./pages/Swap";
import Loan from "./pages/Loan";
import Single from "./pages/Single"
import Liquidate from "./pages/Liquidate"
import {Web3ModalProvider} from "./context/web3model";
export default function App() {
  return (
    <Web3ModalProvider>
    <BrowserRouter>
      <Routes>
       
          <Route index element={<Swap />} />
          <Route path="loan" element={<Loan />} />
          <Route path="loan/:id" element={<Single />} />
          <Route path="liquidate" element={<Liquidate />} />
          
          
       
      </Routes>
    </BrowserRouter>
    </Web3ModalProvider>
  );
}


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Learn from "./pages/Learn";
import Example from "./pages/Example";
import CustomLab from "./pages/CustomLab";
import Operations from "./pages/Operations";
import RealWorld from "./pages/RealWorld";
import Segmentation from "./pages/Segmentation";
import OperationDetails from "./pages/OperationDetails";
import OperationLab from "./pages/OperationLab";
import RealWorldDetail from "./pages/RealWorldDetail";
import Grayscale from "./pages/Grayscale";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/example" element={<Example />} />
          <Route path="/custom-lab" element={<CustomLab />} />
          <Route path="/real-world" element={<RealWorld />} />
          <Route path="/segmentation" element={<Segmentation />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/operations/:operationId" element={<OperationDetails />} />
          <Route path="/operations/:operationId/try" element={<OperationLab />} />
          <Route path="/real-world/:caseId" element={<RealWorldDetail />} />    
          <Route path="/grayscale" element={<Grayscale />} />
        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;
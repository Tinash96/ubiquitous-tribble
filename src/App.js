import { BrowserRouter as Router,Routes,Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Create from "./Pages/Create";
import Dashboard from "./Pages/Dashboard";
import Questionnaire from "./Pages/Questionnaire";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Sidebar>
       <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="questionnaire" element={<Questionnaire/>}/>
        <Route path="create" element={<Create/>}/>
       </Routes>
       </Sidebar>
     </BrowserRouter>
    </div>
  );
}

export default App;

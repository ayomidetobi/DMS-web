import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import DocumentList from "./components/DocumentList/DocumentList";
import DocumentDetail from "./components/DocumentDetails/DocumentDetails";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/document/:id" element={<DocumentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

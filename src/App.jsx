import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DocumentDetail from "./components/DocumentDetails/DocumentDetails";
import DocumentList from "./components/DocumentList/DocumentList";
import NotFound from "./utils/NotFound";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/document/:uid" element={<DocumentDetail />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

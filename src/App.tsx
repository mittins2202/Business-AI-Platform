import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import BusinessExplorer from "./pages/BusinessExplorer";
import SuccessStories from "./pages/SuccessStories";
import BusinessDetail from "./pages/BusinessDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Define all routes here */}
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/explore" element={<BusinessExplorer />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/business/:businessId" element={<BusinessDetail />} />

          {/* IMPORTANT: DO NOT place any routes below this. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
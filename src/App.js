import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SinglePage from "./pages/singlePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  const Wrapper = (items) => {
    return <Layout>{items}</Layout>;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={Wrapper(<Home />)} />
          <Route path="/:id" element={Wrapper(<SinglePage />)} />
          <Route path="*" element={Wrapper(<NotFoundPage />)} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

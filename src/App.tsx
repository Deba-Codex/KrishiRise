import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import CropSuggestion from './pages/CropSuggestion';
import SmartSolutionsPlans from './pages/SmartSolutionsPlans';
import FarmerHub from './pages/FarmerHub';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/disease-detection"
                element={
                  <ProtectedRoute>
                    <DiseaseDetection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crop-suggestion"
                element={
                  <ProtectedRoute>
                    <CropSuggestion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/smart-solutions-plans"
                element={
                  <ProtectedRoute>
                    <SmartSolutionsPlans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer-hub"
                element={
                  <ProtectedRoute>
                    <FarmerHub />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <AIChat />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

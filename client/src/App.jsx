import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-[Inter,sans-serif] text-[#121212]">
        <Navbar />
        <main className="pt-20 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

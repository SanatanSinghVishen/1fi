import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-[Inter,sans-serif]">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

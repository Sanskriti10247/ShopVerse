import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import ProductPage from "./pages/ProductPage";
import MyOrdersPage from './pages/MyOrdersPage';
import PaymentsPage from './pages/PaymentsPage';



export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

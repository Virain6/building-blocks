import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/landingPage";
import CartPage from "./pages/cartPage";
import Footer from "./components/footer";
import ProductSearch from "./pages/searchPage";
import ProductDetails from "./pages/productPage";
import Login from "./components/admin/login"; // Import the Login component
import RegisterPage from "./components/admin/register";
import PrivateRoute from "./components/admin/privateRoute"; // Import the PrivateRoute component
import AdminRouter from "./pages/admin/adminDashboard";
import ProductsPage from "./pages/admin/product/productsPage"; // Import
import OrderConfirmationPage from "./pages/orderConfirmation";
import AdminManagement from "./pages/admin/adminManagment/adminManagmentPage";
import ChangePassword from "./pages/admin/settings/settingsPage";
import DepartmentManagementPage from "./pages/admin/department/departmentPage";
import SupplierManagementPage from "./pages/admin/supplier/supplierPage";
import OrderManagementPage from "./pages/admin/orders/orderManagement";
import TermsOfService from "./pages/policies/terms";
import PrivacyPolicy from "./pages/policies/privacy";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { CartProvider } from "./context/cartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app in AuthProvider */}
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<ProductSearch />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/order-confirmation/:orderId"
                element={<OrderConfirmationPage />}
              />
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* Public login route */}
              {/* Protected Routes */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminRouter />
                  </PrivateRoute>
                }
              >
                <Route path="" element={<ProductsPage />} />
                <Route path="management" element={<AdminManagement />} />
                <Route path="settings" element={<ChangePassword />} />
                <Route
                  path="departments"
                  element={<DepartmentManagementPage />}
                />
                <Route path="suppliers" element={<SupplierManagementPage />} />
                <Route path="orders" element={<OrderManagementPage />} />
              </Route>
            </Routes>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

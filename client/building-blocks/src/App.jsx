import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/landingPage";
import Footer from "./components/footer";
import ProductSearch from "./pages/searchPage";
import ProductDetails from "./pages/productPage";
import AdminPage from "./pages/adminPage";
import Login from "./components/admin/login"; // Import the Login component
import RegisterPage from "./components/admin/register";
import PrivateRoute from "./components/admin/privateRoute"; // Import the PrivateRoute component
import AddProductPage from "./pages/admin/addProductPage"; // Import Add Product Page
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app in AuthProvider */}
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/register" element={<RegisterPage />} />
            {/* Public login route */}
            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  {" "}
                  {/* Restrict access to /admin */}
                  <AdminPage /> {/* Replace with your admin page component */}
                </PrivateRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <PrivateRoute>
                  <AddProductPage />
                </PrivateRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

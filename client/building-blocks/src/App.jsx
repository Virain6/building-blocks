import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/landingPage";
import Footer from "./components/footer";
import ProductSearch from "./pages/searchPage";
import ProductDetails from "./pages/productPage";
import Login from "./components/admin/login"; // Import the Login component
import RegisterPage from "./components/admin/register";
import PrivateRoute from "./components/admin/privateRoute"; // Import the PrivateRoute component
import AdminRouter from "./pages/admin/adminDashboard";
import ProductsPage from "./pages/admin/product/productsPage"; // Import
import AdminManagement from "./pages/admin/adminManagment/adminManagmentPage";
import ChangePassword from "./pages/admin/settings/settingsPage";
import DepartmentManagementPage from "./pages/admin/department/departmentPage";
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
            </Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

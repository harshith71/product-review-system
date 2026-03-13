import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Auth pages (no top navbar padding) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin (full-page layout, no outer navbar) */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Public + user pages */}
      <Route path="/" element={
        <AuthLayout>
          <div style={{ paddingTop: 24, paddingBottom: 60 }}>
            <ProductsPage />
          </div>
        </AuthLayout>
      } />
      <Route path="/products/:id" element={
        <AuthLayout>
          <div style={{ paddingTop: 24, paddingBottom: 60 }}>
            <ProductDetailPage />
          </div>
        </AuthLayout>
      } />
      <Route path="/add-product" element={
        <AuthLayout>
          <ProtectedRoute adminOnly>
            <div style={{ paddingTop: 24, paddingBottom: 60 }}>
              <AddProductPage />
            </div>
          </ProtectedRoute>
        </AuthLayout>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
